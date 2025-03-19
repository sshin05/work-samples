import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';
import { isNameAndDescriptionComplete } from './isNameAndDescriptionComplete';

describe('isNameAndDescriptionComplete', () => {
  const mockCohort = {
    cohort: { name: 'mock name' }
  } as unknown as IsSetupStepCompleteCohortData;

  it('returns false if the cohort is missing', () => {
    expect(
      isNameAndDescriptionComplete(
        {} as unknown as IsSetupStepCompleteCohortData
      )
    ).toBe(false);
  });

  it('returns false if the cohort is missing a name', () => {
    expect(
      isNameAndDescriptionComplete({
        cohort: { name: undefined }
      } as unknown as IsSetupStepCompleteCohortData)
    ).toBe(false);
  });

  it('returns true if the cohort has a name', () => {
    expect(isNameAndDescriptionComplete(mockCohort)).toBe(true);
  });
});
