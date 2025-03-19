import { renderV3, screen, waitFor } from '@@/test-utils';
import { AdmonitionTip } from './AdmonitionTip';

const localStorageMock = (function () {
  const store: Record<string, string> = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value;
    },
    removeItem: function (key: string) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AdmonitionTip', () => {
  it('should render', () => {
    renderV3(<AdmonitionTip />);

    expect(screen.getByText('Start with a lesson')).toBeInTheDocument();
    expect(
      screen.getByText('Get started quickly with a lesson.')
    ).toBeInTheDocument();
  });

  it('should dismiss', async () => {
    renderV3(<AdmonitionTip />);

    screen.getByText('Dismiss').click();

    await waitFor(() => {
      expect(screen.queryByText('Start with a lesson')).not.toBeInTheDocument();
    });
  });
});
