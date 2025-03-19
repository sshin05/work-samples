import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useToggleRequiredFeaturedTraining } from './useToggleRequiredFeaturedTraining';

jest.mock('@apollo/client');

describe('useToggleRequiredFeaturedTraining', () => {
  it('should call mutation', async () => {
    const mockMutation = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockMutation,
      { data: {}, loading: false, error: null }
    ]);

    const { result } = renderHook(() => useToggleRequiredFeaturedTraining());
    const { toggleRequiredFeaturedTraining } = result.current;

    await toggleRequiredFeaturedTraining({}, '123');

    expect(mockMutation).toHaveBeenCalled();
  });
});
