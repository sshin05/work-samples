import { DeleteCollectionModal } from './DeleteCollectionModal';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick, ariaLabel }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('@cerberus/icons', () => ({
  TrashCan: () => 'TrashCan'
}));

const mockOnSubmit = jest.fn();

describe('DeleteCollectionModal', () => {
  it('Delete Collection', async () => {
    renderV3(
      <DeleteCollectionModal
        onSubmit={mockOnSubmit}
        missionPartnerId="123"
        collection={{ id: '456', name: 'title' }}
      />
    );

    const deleteBtn = screen.getByText('TrashCan');
    expect(deleteBtn).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(deleteBtn);
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
