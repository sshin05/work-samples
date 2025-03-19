import { useRouter, useSearchParams } from 'next/navigation';
import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import {
  useFindMissionPartnerMinDetails,
  useFindLearnersBySearch,
  useExportLearners,
  useExportTrainingPlanTranscriptsForMissionPartner,
  useExportTrainingPlanCoursesForMissionPartner,
  useCreateExportsByTypeAndMissionPartnerId,
  useExportIndividualLearnerActivity
} from '@/api/mission-partner';
import { useRemoveMissionPartnerMemberships } from '@/api/user';
import { useRemoveUsersFromMissionPartner } from '@/api/users';
import MpLearnersTableContent from './MpLearnersTableContent';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

jest.mock('@/api/mission-partner');
jest.mock('@/api/user');
jest.mock('@/api/users');
jest.mock('@/api/user/useFindUsersBySearchTextLazy');

const mockNotify = jest.fn();
const mockHandleShowModal = jest.fn();
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
  Modal: ({ children }) => <div>{children}</div>,
  Tabs: ({ children }) => <div>{children}</div>,
  TabsList: ({ children }) => <div>{children}</div>,
  Tab: ({ children }) => <div>{children}</div>,
  TabPanel: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ value = '', onChange }) => (
    <input value={value} onChange={onChange} />
  ),
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Table: ({ children }) => <table>{children}</table>,
  Tag: ({ children }) => <div>{children}</div>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>,
  ConfirmModal: ({ children }) => <div>{children}</div>,
  Menu: ({ children }) => <div>{children}</div>,
  MenuItem: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  MenuTrigger: ({ children }) => <div>{children}</div>,
  MenuContent: ({ children }) => <div>{children}</div>,
  MenuSeparator: ({ children }) => <div>{children}</div>
}));

jest.mock('@cerberus/icons', () => ({
  Add: () => <div>OverflowMenuVertical</div>,
  Edit: () => <div>Edit</div>,
  Download: () => <div>Download</div>,
  ArrowsVertical: () => <div>ArrowsVertical</div>,
  SortAscending: () => <div>SortAscending</div>,
  SortDescending: () => <div>SortDescending</div>,
  OverflowMenuVertical: () => <div>OverflowMenuVertical</div>,
  TrashCan: () => <div>TrashCan</div>
}));

jest.mock('@/components_new/form/Checkbox/Checkbox', () => {
  const Checkbox = ({ onChange, checked, defaultChecked }) => (
    <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
      defaultChecked={defaultChecked}
    />
  );
  Checkbox.displayName = 'Checkbox';
  return Checkbox;
});

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

jest.mock('@/components_new/table/customColumns/createCheckboxColumn', () => ({
  createCheckboxColumn: ({
    isChanged,
    accessorKey = 'checkbox',
    idType = 'id'
  }) => ({
    header: '',
    id: accessorKey,
    accessorKey,
    enableSorting: false,
    cell: ({ row }) => {
      const isChecked = row.original[idType];
      const checkboxId = `checkbox-${row.index}`;
      return (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => isChanged(row.original[idType])}
          id={checkboxId}
          value={null}
        />
      );
    }
  })
}));

jest.mock('./AddUsersToMissionPartner', () => ({
  AddUsersToMissionPartner: () => {
    return <div data-testid="addMemberMock">New Learners Mock Modal</div>;
  }
}));

jest.mock('./components/RemoveUsersFromMissionPartnerModal', () => ({
  RemoveUsersFromMissionPartnerModal: ({ onClose }) => (
    <div>
      remove users screen
      <button type="button" onClick={onClose}>
        Remove
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </div>
  )
}));

const removeMissionPartnerMembershipsMock = jest.fn(() =>
  Promise.resolve({
    data: {
      removeMissionPartnerMemberships: {
        removedUserIds: ['1'],
        invalidUserIds: ['2'],
        notInMPUserIds: []
      }
    }
  })
);

