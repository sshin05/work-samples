import { useModal } from '@cerberus/react';
import { useCallback, useEffect, useState } from 'react';

/**
 * @deprecated use Cerberus useModal() instead
 */
export const useStandardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const useModalResponse = useModal();

  const show = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(
    () => {
      if (isOpen) {
        useModalResponse.show();
      } else {
        useModalResponse.close();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- useModalResponse is a new object every time, so it is better to have the memoized show/close as the dependencies
    [isOpen, useModalResponse.show, useModalResponse.close]
  );

  return {
    ...useModalResponse,
    isOpen,
    show,
    close
  };
};
