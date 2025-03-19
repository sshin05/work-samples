import { render, screen } from '@@/test-utils';
import { ClickableTile } from './ClickableTile';

describe('clickable-tile', () => {
  it('should render a clickable tile with a nextLink', () => {
    render(
      // eslint-disable-next-line sonarjs/no-clear-text-protocols
      <ClickableTile href="http://www.altavista.com">
        Hello World!
      </ClickableTile>
    );

    const element = screen.getByRole('link', { name: 'Hello World!' });
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    expect(element).toHaveAttribute('href', 'http://www.altavista.com');
  });
});
