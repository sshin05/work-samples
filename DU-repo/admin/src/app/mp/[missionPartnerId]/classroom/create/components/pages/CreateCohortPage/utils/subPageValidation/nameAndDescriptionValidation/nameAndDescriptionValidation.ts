import { CreateCohortStateInputValidationErrors } from '../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import type { ValidateInputForStepArguments } from '../../../CreateCohortPage.types';
import { getHasDuplicateName } from '../utils/hasDuplicateName/hasDuplicateName';

export const MAX_NAME_LENGTH = 65;
const getIsInvalidName = (nameValue: string): boolean => {
  const alphanumericWithSpacesRegex = /^[a-zA-Z0-9 ]*$/;

  return (
    nameValue.length > MAX_NAME_LENGTH ||
    !alphanumericWithSpacesRegex.test(nameValue)
  );
};

/** Validates the required fields have been completed before allowing user to proceed to the next setup step */
export const nameAndDescriptionValidation = async ({
  createCohortState,
  missionPartnerId
}: ValidateInputForStepArguments) => {
  const hasDuplicate = await getHasDuplicateName(
    createCohortState.name,
    missionPartnerId,
    createCohortState.id
  );

  if (hasDuplicate) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.DUPLICATE_NAME
    };
  }

  const isMissingName = !createCohortState?.name;
  if (isMissingName) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.MISSING_NAME
    };
  }

  const isInvalidName = getIsInvalidName(createCohortState?.name);
  if (isInvalidName) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_NAME
    };
  }

  return {
    success: true
  };
};
