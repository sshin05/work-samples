import { ApolloProvider } from '@apollo/client';
import { createMockClient, type MockApolloClient } from 'mock-apollo-client';
import { useFindTranscriptCourses } from '@/api/course';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import MissionPartnerCourseMetricsLearnersPage from './page';
import {
  fireEvent,
  renderV3,
  screen,
  setupResizeObserver,
  waitFor
} from '@@/test-utils';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useParams, useSearchParams } from 'next/navigation';

jest.mock('../../../../../../src/api/course');
jest.mock('../../../../../../src/api/mission-partner');
setupResizeObserver();

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
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
  Option: ({ children }) => <option>{children}</option>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

describe('Mission Partner Course Metrics Learners', () => {
  const mockTranscriptCourses = [
    {
      userId: 'user1',
      courseId: 'toons#course123',
      status: {
        input: 'Started',
        output: 'Started'
      },
      startedAt: '2021-01-01T17:52:07.000Z',
      stoppedAt: '2021-02-01T17:52:07.000Z',
      pendingReviewAt: '2021-03-01T17:52:07.000Z',
      markedCompletedAt: '2021-04-01T17:52:07.000Z',
      completedAt: '2021-05-01T17:52:07.000Z',
      course: {
        id: 'toons#123',
        courseTitle: 'A Practical Guide to Living in Toontown',
        vendorId: 'toons',
        vendorCourseId: 'course123'
      },
      user: {
        id: 'user1',
        email: 'roger@toons.com',
        firstName: 'Roger',
        lastName: 'Rabbit'
      }
    }
  ];

  let mockClient: MockApolloClient;

  beforeAll(() => {
    mockClient = createMockClient();

    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: 'mp1'
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Started',
          courseId: 'course1'
        };
        return params[key];
      }
    });

    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: {
        id: 'mp1',
        logoUrl: null,
        name: 'Mission Partner 1',
        provisionedLicenses: [],
        affiliateId: 'af1'
      }
    });

    (useFindTranscriptCourses as jest.Mock).mockReturnValue({
      transcriptCoursesData: mockTranscriptCourses,
      transcriptCoursesError: null,
      transcriptCoursesLoading: false,
      transcriptCoursesCount: 1
    });
  });

  it('should render mission partner course metrics learners page', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(
      screen.getByText('A Practical Guide to Living in Toontown | Started')
    ).toBeInTheDocument();

    expect(screen.getByText('Learner')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Roger Rabbit')).toBeInTheDocument();
    expect(
      screen.getByText(mockTranscriptCourses[0].user.email)
    ).toBeInTheDocument();

    expect(screen.getByText(/1 - 1 of 1 item/i)).toBeInTheDocument();
  });

  it('should render learners with a status of total enrolled', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Total Enrolled',
          courseId: 'course1'
        };
        return params[key];
      }
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Started')).toBeInTheDocument();
    const startDate = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].startedAt)
    );
    expect(screen.getByText(startDate)).toBeInTheDocument();

    expect(screen.getByText('Stopped')).toBeInTheDocument();
    const stoppedDate = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].stoppedAt)
    );
    expect(screen.getByText(stoppedDate)).toBeInTheDocument();

    expect(screen.getByText('Pending Review')).toBeInTheDocument();
    const pendingReviewDate = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].pendingReviewAt)
    );
    expect(screen.getByText(pendingReviewDate)).toBeInTheDocument();

    expect(screen.getByText('Marked Completed')).toBeInTheDocument();
    const markedCompletedDate = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].markedCompletedAt)
    );
    expect(screen.getByText(markedCompletedDate)).toBeInTheDocument();
  });

  it('should render learners with a status of started', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Started',
          courseId: 'course1'
        };
        return params[key];
      }
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Started')).toBeInTheDocument();

    const date = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].startedAt)
    );

    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should render learners with a status of stopped', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Stopped',
          courseId: 'course1'
        };
        return params[key];
      }
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Stopped')).toBeInTheDocument();

    const date = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].stoppedAt)
    );

    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should render learners with a status of pending review', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Pending Review',
          courseId: 'course1'
        };
        return params[key];
      }
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Pending Review')).toBeInTheDocument();

    const date = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].pendingReviewAt)
    );

    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should render learners with a status of marked completed', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params = {
          vendor: 'vendor1',
          status: 'Marked Completed',
          courseId: 'course1'
        };
        return params[key];
      }
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Marked Completed')).toBeInTheDocument();

    const date = abbreviatedDayDate(
      new Date(mockTranscriptCourses[0].markedCompletedAt)
    );

    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it('should search for a learner', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerCourseMetricsLearnersPage />
      </ApolloProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search by learner');
    fireEvent.change(searchInput, { target: { value: 'roger' } });
    expect(searchInput).toHaveValue('roger');
    await waitFor(() => {
      expect(useFindTranscriptCourses).toHaveBeenCalled();
    });
  });
});
