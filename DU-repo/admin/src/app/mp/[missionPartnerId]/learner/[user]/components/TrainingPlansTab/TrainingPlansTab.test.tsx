import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useGetLearnerTrainingPlans } from '../../../../../../../../src/api/training-plan';
import { TrainingPlansTab } from './TrainingPlansTab';
import { userMock } from '.././mocks';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

const mockProps = {
  user: userMock,
  missionPartnerId: '12345',
  pageLoading: false
};

const queryResponse = {
  learnerTrainingPlansLoading: false,
  learnerTrainingPlansError: null,
  learnerTrainingPlans: [
    {
      title: 'Plan 1',
      planType: 'individual',
      status: 'active',
      startedAt: '2022-03-01T00:00:00.000Z',
      completedAt: '2022-07-04T00:00:00.000Z',
      assignedAt: '2022-03-01T00:00:00.000Z',
      stoppedAt: '2022-07-04T00:00:00.000Z'
    }
  ]
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

jest.mock('../../../../../../../../src/api/training-plan');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();
});

describe('<TrainingPlan />', () => {
  it('should render', () => {
    (useGetLearnerTrainingPlans as jest.Mock).mockReturnValue(queryResponse);

    renderV3(
      <ApolloProvider client={mockClient}>
        <TrainingPlansTab {...mockProps} />
      </ApolloProvider>
    );
    expect(screen.getByText('1 - 1 of 1 item')).toBeInTheDocument();
    expect(
      screen.getByRole('row', {
        name: `Plan 1 individual ${abbreviatedDayDate(
          queryResponse.learnerTrainingPlans[0].assignedAt
        )} ${abbreviatedDayDate(
          queryResponse.learnerTrainingPlans[0].startedAt
        )} ${abbreviatedDayDate(
          queryResponse.learnerTrainingPlans[0].completedAt
        )} ${abbreviatedDayDate(
          queryResponse.learnerTrainingPlans[0].stoppedAt
        )}`
      })
    ).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useGetLearnerTrainingPlans as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerTrainingPlans: [],
      learnerTrainingPlansLoading: true
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <TrainingPlansTab {...mockProps} />
      </ApolloProvider>
    );

    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('should render a no results state', () => {
    (useGetLearnerTrainingPlans as jest.Mock).mockReturnValue({
      ...queryResponse,
      learnerTrainingPlans: []
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <TrainingPlansTab {...mockProps} />
      </ApolloProvider>
    );
    expect(
      screen.getByText(
        'Once you have assigned a training plan to a learner, it will appear here'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });
});
