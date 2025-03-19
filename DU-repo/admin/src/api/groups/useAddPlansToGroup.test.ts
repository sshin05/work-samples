import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useAddPlansToGroup } from './useAddPlansToGroup';

jest.mock('@apollo/client');

describe('useAddPlansToGroup', () => {
  const mockAddPlansToGroupFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useMutation as jest.Mock).mockReturnValue([
      mockAddPlansToGroupFn,
      { loading: false, error: null, data: null }
    ]);
  });

  it('should return initial values', () => {
    const { result } = renderHook(() => useAddPlansToGroup());

    expect(result.current.addPlansToGroupLoading).toBe(false);
    expect(result.current.addPlansToGroupError).toBeNull();
    expect(result.current.addPlansToGroupData).toBeNull();
    expect(result.current.addPlansToGroup).toBeInstanceOf(Function);
  });

  it('should call addPlansToGroup with correct variables', async () => {
    const { result } = renderHook(() => useAddPlansToGroup());

    const groupId = '123';
    const plans = [
      { planSourceId: 'plan1', planType: 'type1', planVersion: 'v1' }
    ];
    const missionPartnerId = '456';

    await act(async () => {
      await result.current.addPlansToGroup(groupId, plans, missionPartnerId);
    });

    expect(mockAddPlansToGroupFn).toHaveBeenCalledWith({
      variables: {
        groupId,
        plans,
        missionPartnerId
      }
    });
  });

  it('should handle loading state', () => {
    (useMutation as jest.Mock).mockReturnValue([
      mockAddPlansToGroupFn,
      { loading: true, error: null, data: null }
    ]);

    const { result } = renderHook(() => useAddPlansToGroup());

    expect(result.current.addPlansToGroupLoading).toBe(true);
    expect(result.current.addPlansToGroupError).toBeNull();
    expect(result.current.addPlansToGroupData).toBeNull();
  });

  it('should handle error state', () => {
    const mockError = new Error('Failed to add plans');
    (useMutation as jest.Mock).mockReturnValue([
      mockAddPlansToGroupFn,
      { loading: false, error: mockError, data: null }
    ]);

    const { result } = renderHook(() => useAddPlansToGroup());

    expect(result.current.addPlansToGroupLoading).toBe(false);
    expect(result.current.addPlansToGroupError).toEqual(mockError);
    expect(result.current.addPlansToGroupData).toBeNull();
  });

  it('should return data when mutation succeeds', () => {
    const mockData = {
      addTrainingPlansToGroup: true
    };
    (useMutation as jest.Mock).mockReturnValue([
      mockAddPlansToGroupFn,
      { loading: false, error: null, data: mockData }
    ]);

    const { result } = renderHook(() => useAddPlansToGroup());

    expect(result.current.addPlansToGroupLoading).toBe(false);
    expect(result.current.addPlansToGroupError).toBeNull();
    expect(result.current.addPlansToGroupData).toEqual(mockData);
  });
});
