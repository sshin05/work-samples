import { Csv } from '@carbon/icons-react';
import { CardContainer } from '../CardContainer/CardContainer';
import { useContext, useState } from 'react';
import { AddLearnersModal } from '@/app/mp/[missionPartnerId]/classroom/components/AddLearnersModal/AddLearnersModal';
import type { MemberData } from '@/app/mp/[missionPartnerId]/classroom/components/AddLearnersModal/AddLearnersModal.types';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

export const AddMultipleLearners = () => {
  const { updateCohortState } = useContext(CreateCohortContext);
  const [showAddLearnersModal, setShowAddLearnersModal] =
    useState<boolean>(false);

  const handleAddLearnersSuccess = (cohortMembers: MemberData[]): void => {
    setShowAddLearnersModal(false);

    cohortMembers.forEach(cohortMember => {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.ADD_LEARNER,
        payload: cohortMember
      });
    });
  };

  return (
    <>
      <CardContainer
        title="Bulk Add"
        description="Use a .csv template to upload many learners at once"
        Icon={Csv}
        onClick={() => setShowAddLearnersModal(true)}
      />
      <AddLearnersModal
        displayModal={showAddLearnersModal}
        onSuccess={handleAddLearnersSuccess}
        onClose={() => setShowAddLearnersModal(false)}
      />
    </>
  );
};
