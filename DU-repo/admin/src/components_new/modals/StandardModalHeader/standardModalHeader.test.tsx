import { renderV3, screen, fireEvent } from '@@/test-utils';
import { StandardModalHeader } from './StandardModalHeader';

describe('StandardModalHeader', () => {
  const title = 'Test Title';
  const onClose = jest.fn();

  it('renders the title', () => {
    renderV3(<StandardModalHeader title={title} onClose={onClose} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    renderV3(<StandardModalHeader title={title} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('modalCloseButton'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
