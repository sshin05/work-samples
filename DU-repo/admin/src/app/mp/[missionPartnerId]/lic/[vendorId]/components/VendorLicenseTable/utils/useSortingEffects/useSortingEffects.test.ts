import { renderHook } from '@@/test-utils';
import { useSortingEffects } from './useSortingEffects';

const STATIC_ARRAY = [];
const STATIC_SORTING = [{ id: 'userEmail', desc: true }];

describe('useSortingEffects', () => {
  it('initializes queryState with given props', () => {
    const { result } = renderHook(() =>
      useSortingEffects({
        missionPartnerId: 'mp1',
        vendorId: 'vendor1',
        pageSize: 25
      })
    );

    expect(result.current.queryState).toEqual({
      pageSize: 25,
      pageNumber: 1,
      vendorId: 'vendor1',
      missionPartnerId: 'mp1',
      page: 1,
      sortField: undefined,
      sortDirection: undefined,
      search: undefined
    });
  });

  it('updates queryState on sorting', () => {
    const { result } = renderHook(() =>
      useSortingEffects({
        missionPartnerId: 'mp1',
        vendorId: 'vendor1',
        pageSize: 25,
        sorting: STATIC_SORTING,
        searchTerm: 'test'
      })
    );

    expect(result.current.queryState.sortField).toBe('email');
    expect(result.current.queryState.sortDirection).toBe('desc');
  });

  it('updates queryState on searchTerm', () => {
    const { result } = renderHook(() =>
      useSortingEffects({
        missionPartnerId: 'mp1',
        vendorId: 'vendor1',
        pageSize: 25,
        sorting: STATIC_ARRAY,
        searchTerm: 'new search'
      })
    );

    expect(result.current.queryState.search).toBe('new search');
  });
});
