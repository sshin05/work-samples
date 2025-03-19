import { screen, render } from '@@/test-utils';
import { ItemDetail } from './ItemDetail';

describe('ItemDetail', () => {
  const defaultProps = () => ({
    displayTitle: 'Mock Title',
    displayValue: 'Mock Value'
  });
  it('renders', () => {
    const props = defaultProps();
    render(<ItemDetail {...props} />);

    expect(screen.getByText(props.displayTitle)).toBeInTheDocument();
    expect(screen.getByText(props.displayValue)).toBeInTheDocument();
  });
});
