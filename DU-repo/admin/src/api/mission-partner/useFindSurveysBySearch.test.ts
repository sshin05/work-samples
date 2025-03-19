import { useQuery } from '@apollo/client';
import { useFindSurveysBySearch } from './useFindSurveysBySearch';
import { renderHook } from '@@/test-utils';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useFindSurveysBySearch', () => {
  it('should return surveys', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined
    });

    const { result } = renderHook(() =>
      useFindSurveysBySearch({
        missionPartnerId: '1',
        search: 'test',
        pageNumber: 1,
        pageSize: 10,
        sortKey: 'test',
        sortDirection: 'test'
      })
    );

    const { surveysError, surveysLoading, surveys } = result.current;

    expect(surveysError).toEqual(undefined);
    expect(surveysLoading).toEqual(false);
    expect(surveys).toEqual(undefined);
  });
});
