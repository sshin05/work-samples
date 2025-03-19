import { renderV3, userEvent, screen, waitFor } from '@@/test-utils';
import { RemoveUsersFromMissionPartnerModal } from './RemoveUsersFromMissionPartnerModal';

jest.mock(
  '@/components_new/modals/ImportUsersModal/components/AddMultipleUsers',
  () => {
    return {
      AddMultipleUsers: ({ onAddMultipleUsers, handleOnClose }) => (
        <div>
          upload screen{' '}
          <button type="button" onClick={onAddMultipleUsers}>
            click me
          </button>
          <button type="button" onClick={handleOnClose}>
            Cancel
          </button>
        </div>
      )
    };
  }
);

describe('<RemoveUsersFromMissionPartnerModal>', () => {
  const mockOnClose = jest.fn();
  const mockOnUpload = jest.fn();

  it('should render', async () => {
    renderV3(
      <div id="app-root">
        <RemoveUsersFromMissionPartnerModal
          removeBulkUsersModal={{
            modalRef: { current: null },
            show: jest.fn(),
            close: jest.fn(),
            isOpen: true
          }}
          onClose={mockOnClose}
          onUpload={mockOnUpload}
        />
      </div>
    );

    expect(screen.getByText('Remove multiple learners')).toBeInTheDocument();
    expect(
      screen.getByText(/Use a .csv template to remove up to/)
    ).toBeInTheDocument();

    userEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('upload screen')).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('click me'));
    expect(mockOnUpload).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
