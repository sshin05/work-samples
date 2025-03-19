import { renderHook } from '@@/test-utils';
import { useFindTranscriptTrainingPlans } from './useFindTranscriptTrainingPlans';
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useFindTranscriptTrainingPlans', () => {
  it('should use training plan hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findTranscriptTrainingPlans: {
          total: 30,
          records: [
            {
              trainingPlanId: 'plan1',
              trainingPlan: { title: 'Plan 1' }
            },
            {
              trainingPlanId: 'plan2',
              trainingPlan: { title: 'Plan 2' }
            }
          ]
        }
      }
    });

    const { result } = renderHook(() =>
      useFindTranscriptTrainingPlans({ missionPartnerId: 'missionPartnerId' })
    );

    expect(result.current.transcriptTrainingPlansTotal).toBe(30);
    expect(result.current.transcriptTrainingPlans).toEqual([
      { trainingPlanId: 'plan1', trainingPlan: { title: 'Plan 1' } },
      { trainingPlanId: 'plan2', trainingPlan: { title: 'Plan 2' } }
    ]);
  });
});
