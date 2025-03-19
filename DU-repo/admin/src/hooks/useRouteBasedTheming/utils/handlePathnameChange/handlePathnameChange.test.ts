import {
  THEME_ACHERON_ROUTES,
  THEMES
} from '../../useRouteBasedTheming.constants';
import { handleThemeChange } from '../handleThemeChange/handleThemeChange';
import { handlePathnameChange } from './handlePathnameChange';

jest.mock('../handleThemeChange/handleThemeChange');

describe('handlePathnameChange', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls the expected theme update handlers when the theme changes', () => {
    const [acheronThemePath] = THEME_ACHERON_ROUTES;
    const activeTheme = THEMES.CERBERUS;
    const setActiveThemeSpy = jest.fn();

    handlePathnameChange(acheronThemePath, activeTheme, setActiveThemeSpy);

    expect(setActiveThemeSpy).toHaveBeenCalledWith(THEMES.ACHERON);
    expect(handleThemeChange).toHaveBeenCalledWith(THEMES.ACHERON);
  });

  it('does not call the theme update handlers if the theme is unchanged', () => {
    const [acheronThemePath] = THEME_ACHERON_ROUTES;
    const activeTheme = THEMES.ACHERON;
    const setActiveThemeSpy = jest.fn();

    handlePathnameChange(acheronThemePath, activeTheme, setActiveThemeSpy);

    expect(setActiveThemeSpy).not.toHaveBeenCalled();
    expect(handleThemeChange).not.toHaveBeenCalled();
  });
});
