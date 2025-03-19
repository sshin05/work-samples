import { renderHook } from '@testing-library/react';
import { handlePathnameChange } from './utils/handlePathnameChange/handlePathnameChange';
import { useRouteBasedTheming } from './useRouteBasedTheming';

jest.mock('./utils/handlePathnameChange/handlePathnameChange');

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

describe('useRouteBasedTheming', () => {
  it('calls handlePathnameChange when the pathname changes', () => {
    renderHook(() => useRouteBasedTheming());

    expect(handlePathnameChange).toHaveBeenCalledTimes(1);
  });
});
