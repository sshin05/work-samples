import { renderHook, act } from '@@/test-utils';
import useToggle from './useToggle';

describe('useToggle hook', () => {
  it('should initialize with the given checked state', () => {
    const initialChecked = true;
    const onChange = jest.fn();

    const { result } = renderHook(() =>
      useToggle({ checked: initialChecked, onChange })
    );

    expect(result.current.checked).toBe(initialChecked);
  });

  it('should update checked state and call onChange when handleChange is called', () => {
    const initialChecked = false;
    const onChange = jest.fn();

    const { result } = renderHook(() =>
      useToggle({ checked: initialChecked, onChange })
    );

    act(() => {
      result.current.handleChange({ target: { checked: true } });
    });

    expect(result.current.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith({ target: { checked: true } });
  });
});
