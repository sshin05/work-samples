import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { AddModuleModalContent } from './AddModuleModalContent';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ children, ...props }) => <input {...props}>{children}</input>,
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  Field: ({ children }) => <div>{children}</div>,
  FieldMessage: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/StandardModalHeader', () => ({
  StandardModalHeader: ({ title, onClose }) => (
    <div>
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}));

describe('AddModuleModalContent', () => {
  const mockClose = jest.fn();
  const mockHandleClickCreateModule = jest.fn();

  it('renders correctly', () => {
    renderV3(
      <AddModuleModalContent
        close={mockClose}
        handleClickCreateModule={mockHandleClickCreateModule}
      />
    );
    expect(screen.getByText('Add module')).toBeInTheDocument();
    expect(screen.getByLabelText('Module title')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    renderV3(
      <AddModuleModalContent
        close={mockClose}
        handleClickCreateModule={mockHandleClickCreateModule}
      />
    );

    fireEvent.change(screen.getByLabelText('Module title'), {
      target: { value: 'New Module' }
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockHandleClickCreateModule).toHaveBeenCalledWith({
        moduleName: 'New Module'
      });
    });
  });

  it('closes the modal', () => {
    renderV3(
      <AddModuleModalContent
        close={mockClose}
        handleClickCreateModule={mockHandleClickCreateModule}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockClose).toHaveBeenCalled();
  });
});
