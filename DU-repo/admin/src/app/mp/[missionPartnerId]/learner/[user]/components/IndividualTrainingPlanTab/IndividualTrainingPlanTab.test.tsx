import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { useFindTranscriptCoursesByUserId } from '@/api/course';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { IndividualTrainingPlanTab } from './IndividualTrainingPlanTab';
import { userMock } from '../mocks';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

const mockProps = {
  user: userMock,
  missionPartnerId: '12345',
  pageLoading: false
};

const queryResponse = {
  transcriptCourses: [
    {
      courseTitle: 'Course 1',
      vendorName: 'Vendor 1',
      status: 'completed',
      startedAt: '2021-01-01T00:00:00.000Z',
      markedCompletedAt: '2021-01-01T00:00:00.000Z'
    }
  ],
  transcriptCoursesLoading: false,
  refetchTranscriptCourses: jest.fn()
};

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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('@/api/course');

let mockClient;
beforeAll(() => {
  mockClient = createMockClient();
});

describe('<IndividualTrainingPlanTab />', () => {
  it('should render', () => {
    (useFindTranscriptCoursesByUserId as jest.Mock).mockReturnValue(
      queryResponse
    );

    renderV3(
      <ApolloProvider client={mockClient}>
        <IndividualTrainingPlanTab {...mockProps} />
      </ApolloProvider>
    );
    expect(screen.getByText('1 - 1 of 1 item')).toBeInTheDocument();
    expect(
      screen.getByRole('row', {
        name: `Course 1 Course Vendor 1 completed ${abbreviatedDayDate(
          queryResponse.transcriptCourses[0].startedAt
        )} ${abbreviatedDayDate(
          queryResponse.transcriptCourses[0].markedCompletedAt
        )}`
      })
    ).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('should render a loading state', () => {
    (useFindTranscriptCoursesByUserId as jest.Mock).mockReturnValue({
      ...queryResponse,
      transcriptCourses: [],
      transcriptCoursesLoading: true
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <IndividualTrainingPlanTab {...mockProps} />
      </ApolloProvider>
    );
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('should render an no results state', () => {
    (useFindTranscriptCoursesByUserId as jest.Mock).mockReturnValue({
      ...queryResponse,
      transcriptCourses: []
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <IndividualTrainingPlanTab {...mockProps} />
      </ApolloProvider>
    );

    expect(
      screen.getByText(
        'Once you have assigned training to this learner, it will appear here.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });
});
