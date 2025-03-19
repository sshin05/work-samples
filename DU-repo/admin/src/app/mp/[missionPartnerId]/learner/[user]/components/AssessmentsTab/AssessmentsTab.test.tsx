import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useFindLearnerAssessments } from '@/api/assessment';
import { AssessmentsTab } from './AssessmentsTab';
import { userMock } from '../mocks';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

const queryResponse = {
  learnerAssessmentsLoading: false,
  learnerAssessmentsError: null,
  learnerAssessments: [
    {
      id: '1',
      assessmentTitle: 'Assessment 1',
      vendorName: 'Vendor 1',
      vendorAssessmentId: '1',
      startedAt: '2021-01-01T00:00:00.000Z',
      markedCompletedAt: '2021-01-02T00:00:00.000Z',
      status: 'completed'
    }
  ],
  totalAssessmentsByUserId: 1,
  refetchLearnerAssessments: jest.fn()
};

const mockProps = {
  user: userMock,
  missionPartnerId: '12345',
  pageLoading: false
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
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

jest.mock('@/api/assessment');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();
});

describe('<AssessmentsTab />', () => {
  it('should render', () => {
    (useFindLearnerAssessments as jest.Mock).mockReturnValue(queryResponse);

    renderV3(
      <ApolloProvider client={mockClient}>
        <AssessmentsTab {...mockProps} />
      </ApolloProvider>
    );
    expect(screen.getByText('Assessment 1')).toBeInTheDocument();
    expect(
      screen.getByRole('row', {
        name: `Assessment 1 Vendor 1 ${abbreviatedDayDate(
          queryResponse.learnerAssessments[0].startedAt
        )} ${abbreviatedDayDate(
          queryResponse.learnerAssessments[0].markedCompletedAt
        )}`
      })
    ).toBeInTheDocument();
  });

  it('should render a no results state', () => {
    (useFindLearnerAssessments as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerAssessments: []
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <AssessmentsTab {...mockProps} />
      </ApolloProvider>
    );
    expect(
      screen.getByText(
        'Once you have assigned an assessment to a learner, it will appear here'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useFindLearnerAssessments as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerAssessments: [],
      learnerAssessmentsLoading: true
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <AssessmentsTab {...mockProps} />
      </ApolloProvider>
    );

    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });
});
