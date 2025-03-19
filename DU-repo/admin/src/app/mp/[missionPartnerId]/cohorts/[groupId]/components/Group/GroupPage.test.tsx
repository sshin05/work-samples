import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { Group } from './Group';
import { renderV3, screen } from '@@/test-utils';
import '@testing-library/jest-dom';
import {
  useFindMissionPartnerMinDetails,
  useExportTrainingPlanTranscriptsForGroup,
  useAggregateTranscriptTrainingPlansForGroup
} from '@/api/mission-partner';
import {
  useGetTrainingPlanProgress,
  useGetCourseProgress,
  useUpdateGroup,
  useFindGroupById,
  useDeleteGroup
} from '@/api/groups';
import { useFindUsersByGroupId, useRemoveGroupMemberships } from '@/api/user';

jest.mock('@/api/mission-partner');
jest.mock('@/api/groups');
jest.mock('@/api/user');
jest.mock('react-error-boundary');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  // ...jest.requireActual('@cerberus/react'),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  })),
  trapFocus: jest.fn(),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ ...props }) => <div {...props}>MockTabPanel</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ onChange, ...props }) => <input {...props} onChange={onChange} />,
  Field: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  ConfirmModal: ({ children }) => <div>{children}</div>,
  Portal: ({ children }) => <div>{children}</div>
}));

jest.mock('../../../components/AssignCohortMissionPartnerModal', () => ({
  AssignCohortMissionPartnerModal: () => (
    <div>AssignCohortMissionPartnerModal</div>
  )
}));

const mockClient = createMockClient();

describe('Group', () => {
  beforeEach(() => {
    jest.mock('next/navigation', () => ({
      useRouter: () => ({
        push: jest.fn()
      })
    }));

    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetails: {
        id: '123',
        name: 'Mission Partner 123'
      },
      missionPartnerMinDetailsLoading: false,
      missionPartnerMinDetailsError: null,
      refetchMissionPartnerMinDetails: jest.fn()
    });

    (useAggregateTranscriptTrainingPlansForGroup as jest.Mock).mockReturnValue({
      transcriptTrainingPlans: {},
      transcriptTrainingPlansLoading: false,
      transcriptTrainingPlansError: null,
      refetchTranscriptTrainingPlans: jest.fn()
    });

    (useExportTrainingPlanTranscriptsForGroup as jest.Mock).mockReturnValue({
      exportTrainingPlanTranscriptsForGroup: {},
      exportTrainingPlanTranscriptsForGroupLoading: false,
      exportTrainingPlanTranscriptsForGroupError: null,
      exportTrainingPlanTranscriptsForGroupData: null
    });

    (useFindGroupById as jest.Mock).mockReturnValue({
      groupById: {},
      groupByIdLoading: false,
      groupByIdError: false,
      refetchGroupById: jest.fn()
    });

    (useUpdateGroup as jest.Mock).mockReturnValue({
      updateGroup: jest.fn(),
      updateGroupLoading: false,
      updateGroupError: null
    });

    (useGetCourseProgress as jest.Mock).mockReturnValue({
      courseProgress: {},
      courseProgressLoading: false,
      courseProgressError: null,
      fetchCourseProgress: jest.fn()
    });

    (useGetTrainingPlanProgress as jest.Mock).mockReturnValue({
      trainingPlanProgress: {},
      trainingPlanProgressLoading: false,
      trainingPlanProgressError: null,
      fetchTrainingPlanProgress: jest.fn()
    });

    (useFindUsersByGroupId as jest.Mock).mockReturnValue({
      users: [
        {
          email: 'email@email.com',
          firstName: 'firstName',
          lastName: 'lastName',
          id: '12345'
        }
      ],
      usersLoading: false,
      usersError: null,
      fetchUsersByGroupId: jest.fn()
    });

    (useRemoveGroupMemberships as jest.Mock).mockReturnValue({
      removeGroupMembershipsLoading: false,
      removeGroupMembershipsError: null
    });

    (useFindGroupById as jest.Mock).mockReturnValue({
      groupById: {
        id: 'group1',
        missionPartnerId: '123',
        name: 'group1'
      },
      refetchGroupById: jest.fn(),
      groupByIdError: undefined,
      groupByIdLoading: false
    });

    (useDeleteGroup as jest.Mock).mockReturnValue({
      deleteGroup: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering the page', () => {
    it('renders', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <Group groupId="group1" missionPartnerId="123" tab="0" />
        </ApolloProvider>
      );
      expect(screen.getAllByText('group1')[0]).toBeInTheDocument();
      expect(screen.getByText('Roster')).toBeInTheDocument();
      expect(screen.getByText('Courses')).toBeInTheDocument();
      expect(screen.getByText('Plans')).toBeInTheDocument();
    });
  });
});
