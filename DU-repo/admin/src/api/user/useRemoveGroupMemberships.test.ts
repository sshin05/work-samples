import { useMutation } from '@apollo/client';
import { useRemoveGroupMemberships } from './useRemoveGroupMemberships';
import { renderHook } from '@testing-library/react';

jest.mock('@apollo/client');

describe('useRemoveGroupMemberships', () => {
  it('should run successfully', async () => {
    const mockFN = jest.fn();

    (useMutation as jest.Mock).mockReturnValue([
      mockFN,
      { loading: false, error: null }
    ]);

    const { result } = renderHook(() => useRemoveGroupMemberships());

    const {
      removeGroupMembershipsError,
      removeGroupMembershipsLoading,
      removeGroupMemberships
    } = result.current;

    expect(removeGroupMembershipsError).toEqual(null);
    expect(removeGroupMembershipsLoading).toEqual(false);
    expect(removeGroupMemberships.constructor.name).toBe('Function');
    await removeGroupMemberships(
      'sampleGroupId-123',
      'sampleUserId-124',
      'missionpartnerID'
    );
    expect(mockFN).toHaveBeenCalled();
  });
});
