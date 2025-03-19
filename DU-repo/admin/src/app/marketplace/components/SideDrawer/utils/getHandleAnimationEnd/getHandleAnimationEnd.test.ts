import { getHandleAnimationEnd } from './getHandleAnimationEnd';

describe('getHandleAnimationEnd', () => {
  it('calls onExited if isOpen is false', () => {
    const isOpen = false;
    const onExited = jest.fn();
    const handleAnimationEnd = getHandleAnimationEnd(isOpen, onExited);

    handleAnimationEnd();

    expect(onExited).toHaveBeenCalledTimes(1);
  });

  it('does not call onExited when isOpen is true', () => {
    const isOpen = true;
    const onExited = jest.fn();
    const handleAnimationEnd = getHandleAnimationEnd(isOpen, onExited);

    handleAnimationEnd();

    expect(onExited).toHaveBeenCalledTimes(0);
  });
});
