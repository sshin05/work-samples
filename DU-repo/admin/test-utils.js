import { MockedProvider } from '@apollo/client/testing';
import { matchers } from '@emotion/jest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeUIProvider } from 'theme-ui';
import theme from './src/theme';
import { AppRouterContextProviderMock } from './__tests__/__mocks__/appRouterProviderMock';
import { NotificationCenter } from '@cerberus/react';

expect.extend(matchers);

const Providers = ({ children }) => {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>;
};

const ProvidersV3 = ({ children }) => {
  return (
    <AppRouterContextProviderMock>
      <ThemeUIProvider theme={theme}>
        <NotificationCenter>{children}</NotificationCenter>
      </ThemeUIProvider>
    </AppRouterContextProviderMock>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

const customRenderV3 = (ui, options = {}) =>
  render(ui, { wrapper: ProvidersV3, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { customRenderV3 as renderV3 };
export { userEvent, MockedProvider };

export const useModuleMock = (moduleName, property) => {
  const mock = jest.fn();
  const module = require(`./${moduleName}`);
  module[property] = mock;
  return mock;
};

/**
 * Some of our custom api hooks have useState or useMemo hooks inside of them
 * this is a helper function to safely get the contents of those hooks without the error
 * `Error: Hooks can only be called inside of the body of a function component.`
 *
 * @param {*} hookFunction
 * @returns contents of hookFunction
 */
export const safelyGetHookContents = hookFunction => {
  let returnObject;
  const DummyComponent = () => {
    returnObject = {
      ...hookFunction()
    };
    return null;
  };

  render(<DummyComponent />);

  return returnObject;
};

// there is a library that needs this in order to render without errors.
export const setupResizeObserver = () => {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
};
