import { type ChangeEvent, useContext } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { css } from '@cerberus/styled-system/css';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { TextArea } from '@/components_new/form';

const MAX_LENGTH = 300;

export const AdditionalInformationTextArea = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_DETAILS,
      payload: e.target.value
    });
  };

  return (
    <TextArea
      className={css({
        bgColor: 'page.surface.100'
      })}
      describedBy="help:additionalInformation"
      name="additionalInformation"
      label="Additional Information (optional)"
      value={createCohortState.meetingDetails || ''}
      onChange={handleChange}
      inputLength={createCohortState.meetingDetails?.length}
      maxLength={MAX_LENGTH}
      helpText="Meeting times, access details, etc."
    />
  );
};
