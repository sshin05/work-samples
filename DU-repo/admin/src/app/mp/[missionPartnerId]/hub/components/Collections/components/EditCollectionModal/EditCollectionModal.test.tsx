import { EditCollectionModal } from './EditCollectionModal';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children, disabled }) => (
    <fieldset disabled={disabled}>{children}</fieldset>
  ),
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick, ariaLabel }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  Textarea: ({ value, id, ariaLabel, maxLength, autoComplete, onChange }) => (
    <textarea
      value={value}
      id={id}
      aria-label={ariaLabel}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  ),
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  ModalDescription: ({ children }) => <div>{children}</div>,
  Input: ({ onChange, id, name, value }) => (
    <input id={id} name={name} onChange={onChange} value={value} />
  ),
  FieldMessage: ({ children }) => <div>{children}</div>,
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  Portal: ({ children }) => <div>{children}</div>
}));

const mockOnSubmit = jest.fn();

describe('EditCollectionModal', () => {
  it('should render modal with given name and description', () => {
    renderV3(
      <EditCollectionModal
        onSubmit={mockOnSubmit}
        collections={{ name: 'name', description: 'description' }}
        missionPartnerId="123"
      />
    );

    expect(screen.getByText('Save collection')).toBeInTheDocument();
    const collectionNameInput = screen.getByLabelText('Collection name');
    expect(collectionNameInput).toHaveValue('name');
    const collectionDescriptionInput = screen.getByLabelText(
      'Collection description'
    );
    expect(collectionDescriptionInput).toHaveValue('description');
  });

  it('should call onSubmit when submitting form with good values', async () => {
    renderV3(
      <EditCollectionModal
        onSubmit={mockOnSubmit}
        collections={{ name: 'name', description: 'description' }}
        missionPartnerId="123"
      />
    );

    const collectionNameInput = screen.getByText('Collection name');

    expect(collectionNameInput).toBeInTheDocument();
    const nameInput = screen.getAllByRole('textbox');

    fireEvent.change(nameInput[0], {
      target: { value: 'collection title' }
    });
    expect(nameInput[0]).toHaveValue('collection title');

    fireEvent.change(nameInput[1], {
      target: { value: 'collection description' }
    });
    expect(nameInput[1]).toHaveValue('collection description');

    fireEvent.click(screen.getByText('Save collection'));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
