import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useFindLearnerLicenses } from '../../../../../../../../src/api/license';
import { LicensesTab } from './LicensesTab';
import { userMock } from '.././mocks';

const queryResponse = {
  learnerLicenses: [
    {
      vendorName: 'Vendor 1',
      licenseName: 'License 1',
      assignedAt: '2021-01-01T00:00:00.000Z'
    }
  ],
  learnerLicensesLoading: false
};

jest.mock('../../../../../../../../src/api/license');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();
});

describe('<LicensesTab />', () => {
  it('should render', () => {
    (useFindLearnerLicenses as jest.Mock).mockReturnValue(queryResponse);

    renderV3(
      <ApolloProvider client={mockClient}>
        <LicensesTab
          user={userMock}
          pageLoading={false}
          missionPartnerId="123"
        />
      </ApolloProvider>
    );
    expect(screen.getByText('1 - 1 of 1 item')).toBeInTheDocument();
    expect(
      screen.getByRole('row', {
        name: `Vendor 1 ${abbreviatedDayDate(
          queryResponse.learnerLicenses[0].assignedAt
        )}`
      })
    ).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useFindLearnerLicenses as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerLicenses: [],
      learnerLicensesLoading: true
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <LicensesTab
          user={userMock}
          pageLoading={true}
          missionPartnerId="123"
        />
      </ApolloProvider>
    );

    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('should render a no results state', () => {
    (useFindLearnerLicenses as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerLicenses: []
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <LicensesTab
          user={userMock}
          pageLoading={false}
          missionPartnerId="123"
        />
      </ApolloProvider>
    );
    expect(
      screen.getByText(
        'Once a license is assigned to a learner, it will appear here'
      )
    ).toBeInTheDocument();
  });
});
