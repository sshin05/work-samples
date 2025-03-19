import { usePathname } from 'next/navigation';
import { INELIGIBLE_ROUTES_PARAMS } from './useGetSidebarEligibility.constants';

const isPathnameIneligible = (
  pathname: string,
  routePartial: string
): boolean => {
  const regex = new RegExp(routePartial, 'i');
  return regex.test(pathname);
};

/**
 *
 * Used to conditionally render the layout.tsx's sidebar
 *
 * @returns `{ shouldHideSidebar: boolean }`
 */
export const useGetSidebarEligibility = (): {
  shouldHideSidebar: boolean;
} => {
  const pathname = usePathname();

  const hasPartialIneligibleRouteMatch = INELIGIBLE_ROUTES_PARAMS.some(
    routePartial => isPathnameIneligible(pathname, routePartial)
  );

  if (hasPartialIneligibleRouteMatch) {
    return {
      shouldHideSidebar: true
    };
  }

  return {
    shouldHideSidebar: false
  };
};
