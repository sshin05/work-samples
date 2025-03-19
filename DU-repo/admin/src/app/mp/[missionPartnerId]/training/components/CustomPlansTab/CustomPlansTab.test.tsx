import { useParams, useRouter } from 'next/navigation';
import { ApolloProvider } from '@apollo/client';
import type { ForceMultiplierContent, StatusType } from '@/api/codegen/graphql';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import CustomPlansTab from './CustomPlansTab';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('../AddPlanModalContent', () => ({
  AddPlanModalContent: () => <div>AddPlanModalContent</div>
}));

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: (props: NoDataMessageProps) => (
    <>
      {props.message}
      {props.buttonText && (
        <button onClick={props.cta} data-testid="call-to-action-button">
          {props.buttonText}
        </button>
      )}
    </>
  )
}));

const mockClient = createMockClient();

describe('CustomPlansTab', () => {
  const mockCustomPlans = [
    {
      id: '40c56503-bf07-46e3-9998-3fc04f1408ed',
      title: 'Test Title One',
      version: '2',
      status: 'Draft' as StatusType,
      enrolledLearners: 0,
      content: {} as ForceMultiplierContent,
      requiredLicenses: [],
      changeLog: [
        {
          createdAt: '2024-12-23T16:22:15.731Z',
          firstName: 'Jane',
          lastName: 'Doe',
          revisionSummary: 'Initial draft',
          userId: 'user-1',
          version: '1.0'
        }
      ],
      _createdAt: '2024-12-23T16:22:15.731Z',
      _updatedAt: '2024-12-23T16:22:15.731Z'
    }
  ];

  const mockMissionPartner = {
    id: '1',
    name: 'Mission Partner Name',
    affiliateId: 'affiliate-1',
    courses: [],
    customTrainingEnabled: true,
    exams: [],
    forceMultipliers: [],
    learners: [],
    plans: [],
    training: [],
    labs: [],
    scorms: [],
    surveys: [],
    trialEnabled: false
  };

  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
      asPath: '/manage-mission-partners/1'
    });
    (useParams as jest.Mock).mockReturnValue({ missionPartnerId: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    renderV3(
      <CustomPlansTab
        missionPartner={mockMissionPartner}
        tab="Plans"
        pageLoading={false}
        loading={false}
      />
    );

    expect(
      screen.getByText(
        'Once a custom training plan has been created, it will appear here'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });

  it('should render with custom plans', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <CustomPlansTab
          missionPartner={{
            ...mockMissionPartner,
            forceMultipliers: mockCustomPlans.map(plan => ({
              id: plan.id,
              title: plan.title,
              version: plan.version,
              status: plan.status,
              enrolledLearners: plan.enrolledLearners,
              content: plan.content,
              requiredLicenses: plan.requiredLicenses,
              changeLog: plan.changeLog,
              _createdAt: plan._createdAt,
              _updatedAt: plan._updatedAt
            }))
          }}
          tab="Plans"
          loading={false}
          pageLoading={false}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Test Title One')).toBeInTheDocument();
    expect(screen.getByText('Force Multiplier')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
