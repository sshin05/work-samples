import { renderHook, waitFor } from '@@/test-utils';
import { useStandardModal } from './useStandardModal';
import { useModal } from '@cerberus/react';

jest.mock('@cerberus/react');

describe('useStandardModal', () => {
  const showMock = jest.fn();
  const closeMock = jest.fn();

  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue({
      show: showMock,
      close: closeMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with isOpen as false', async () => {
    const { result } = renderHook(() => useStandardModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('should set isOpen to true and call useModalResponse.show when show is called', async () => {
    const { result } = renderHook(() => useStandardModal());

    await waitFor(() => {
      result.current.show();
    });

    expect(result.current.isOpen).toBe(true);
    expect(showMock).toHaveBeenCalled();
  });

  it('should set isOpen to false and call useModalResponse.close when close is called', async () => {
    const { result } = renderHook(() => useStandardModal());

    await waitFor(() => {
      result.current.show();
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    expect(closeMock).toHaveBeenCalled();
  });

  it('should call useModalResponse.show when isOpen is true', async () => {
    const { result } = renderHook(() => useStandardModal());

    result.current.show();

    await waitFor(() => {
      expect(showMock).toHaveBeenCalled();
    });
  });

  it('should call useModalResponse.close when isOpen is false', async () => {
    const { result } = renderHook(() => useStandardModal());

    await waitFor(() => {
      result.current.show();
      result.current.close();
    });

    expect(closeMock).toHaveBeenCalled();
  });
});
