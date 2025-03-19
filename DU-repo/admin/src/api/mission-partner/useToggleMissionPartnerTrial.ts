import { gql, useMutation } from '@apollo/client';
import type {
  ToggleMissionPartnerTrialMutation,
  ToggleMissionPartnerTrialMutationVariables
} from '@/api/codegen/graphql';

export const useToggleMissionPartnerTrial = () => {
  const mutation = gql`
    mutation ToggleMissionPartnerTrial(
      $missionPartnerId: ID!
      $enable: Boolean!
      $startDate: DateTime
      $endDate: DateTime
    ) {
      toggleMissionPartnerTrial(
        missionPartnerId: $missionPartnerId
        enable: $enable
        startDate: $startDate
        endDate: $endDate
      ) {
        trialEnabled
        trialStartDate
        trialEndDate
      }
    }
  `;
  const [toggleMissionPartnerTrial, { loading, error, data }] = useMutation<
    ToggleMissionPartnerTrialMutation,
    ToggleMissionPartnerTrialMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return {
    toggleMissionPartnerTrial: async (
      missionPartnerId: string,
      enable: boolean,
      startDate?: Date,
      endDate?: Date
    ) =>
      toggleMissionPartnerTrial({
        variables: {
          missionPartnerId,
          enable,
          startDate,
          endDate
        }
      }),
    toggleMissionPartnerTrialLoading: loading,
    toggleMissionPartnerTrialError: error,
    toggleMissionPartnerTrialData: data?.toggleMissionPartnerTrial
  };
};
