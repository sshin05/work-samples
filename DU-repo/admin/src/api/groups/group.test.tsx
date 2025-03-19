import { render } from '@testing-library/react';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useFindGroupsByMissionPartnerId } from './useFindGroupsByMissionPartnerId';
import { useCreateGroup } from './useCreateGroup';
import { useDeleteGroup } from './useDeleteGroup';
import { useUpdateGroup } from './useUpdateGroup';
import { useAddCoursesToGroup } from './useAddCoursesToGroup';
import { useGetTrainingPlanProgress } from './useGetTrainingPlanProgress';

jest.mock('@apollo/client');

const GroupsTest = () => {
  const { groupsByMissionPartnerId } = useFindGroupsByMissionPartnerId('123');

  const { createGroup } = useCreateGroup();
  const { updateGroup } = useUpdateGroup();

  const { deleteGroup } = useDeleteGroup();

  const { addCoursesToGroup } = useAddCoursesToGroup();

  return (
    groupsByMissionPartnerId &&
    createGroup &&
    deleteGroup &&
    addCoursesToGroup &&
    updateGroup && <div>test</div>
  );
};

describe('groups test', () => {
  it('should use groups hook without error', () => {
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data
    });
    (useLazyQuery as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<GroupsTest />);
    expect(useQuery).toHaveBeenCalled();
  });

  describe('useGetTrainingPlanProgress', () => {
    it('should return data', () => {
      const data = {
        getTrainingPlanProgress: { test: 'test' }
      };
      const refetch = jest.fn();

      (useLazyQuery as jest.Mock).mockReturnValue([
        refetch,
        {
          loading: false,
          error: null,
          data
        }
      ]);

      const {
        trainingPlanProgress,
        trainingPlanProgressError,
        trainingPlanProgressLoading,
        fetchTrainingPlanProgress
      } = useGetTrainingPlanProgress();

      expect(trainingPlanProgress).toEqual(data.getTrainingPlanProgress);
      expect(trainingPlanProgressError).toEqual(null);
      expect(trainingPlanProgressLoading).toEqual(false);
      expect(typeof fetchTrainingPlanProgress).toBe('function');
    });

    it('should return an array', () => {
      const data = null;
      const refetch = jest.fn();

      (useLazyQuery as jest.Mock).mockReturnValue([
        refetch,
        {
          loading: false,
          error: null,
          data
        }
      ]);

      const {
        trainingPlanProgress,
        trainingPlanProgressError,
        trainingPlanProgressLoading,
        fetchTrainingPlanProgress
      } = useGetTrainingPlanProgress();

      expect(trainingPlanProgress).toEqual([]);
      expect(trainingPlanProgressError).toEqual(null);
      expect(trainingPlanProgressLoading).toEqual(false);
      expect(typeof fetchTrainingPlanProgress).toBe('function');
    });
  });
});
