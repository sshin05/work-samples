import { useEffect } from 'react';
import { useToast } from '@digital-u/digital-ui';

const DEFAULT_GQL_ERROR_MESSAGE =
  'An unexpected error occurred, refresh page and try again, or report to support.';

const extractErrorMessage = error => error.message || DEFAULT_GQL_ERROR_MESSAGE;

export const useGraphqlErrorHandler = (error, customMessage?: string) => {
  const [, setToast] = useToast();

  useEffect(() => {
    if (error) {
      const errorMessage = customMessage || extractErrorMessage(error);
      setToast({
        kind: 'error',
        title: 'Error',
        subtitle: errorMessage,
        persist: true // I think the right move is to leave the error on the screen.
      });
    }
  }, [error, customMessage, setToast]);
};
