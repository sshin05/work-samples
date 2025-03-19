import { Calendar } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import type { CohortData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { formatCohortDate } from '../../../../utils/formatCohortDate/formatCohortDate';

const DateDisplay = ({ cohort }: { cohort: CohortData }) => {
  if (!cohort.meetingStartDate || !cohort.meetingEndDate) {
    return <p>Dates are pending.</p>;
  }

  return (
    <>
      <time dateTime={cohort.meetingStartDate.toString()}>
        {formatCohortDate(cohort.meetingStartDate)}
      </time>
      <span className={css({ mx: 2 })}>-</span>
      <time dateTime={cohort.meetingEndDate.toString()}>
        {formatCohortDate(cohort.meetingEndDate)}
      </time>
    </>
  );
};

export const DateDetails = ({ cohort }: { cohort: CohortData }) => {
  return (
    <div className={flex({ alignItems: 'center' })}>
      <Calendar
        size={16}
        className={css({ color: 'action.text.200', flexShrink: '0', mr: 4 })}
      />
      <DateDisplay cohort={cohort} />
    </div>
  );
};
