import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  PremiumQualification, 
  Manager, 
  InviteStatus,
  PremiumIncomeRange,
  Occupation,
  PreferredCallTime
} from '../backend';

export function useSubmitQualification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
      referredBy: string | null;
      totalHealthCover: bigint | null;
      annualPremiumRange: PremiumIncomeRange;
      occupation: Occupation;
      preferredCallTime: PreferredCallTime;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitQualification(
        data.name,
        data.email,
        data.phone,
        data.linkedin,
        data.referredBy,
        data.totalHealthCover,
        data.annualPremiumRange,
        data.occupation,
        data.preferredCallTime
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualifications'] });
    }
  });
}

export function useCheckQualificationStatus(email: string) {
  const { actor, isFetching } = useActor();

  return useQuery<PremiumQualification | null>({
    queryKey: ['qualificationStatus', email],
    queryFn: async () => {
      if (!actor) return null;
      return actor.checkQualificationStatus(email);
    },
    enabled: !!actor && !isFetching && !!email
  });
}

export function useGetAllQualifications() {
  const { actor, isFetching } = useActor();

  return useQuery<PremiumQualification[]>({
    queryKey: ['qualifications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQualifications();
    },
    enabled: !!actor && !isFetching
  });
}

export function useUpdateQualificationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ qualificationId, status }: { qualificationId: bigint; status: InviteStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateQualificationStatus(qualificationId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualifications'] });
    }
  });
}

export function useGetAllManagers() {
  const { actor, isFetching } = useActor();

  return useQuery<Manager[]>({
    queryKey: ['managers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllManagers();
    },
    enabled: !!actor && !isFetching
  });
}

export function useAddManager() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; bio: string | null; contactInfo: string | null }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addManager(data.name, data.bio, data.contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });
    }
  });
}

export function useRemoveManager() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (managerId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.removeManager(managerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['managers'] });
    }
  });
}

export function useIsCurrentUserAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching
  });
}
