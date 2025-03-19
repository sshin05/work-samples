import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { PandaThemeParams } from './useRouteBasedTheming.types';
import { handlePathnameChange } from './utils/handlePathnameChange/handlePathnameChange';

/**
 * Updates the <html> elements `data-panda-theme` and `data-color-mode` values during client-side navigation.
 *
 * This must be used in conjunction with the middleware to avoid flashes of unexpected theming during route transitions.
 */
export const useRouteBasedTheming = () => {
  const pathname = usePathname();

  const [activeTheme, setActiveTheme] = useState<PandaThemeParams>();

  useEffect(() => {
    handlePathnameChange(pathname, activeTheme, setActiveTheme);
  }, [pathname]);

  return {
    theme: activeTheme?.pandaTheme
  };
};
