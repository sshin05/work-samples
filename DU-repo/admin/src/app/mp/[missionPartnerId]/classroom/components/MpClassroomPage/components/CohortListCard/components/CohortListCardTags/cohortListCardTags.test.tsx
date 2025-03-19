import { renderV3 as render } from '@@/test-utils';
import { CohortListCardTags } from './CohortListCardTags';
import { CohortStatus } from '../../CohortListCard';
import dayjs from 'dayjs';

describe('CohortListCardTags', () => {
  const now = dayjs();
  const futureDates = {
    startDate: now.add(4, 'days').toISOString(),
    endDate: now.add(10, 'days').toISOString()
  };
  const pastDates = {
    startDate: now.subtract(10, 'days').toISOString(),
    endDate: now.subtract(1, 'day').toISOString()
  };

  it('renders public tag correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.UPCOMING}
        isPublic={true}
        meetingStartDate={futureDates.startDate}
        meetingEndDate={futureDates.endDate}
      />
    );

    expect(getByText('Public')).toBeInTheDocument();
  });

  it('renders private tag correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.UPCOMING}
        isPublic={false}
        meetingStartDate={futureDates.startDate}
        meetingEndDate={futureDates.endDate}
      />
    );

    expect(getByText('Private')).toBeInTheDocument();
  });

  it('renders status tag for upcoming cohort correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.UPCOMING}
        isPublic={true}
        meetingStartDate={futureDates.startDate}
        meetingEndDate={futureDates.endDate}
      />
    );

    expect(getByText(`Starts in 4 days`)).toBeInTheDocument();
  });

  it('renders status tag for in-progress cohort correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.IN_PROGRESS}
        isPublic={true}
        meetingStartDate={pastDates.startDate}
        meetingEndDate={futureDates.endDate}
      />
    );

    expect(getByText(`Ends in 10 days`)).toBeInTheDocument();
  });

  it('renders status tag for past cohort correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.PAST}
        isPublic={true}
        meetingStartDate={pastDates.startDate}
        meetingEndDate={pastDates.endDate}
      />
    );

    expect(getByText('Complete')).toBeInTheDocument();
  });

  it('renders status tag for draft cohort correctly', () => {
    const { getByText } = render(
      <CohortListCardTags
        status={CohortStatus.DRAFT}
        isPublic={true}
        meetingStartDate={futureDates.startDate}
        meetingEndDate={futureDates.endDate}
      />
    );

    expect(getByText(CohortStatus.DRAFT)).toBeInTheDocument();
  });
});
