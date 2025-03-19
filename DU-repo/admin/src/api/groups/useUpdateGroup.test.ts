import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateGroup } from './useUpdateGroup';

jest.mock('@apollo/client');

describe('useUpdateGroup', () => {
  const mockUpdateGroupFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateGroupFn,
      { loading: false, error: null, data: null }
    ]);
  });

  it('should return initial values', () => {
    const { result } = renderHook(() => useUpdateGroup());

    expect(result.current.updateGroupLoading).toBe(false);
    expect(result.current.updateGroupError).toBeNull();
    expect(result.current.updateGroupData).toEqual([]);
    expect(result.current.updateGroup).toBeInstanceOf(Function);
  });

  it('should call updateGroup with correct variables', async () => {
    const { result } = renderHook(() => useUpdateGroup());

    const groupId = '123';
    const name = 'Test Group';
    const missionPartnerId = '456';

    await act(async () => {
      await result.current.updateGroup(groupId, name, missionPartnerId);
    });

    expect(mockUpdateGroupFn).toHaveBeenCalledWith({
      variables: {
        groupId,
        name,
        missionPartnerId
      }
    });
  });

  it('should handle loading state', () => {
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateGroupFn,
      { loading: true, error: null, data: null }
    ]);

    const { result } = renderHook(() => useUpdateGroup());

    expect(result.current.updateGroupLoading).toBe(true);
    expect(result.current.updateGroupError).toBeNull();
    expect(result.current.updateGroupData).toEqual([]);
  });

  it('should handle error state', () => {
    const mockError = new Error('Something went wrong');
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateGroupFn,
      { loading: false, error: mockError, data: null }
    ]);

    const { result } = renderHook(() => useUpdateGroup());

    expect(result.current.updateGroupLoading).toBe(false);
    expect(result.current.updateGroupError).toEqual(mockError);
    expect(result.current.updateGroupData).toEqual([]);
  });

  it('should return data when mutation succeeds', () => {
    const mockData = {
      updateGroup: {
        id: '123',
        name: 'Updated Group',
        groupMemberCount: 10,
        missionPartnerId: '456'
      }
    };
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateGroupFn,
      { loading: false, error: null, data: mockData }
    ]);

    const { result } = renderHook(() => useUpdateGroup());

    expect(result.current.updateGroupLoading).toBe(false);
    expect(result.current.updateGroupError).toBeNull();
    expect(result.current.updateGroupData).toEqual(mockData);
  });
});
