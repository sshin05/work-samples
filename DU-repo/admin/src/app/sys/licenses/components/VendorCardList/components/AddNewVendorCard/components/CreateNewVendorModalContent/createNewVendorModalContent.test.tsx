import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { CreateNewVendorModalContent } from '.';

jest.mock('@/components_new/form', () => ({
  TextInput: ({ label, ...rest }) => (
    <label>
      {label}
      <input {...rest} />
    </label>
  )
}));

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('CreateNewVendorModal', () => {
  const mockOnSubmit = jest.fn(async () => Promise.resolve());
  const mockOnClose = jest.fn();

  it('should render', () => {
    renderV3(
      <CreateNewVendorModalContent
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('New Vendor')).toBeInTheDocument();
  });

  it('should submit the modal', async () => {
    renderV3(
      <CreateNewVendorModalContent
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    );

    const vendorNameInput = screen.getByLabelText('Vendor Name');
    userEvent.paste(vendorNameInput, 'test vendor');
    userEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
