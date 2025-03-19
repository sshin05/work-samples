import { fireEvent, renderV3, screen } from '@@/test-utils';
import { ImportUsersModal } from './ImportUsersModal';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  ProgressBar: ({ ...props }) => <div {...props}>loading</div>
}));

jest.mock('./components/AddSingleUser', () => ({
  AddSingleUser: () => <div>AddSingleUser</div>
}));

jest.mock('./components/AddMultipleUsers', () => ({
  AddMultipleUsers: () => <div>AddMultipleUsers</div>
}));

describe('ImportUsersModal', () => {
  const onClose = jest.fn();
  const onAddMultipleUsers = jest.fn();
  const onAddSingleUser = jest.fn();

  const props = {
    error: null,
    handleNewUser: true,
    userNotFoundText: undefined,
    onClose,
    onAddMultipleUsers,
    onAddSingleUser,
    loading: false,
    title: 'Add Vorgons'
  };

  describe('renders correctly', () => {
    it('renders the correct elements', () => {
      renderV3(<ImportUsersModal {...props} />);
      const closeButton = screen.getAllByText('Cancel')[0];
      expect(closeButton).toBeInTheDocument();
      const multipleLearnersTab = screen.getByText('Multiple Learners');
      expect(multipleLearnersTab).toBeInTheDocument();
      const singleLearnerTab = screen.getByText('Single Learner');
      expect(singleLearnerTab).toBeInTheDocument();
    });
  });

  describe('state handling', () => {
    it('should handle loading', () => {
      renderV3(<ImportUsersModal {...props} loading />);
      expect(screen.getByText('loading')).toBeInTheDocument();
    });
  });

  describe('Switch Modals', () => {
    it('should change to Multiple Learners when continue button is clicked', () => {
      renderV3(<ImportUsersModal {...props} />);
      const continueButton = screen.getByText('Continue');
      fireEvent.click(continueButton);
      expect(screen.getByText('AddMultipleUsers')).toBeInTheDocument();
    });
  });

  describe('Switch to Single Learner', () => {
    it('should call the AddSingleUser component when Add button is clicked', async () => {
      renderV3(<ImportUsersModal {...props} />);
      const singleLearnerTab = screen.getByText('Single Learner');
      fireEvent.click(singleLearnerTab);

      const AddSingleUser = screen.getByText('AddSingleUser');
      expect(AddSingleUser).toBeInTheDocument();
    });
  });

  describe('Closing Modal', () => {
    it('should close the modal when cancel button is clicked', () => {
      renderV3(<ImportUsersModal {...props} />);
      const singleLearnerTab = screen.getByText('Single Learner');
      fireEvent.click(singleLearnerTab);
      const cancelButton = screen.getAllByText('Cancel')[0];
      fireEvent.click(cancelButton);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
