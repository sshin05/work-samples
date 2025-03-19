import {
  HTML_COLOR_MODE_ATTRIBUTE,
  HTML_THEME_ATTRIBUTE
} from '../../useRouteBasedTheming.constants';
import type { PandaThemeParams } from '../../useRouteBasedTheming.types';

export const handleThemeChange = async (nextTheme: PandaThemeParams) => {
  document.documentElement.setAttribute(
    HTML_THEME_ATTRIBUTE,
    nextTheme.pandaTheme
  );

  document.documentElement.setAttribute(
    HTML_COLOR_MODE_ATTRIBUTE,
    nextTheme.colorMode
  );
};
