import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import {
  useFindMissionPartnerMembersByUserId,
  useExportIndividualLearnerActivity
} from '../../../../../../../../src/api/mission-partner';
import { MissionPartnersTab } from './MissionPartnersTab';
import { userMock } from '.././mocks';
import { NotificationCenter } from '@cerberus/react';

const queryReponse = {
  userMissonPartners: [
    {
      missionPartnerName: 'Mission Partner 1',
      createdAt: '2021-01-01T00:00:00.000Z'
    }
  ],
  userMissionPartnersLoading: false
};

jest.mock('../../../../../../../../src/api/mission-partner');
jest.mock('../../../../../../../../src/api/course');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();
});

describe('<MissionPartnersTab />', () => {
  it('should render', () => {
    (useFindMissionPartnerMembersByUserId as jest.Mock).mockReturnValue(
      queryReponse
    );
    (useExportIndividualLearnerActivity as jest.Mock).mockReturnValue({
      exportIndividualLearnerActivity: jest.fn()
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <NotificationCenter>
          <MissionPartnersTab user={userMock} pageLoading={false} />
        </NotificationCenter>
      </ApolloProvider>
    );
    expect(screen.getByText('1 - 1 of 1 item')).toBeInTheDocument();
    expect(screen.getByText('Mission Partner 1')).toBeInTheDocument();
    expect(
      screen.getByText(
        abbreviatedDayDate(queryReponse.userMissonPartners[0].createdAt)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download report' })
    ).toBeInTheDocument();
  });

  it('should render a no results state', () => {
    (useFindMissionPartnerMembersByUserId as jest.Mock).mockReturnValue({
      ...queryReponse,
      userMissonPartners: []
    });
    (useExportIndividualLearnerActivity as jest.Mock).mockReturnValue({
      exportIndividualLearnerActivity: jest.fn()
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <NotificationCenter>
          <MissionPartnersTab user={userMock} pageLoading={false} />
        </NotificationCenter>
      </ApolloProvider>
    );
    expect(
      screen.getByText(
        'Once a learner is assigned to a Mission Partner, it will appear here'
      )
    ).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useFindMissionPartnerMembersByUserId as jest.Mock).mockReturnValue({
      ...queryReponse,
      userMissonPartners: []
    });
    (useExportIndividualLearnerActivity as jest.Mock).mockReturnValue({
      exportIndividualLearnerActivity: jest.fn()
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <NotificationCenter>
          <MissionPartnersTab user={userMock} pageLoading={true} />
        </NotificationCenter>
      </ApolloProvider>
    );

    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    expect(screen.getByText('0 items')).toBeInTheDocument();
  });
});
