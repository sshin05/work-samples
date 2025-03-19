import { act, renderHook, safelyGetHookContents } from '@@/test-utils';
import { useDebounce } from '@/utils/use-debounce/useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();
  const initialProps = { value: 'initial', delay: 500 };
  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should update the debounced value after the specified delay', () => {
    const callback = jest.fn();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay, callback),
      { initialProps: initialProps }
    );

    rerender({ value: 'updated', delay: 500 });

    expect(result.current).toBe('initial');

    // Simulate time passage
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should call the callback function with the new value after the specified delay', () => {
    const callback = jest.fn();

    safelyGetHookContents(() =>
      useDebounce(initialProps.value, initialProps.delay, callback)
    );
    expect(callback).not.toHaveBeenCalled();

    const updatedProps = { value: 'updated', delay: 500 };
    safelyGetHookContents(() =>
      useDebounce(updatedProps.value, updatedProps.delay, callback)
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledWith('updated');
  });
});
