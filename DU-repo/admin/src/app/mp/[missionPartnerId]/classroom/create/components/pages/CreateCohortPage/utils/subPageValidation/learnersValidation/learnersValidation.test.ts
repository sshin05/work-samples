import {
  CreateCohortStateInputValidationErrors,
  type CreateCohortState
} from '../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { learnersValidation } from './learnersValidation';

const emptyArray: string[] = [];

describe('learnersValidation', () => {
  it('should return success: true when learners have been added', async () => {
    const mockCreateCohortState = {
      cohortId: 'validID',
      learners: ['1']
    } as unknown as CreateCohortState;

    const result = await learnersValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: true
    });
  });

  it.each([null, emptyArray])(
    'should return MISSING_LEARNERS error when no learners are assigned',
    async invalidLearnersValue => {
      const mockCreateCohortState = {
        cohortId: 'validID',
        learners: invalidLearnersValue
      } as unknown as CreateCohortState;

      const result = await learnersValidation({
        createCohortState: mockCreateCohortState
      });

      expect(result).toEqual({
        success: false,
        error: CreateCohortStateInputValidationErrors.MISSING_LEARNERS
      });
    }
  );
});
