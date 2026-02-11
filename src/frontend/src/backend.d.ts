import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export type ManagerId = bigint;
export type Time = bigint;
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface PremiumQualification {
    id: bigint;
    occupation: Occupation;
    status: InviteStatus;
    linkedin: string;
    preferredCallTime: PreferredCallTime;
    annualPremiumRange: PremiumIncomeRange;
    name: string;
    email: string;
    referredBy?: string;
    timestamp: bigint;
    totalHealthCover?: bigint;
    phone: string;
}
export interface Manager {
    id: bigint;
    bio?: string;
    contactInfo?: string;
    name: string;
}
export type PremiumQualificationId = bigint;
export interface UserProfile {
    name: string;
    email?: string;
}
export enum InviteStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Occupation {
    ceoOrExecutive = "ceoOrExecutive",
    entrepreneurBusinessOwner = "entrepreneurBusinessOwner",
    partnerOrDirector = "partnerOrDirector",
    lawProfessional = "lawProfessional",
    medicalProfessional = "medicalProfessional",
    notListed = "notListed",
    pilot = "pilot",
    corporateProfessional = "corporateProfessional"
}
export enum PreferredCallTime {
    morning = "morning",
    evening = "evening",
    afternoon = "afternoon"
}
export enum PremiumIncomeRange {
    range50kTo75k = "range50kTo75k",
    range25kTo50k = "range25kTo50k",
    range75kTo100k = "range75kTo100k",
    range100kPlus = "range100kPlus"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addManager(name: string, bio: string | null, contactInfo: string | null): Promise<ManagerId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkQualificationStatus(email: string): Promise<PremiumQualification | null>;
    generateInviteCode(): Promise<string>;
    getAllManagers(): Promise<Array<Manager>>;
    getAllQualifications(): Promise<Array<PremiumQualification>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeManager(managerId: ManagerId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQualification(name: string, email: string, phone: string, linkedin: string, referredBy: string | null, totalHealthCover: bigint | null, annualPremiumRange: PremiumIncomeRange, occupation: Occupation, preferredCallTime: PreferredCallTime): Promise<PremiumQualificationId>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    updateQualificationStatus(qualificationId: PremiumQualificationId, newStatus: InviteStatus): Promise<void>;
}
