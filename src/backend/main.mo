import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Random "mo:core/Random";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import InviteLinksModule "invite-links/invite-links-module";

actor {
  // Types
  public type InviteStatus = { #pending; #approved; #rejected };

  public type InviteRequest = {
    requestId : Nat;
    timestamp : Int;
    name : Text;
    email : Text;
    phone : Text;
    linkedin : Text;
    source : Text;
    status : InviteStatus;
    assignedManagerId : ?Nat;
  };

  public type Manager = {
    id : Nat;
    name : Text;
    bio : ?Text;
    contactInfo : ?Text;
  };

  // State
  var nextRequestId = 1;
  var nextManagerId = 1;
  var roundRobinIndex = 0;
  var managerArray : [Manager] = [];

  // Map usage for persistent storage
  let inviteRequests = Map.empty<Nat, InviteRequest>();
  let managers = Map.empty<Nat, Manager>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Invite links system state initialization
  let inviteState = InviteLinksModule.initState();

  // Custom compare function for InviteRequest
  module InviteRequest {
    public func compareByTimestamp(a : InviteRequest, b : InviteRequest) : Order.Order {
      Nat.compare(a.requestId, b.requestId);
    };
  };

  // Public API
  public shared ({ caller }) func submitInviteRequest(name : Text, email : Text, phone : Text, linkedin : Text, source : Text) : async Nat {
    let requestId = nextRequestId;
    nextRequestId += 1;

    let newRequest : InviteRequest = {
      requestId;
      timestamp = Time.now();
      name;
      email;
      phone;
      linkedin;
      source;
      status = #pending;
      assignedManagerId = null;
    };

    inviteRequests.add(requestId, newRequest);
    requestId;
  };

  public query ({ caller }) func checkInviteStatus(email : Text) : async ?InviteRequest {
    let invite = inviteRequests.values().find(func(invite) { invite.email == email });
    invite;
  };

  public shared ({ caller }) func approveInvite(requestId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve invites");
    };

    switch (inviteRequests.get(requestId)) {
      case (null) { Runtime.trap("Invite request not found") };
      case (?invite) {
        // Assign manager
        if (managerArray.size() == 0) { Runtime.trap("No managers available") };

        let manager = managerArray[roundRobinIndex % managerArray.size()];
        roundRobinIndex += 1;

        let updatedInvite : InviteRequest = {
          invite with
          status = #approved;
          assignedManagerId = ?manager.id;
        };

        inviteRequests.add(requestId, updatedInvite);
      };
    };
  };

  public shared ({ caller }) func rejectInvite(requestId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject invites");
    };

    switch (inviteRequests.get(requestId)) {
      case (null) { Runtime.trap("Invite request not found") };
      case (?invite) {
        let updatedInvite : InviteRequest = { invite with status = #rejected };
        inviteRequests.add(requestId, updatedInvite);
      };
    };
  };

  public shared ({ caller }) func addManager(name : Text, bio : ?Text, contactInfo : ?Text) : async Nat {
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
    managerArray := managers.values().toArray();
    managerId;
  };

  public shared ({ caller }) func removeManager(managerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove managers");
    };

    managers.remove(managerId);
    managerArray := managers.values().toArray();
  };

  public query ({ caller }) func getAllInviteRequests() : async [InviteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all invite requests");
    };

    let allRequests = inviteRequests.values().toArray();
    allRequests.sort<InviteRequest>(InviteRequest.compareByTimestamp);
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
