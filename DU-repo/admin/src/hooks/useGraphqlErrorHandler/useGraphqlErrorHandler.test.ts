import React from 'react';
import { renderHook } from '@@/test-utils';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler/useGraphqlErrorHandler';

describe('useGraphqlErrorHandler', () => {
  let error: Error | null;
  let customMessage: string | undefined;
  let setToastMock: jest.Mock;
  const extractErrorMessageMock = (error: Error) =>
    error.message || 'An unexpected error occurred';

  beforeEach(() => {
    error = null;
    customMessage = undefined;
    setToastMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((f: () => void) => f());
    jest.spyOn(React, 'useCallback').mockReturnValue(setToastMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not set toast when error is null', () => {
    renderHook(() => useGraphqlErrorHandler(error, customMessage));
    expect(setToastMock).not.toHaveBeenCalled();
  });

  it('should set toast with custom message when provided', () => {
    error = new Error('Custom error message');
    customMessage = 'Custom toast message';
    renderHook(() => useGraphqlErrorHandler(error, customMessage));
    expect(extractErrorMessageMock(error)).toBe('Custom error message');
  });
});
