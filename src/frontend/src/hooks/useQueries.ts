import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { InviteRequest, Manager, UserRole } from '../backend';

// Query: Get all invite requests (admin only)
export function useGetAllInviteRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<InviteRequest[]>({
    queryKey: ['inviteRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInviteRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Get all managers
export function useGetAllManagers() {
  const { actor, isFetching } = useActor();

  return useQuery<Manager[]>({
    queryKey: ['managers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllManagers();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query: Check invite status by email
export function useCheckInviteStatus(email: string) {
  const { actor, isFetching } = useActor();

  return useQuery<InviteRequest | null>({
    queryKey: ['inviteStatus', email],
    queryFn: async () => {
      if (!actor || !email) return null;
      return actor.checkInviteStatus(email);
    },
    enabled: !!actor && !isFetching && !!email,
  });
}

// Query: Get caller user role
export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!actor) return 'guest' as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutation: Submit invite request
export function useSubmitInviteRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
      source: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitInviteRequest(
        data.name,
        data.email,
        data.phone,
        data.linkedin,
        data.source
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteRequests'] });
    },
  });
}

// Mutation: Approve invite
export function useApproveInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveInvite(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteRequests'] });
    },
  });
}

// Mutation: Reject invite
export function useRejectInvite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectInvite(requestId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inviteRequests'] });
    },
  });
}

// Mutation: Add manager
export function useAddManager() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      bio: string | null;
      contactInfo: string | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addManager(data.name, data.bio, data.contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });
    },
  });
}

// Mutation: Remove manager
export function useRemoveManager() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (managerId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeManager(managerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });
    },
  });
}
