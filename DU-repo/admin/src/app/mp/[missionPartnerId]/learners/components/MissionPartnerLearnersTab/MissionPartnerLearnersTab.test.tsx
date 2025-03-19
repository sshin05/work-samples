import { renderV3, screen, fireEvent } from '@@/test-utils';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/client';
import { useFindUserById } from '@/api/users';
import { useFindAwardedBadges } from '@/api/user/useFindAwardedBadges';
import MissionPartnerLearnersTab from './MissionPartnerLearnersTab';

const mockNotify = jest.fn();

jest.mock('@/api/users');
jest.mock('@/api/user/useFindAwardedBadges');
jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));
jest.mock('@cerberus/styled-system/patterns', () => ({
  hstack: jest.fn(() => 'mock-hstack-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  animateIn: jest.fn(() => 'mock-animate-in')
}));
jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');

  return {
    ...actual,
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
    Tag: jest.fn(({ children }) => <div>{children}</div>),
    Text: jest.fn(({ children }) => <div>{children}</div>),
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
  };
});

jest.mock('./AddUsersToMissionPartner', () => ({
  AddUsersToMissionPartner: () => {
    return <div data-testid="addMemberMock">New Learners Mock Modal</div>;
  }
}));
jest.mock('./components/LearnersTypePill', () => ({
  LearnersTypePill: ({ value }) => <div>{value}</div>
}));

jest.mock('next/dynamic', () => () => {
  const MpLearnersTableContent = () => (
    <div data-testid="mp-learners-table-content">Table Content</div>
  );
  MpLearnersTableContent.displayName = 'MpLearnersTableContent';
  return MpLearnersTableContent;
});

jest.mock('./MpLearnersTableContent', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mp-learners-table-content">Table Content</div>
  )
}));

const accountJson = {
  id: 'abcde-b1864',
  branch: 'Army',
  photoUrl: '.png',
  grade: '1BG',
  occupationalCode: 'US1922',
  metadata: {
    command: 'org',
    spaceDelta: 'delta',
    dutyStation: 'Ft. Robinson NE'
  },
  firstName: 'Charles',
  lastName: 'Young',
  email: 'cyoung@test.com'
};

describe('MissionPartnerLearnersTab', () => {
  const missionPartnerMinDetails = { id: 'test-mission-partner-id' };
  let mockClient;
  beforeAll(() => {
    mockClient = createMockClient();

    (useFindUserById as jest.Mock).mockReturnValue({
      userById: accountJson,
      userByIdLoading: false,
      userByIdError: null
    });
    (useFindAwardedBadges as jest.Mock).mockReturnValue({
      awardedBadges: [],
      awardedBadgesLoading: false,
      awardedBadgesError: null
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the table content', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerLearnersTab
          missionPartnerId={missionPartnerMinDetails.id}
          refetchInitialCount={jest.fn()}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Table Content')).toBeInTheDocument();
  });

  it('should test add member modal open', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerLearnersTab
          missionPartnerId={missionPartnerMinDetails.id}
          refetchInitialCount={jest.fn()}
        />
      </ApolloProvider>
    );

    const modal = await screen.findByTestId('addMemberMock');
    fireEvent.click(modal);
    expect(modal).toBeInTheDocument();
  });
});
