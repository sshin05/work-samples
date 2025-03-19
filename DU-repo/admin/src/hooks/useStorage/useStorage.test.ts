import { renderHook } from '@@/test-utils';
import { useStorage } from '@/hooks/useStorage';

jest.mock('next-auth/react');
let windowSpy: any;

describe('useStorage hooks', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('setItem', () => {
    const { result } = renderHook(() => useStorage());
    const setItem = result.current.setItem;
    setItem('key', 'value');
    expect(setItem('key', 'value')).toBe(true);
  });

  it('removeItem', () => {
    const { result } = renderHook(() => useStorage());
    const removeItem = result.current.removeItem;
    removeItem('key');
    expect(removeItem('key')).toBe(undefined);
  });

  it('should retrieve item from session storage when key exists', () => {
    const { result } = renderHook(() => useStorage());
    const setItem = result.current.setItem;
    const getItem = result.current.getItem;

    setItem('testKey', 'testValue', 'session');
    const value = getItem('testKey', 'session');

    expect(value).toBe('testValue');
  });
  it('should not retrieve item from session storage when window does not exist', () => {
    windowSpy.mockImplementation(() => undefined);
    const result = useStorage();
    expect(result.setItem('testKey', 'testValue')).toBe(false);
  });
});
