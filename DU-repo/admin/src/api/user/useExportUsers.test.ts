import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useExportUsers } from './useExportUsers';

jest.mock('@apollo/client');

describe('useExportUsers', () => {
  it('should call exportUsers mutation and handle loading and error states correctly', async () => {
    const mockExportUsers = jest.fn().mockResolvedValue({
      data: { exportUsers: true }
    });

    (useMutation as jest.Mock).mockReturnValue([
      mockExportUsers,
      { loading: false, error: null }
    ]);

    const { result } = renderHook(() => useExportUsers());

    // Act: Call the exportUsers mutation
    await act(async () => {
      await result.current.exportUsers({ variables: { branch: 'branchA' } });
    });

    // Assert: Check if the mutation function was called with the correct variables
    expect(mockExportUsers).toHaveBeenCalledWith({
      variables: { branch: 'branchA' }
    });

    // Assert: Ensure there were no errors and loading is false
    expect(result.current.exportUsersLoading).toBe(false);
    expect(result.current.exportUsersError).toBeNull();
  });

  it('should handle error state when mutation fails', async () => {
    const mockError = new Error('Mutation failed');

    const mockExportUsers = jest.fn().mockRejectedValue(mockError);

    (useMutation as jest.Mock).mockReturnValue([
      mockExportUsers,
      { loading: false, error: mockError }
    ]);

    const { result } = renderHook(() => useExportUsers());

    // Act: Call the exportUsers mutation and catch the error
    await act(async () => {
      try {
        await result.current.exportUsers({ variables: { branch: 'branchA' } });
      } catch (_e) {
        // Error is expected here
      }
    });

    // Assert: Ensure error is set and loading is false
    expect(result.current.exportUsersError).toEqual(mockError);
    expect(result.current.exportUsersLoading).toBe(false);
  });
});
