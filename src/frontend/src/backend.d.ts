import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Manager {
    id: bigint;
    bio?: string;
    contactInfo?: string;
    name: string;
}
export interface InviteRequest {
    status: InviteStatus;
    linkedin: string;
    requestId: bigint;
    source: string;
    name: string;
    email: string;
    assignedManagerId?: bigint;
    timestamp: bigint;
    phone: string;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export enum InviteStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addManager(name: string, bio: string | null, contactInfo: string | null): Promise<bigint>;
    approveInvite(requestId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkInviteStatus(email: string): Promise<InviteRequest | null>;
    generateInviteCode(): Promise<string>;
    getAllInviteRequests(): Promise<Array<InviteRequest>>;
    getAllManagers(): Promise<Array<Manager>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getCallerUserRole(): Promise<UserRole>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    isCallerAdmin(): Promise<boolean>;
    rejectInvite(requestId: bigint): Promise<void>;
    removeManager(managerId: bigint): Promise<void>;
    submitInviteRequest(name: string, email: string, phone: string, linkedin: string, source: string): Promise<bigint>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
}
