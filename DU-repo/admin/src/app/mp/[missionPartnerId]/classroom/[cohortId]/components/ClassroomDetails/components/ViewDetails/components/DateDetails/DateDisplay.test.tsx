import React from 'react';
import { render, screen } from '@@/test-utils';
import type { CohortData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { DateDetails } from './DateDisplay';

jest.mock('../../../../utils/formatCohortDate/formatCohortDate', () => ({
  formatCohortDate: value => value
}));

describe('DateDetails', () => {
  it('renders "Dates are pending" when dates are missing', () => {
    const cohort = {
      meetingStartDate: null,
      meetingEndDate: null
    } as CohortData;

    render(<DateDetails cohort={cohort} />);

    expect(screen.getByText('Dates are pending.')).toBeInTheDocument();
  });

  it('renders formatted dates when both start and end dates are provided', () => {
    const cohort = {
      meetingStartDate: '2025-01-01',
      meetingEndDate: '2025-01-31'
    } as unknown as CohortData;

    render(<DateDetails cohort={cohort} />);

    expect(screen.getByText('2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('2025-01-31')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
