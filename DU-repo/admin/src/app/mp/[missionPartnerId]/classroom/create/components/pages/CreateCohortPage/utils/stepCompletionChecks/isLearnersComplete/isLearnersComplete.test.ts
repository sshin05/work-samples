import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';
import { isLearnersComplete } from './isLearnersComplete';

describe('isLearnersComplete', () => {
  const mockCohort = {
    cohortMembers: [
      {
        id: '1',
        email: 'learneremail@test.com',
        firstName: 'Firstname',
        lastName: 'Lastname'
      }
    ]
  } as unknown as IsSetupStepCompleteCohortData;

  it('returns false if the cohort is missing', () => {
    expect(
      isLearnersComplete({} as unknown as IsSetupStepCompleteCohortData)
    ).toBe(false);
  });

  it('returns false if the cohort does not have any learners', () => {
    expect(
      isLearnersComplete({
        cohort: { cohortMembers: undefined }
      } as unknown as IsSetupStepCompleteCohortData)
    ).toBe(false);
  });

  it('returns true if the cohort has a learner', () => {
    expect(isLearnersComplete(mockCohort)).toBe(true);
  });
});
