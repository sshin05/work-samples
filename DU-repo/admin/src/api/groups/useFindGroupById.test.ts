import { renderHook, act } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindGroupById } from './useFindGroupById';

jest.mock('@apollo/client');

describe('useFindGroupById', () => {
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null,
      refetch: mockRefetch
    });
  });

  it('should return initial values when no data is fetched', () => {
    const groupId = '123';
    const { result } = renderHook(() => useFindGroupById(groupId));

    expect(result.current.groupByIdLoading).toBe(false);
    expect(result.current.groupByIdError).toBeNull();
    expect(result.current.groupById).toBeUndefined();
    expect(result.current.refetchGroupById).toBeInstanceOf(Function);
  });

  it('should return loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
      refetch: mockRefetch
    });

    const groupId = '123';
    const { result } = renderHook(() => useFindGroupById(groupId));

    expect(result.current.groupByIdLoading).toBe(true);
    expect(result.current.groupByIdError).toBeNull();
    expect(result.current.groupById).toBeUndefined();
  });

  it('should return error state', () => {
    const mockError = new Error('Failed to fetch');
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
      data: null,
      refetch: mockRefetch
    });

    const groupId = '123';
    const { result } = renderHook(() => useFindGroupById(groupId));

    expect(result.current.groupByIdLoading).toBe(false);
    expect(result.current.groupByIdError).toEqual(mockError);
    expect(result.current.groupById).toBeUndefined();
  });

  it('should return data when query succeeds', () => {
    const mockData = {
      findGroupById: {
        id: '123',
        name: 'Test Group',
        missionPartnerId: '456',
        missionPartnerName: 'Test Partner',
        groupMemberCount: 20,
        trainingPlans: [
          {
            planSourceId: 'plan1',
            planType: 'type1',
            planVersion: 'v1',
            title: 'Training Plan 1',
            isLatestVersion: true
          }
        ],
        courses: [
          {
            courseId: 'course1',
            vendorName: 'Vendor A',
            courseTitle: 'Course A'
          }
        ]
      }
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
      refetch: mockRefetch
    });

    const groupId = '123';
    const { result } = renderHook(() => useFindGroupById(groupId));

    expect(result.current.groupByIdLoading).toBe(false);
    expect(result.current.groupByIdError).toBeNull();
    expect(result.current.groupById).toEqual(mockData.findGroupById);
  });

  it('should call refetch with correct variables', async () => {
    const groupId = '123';
    const { result } = renderHook(() => useFindGroupById(groupId));

    const newGroupId = '456';
    await act(async () => {
      await result.current.refetchGroupById(newGroupId);
    });

    expect(mockRefetch).toHaveBeenCalledWith({ groupId: newGroupId });
  });
});
