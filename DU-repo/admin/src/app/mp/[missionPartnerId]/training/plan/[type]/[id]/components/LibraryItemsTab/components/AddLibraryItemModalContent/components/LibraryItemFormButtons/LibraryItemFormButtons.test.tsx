import { renderV3, screen, fireEvent } from '@@/test-utils';
import { LibraryItemFormButtons } from './LibraryItemFormButtons';

jest.mock('@cerberus/react', () => ({
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

describe('LibraryItemFormButtons test', () => {
  const mockCloseModal = jest.fn();
  it('renders correctly', () => {
    renderV3(
      <LibraryItemFormButtons
        activeUploadTab={0}
        isSubmitting={false}
        loading={false}
        setActiveUploadTab={jest.fn()}
        addFileButtonDisabled={true}
        addLinkButtonDisabled={true}
        setValue={jest.fn()}
        close={mockCloseModal}
      />
    );

    expect(screen.getByText('Add a file')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('closes the modal', () => {
    renderV3(
      <LibraryItemFormButtons
        activeUploadTab={0}
        isSubmitting={false}
        loading={false}
        setActiveUploadTab={jest.fn()}
        addFileButtonDisabled={true}
        addLinkButtonDisabled={true}
        setValue={jest.fn()}
        close={mockCloseModal}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should handle Add a file button onClick', () => {
    const setValueMock = jest.fn();
    renderV3(
      <LibraryItemFormButtons
        activeUploadTab={0}
        isSubmitting={false}
        loading={false}
        setActiveUploadTab={jest.fn()}
        addFileButtonDisabled={false}
        addLinkButtonDisabled={false}
        setValue={setValueMock}
        close={mockCloseModal}
      />
    );
    fireEvent.click(screen.getByText('Add a file'));
    expect(setValueMock).toHaveBeenCalled();
  });

  it('should handle Add a link button onClick', () => {
    const setValueMock = jest.fn();
    renderV3(
      <LibraryItemFormButtons
        activeUploadTab={1}
        isSubmitting={false}
        loading={false}
        setActiveUploadTab={jest.fn()}
        addFileButtonDisabled={false}
        addLinkButtonDisabled={false}
        setValue={setValueMock}
        close={mockCloseModal}
      />
    );
    fireEvent.click(screen.getByText('Add a link'));
    expect(setValueMock).toHaveBeenCalled();
  });
});
