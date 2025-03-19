import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { ResetImageModal } from './ResetImageModal';

const handleSelectImageMock = jest.fn();
const mockNotify = jest.fn();

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  trapFocus: jest.fn(),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Option: ({ children }) => <option>{children}</option>,
  ConfirmModal: ({ children }) => <div>{children}</div>
}));

describe('AddContentModal', () => {
  it('Should show children and a close button', async () => {
    renderV3(
      <ResetImageModal
        disabled={false}
        handleSelectImage={handleSelectImageMock}
      />
    );
    expect(screen.getByText('Reset to Default Image')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Reset to Default Image'));

    await waitFor(() => {
      expect(handleSelectImageMock).toHaveBeenCalled();
    });
  });
});
