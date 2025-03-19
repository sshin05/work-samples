import { render, screen, fireEvent } from '@@/test-utils';
import { type ModalFormButtonsProps , ModalFormButtons } from './ModalFormButtons';

describe('ModalFormButtons', () => {
  const defaultProps: ModalFormButtonsProps = {
    onClose: jest.fn(),
    isSubmittingForm: false
  };

  const getSpinner = () => {
    return screen.queryByRole('status');
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<ModalFormButtons {...defaultProps} />);

    const addButton = screen.getByText(/add/i);
    const cancelButton = screen.getByText(/cancel/i);

    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();
    expect(getSpinner()).not.toBeInTheDocument();
  });

  it('does not disable the button by default', () => {
    render(<ModalFormButtons {...defaultProps} />);

    const addButton = screen.getByText(/add/i);

    expect(addButton).toHaveAttribute('type', 'submit');
    expect(addButton).not.toBeDisabled();
  });

  it('disables Add button and shows spinner when isSubmittingForm is true', () => {
    const props = { ...defaultProps, isSubmittingForm: true };
    render(<ModalFormButtons {...props} />);

    const addButton = screen.getByText(/add/i);

    expect(addButton).toBeDisabled();
    expect(getSpinner()).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<ModalFormButtons {...defaultProps} />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
