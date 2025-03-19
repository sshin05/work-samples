import { flex } from '@cerberus/styled-system/patterns';
import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { SubPageContainer } from '../SubPageContainer/SubPageContainer';
import { AddMultipleLearners } from './components/AddMultipleLearners/AddMultipleLearners';
import { AddSingleLearner } from './components/AddSingleLearner/AddSingleLearner';
import { css } from '@cerberus/styled-system/css';
import { useContext, useEffect } from 'react';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../providers/CreateCohortProvider/CreateCohortProvider.types';

export const LearnersContentPage = (
  createCohortSubPageDetail: CreateCohortContentComponentProps
) => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  useEffect(() => {
    if (createCohortState.learners.length > 0) {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: null
      });
    }
  }, [createCohortState.learners, updateCohortState]);

  return (
    <SubPageContainer createCohortSubPageDetail={createCohortSubPageDetail}>
      <div className={flex({ gap: 6 })}>
        <div className={css({ w: '1/2 ' })}>
          <AddMultipleLearners />
        </div>
        <div className={css({ w: '1/2' })}>
          <AddSingleLearner />
        </div>
      </div>

      {createCohortState?.validationError && (
        <p
          className={css({
            textStyle: 'label-sm',
            mt: 4,
            pt: 0,
            color: 'danger.text.100'
          })}
        >
          At least one learner is required.
        </p>
      )}
    </SubPageContainer>
  );
};
