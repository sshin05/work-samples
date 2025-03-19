import { renderHook } from '@@/test-utils';
import { useBeforeUnload } from 'react-use';
import { useUnsavedChangesPrompt } from './useUnsavedChangesPrompt';

jest.mock('react-use', () => ({
  useBeforeUnload: jest.fn()
}));

describe('useUnsavedChangesPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call useBeforeUnload with the correct callback and confirmation message when unsavedChanges is true', () => {
    const unsavedChanges = true;

    renderHook(() => useUnsavedChangesPrompt(unsavedChanges));

    expect(useBeforeUnload).toHaveBeenCalledWith(
      expect.any(Function),
      'Are you sure you want to leave this page? Your unsaved edits will be discarded.'
    );
  });

  it('should call useBeforeUnload with a function returning false when unsavedChanges is false', () => {
    const unsavedChanges = false;

    renderHook(() => useUnsavedChangesPrompt(unsavedChanges));

    // Extract the function passed to useBeforeUnload and test it directly
    const dirtyFunction = (useBeforeUnload as jest.Mock).mock.calls[0][0];
    expect(dirtyFunction()).toBe(false);
  });

  it('should call useBeforeUnload with a function returning true when unsavedChanges is true', () => {
    const unsavedChanges = true;

    renderHook(() => useUnsavedChangesPrompt(unsavedChanges));

    // Extract the function passed to useBeforeUnload and test it directly
    const dirtyFunction = (useBeforeUnload as jest.Mock).mock.calls[0][0];
    expect(dirtyFunction()).toBe(true);
  });
});
