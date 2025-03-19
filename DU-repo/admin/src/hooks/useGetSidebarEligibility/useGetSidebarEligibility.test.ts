import { usePathname } from 'next/navigation';
import { renderHook } from '../../../test-utils';
import { useGetSidebarEligibility } from './useGetSidebarEligibility';
import { MARKETPLACE_ROUTES } from '../useRouteBasedTheming/useRouteBasedTheming.constants';

jest.mock('next/navigation');
jest.mock('./useGetSidebarEligibility.constants', () => ({
  ...jest.requireActual('./useGetSidebarEligibility.constants')
}));

describe('useGetSidebarEligibility', () => {
  it.each(
    MARKETPLACE_ROUTES.map(partialRoute => ({
      partialRoute
    }))
  )(
    'sets shouldHideSidebar to true for this ineligible route: $partialRoute',
    ({ partialRoute }) => {
      (usePathname as jest.Mock).mockReturnValue(
        `/leading/route/params/${partialRoute}/trailing/route/params`
      );
      const { result } = renderHook(() => useGetSidebarEligibility());

      expect(result.current).toEqual({ shouldHideSidebar: true });
    }
  );

  it('returns false for routes that are not included in the INELIGIBLE_ROUTES_PARAMS', () => {
    (usePathname as jest.Mock).mockReturnValue(`/VALID/ROUTE/PATH`);
    const { result } = renderHook(() => useGetSidebarEligibility());

    expect(result.current).toEqual({ shouldHideSidebar: false });
  });

  it('check eligibility for specific, dynamic routes containing UUIDs', () => {
    const dynamicRoute =
      '/admin/v3/manage-mission-partners/6c324e81-f49e-4a9a-87d0-2ed3a5f075ac/marketplace/products/a2992355-0386-4802-83e1-dfcfdbf549b8';

    (usePathname as jest.Mock).mockReturnValue(dynamicRoute);

    const uuidMatch = `[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}`;

    jest.mock('./useGetSidebarEligibility.constants', () => ({
      INELIGIBLE_ROUTES_PARAMS: [
        `^/admin/v3/manage-mission-partners/${uuidMatch}/marketplace/products/${uuidMatch}$`
      ]
    }));

    const { result } = renderHook(() => useGetSidebarEligibility());

    expect(result.current).toEqual({ shouldHideSidebar: true });
  });
});
