import { SearchLocate } from '@carbon/icons-react';
import { CardContainer } from '../CardContainer/CardContainer';
import { useNotificationCenter } from '@cerberus/react';
import { useContext, useState } from 'react';
import { AddLearnerModal } from '@/app/mp/[missionPartnerId]/classroom/components/AddLearnerModal/AddLearnerModal';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';

export const AddSingleLearner = () => {
  const { notify } = useNotificationCenter();
  const [showAddLearnerModal, setShowAddLearnerModal] =
    useState<boolean>(false);

  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);

  const handleAddLearner = (cohortMember: CohortMemberData) => {
    updateCohortState({
      type: CreateCohortStateReducerActionTypes.ADD_LEARNER,
      payload: cohortMember
    });
  };

  return (
    <>
      <CardContainer
        title="Add an individual"
        description="Add one learner at a time"
        Icon={SearchLocate}
        onClick={() => setShowAddLearnerModal(true)}
      />

      {showAddLearnerModal && (
        <AddLearnerModal
          cohortId={createCohortState.id}
          displayModal={showAddLearnerModal}
          onClose={() => setShowAddLearnerModal(false)}
          onSuccess={cohortMember => {
            handleAddLearner(cohortMember);
            notify({
              palette: 'success',
              heading: 'Success',
              description: 'Learner has been added.'
            });
          }}
          onError={() => {
            notify({
              palette: 'danger',
              heading: 'Error',
              description: 'There was an error adding the member.'
            });
          }}
        />
      )}
    </>
  );
};
