import {
  THEME_ACHERON_ROUTES,
  THEMES
} from '../../useRouteBasedTheming.constants';
import type { PandaThemeParams } from '../../useRouteBasedTheming.types';
import { handleThemeChange } from '../handleThemeChange/handleThemeChange';

const doesRoutePartialMatch = (
  pathname: string,
  routePartial: string
): boolean => {
  const regex = new RegExp(routePartial, 'i');
  return regex.test(pathname);
};

export const handlePathnameChange = (
  pathname: string,
  activeTheme: PandaThemeParams,
  setActiveTheme: (theme: PandaThemeParams) => void
): void => {
  const shouldApplyAcheronTheme = THEME_ACHERON_ROUTES.some(routePartial =>
    doesRoutePartialMatch(pathname, routePartial)
  );

  let nextTheme = { ...activeTheme };

  if (shouldApplyAcheronTheme) {
    nextTheme = THEMES.ACHERON;
  } else {
    nextTheme = THEMES.CERBERUS;
  }

  const didThemeChange = nextTheme?.pandaTheme !== activeTheme?.pandaTheme;

  if (didThemeChange) {
    setActiveTheme(nextTheme);
    handleThemeChange(nextTheme);
  }
};
