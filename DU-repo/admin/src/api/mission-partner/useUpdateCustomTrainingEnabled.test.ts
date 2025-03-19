import { useMutation } from '@apollo/client';
import { useUpdateCustomTrainingEnabled } from './useUpdateCustomTrainingEnabled';
import { renderHook } from '@testing-library/react';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn()
}));

describe('useUpdateCustomTrainingEnabled', () => {
  const input = {
    id: '1',
    customTrainingEnabled: true
  };

  it('should return data', () => {
    const testMock = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      data => testMock(data),
      {
        loading: false,
        error: null
      }
    ]);

    const { result } = renderHook(() => useUpdateCustomTrainingEnabled());

    const {
      updateCustomTrainingEnabled,
      updateCustomTrainingEnabledLoading,
      updateCustomTrainingEnabledError
    } = result.current;

    updateCustomTrainingEnabled(input);

    expect(updateCustomTrainingEnabled).toBeInstanceOf(Function);
    expect(testMock).toHaveBeenCalledWith({
      variables: { input: { id: '1', customTrainingEnabled: true } }
    });
    expect(updateCustomTrainingEnabledLoading).toEqual(false);
    expect(updateCustomTrainingEnabledError).toEqual(null);
  });

  it('should handle loading state', () => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: true,
        error: null
      }
    ]);

    const { result } = renderHook(() => useUpdateCustomTrainingEnabled());

    expect(result.current.updateCustomTrainingEnabledLoading).toEqual(true);
  });
});
