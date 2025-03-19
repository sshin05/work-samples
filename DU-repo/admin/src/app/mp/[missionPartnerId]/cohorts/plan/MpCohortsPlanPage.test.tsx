import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import {
  renderV3,
  screen,
  fireEvent,
  setupResizeObserver
} from '@@/test-utils';
import { useFindTranscriptTrainingPlans } from '@/api/training-plan';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import CohortsPlanMetrics from './page';
import { useFindGroupById } from '@/api/groups';
import { useParams, useSearchParams } from 'next/navigation';

setupResizeObserver();
jest.mock('@/api/training-plan');
jest.mock('@/api/groups');
jest.mock('next/navigation');
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('<CohortsPlanMetrics', () => {
  const mockClient = createMockClient();
  const mockTranscriptTrainingPlans = () => ({
    total: 1,
    records: [
      {
        userId: 'c53cf4f0-0537-45dd-b2b7-37de71c5450a',
        trainingPlanId: 'b527fe95-6a88-4268-80bd-c728e7a7e35b',
        status: 'Assigned',
        assignedAt: '2022-01-02T16:14:33.549Z',
        startedAt: '2022-02-02T16:14:33.549Z',
        stoppedAt: '2022-03-02T16:14:33.549Z',
        completedAt: '2022-04-02T16:14:33.549Z',
        trainingPlan: {
          planType: 'Learning Path',
          planSourceId: 'black-holes',
          title: 'Black Holes'
        },
        user: {
          id: 'c53cf4f0-0537-45dd-b2b7-37de71c5450a',
          firstName: 'Roger',
          lastName: 'Rabbit',
          email: 'roger@toons.com'
        }
      }
    ]
  });

  const props = {
    groupId: 'who-framed-roger-rabbit',
    groupName: 'Who Framed Roger Rabbit',
    missionPartnerId: '42',
    missionPartnerName: 'Toon Town',
    planType: 'Learning Path',
    planSourceId: 'black-holes',
    title: 'Black Holes',
    type: 'enrolled',
    callbackPath: '/mp/42'
  };

  beforeAll(() => {
    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: props.missionPartnerId
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(key => {
        if (key === 'groupId') return props.groupId;
        if (key === 'planType') return props.planType;
        if (key === 'planSourceId') return props.planSourceId;
        if (key === 'title') return props.title;
        if (key === 'type') return props.type;
        return null;
      })
    });

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findTranscriptTrainingPlans: mockTranscriptTrainingPlans()
      }
    });
    (useFindTranscriptTrainingPlans as jest.Mock).mockReturnValue({
      transcriptTrainingPlansLoading: false,
      transcriptTrainingPlansError: false,
      transcriptTrainingPlansTotal: 1,
      transcriptTrainingPlans: mockTranscriptTrainingPlans().records
    });
    (useFindGroupById as jest.Mock).mockReturnValue({
      groupById: {
        id: 'who-framed-roger-rabbit',
        name: 'Who Framed Roger Rabbit'
      },
      groupByIdError: undefined,
      groupByIdLoading: false
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    expect(screen.getByText('Learner')).toBeInTheDocument();
    expect(screen.getByText('Roger Rabbit')).toBeInTheDocument();
    expect(
      screen.getByText('Who Framed Roger Rabbit | Total Enrolled')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Assigned')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Started')[0]).toBeInTheDocument();

    const startedDate = abbreviatedDayDate(
      new Date(mockTranscriptTrainingPlans().records[0].startedAt)
    );
    expect(screen.getByText(startedDate)).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    const completedDate = abbreviatedDayDate(
      new Date(mockTranscriptTrainingPlans().records[0].completedAt)
    );
    expect(screen.getByText(completedDate)).toBeInTheDocument();
    expect(screen.getByText('Stopped')).toBeInTheDocument();
    const stoppedDate = abbreviatedDayDate(
      new Date(mockTranscriptTrainingPlans().records[0].stoppedAt)
    );
    expect(screen.getByText(stoppedDate)).toBeInTheDocument();
  });

  it('should render Assigned status', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(key => {
        if (key === 'groupId') return props.groupId;
        if (key === 'planType') return props.planType;
        if (key === 'planSourceId') return props.planSourceId;
        if (key === 'title') return props.title;
        if (key === 'type') return props.type;
        if (key === 'status') return 'Assigned';
        return null;
      })
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    expect(
      screen.getByText('Who Framed Roger Rabbit | Assigned')
    ).toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
    expect(screen.queryByText('Assigned')).toBeInTheDocument();
    expect(screen.queryByText('Started')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    expect(screen.queryByText('Stopped')).not.toBeInTheDocument();
  });

  it('should render Started status', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(key => {
        if (key === 'groupId') return props.groupId;
        if (key === 'planType') return props.planType;
        if (key === 'planSourceId') return props.planSourceId;
        if (key === 'title') return props.title;
        if (key === 'type') return props.type;
        if (key === 'status') return 'Started';
        return null;
      })
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    expect(
      screen.getByText('Who Framed Roger Rabbit | Started')
    ).toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
    expect(screen.queryAllByText('Started')[0]).toBeInTheDocument();
    expect(screen.queryByText('Assigned')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    expect(screen.queryByText('Stopped')).not.toBeInTheDocument();
  });

  it('should render Completed status', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(key => {
        if (key === 'groupId') return props.groupId;
        if (key === 'planType') return props.planType;
        if (key === 'planSourceId') return props.planSourceId;
        if (key === 'title') return props.title;
        if (key === 'type') return props.type;
        if (key === 'status') return 'Completed';
        return null;
      })
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    expect(
      screen.getByText('Who Framed Roger Rabbit | Completed')
    ).toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
    expect(screen.queryAllByText('Completed')[0]).toBeInTheDocument();
    expect(screen.queryByText('Assigned')).not.toBeInTheDocument();
    expect(screen.queryByText('Started')).not.toBeInTheDocument();
    expect(screen.queryByText('Stopped')).not.toBeInTheDocument();
  });

  it('should render Stopped status', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(key => {
        if (key === 'groupId') return props.groupId;
        if (key === 'planType') return props.planType;
        if (key === 'planSourceId') return props.planSourceId;
        if (key === 'title') return props.title;
        if (key === 'type') return props.type;
        if (key === 'status') return 'Stopped';
        return null;
      })
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    expect(
      screen.getByText('Who Framed Roger Rabbit | Stopped')
    ).toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
    expect(screen.queryAllByText('Stopped')[0]).toBeInTheDocument();
    expect(screen.queryByText('Assigned')).not.toBeInTheDocument();
    expect(screen.queryByText('Started')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
  });

  it('should search for a search term', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <CohortsPlanMetrics />
      </ApolloProvider>
    );

    const searchInput = screen.getByLabelText('search table for value');
    fireEvent.change(searchInput, { target: { value: 'some search term' } });
    expect(searchInput).toHaveValue('some search term');
  });
});
