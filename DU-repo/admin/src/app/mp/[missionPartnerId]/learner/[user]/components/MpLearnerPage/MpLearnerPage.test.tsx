import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import { renderV3, screen, userEvent } from '@@/test-utils';
import { useFindUserById } from '@/api/users';
import { MpLearnerPage } from './MpLearnerPage';

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: '123', user: '' }))
}));

jest.mock('next-auth/react');
jest.mock('@/api/mission-partner');
jest.mock('@/api/users');
jest.mock(
  '../AllowContractorAccessCheckbox/AllowContractorAccessCheckbox',
  () => ({
    __esModule: true,
    AllowContractorAccessCheckbox: () => <div>AllowContracorAccessCheckbox</div>
  })
);

jest.mock('../LicensesTab/LicensesTab', () => ({
  __esModule: true,
  LicensesTab: () => <div>Mocked LicensesTab</div>
}));
jest.mock('../MissionPartnersTab/MissionPartnersTab', () => ({
  __esModule: true,
  MissionPartnersTab: () => <div>Mocked MissionPartnersTab</div>
}));
jest.mock('../CohortsLearnersTab/CohortsLearnersTab', () => ({
  __esModule: true,
  CohortsLearnersTab: () => <div>Mocked CohortsLearnerTab</div>
}));
jest.mock('../Profile/Profile', () => ({
  __esModule: true,
  Profile: () => <div>Mocked Profile</div>
}));
jest.mock('../AssessmentsTab/AssessmentsTab', () => ({
  __esModule: true,
  AssessmentsTab: () => <div>Mocked AssessmentsTab</div>
}));
jest.mock('../TrainingPlansTab/TrainingPlansTab', () => ({
  __esModule: true,
  TrainingPlansTab: () => <div>Mocked TrainingPlansTab</div>
}));
jest.mock('../IndividualTrainingPlanTab/IndividualTrainingPlanTab', () => ({
  __esModule: true,
  IndividualTrainingPlanTab: () => <div>Mocked IndividualTrainingPlanTab</div>
}));

const mockAdminSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
};

const accountJson = {
  id: 'abcde-12345',
  branch: 'Space Force',
  photoUrl: '.png',
  grade: 'A1C',
  occupationalCode: '3D0X4',
  metadata: {
    command: 'org',
    spaceDelta: 'delta',
    dutyStation: 'Keesler'
  },
  currentCareer: 'Web-Dev',
  firstName: 'Sid',
  lastName: 'Wal',
  email: 'test@test.com'
};

/*
TODO: !!!!!! If you're working with this file, then remove this chunk if you see it to be necessary
const props = {
  missionPartnerId: '123',
  user: '',
  breadcrumbs: [
    {
      text: 'mmp',
      href: '/dummyUrl'
    },
    {
      text: 'Portal Manager'
    }
  ]
};
*/

describe('LearnerPage in MMP > portal manager user', () => {
  let mockClient;
  beforeAll(() => {
    mockClient = createMockClient();

    (useFindUserById as jest.Mock).mockReturnValue({
      userById: accountJson,
      userByIdLoading: false,
      userByIdError: null
    });
  });

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: mockAdminSession });
  });

  it('should render Homepage', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MpLearnerPage />
      </ApolloProvider>
    );
    expect(screen.getByText('Mocked Profile')).toBeInTheDocument();
  });

  it('should render checkbox AllowContractorAccessCheckbox when user is contractor', async () => {
    (useFindUserById as jest.Mock).mockReturnValue({
      userById: {
        ...accountJson,
        userType: 'contractor'
      },
      userByIdLoading: false,
      userByIdError: null
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MpLearnerPage />
      </ApolloProvider>
    );

    const checkbox = screen.getByText('AllowContracorAccessCheckbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render all tabs for an admin user', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MpLearnerPage />
      </ApolloProvider>
    );
    // rendered tab[0] content
    expect(screen.getByText('Mocked AssessmentsTab')).toBeInTheDocument();

    // tab buttons - using getByText for performance
    const trainingPlanButton = screen.getByText('Training Plans');
    const licensesButton = screen.getByText('Licenses');
    const missionPartnersButton = screen.getByText('Mission Partners');
    const cohortsButton = screen.getByText('Cohorts');
    const assessmentsButton = screen.getByText('Assessments');

    expect(trainingPlanButton).toBeInTheDocument();
    expect(licensesButton).toBeInTheDocument();
    expect(missionPartnersButton).toBeInTheDocument();
    expect(cohortsButton).toBeInTheDocument();
    expect(assessmentsButton).toBeInTheDocument();

    // render tabs content on tab click.
    userEvent.click(trainingPlanButton);
    expect(
      await screen.findByText('Mocked TrainingPlansTab')
    ).toBeInTheDocument();

    userEvent.click(licensesButton);
    expect(await screen.findByText('Mocked LicensesTab')).toBeInTheDocument();

    userEvent.click(missionPartnersButton);
    expect(
      await screen.findByText('Mocked MissionPartnersTab')
    ).toBeInTheDocument();

    userEvent.click(cohortsButton);
    expect(
      await screen.findByText('Mocked CohortsLearnerTab')
    ).toBeInTheDocument();

    userEvent.click(assessmentsButton);
    expect(
      await screen.findByText('Mocked AssessmentsTab')
    ).toBeInTheDocument();
  });
});
