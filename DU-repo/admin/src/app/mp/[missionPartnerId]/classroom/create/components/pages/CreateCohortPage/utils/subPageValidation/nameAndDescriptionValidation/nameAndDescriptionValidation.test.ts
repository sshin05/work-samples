import {
  type CreateCohortState,
  CreateCohortStateInputValidationErrors
} from '../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { nameAndDescriptionValidation } from './nameAndDescriptionValidation';

jest.mock('../utils/hasDuplicateName/hasDuplicateName', () => {
  return {
    getHasDuplicateName: jest.fn()
  };
});

describe('nameAndDescriptionValidation', () => {
  it('should return success: true when name and description are valid', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Valid description'
    } as unknown as CreateCohortState;

    const result = await nameAndDescriptionValidation({
      createCohortState: mockCreateCohortState,
      missionPartnerId: 'mock-mp-id'
    });

    expect(result).toEqual({
      success: true
    });
  });

  it.each([null, ''])(
    'should return MISSING_NAME error when name is missing',
    async invalidNameValue => {
      const mockCreateCohortState = {
        name: invalidNameValue,
        description: 'Test description'
      } as unknown as CreateCohortState;

      const result = await nameAndDescriptionValidation({
        createCohortState: mockCreateCohortState,
        missionPartnerId: 'mock-mp-id'
      });

      expect(result).toEqual({
        success: false,
        error: CreateCohortStateInputValidationErrors.MISSING_NAME
      });
    }
  );

  it('should fail when the name contains non-alphaNumeric characters', async () => {
    const mockCreateCohortState = {
      name: 'Invalid Name!!!!',
      description: ''
    } as unknown as CreateCohortState;

    const result = await nameAndDescriptionValidation({
      createCohortState: mockCreateCohortState,
      missionPartnerId: 'mock-mp-id'
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_NAME
    });
  });

  it('should fail when the name is longer than 65 characters', async () => {
    const invalidName =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse';

    expect(invalidName.length).toBe(68);

    const mockCreateCohortState = {
      name: invalidName,
      description: 'Valid description'
    } as unknown as CreateCohortState;

    const result = await nameAndDescriptionValidation({
      createCohortState: mockCreateCohortState,
      missionPartnerId: 'mock-mp-id'
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_NAME
    });
  });
});
