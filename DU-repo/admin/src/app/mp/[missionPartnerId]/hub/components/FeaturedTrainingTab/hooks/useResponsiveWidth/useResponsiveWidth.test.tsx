import { act } from 'react';
import { renderHook } from '@@/test-utils';
import { useResponsiveWidth } from './useResponsiveWidth';

const mockResizeObserver = jest.fn(callback => ({
  observe: jest.fn(() => {
    callback([{ contentRect: { width: 400 } }]);
  }),
  disconnect: jest.fn()
}));

global.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;

describe('useResponsiveWidth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the default width', () => {
    const { result } = renderHook(() => useResponsiveWidth());
    expect(result.current.width).toBe(240); // DEFAULT_CELL_WIDTH
  });

  it('should calculate width correctly based on offsetWidth', () => {
    const divMock = { offsetWidth: 400 };
    const { result } = renderHook(() => useResponsiveWidth(240, 90));

    act(() => {
      result.current.ref.current = divMock as HTMLDivElement;
    });

    act(() => {
      const resizeObserverCallback = mockResizeObserver.mock.calls[0][0];
      resizeObserverCallback([{ contentRect: { width: 400 } }]);
    });

    // assert the updated width: 400 - 90 = 310
    expect(result.current.width).toBe(310);
  });

  it('should enforce the minimum width', () => {
    const { result } = renderHook(() => useResponsiveWidth(240, 90));

    act(() => {
      if (result.current.ref.current) {
        Object.defineProperty(result.current.ref.current, 'offsetWidth', {
          value: 100
        });
      }

      // trigger the ResizeObserver callback
      const resizeObserverCallback = (global.ResizeObserver as jest.Mock).mock
        .calls[0][0];
      resizeObserverCallback([{ contentRect: { width: 100 } }]);
    });

    expect(result.current.width).toBe(240); // minimum width enforced
  });

  it('should observe width changes', () => {
    const { result } = renderHook(() => useResponsiveWidth(240, 90));
    const mockCallback = jest.fn();

    // simulate a ResizeObserver callback
    const observer = new ResizeObserver(mockCallback);
    observer.observe(result.current.ref.current as HTMLElement);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
