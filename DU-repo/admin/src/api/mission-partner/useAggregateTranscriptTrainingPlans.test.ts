import { useQuery } from '@apollo/client';
import { useAggregateTranscriptTrainingPlans } from './useAggregateTranscriptTrainingPlans';
import { renderHook } from '@testing-library/react';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useAggregateTranscriptTrainingPlans', () => {
  it('should return data', () => {
    const mockVariables = {
      missionPartnerId: '1',
      planType: 'type1',
      search: '',
      sortField: 'planTitle',
      sortDirection: 'asc',
      pageSize: 10,
      pageNumber: 1
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        aggregateTranscriptTrainingPlans: {
          records: [
            {
              id: '1',
              planType: 'type1',
              planSourceId: 'source1',
              planTitle: 'title1',
              total: 100,
              assigned: 50,
              started: 30,
              stopped: 10,
              completed: 20
            }
          ],
          total: 1
        }
      }
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptTrainingPlans(mockVariables)
    );

    expect(result.current.transcriptTrainingPlansLoading).toBe(false);
    expect(result.current.transcriptTrainingPlansError).toBeNull();
    expect(result.current.transcriptTrainingPlans).toEqual([
      {
        id: '1',
        planType: 'type1',
        planSourceId: 'source1',
        planTitle: 'title1',
        total: 100,
        assigned: 50,
        started: 30,
        stopped: 10,
        completed: 20
      }
    ]);
    expect(result.current.transcriptTrainingPlansTotal).toBe(1);
  });
});