describe('Mission Partner Learners', () => {
  const missionPartnerMinDetails = {
    affiliateId: '1',
    id: 'MP1',
    logoUrl: null,
    name: 'some name',
    customTrainingEnabled: false,
    accessCode: null,
    description: null
  };

  const learners = [
    {
      id: '1',
      firstName: 'Arthur',
      lastName: 'Dent',
      email: 'dent@towels.com',
      createdAt: '2022-01-06T17:57:47.022Z',
      lastLoginAt: '2022-01-06T17:57:47.022Z',
      userType: 'Test Type'
    },
    {
      id: '2',
      firstName: 'Ford',
      lastName: 'Perfect',
      email: 'ford@hitchhikers.com',
      createdAt: '2023-02-06T17:57:47.022Z',
      userType: 'Test Type'
    }
  ];
  const mockBulkUpload = jest.fn();
  const mockPush = jest.fn();
  const mockGet = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      query: { missionPartnerId: 'MP1' }
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet
    });

    (useRemoveMissionPartnerMemberships as jest.Mock).mockReturnValue({
      removeMissionPartnerMemberships: jest.fn()
    });

    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetails,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetailsLoading: false
    });

    (useFindLearnersBySearch as jest.Mock).mockReturnValue({
      learners,
      learnersError: null,
      learnersLoading: false,
      refetchLearners: jest.fn(),
      total: 2
    });

    (useExportLearners as jest.Mock).mockReturnValue({
      exportLearners: jest.fn(),
      exportLearnersLoading: false,
      exportLearnersError: null,
      exportLearnersData: true
    });

    (
      useExportTrainingPlanTranscriptsForMissionPartner as jest.Mock
    ).mockReturnValue({
      exportTrainingPlanTranscriptsForMissionPartner: jest.fn(),
      exportTrainingPlanTranscriptsForMissionPartnerLoading: false,
      exportTrainingPlanTranscriptsForMissionPartnerError: null,
      exportTrainingPlanTranscriptsForMissionPartnerData: true
    });

    (
      useExportTrainingPlanCoursesForMissionPartner as jest.Mock
    ).mockReturnValue({
      exportTrainingPlanCoursesForMissionPartner: jest.fn(),
      exportTrainingPlanCoursesForMissionPartnerLoading: false,
      exportTrainingPlanCoursesForMissionPartnerError: null,
      exportTrainingPlanCoursesForMissionPartnerData: true
    });

    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearch: [],
      usersBySearchLoading: false,
      usersBySearchError: null,
      isMore: false,
      fetchUsersBySearch: jest.fn()
    });

    (useRemoveUsersFromMissionPartner as jest.Mock).mockReturnValue({
      removeUsersFromMissionPartner: mockBulkUpload,
      removeUsersFromMissionPartnerLoading: false,
      removeUsersFromMissionPartnerError: null,
      removeUsersFromMissionPartnerData: null
    });

    (useCreateExportsByTypeAndMissionPartnerId as jest.Mock).mockReturnValue({
      createExportByTypeAndMissionPartnerId: jest.fn(),
      createExportByTypeAndMissionPartnerIdLoading: false,
      createExportByTypeAndMissionPartnerIdError: null,
      createExportByTypeAndMissionPartnerIdData: true
    });

    (useExportIndividualLearnerActivity as jest.Mock).mockReturnValue({
      exportIndividualLearnerActivity: jest.fn(),
      exportIndividualLearnerActivityLoading: false,
      exportIndividualLearnerActivityError: null,
      exportIndividualLearnerActivityData: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render mission partner learners table with a learner', () => {
    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );
    expect(screen.getByText(learners[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(learners[0].lastName)).toBeInTheDocument();
    expect(screen.getByText(learners[0].email)).toBeInTheDocument();
    expect(screen.queryAllByText(learners[0].userType).length).toBeGreaterThan(
      0
    );
    expect(
      screen.getByText(abbreviatedDayDate(learners[0].lastLoginAt))
    ).toBeInTheDocument();
  });

  it('should render mission partner learners page with 0 learners', () => {
    (useFindLearnersBySearch as jest.Mock).mockReturnValue({
      learners: [],
      learnersError: null,
      learnersLoading: false,
      refetchLearners: jest.fn(),
      total: 0
    });
    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    expect(
      screen.getByText(
        'Once a learner has been added to some name, they will appear here.'
      )
    ).toBeInTheDocument();
  });

  // Add back in when we have table animations
  it.skip('should render mission partner learners table with loading state', () => {
    (useFindLearnersBySearch as jest.Mock).mockReturnValue({
      learners: [],
      learnersError: null,
      learnersLoading: true,
      refetchLearners: jest.fn(),
      total: 0
    });

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    expect(screen.queryByText(/first name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/add learner/i)).not.toBeInTheDocument();
    const loadingElement = document.querySelector('[aria-busy="true"]');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should bring up the edit toolbar', async () => {
    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText(/Remove individual/));
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    fireEvent.click(checkboxes[0]);
    expect(screen.getAllByText('Remove')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cancel')[0]).toBeInTheDocument();
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Cancel')[0]);
  });

  it('should test removing users', async () => {
    (useRemoveMissionPartnerMemberships as jest.Mock).mockReturnValue({
      removeMissionPartnerMembershipsData: {},
      removeMissionPartnerMembershipsError: null,
      removeMissionPartnerMembershipsLoading: false,
      removeMissionPartnerMemberships: removeMissionPartnerMembershipsMock
    });

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText(/Remove individual/));
    screen.debug(null, Infinity);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    fireEvent.click(checkboxes[0]);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Remove')[0]);
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Success' })
      );
    });
  });

  it('should remove bulk users', () => {
    mockBulkUpload.mockResolvedValue({});

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText(/Bulk remove/));
    expect(screen.getByText('remove users screen')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Remove'));
  });

  it('should test download learners activity report', () => {
    const downloadType = 'MISSION_PARTNER_LEARNER_ACTIVITY_EVENTS';
    const missionPartnerId = 'MP1';

    const mockExportActivity = jest.fn().mockResolvedValue({});

    (useCreateExportsByTypeAndMissionPartnerId as jest.Mock).mockReturnValue({
      createExportByTypeAndMissionPartnerId: mockExportActivity,
      downloadType: downloadType,
      missionPartnerId: missionPartnerId
    });

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Download'));
    const downloadActivityButton = screen.getAllByText(
      'Download learner activity report'
    )[0];
    expect(downloadActivityButton).toBeInTheDocument();
    fireEvent.click(downloadActivityButton);
    expect(mockExportActivity).toHaveBeenCalledWith(
      downloadType,
      missionPartnerId
    );
  });

  it('should test download learners report', () => {
    const missionPartnerId = 'MP1';
    const missionPartnerName = 'some name';

    const mockExportLearners = jest.fn().mockResolvedValue({});

    (useExportLearners as jest.Mock).mockReturnValue({
      missionPartnerId: missionPartnerId,
      missionPartnerName: missionPartnerName,
      exportLearners: mockExportLearners
    });

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Download'));
    const downloadLearnerButton = screen.getByText('Download learner list');
    expect(downloadLearnerButton).toBeInTheDocument();
    fireEvent.click(downloadLearnerButton);
    expect(mockExportLearners).toHaveBeenCalledWith({
      variables: {
        missionPartnerId: missionPartnerId,
        missionPartnerName: missionPartnerName
      }
    });
  });

  it('should test download individual learner activity', () => {
    const missionPartnerId = 'MP1';
    const userId = '1';

    const mockExportIndividualActivity = jest.fn().mockResolvedValue({});

    (useExportIndividualLearnerActivity as jest.Mock).mockReturnValue({
      missionPartnerId: missionPartnerId,
      userId: userId,
      exportIndividualLearnerActivity: mockExportIndividualActivity
    });

    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );
    const actionButton = screen.getAllByText('OverflowMenuVertical')[0];
    fireEvent.click(actionButton);

    const downloadActivityButton = screen.getAllByText(
      'Download learner activity report'
    )[0];
    expect(downloadActivityButton).toBeInTheDocument();
    fireEvent.click(downloadActivityButton);
    expect(mockExportIndividualActivity).toHaveBeenCalled();
  });

  it('should test delete learner modal popup ', () => {
    renderV3(
      <MpLearnersTableContent
        handleShowModal={mockHandleShowModal}
        missionPartnerId={missionPartnerMinDetails.id}
        refetchInitialCount={jest.fn()}
        callLearnerSideDrawer={jest.fn()}
      />
    );

    const actionButton = screen.getAllByText('OverflowMenuVertical')[0];
    fireEvent.click(actionButton);
    const deleteLearnerButton = screen.getAllByText('Delete learner')[0];
    expect(deleteLearnerButton).toBeInTheDocument();
    fireEvent.click(deleteLearnerButton);
    expect(screen.getByText('remove users screen')).toBeInTheDocument();
  });
});
