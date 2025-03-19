import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen, waitFor } from '@@/test-utils';
import { useFindLearnerCohortMemberships } from '@/api/user';
import { CohortsLearnersTab } from './CohortsLearnersTab';
import { useUpdateGroup } from '@/api/groups';
import { userMock } from '../mocks';

jest.mock('@/api/groups');
const queryResponse = {
  learnerCohortMemberships: [
    {
      group: {
        id: '1',
        name: 'Cohort 1'
      },
      count: 27,
      missionPartner: {
        id: '1',
        name: 'Mission Partner 1'
      }
    }
  ],
  learnerCohortsLoading: false,
  learnerCohortsError: null
};

jest.mock('@/api/user');
jest.mock('@/api/course');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();

  (useUpdateGroup as jest.Mock).mockReturnValue({
    updateGroup: jest.fn()
  });
});

describe('manage-mission-partners <CohortsLearnerTab />', () => {
  it('should render', async () => {
    (useFindLearnerCohortMemberships as jest.Mock).mockReturnValue(
      queryResponse
    );

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsLearnersTab
          user={userMock}
          missionPartnerId="00000000-0000-0000-0000-000000000000"
          pageLoading={false}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Cohort 1')).toBeInTheDocument();
      expect(screen.getByText('27')).toBeInTheDocument();
      expect(screen.getByText('Mission Partner 1')).toBeInTheDocument();
    });
  });

  it('should render a no results state', () => {
    (useFindLearnerCohortMemberships as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerCohortMemberships: []
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsLearnersTab
          user={userMock}
          missionPartnerId="00000000-0000-0000-0000-000000000000"
          pageLoading={false}
        />
      </ApolloProvider>
    );
    expect(
      screen.getByText(
        'Once a learner is assigned to a Cohort, it will appear here'
      )
    ).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useFindLearnerCohortMemberships as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerCohortMemberships: [],
      learnerCohortsLoading: true
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsLearnersTab
          user={userMock}
          missionPartnerId="00000000-0000-0000-0000-000000000000"
          pageLoading={false}
        />
      </ApolloProvider>
    );

    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });
});
