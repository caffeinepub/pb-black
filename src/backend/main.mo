import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Random "mo:core/Random";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import InviteLinksModule "invite-links/invite-links-module";



actor {
  public type InviteStatus = { #pending; #approved; #rejected };

  public type PremiumIncomeRange = {
    #range25kTo50k;
    #range50kTo75k;
    #range75kTo100k;
    #range100kPlus;
  };

  public type Occupation = {
    #ceoOrExecutive;
    #partnerOrDirector;
    #entrepreneurBusinessOwner;
    #medicalProfessional;
    #lawProfessional;
    #pilot;
    #corporateProfessional;
    #notListed;
  };

  public type PreferredCallTime = {
    #morning;
    #afternoon;
    #evening;
  };

  public type PremiumQualification = {
    id : Nat;
    timestamp : Int;
    name : Text;
    email : Text;
    phone : Text;
    linkedin : Text;
    referredBy : ?Text;
    totalHealthCover : ?Nat;
    annualPremiumRange : PremiumIncomeRange;
    occupation : Occupation;
    preferredCallTime : PreferredCallTime;
    status : InviteStatus;
  };

  public type Manager = {
    id : Nat;
    name : Text;
    bio : ?Text;
    contactInfo : ?Text;
  };

  public type ManagerId = Nat;
  public type PremiumQualificationId = Nat;

  public type UserProfile = {
    name : Text;
    email : ?Text;
  };

  var nextQualificationId = 1;
  var nextManagerId : ManagerId = 1;

  // Maps for persistent storage
  let qualifications = Map.empty<PremiumQualificationId, PremiumQualification>();
  let managers = Map.empty<ManagerId, Manager>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Invite links system state
  let inviteState = InviteLinksModule.initState();

  // Compare by timestamp for sorting (descending - newest first)
  func compareByTimestamp(a : PremiumQualification, b : PremiumQualification) : Order.Order {
    Int.compare(b.timestamp, a.timestamp);
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitQualification(
    name : Text,
    email : Text,
    phone : Text,
    linkedin : Text,
    referredBy : ?Text,
    totalHealthCover : ?Nat,
    annualPremiumRange : PremiumIncomeRange,
    occupation : Occupation,
    preferredCallTime : PreferredCallTime,
  ) : async PremiumQualificationId {
    let id = nextQualificationId;
    nextQualificationId += 1;

    let newQualification : PremiumQualification = {
      id;
      timestamp = Time.now();
      name;
      email;
      phone;
      linkedin;
      referredBy;
      totalHealthCover;
      annualPremiumRange;
      occupation;
      preferredCallTime;
      status = #pending;
    };

    qualifications.add(id, newQualification);
    id;
  };

  public query ({ caller }) func checkQualificationStatus(email : Text) : async ?PremiumQualification {
    let qualification = qualifications.values().find(
      func(q) { q.email == email }
    );
    qualification;
  };

  public shared ({ caller }) func updateQualificationStatus(qualificationId : PremiumQualificationId, newStatus : InviteStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update qualification status");
    };

    switch (qualifications.get(qualificationId)) {
      case (null) {
        Runtime.trap("Qualification not found");
      };
      case (?qualification) {
        let updatedQualification : PremiumQualification = {
          qualification with status = newStatus
        };
        qualifications.add(qualificationId, updatedQualification);
      };
    };
  };

  public shared ({ caller }) func addManager(name : Text, bio : ?Text, contactInfo : ?Text) : async ManagerId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add managers");
    };

    let managerId = nextManagerId;
    nextManagerId += 1;

    let newManager : Manager = {
      id = managerId;
      name;
      bio;
      contactInfo;
    };

    managers.add(managerId, newManager);
    managerId;
  };

  public shared ({ caller }) func removeManager(managerId : ManagerId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove managers");
    };

    managers.remove(managerId);
  };

  public query ({ caller }) func getAllQualifications() : async [PremiumQualification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all qualifications");
    };

    let allQuals = qualifications.values().toArray();
    allQuals.sort(compareByTimestamp);
  };

  public query ({ caller }) func getAllManagers() : async [Manager] {
    managers.values().toArray();
  };

  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public shared ({ caller }) func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
};
