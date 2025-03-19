import { isReportingInstructionsComplete } from './isReportingInstructionsComplete';
import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';

describe('isReportingInstructionsComplete', () => {
  it('should return true when both dates and location are completed for InPerson environment', () => {
    const mockCohort = {
      cohort: {
        meetingStartDate: '2023-01-01',
        meetingEndDate: '2023-01-02',
        environment: 'InPerson',
        location: 'Room 101'
      }
    } as unknown as IsSetupStepCompleteCohortData;

    expect(isReportingInstructionsComplete(mockCohort)).toBe(true);
  });

  it('should return false when dates are not completed', () => {
    const cohortData: IsSetupStepCompleteCohortData = {
      cohort: {
        meetingStartDate: '',
        meetingEndDate: '',
        environment: 'InPerson',
        location: 'Room 101'
      }
    } as unknown as IsSetupStepCompleteCohortData;

    expect(isReportingInstructionsComplete(cohortData)).toBe(false);
  });

  it('should return false when location is not completed for InPerson environment', () => {
    const cohortData: IsSetupStepCompleteCohortData = {
      cohort: {
        meetingStartDate: '2023-01-01',
        meetingEndDate: '2023-01-02',
        environment: 'InPerson',
        location: ''
      }
    } as unknown as IsSetupStepCompleteCohortData;

    expect(isReportingInstructionsComplete(cohortData)).toBe(false);
  });

  it('should return true when location is not required for non-InPerson environment', () => {
    const cohortData: IsSetupStepCompleteCohortData = {
      cohort: {
        meetingStartDate: '2023-01-01',
        meetingEndDate: '2023-01-02',
        environment: 'Virtual',
        location: ''
      }
    } as unknown as IsSetupStepCompleteCohortData;

    expect(isReportingInstructionsComplete(cohortData)).toBe(true);
  });

  it('should return false when cohortData is undefined', () => {
    const cohortData: IsSetupStepCompleteCohortData = {
      cohort: undefined
    } as unknown as IsSetupStepCompleteCohortData;

    expect(isReportingInstructionsComplete(cohortData)).toBe(false);
  });
});
