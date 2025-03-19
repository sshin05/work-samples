import { CreateCollectionModal } from './CreateCollectionModal';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  ModalDescription: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ onClick, label, ...props }) => (
    <div onClick={onClick}>
      <label>{label}</label>
      <input {...props} />
    </div>
  ),
  TextArea: ({ label, ...props }) => (
    <div>
      <label>{label}</label>
      <textarea {...props} />
    </div>
  )
}));

describe('CreateCollectionModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  it('should render modal with proper children', () => {
    renderV3(
      <CreateCollectionModal
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        missionPartnerId="123"
      />
    );

    expect(screen.getByText('Create collection')).toBeInTheDocument();
  });

  it('Delete modal', () => {
    renderV3(
      <CreateCollectionModal
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        missionPartnerId="123"
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('Should create a new collection with name and description', async () => {
    renderV3(
      <CreateCollectionModal
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        missionPartnerId="123"
      />
    );

    const collectionNameInput = screen.getByText('Collection name');

    expect(collectionNameInput).toBeInTheDocument();
    const nameInput = screen.getAllByRole('textbox');

    await waitFor(() => {
      fireEvent.change(nameInput[0], {
        target: { value: 'collection title' }
      });
      expect(nameInput[0]).toHaveValue('collection title');

      fireEvent.change(nameInput[1], {
        target: { value: 'collection description' }
      });
      expect(nameInput[1]).toHaveValue('collection description');

      fireEvent.click(screen.getByText('Create collection'));

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
