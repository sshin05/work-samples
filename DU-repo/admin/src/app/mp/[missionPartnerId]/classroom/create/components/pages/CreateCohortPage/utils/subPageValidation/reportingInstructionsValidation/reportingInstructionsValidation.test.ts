import dayjs from 'dayjs';
import {
  type CreateCohortState,
  CreateCohortStateInputValidationErrors
} from '../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { reportingInstructionsValidation } from './reportingInstructionsValidation';

describe('reportingInstructionsValidation', () => {
  it.each([null, ''])(
    'should return INVALID_MEETING_END_DATE error when the end date is missing',
    async invalidNameValue => {
      const mockCreateCohortState = {
        name: invalidNameValue,
        description: 'Test description',
        meetingStartDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        meetingEndDate: null,
        environment: 'InPerson'
      } as unknown as CreateCohortState;

      const result = await reportingInstructionsValidation({
        createCohortState: mockCreateCohortState
      });

      expect(result).toEqual({
        success: false,
        error: CreateCohortStateInputValidationErrors.INVALID_MEETING_END_DATE
      });
    }
  );

  it('should return INVALID_MEETING_END_DATE error when the end date is before the start date', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Test description',
      meetingStartDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      meetingEndDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    } as unknown as CreateCohortState;

    const result = await reportingInstructionsValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_MEETING_END_DATE
    });
  });

  it('should return INVALID_MEETING_START_DATE error when the start date is less than the current date', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Test description',
      meetingStartDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      meetingEndDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      environment: 'InPerson'
    } as unknown as CreateCohortState;

    const result = await reportingInstructionsValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE
    });
  });

  it('should return INVALID_MEETING_START_DATE error when the start date is missing', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Test description',
      meetingStartDate: null,
      meetingEndDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      environment: 'InPerson'
    } as unknown as CreateCohortState;

    const result = await reportingInstructionsValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE
    });
  });

  it('should return MISSING_LOCATION error when the environment is InPerson and the location is missing', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Test description',
      meetingStartDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      meetingEndDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      environment: 'InPerson',
      location: null
    } as unknown as CreateCohortState;

    const result = await reportingInstructionsValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: false,
      error: CreateCohortStateInputValidationErrors.MISSING_LOCATION
    });
  });

  it('should return success: true when all required fields are valid', async () => {
    const mockCreateCohortState = {
      name: 'Valid Name',
      description: 'Test description',
      meetingStartDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      meetingEndDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      environment: 'Virtual'
    } as unknown as CreateCohortState;

    const result = await reportingInstructionsValidation({
      createCohortState: mockCreateCohortState
    });

    expect(result).toEqual({
      success: true
    });
  });
});
