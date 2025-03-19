import type { PandaThemeParams } from './useRouteBasedTheming.types';

export const MARKETPLACE_ROUTES = [
  '/manage-marketplace-vendors',
  '/manage-marketplace-orders',
  '/marketplace'
];

export const THEME_ACHERON_ROUTES = [...MARKETPLACE_ROUTES];

export const THEMES: Record<'ACHERON' | 'CERBERUS', PandaThemeParams> = {
  ACHERON: {
    pandaTheme: 'acheron',
    colorMode: 'dark'
  },
  CERBERUS: {
    pandaTheme: 'cerberus',
    colorMode: 'light'
  }
};

export const HTML_THEME_ATTRIBUTE = 'data-panda-theme';
export const HTML_COLOR_MODE_ATTRIBUTE = 'data-color-mode';
