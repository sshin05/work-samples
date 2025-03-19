import { useLazyQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import { useFindUsersBySearchTextLazy } from './useFindUsersBySearchTextLazy';

jest.mock('@apollo/client');

describe('useFindUsersBySearchTextLazy', () => {
  it('should return data', () => {
    const data = {
      findUsersBySearchText: {
        records: [
          {
            id: '1',
            firstName: 'test first name',
            lastName: 'test last name',
            email: 'test email'
          }
        ],
        total: 1
      }
    };

    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data }
    ]);

    const { result } = renderHook(() => useFindUsersBySearchTextLazy());
    const {
      usersBySearch,
      usersBySearchError,
      usersBySearchLoading,
      fetchUsersBySearch
    } = result.current;

    expect(usersBySearch).toEqual(data.findUsersBySearchText.records);
    expect(usersBySearchError).toEqual(null);
    expect(usersBySearchLoading).toEqual(false);
    expect(fetchUsersBySearch).toBeDefined();
  });
});
