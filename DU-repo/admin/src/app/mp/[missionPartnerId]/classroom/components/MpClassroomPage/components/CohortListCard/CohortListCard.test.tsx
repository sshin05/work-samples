import { renderV3 as render, screen } from '@@/test-utils';
import { CohortListCard, CohortStatus } from './CohortListCard';
import dayjs from 'dayjs';
import type { FindCohortData } from '../../../../[cohortId]/cohort.types';

jest.mock('@/app/api', () => ({
  useSQLQuery: () => ({ data: { total: 20 } })
}));
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  CircularProgress: () => <div>CircularProgress</div>
}));

jest.mock('./components/CohortListCardTags', () => ({
  CohortListCardTags: () => <div>CohortListCardTags</div>
}));

describe('CohortListCard', () => {
  const mockFindCohortMembers = jest.fn();
  const mockCohort = {
    name: 'React Fundamentals',
    meetingStartDate: new Date('2025-01-01'),
    meetingEndDate: new Date('2025-01-10'),
    learnersMax: 30,
    location: 'New York City',
    environment: 'InPerson'
  } as unknown as FindCohortData;

  const mockMissionPartner = {
    logoUrl: 'https://example.com/logo.png',
    name: 'Tech Partner'
  };

  it('renders the cohort name, status, tags, and formatted dates', () => {
    render(
      <CohortListCard
        cohort={mockCohort}
        missionPartner={mockMissionPartner}
        status={CohortStatus.IN_PROGRESS}
      />
    );

    expect(screen.getByText('CircularProgress')).toBeInTheDocument();
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('CohortListCardTags')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${dayjs(mockCohort.meetingStartDate).format('DD MMM').toUpperCase()} to ${dayjs(
          mockCohort.meetingEndDate
        )
          .format('DD MMM YYYY')
          .toUpperCase()}`
      )
    ).toBeInTheDocument();
  });

  it('renders the current number of learners and number of seats left', () => {
    mockFindCohortMembers.mockReturnValue({
      data: { total: 20 }
    });

    render(
      <CohortListCard
        cohort={mockCohort}
        missionPartner={mockMissionPartner}
        status={CohortStatus.IN_PROGRESS}
      />
    );

    expect(
      screen.getByText('20 Learners added (10 Seats remaining)')
    ).toBeInTheDocument();
  });

  it('renders the cohort location', () => {
    render(
      <CohortListCard
        cohort={mockCohort}
        missionPartner={mockMissionPartner}
        status={CohortStatus.DRAFT}
      />
    );

    expect(screen.getByText('New York City')).toBeInTheDocument();
  });

  it('renders the cohort environment "In Person"', () => {
    render(
      <CohortListCard
        cohort={mockCohort}
        missionPartner={mockMissionPartner}
        status={CohortStatus.PAST}
      />
    );

    expect(screen.getByText('In Person')).toBeInTheDocument();
  });

  it('renders the mission partner logo and name', () => {
    render(
      <CohortListCard
        cohort={mockCohort}
        missionPartner={mockMissionPartner}
        status={CohortStatus.UPCOMING}
      />
    );

    const logoImage = screen.getByAltText(mockMissionPartner.name);
    expect(logoImage).toBeInTheDocument();
    expect(screen.getByText(mockMissionPartner.name)).toBeInTheDocument();
  });

  it('renders "TBD" if dates are not provided', () => {
    const cohortWithoutDates = {
      ...mockCohort,
      meetingStartDate: null,
      meetingEndDate: null
    };

    render(
      <CohortListCard
        cohort={cohortWithoutDates}
        missionPartner={mockMissionPartner}
        status={CohortStatus.UPCOMING}
      />
    );

    expect(screen.getByText('TBD')).toBeInTheDocument();
  });

  it('renders without environment or learners when not provided', () => {
    const cohortWithoutOptionalFields = {
      ...mockCohort,
      learnersMax: null,
      environment: null
    };

    render(
      <CohortListCard
        cohort={cohortWithoutOptionalFields}
        missionPartner={mockMissionPartner}
        status={CohortStatus.IN_PROGRESS}
      />
    );

    expect(screen.queryByText('30 Seats')).not.toBeInTheDocument();
    expect(screen.queryByText('In Person')).not.toBeInTheDocument();
  });
});
