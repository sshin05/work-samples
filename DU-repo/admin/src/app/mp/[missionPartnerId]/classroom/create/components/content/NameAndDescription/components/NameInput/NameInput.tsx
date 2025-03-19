import { Field, FieldMessage, Input, Label, Show } from '@cerberus/react';
import { type ChangeEvent, useContext } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { css } from '@cerberus/styled-system/css';

const getInputErrorMessage = (
  validationError: CreateCohortStateInputValidationErrors
): string => {
  const isMissingName =
    validationError === CreateCohortStateInputValidationErrors.MISSING_NAME;
  if (isMissingName) {
    return 'A cohort name is required.';
  }

  const isDuplicateName =
    validationError === CreateCohortStateInputValidationErrors.DUPLICATE_NAME;
  if (isDuplicateName) {
    return 'This cohort name is already in use.';
  }

  const isInvalidName =
    validationError === CreateCohortStateInputValidationErrors.INVALID_NAME;
  if (isInvalidName) {
    return 'Cohort name can only contain spaces and alpha-numeric characters. It should be 65 characters or less.';
  }

  return '';
};

export const NameInput = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const invalidErrorMessage = getInputErrorMessage(
    createCohortState.validationError
  );

  const isInvalid = Boolean(invalidErrorMessage);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
      payload: e.target.value
    });

    if (isInvalid) {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: null
      });
    }
  };

  return (
    <Field invalid={isInvalid}>
      <Label htmlFor="cohort name">Name</Label>
      <Input
        className={css({
          bgColor: 'page.surface.100'
        })}
        describedBy="help:cohort name"
        id="cohort name"
        type="text"
        value={createCohortState.name || ''}
        onChange={handleChange}
      />
      <Show when={isInvalid}>
        <FieldMessage id="help:cohort name">{invalidErrorMessage}</FieldMessage>
      </Show>
    </Field>
  );
};
