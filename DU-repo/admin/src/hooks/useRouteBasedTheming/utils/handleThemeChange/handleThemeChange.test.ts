import {
  HTML_COLOR_MODE_ATTRIBUTE,
  HTML_THEME_ATTRIBUTE,
  THEMES
} from '../../useRouteBasedTheming.constants';
import { handleThemeChange } from './handleThemeChange';

describe('handleThemeChange', () => {
  beforeAll(() => {
    jest.spyOn(document.documentElement, 'setAttribute');
  });

  afterAll(() => {
    (document.documentElement.setAttribute as jest.Mock).mockRestore();
  });

  it('sets the expected attributes on the document', () => {
    const theme = THEMES.ACHERON;

    handleThemeChange(theme);

    expect(document.documentElement.setAttribute).toHaveBeenCalledTimes(2);
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      HTML_THEME_ATTRIBUTE,
      theme.pandaTheme
    );
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      HTML_COLOR_MODE_ATTRIBUTE,
      theme.colorMode
    );
  });
});
