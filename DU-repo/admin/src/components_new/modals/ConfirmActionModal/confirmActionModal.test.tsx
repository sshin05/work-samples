import { renderV3, fireEvent, screen, waitFor } from '@@/test-utils';
import { ConfirmActionModal } from './ConfirmActionModal';
import { ConfirmModal } from '@cerberus/react';

const mockShow = jest.fn();
jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: mockShow.mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('ConfirmActionModal', () => {
  const mockClose = jest.fn();
  const mockConfirm = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    renderV3(
      <ConfirmModal>
        <ConfirmActionModal
          heading="Test title"
          description="confirm message"
          actionText="Confirm"
          cancelText="Cancel"
          onClose={mockClose}
          handleSubmit={mockConfirm}
          buttonContent="Confirm"
        />
      </ConfirmModal>
    );

    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('calls handleSubmit on confirmation', async () => {
    renderV3(
      <ConfirmModal>
        <ConfirmActionModal
          heading="Test title"
          description="confirm message"
          actionText="Confirm"
          cancelText="Cancel"
          onClose={mockClose}
          handleSubmit={mockConfirm}
          buttonContent="Confirm"
        />
      </ConfirmModal>
    );

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalled();
      expect(mockClose).not.toHaveBeenCalled();
    });
  });

  it('calls onClose when onClose is given and user cancels', async () => {
    mockShow.mockReturnValueOnce(false);

    renderV3(
      <ConfirmModal>
        <ConfirmActionModal
          heading="Test title"
          description="confirm message"
          actionText="Confirm"
          cancelText="Cancel"
          onClose={mockClose}
          handleSubmit={mockConfirm}
          buttonContent="Confirm"
        />
      </ConfirmModal>
    );

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
      expect(mockConfirm).not.toHaveBeenCalled();
    });
  });
});
