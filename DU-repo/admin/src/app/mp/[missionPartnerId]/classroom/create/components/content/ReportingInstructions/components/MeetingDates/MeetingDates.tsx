import { TextInput } from '@/components_new/form';
import { css } from '@cerberus/styled-system/css';
import { flex, vstack } from '@cerberus/styled-system/patterns';
import { type ChangeEvent, useContext } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import dayjs from 'dayjs';

export const MeetingDates = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);
  const startDate = createCohortState?.meetingStartDate?.substring(0, 10);
  const endDate = createCohortState?.meetingEndDate?.substring(0, 10);
  const minDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const maxDate = dayjs().add(10, 'year').format('YYYY-MM-DD');

  const isInvalidStartDate =
    createCohortState.validationError ===
    CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE;
  const isInvalidEndDate =
    createCohortState.validationError ===
    CreateCohortStateInputValidationErrors.INVALID_MEETING_END_DATE;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'meetingStartDate') {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_START_DATE,
        payload: e.target.value
      });
    } else {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_END_DATE,
        payload: e.target.value
      });
    }

    if (isInvalidEndDate || isInvalidStartDate) {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: null
      });
    }
  };

  return (
    <>
      <div className={vstack({ alignItems: 'flex-start', gap: 0 })}>
        <div className={flex({ mb: '4' })}>
          <TextInput
            className={css({
              borderBottomRightRadius: '0px',
              borderTopRightRadius: '0px',
              borderRight: '0px'
            })}
            label="Start date"
            name="meetingStartDate"
            type="date"
            invalid={isInvalidStartDate}
            value={startDate || ''}
            onChange={handleChange}
            min={minDate}
            max={maxDate}
          />
          <TextInput
            className={css({
              borderBottomLeftRadius: '0px',
              borderTopLeftRadius: '0px'
            })}
            label="End date"
            name="meetingEndDate"
            type="date"
            invalid={isInvalidEndDate}
            value={endDate || ''}
            onChange={handleChange}
            min={minDate}
            max={maxDate}
          />
        </div>
        {createCohortState.validationError && (
          <p
            className={css({
              textStyle: 'label-sm',
              mt: 0,
              pt: 0,
              mb: '4',
              color: 'danger.text.100'
            })}
          >
            A valid start and end date are required.
          </p>
        )}
      </div>
      <p>
        Cohorts begin at 9:00 CST on their start date, and conclude at 23:59 CST
        on their end date.
      </p>
    </>
  );
};
