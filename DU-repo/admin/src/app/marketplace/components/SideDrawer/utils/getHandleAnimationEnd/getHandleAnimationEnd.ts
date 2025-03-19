export const getHandleAnimationEnd = (
  isOpen: boolean,
  onExited: () => void
): (() => void) => {
  return () => {
    if (!isOpen) {
      onExited();
    }
  };
};
