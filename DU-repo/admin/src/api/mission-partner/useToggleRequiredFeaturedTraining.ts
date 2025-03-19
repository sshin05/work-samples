import { useCallback } from 'react';
import { pickBy, pick } from 'lodash';
import { useMutation, gql } from '@apollo/client';

// this is simply used for a pickBy() / pick()
const ALLOWED_TOGGLE_SAVE_KEYS = [
  'courseId',
  'assessmentId',
  'labId',
  'planType',
  'planSourceId',
  'planVersion'
];

const TOGGLE_REQUIRED_FEATURED_TRAINING = gql`
  mutation ToggleRequiredFeaturedTraining(
    $missionPartnerId: ID!
    $courseId: ID
    $assessmentId: ID
    $labId: ID
    $planType: String
    $planSourceId: String
    $planVersion: String
  ) {
    toggleRequiredFeaturedTraining(
      missionPartnerId: $missionPartnerId
      courseId: $courseId
      assessmentId: $assessmentId
      labId: $labId
      planType: $planType
      planSourceId: $planSourceId
      planVersion: $planVersion
    ) {
      id
    }
  }
`;

export const useToggleRequiredFeaturedTraining = () => {
  const [_toggleRequiredFeaturedTraining, { loading, error }] = useMutation(
    TOGGLE_REQUIRED_FEATURED_TRAINING,
    {
      refetchQueries: [
        'FindMissionPartnerById',
        'CountAssignedLicensesForMissionPartner'
      ]
    }
  );

  const toggleRequiredFeaturedTraining = useCallback(
    async (rowData, missionPartnerId: string) => {
      const dataToSave = {
        ...pick(pickBy(rowData), ALLOWED_TOGGLE_SAVE_KEYS),
        missionPartnerId
      };

      await _toggleRequiredFeaturedTraining({
        variables: dataToSave
      });
    },
    [_toggleRequiredFeaturedTraining]
  );

  return {
    toggleRequiredFeaturedTraining,
    toggleRequiredFeaturedTrainingLoading: loading,
    toggleRequiredFeaturedTrainingError: error
  };
};
