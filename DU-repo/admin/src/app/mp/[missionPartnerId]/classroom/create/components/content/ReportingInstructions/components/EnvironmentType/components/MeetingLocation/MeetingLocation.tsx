import { type ChangeEvent, useContext } from 'react';
import { CreateCohortContext } from '../../../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from '../../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { css } from '@cerberus/styled-system/css';
import { TextInput } from '@/components_new/form';

export const MeetingLocation = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const isMissingMeetingLocation =
    createCohortState.validationError ===
    CreateCohortStateInputValidationErrors.MISSING_LOCATION;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.UPDATE_LOCATION,
      payload: e.target.value
    });

    if (isMissingMeetingLocation) {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: null
      });
    }
  };

  return (
    <TextInput
      className={css({
        bgColor: 'page.surface.100'
      })}
      type="text"
      name="location"
      label="Meeting Location"
      value={createCohortState.location || ''}
      onChange={handleChange}
      required
      invalid={isMissingMeetingLocation}
      errorMessage={
        createCohortState.validationError
          ? 'A meeting location is required.'
          : null
      }
    />
  );
};
