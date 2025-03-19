import { useCallback } from 'react';
import { useBeforeUnload } from 'react-use';

const CONFIRMATION_MESSAGE =
  'Are you sure you want to leave this page? Your unsaved edits will be discarded.';

export const useUnsavedChangesPrompt = (unsavedChanges: boolean) => {
  const dirtyFunction = useCallback(() => {
    return unsavedChanges;
  }, [unsavedChanges]);

  useBeforeUnload(dirtyFunction, CONFIRMATION_MESSAGE);
};
