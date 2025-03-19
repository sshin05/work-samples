import { useSession } from 'next-auth/react';
import { renderV3, screen, fireEvent } from '@@/test-utils';
import {
  useFindGroupsByMissionPartnerId,
  useCreateGroup,
  useUpdateGroup,
  useDeleteGroup
} from '@/api/groups';
import CohortsTab from './CohortsTab';

jest.mock('next-auth/react');
jest.mock('@/api/groups');
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
    notify: jest.fn()
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
  Input: ({ children, ...props }) => <input {...props}>{children}</input>,
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  FieldMessage: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Th: ({ children, ...props }) => <th {...props}>{children}</th>,
  Td: ({ children, ...props }) => <td {...props}>{children}</td>,
  Tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
  Table: ({ children, ...props }) => <table {...props}>{children}</table>,
  Thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
  Tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Menu: ({ children }) => <div>{children}</div>,
  MenuTrigger: ({ children }) => <div>{children}</div>,
  MenuContent: ({ children }) => <div>{children}</div>,
  MenuItem: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  MenuSeparator: () => <div>MenuSeparator</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

jest.mock('../AssignCohortMissionPartnerModal', () => ({
  AssignCohortMissionPartnerModal: () => (
    <div>AssignCohortMissionPartnerModal</div>
  )
}));

jest.mock('../ChangeCohortNameModal', () => ({
  ChangeCohortNameModal: () => <div>ChangeCohortNameModal</div>
}));

jest.mock('@/components_new/modals/StandardModalHeader', () => ({
  StandardModalHeader: ({ onClose, title }) => (
    <div>
      {title}
      <button onClick={onClose}>handleOnClose</button>
    </div>
  )
}));

jest.mock('@/components_new/table/components/Footer', () => {
  const Footer = () => <div>Mock Footer</div>;
  return { Footer };
});

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

beforeAll(() => {
  (useSession as jest.Mock).mockReturnValue({ data: mockSession });

  (useCreateGroup as jest.Mock).mockReturnValue({
    createGroup: jest.fn()
  });
  (useUpdateGroup as jest.Mock).mockReturnValue({
    updateGroup: jest.fn()
  });
  (useDeleteGroup as jest.Mock).mockReturnValue({
    deleteGroup: jest.fn()
  });
});

const missionPartner = {
  id: '1234'
};

const groups = [
  {
    id: '1',
    name: 'Answer to life, the universe, and everything',
    groupMemberCount: 42,
    missionPartner: {
      id: '1234',
      name: 'Where is my towel?'
    }
  }
];

describe('<CohortsTab />', () => {
  beforeEach(() => {
    (useFindGroupsByMissionPartnerId as jest.Mock).mockReturnValue({
      groupsByMissionPartnerId: groups,
      groupsByMissionPartnerIdLoading: false,
      refetchGroupsByMissionPartnerId: jest.fn()
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render', () => {
      renderV3(<CohortsTab missionPartnerId={missionPartner.id} />);
      const [cohortName, groupMemberCount] =
        screen.getAllByRole('columnheader');
      expect(cohortName).toHaveTextContent('Name');
      expect(groupMemberCount).toHaveTextContent('Number of learners');

      const rows = screen.getAllByRole('row');
      const group1 = rows[2];
      expect(group1).toHaveTextContent(
        'Answer to life, the universe, and everything42'
      );
      const EllipsisButton = screen.getByLabelText('cohort row action button');
      expect(EllipsisButton).toBeInTheDocument();
    });

    it('should render menu when Elipsis button clicked', () => {
      renderV3(<CohortsTab missionPartnerId={missionPartner.id} />);
      const EllipsisButton = screen.getAllByLabelText(
        'cohort row action button'
      )[0];

      fireEvent.click(EllipsisButton);
      expect(screen.getByText('Rename Cohort')).toBeInTheDocument();
      expect(screen.getByText('Update Mission Partner')).toBeInTheDocument();
      expect(screen.getByText('Delete Cohort')).toBeInTheDocument();
    });
  });

  describe('modal interactions', () => {
    it('should show Add Cohort Modal', () => {
      renderV3(
        <div id="app-root">
          <CohortsTab missionPartnerId={missionPartner.id} />
        </div>
      );

      const AddCohortButton = screen.getByText('Cohort');
      fireEvent.click(AddCohortButton);

      const addModal = screen.getByText('Create new cohort');
      expect(addModal).toBeInTheDocument();
    });

    it('should render Rename Cohort modal', () => {
      renderV3(
        <div id="app-root">
          <CohortsTab missionPartnerId={missionPartner.id} />
        </div>
      );

      const EllipsisButton = screen.getAllByLabelText(
        'cohort row action button'
      )[0];
      fireEvent.click(EllipsisButton);

      const renameCohort = screen.getByText('Rename Cohort');
      expect(renameCohort).toBeInTheDocument();
      fireEvent.click(renameCohort);

      const updateModal = screen.getByText('ChangeCohortNameModal');
      fireEvent.click(updateModal);
    });

    it.skip('should show Delete Cohort Modal', () => {
      renderV3(
        <div id="app-root">
          <CohortsTab missionPartnerId={missionPartner.id} />
        </div>
      );

      const EllipsisButton = screen.getAllByLabelText(
        'cohort row action button'
      )[0];
      fireEvent.click(EllipsisButton);

      const deleteCohort = screen.getByText('Delete Cohort');
      fireEvent.click(deleteCohort);

      const deleteModal = screen.getByText('DeleteGroupModal');
      expect(deleteModal).toBeInTheDocument();

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
    });

    it('should show Update Mission Partner Modal', () => {
      renderV3(
        <div id="app-root">
          <CohortsTab missionPartnerId={missionPartner.id} />
        </div>
      );

      const EllipsisButton = screen.getByLabelText('cohort row action button');
      fireEvent.click(EllipsisButton);

      const updateMp = screen.getByText('Update Mission Partner');
      fireEvent.click(updateMp);

      const updateModal = screen.getByText('AssignCohortMissionPartnerModal');
      expect(updateModal).toBeInTheDocument();
    });
  });
});
