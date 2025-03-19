import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useAggregateTrainingPlanVersions } from './useAggregateTrainingPlanVersions';

jest.mock('@apollo/client');

describe('useAggregateTrainingPlanVersions', () => {
  it('should fetch training plan versions without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        aggregateTrainingPlanVersions: {
          versions: ['v1', 'v2'],
          versionEnabled: true
        }
      }
    });

    const { result } = renderHook(() =>
      useAggregateTrainingPlanVersions({
        planType: 'typeA',
        planSourceId: 'sourceA'
      })
    );

    expect(result.current.trainingPlanVersions.versions).toEqual(['v1', 'v2']);
  });
});
