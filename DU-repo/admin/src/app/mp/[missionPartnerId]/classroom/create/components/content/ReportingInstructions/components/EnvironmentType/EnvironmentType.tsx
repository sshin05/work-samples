import {
  Field,
  Fieldset,
  FieldsetLabel,
  Legend,
  Radio,
  Tooltip
} from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { useContext, type ChangeEvent } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { MeetingLocation } from './components/MeetingLocation';
import { css } from '@cerberus/styled-system/css';

export const EnvironmentType = () => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT,
      payload: e.target.value
    });
  };

  return (
    <div className={css({ gap: 0, mb: '8', mt: '8' })}>
      <Field>
        <Fieldset
          className={hstack({
            gap: '4',
            rounded: 'xl',
            mb: '8'
          })}
          name="environment"
          role="radiogroup"
        >
          <Legend>Where is it located?</Legend>
          <Radio
            className={css({
              bgColor: 'page.surface.100'
            })}
            id="Virtual"
            name="environment"
            value="Virtual"
            onChange={handleChange}
            defaultChecked={
              createCohortState.environment === 'Virtual' ||
              !createCohortState.environment
            }
          >
            <FieldsetLabel htmlFor="Virtual">Virtual</FieldsetLabel>
          </Radio>
          <Tooltip content="Coming Soon">
            {/* additional Field is here to give disabled attribute. Can be removed once Location field is implemented */}
            <Field disabled>
              <Radio
                className={css({
                  bgColor: 'page.surface.100'
                })}
                id="InPerson"
                name="environment"
                value="InPerson"
                onChange={handleChange}
                defaultChecked={createCohortState.environment === 'InPerson'}
              >
                <FieldsetLabel htmlFor="InPerson">In-person</FieldsetLabel>
              </Radio>
            </Field>
          </Tooltip>
        </Fieldset>
      </Field>
      {createCohortState.environment === 'InPerson' && <MeetingLocation />}
    </div>
  );
};
