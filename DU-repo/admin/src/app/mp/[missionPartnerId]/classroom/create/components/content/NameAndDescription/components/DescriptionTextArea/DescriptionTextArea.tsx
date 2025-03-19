import { Field, Label, Textarea } from '@cerberus/react';
import { type ChangeEvent, useContext } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { css } from '@cerberus/styled-system/css';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

const MAX_DESCRIPTION_CHARACTER_COUNT = 300;

export const DescriptionTextArea = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION,
      payload: e.target.value.slice(0, MAX_DESCRIPTION_CHARACTER_COUNT)
    });
  };

  return (
    <Field>
      <Label htmlFor="description">Description</Label>
      <Textarea
        className={css({
          bgColor: 'page.surface.100'
        })}
        describedBy="help:description"
        id="description"
        value={createCohortState.description || ''}
        onChange={handleChange}
      />

      <div
        className={css({
          textAlign: 'left',
          color: 'page.text.100',
          textStyle: 'body-sm',
          mt: 1
        })}
      >
        {(createCohortState.description || '').length} /{' '}
        {MAX_DESCRIPTION_CHARACTER_COUNT}
      </div>
    </Field>
  );
};
