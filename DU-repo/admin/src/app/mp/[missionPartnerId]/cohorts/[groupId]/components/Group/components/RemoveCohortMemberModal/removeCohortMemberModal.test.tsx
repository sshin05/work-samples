import { RemoveCohortMemberModal } from './RemoveCohortMemberModal';
import { renderV3, screen, userEvent } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Portal: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/StandardModalHeader', () => ({
  StandardModalHeader: ({ onClose, title }) => (
    <div>
      {title}
      <button onClick={onClose}>handleOnClose</button>
    </div>
  )
}));

describe('remove cohort member modal', () => {
  const onSubmit = jest.fn();
  const mockModalClose = jest.fn();

  const mockModal = {
    modalRef: { current: null },
    show: jest.fn(),
    close: mockModalClose,
    isOpen: true
  };

  it('should render user licenses modal with data', () => {
    renderV3(
      <RemoveCohortMemberModal
        onSubmit={onSubmit}
        groupMembers={['foo']}
        groupId="bar"
        removeCohortMemberModal={mockModal}
      />
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('1 User')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Yes, remove')).toBeInTheDocument();
    expect(screen.getByText('No, keep learner')).toBeInTheDocument();
  });

  it('should render user licenses modal with data for 2 users', () => {
    renderV3(
      <RemoveCohortMemberModal
        onSubmit={onSubmit}
        groupMembers={['foo', 'bar']}
        groupId="bar"
        removeCohortMemberModal={mockModal}
      />
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('2 Users')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Yes, remove')).toBeInTheDocument();
    expect(screen.getByText('No, keep learner')).toBeInTheDocument();
  });

  it('should test submit', () => {
    renderV3(
      <RemoveCohortMemberModal
        onSubmit={onSubmit}
        groupMembers={['foo']}
        groupId="bar"
        removeCohortMemberModal={mockModal}
      />
    );

    userEvent.click(screen.getByText('Yes, remove'));
    expect(onSubmit).toHaveBeenCalledWith('bar', ['foo']);
    expect(mockModalClose).toHaveBeenCalled();
  });

  it('should test close', () => {
    renderV3(
      <RemoveCohortMemberModal
        onSubmit={onSubmit}
        groupMembers={['foo']}
        groupId="bar"
        removeCohortMemberModal={mockModal}
      />
    );
    userEvent.click(screen.getByText('No, keep learner'));
    expect(mockModalClose).toHaveBeenCalled();
  });
});
