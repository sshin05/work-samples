import { screen, render } from '@@/test-utils';
import { EmptyCartView } from './EmptyCartView';

describe('EmptyCartView', () => {
  it('renders', () => {
    render(<EmptyCartView onCloseButtonClick={jest.fn()} />);

    expect(screen.getByText('Cart is empty.')).toBeInTheDocument();
  });
});
