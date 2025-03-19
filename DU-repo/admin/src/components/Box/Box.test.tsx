import { render, screen } from '@@/test-utils';
import { Box } from '.';

describe('box', () => {
  it('should render a empty box', () => {
    render(<Box data-testid="emptybox" />);

    expect(screen.getByTestId('emptybox')).toBeInTheDocument();
  });
  it('should render a empty box that starts at column 2 and ends at column 5', () => {
    render(<Box start={2} end={5} data-testid="emptybox" />);

    expect(screen.getByTestId('emptybox')).toHaveStyleRule(
      'grid-column-start',
      '2'
    );
    expect(screen.getByTestId('emptybox')).toHaveStyleRule(
      'grid-column-end',
      '5'
    );
  });

  it('should render a empty box that starts at column 5 and spans 11', () => {
    render(<Box start={5} span={11} data-testid="emptybox" />);

    expect(screen.getByTestId('emptybox')).toHaveStyleRule(
      'grid-column-start',
      '5'
    );
    expect(screen.getByTestId('emptybox')).toHaveStyleRule(
      'grid-column-end',
      'span 11'
    );
  });
});
