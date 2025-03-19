import { Checkbox } from '@digital-u/digital-ui';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { useState } from 'react';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { css } from '@cerberus/styled-system/css';
// import { useDeleteGroupMemberTrainingPlans } from '@/api/training-plan';

export const RemoveCohortMemberModal = ({
  onSubmit,
  groupMembers,
  groupId,
  removeCohortMemberModal
}) => {
  // IGNORE COMMENTS, REQUIRE FUTURE API CHANGES TO REMOVE TRAININGPLANS

  const [removeTrainingPlans, setRemoveTrainingPlans] = useState(false);

  // const { deleteGroupMemberTrainingPlans } = useDeleteGroupMemberTrainingPlans(
  //   groupMembers,
  //   groupId
  // );

  const handleOnCheckboxMarked = event => {
    const { checked } = event.target;

    // todo: the old checkbox was an html checkbox, requiring `checked` and `value`; but we're only using boolean values in most all API calls
    setRemoveTrainingPlans(checked);
  };

  const handleOnSubmit = () => {
    onSubmit(groupId, groupMembers);
    // if (removeTrainingPlans) {
    //   deleteGroupMemberTrainingPlans(groupMembers, groupId);
    // }

    handleOnClose();
  };

  const handleOnClose = () => {
    setRemoveTrainingPlans(false);
    removeCohortMemberModal.close();
  };

  return (
    <CustomModal
      customModal={removeCohortMemberModal}
      title="Are you sure?"
      onClose={handleOnClose}
    >
      <div className={vstack({ gap: '6', alignItems: 'flex-start' })}>
        <p>
          Remove{' '}
          <strong>{`${groupMembers?.length} User${
            groupMembers?.length > 1 ? 's' : ''
          }`}</strong>{' '}
          from the group?
        </p>
        <Checkbox
          label={`Also remove training plans from user${
            groupMembers?.length > 1 ? 's' : ''
          }`}
          name=""
          value={removeTrainingPlans}
          onChange={handleOnCheckboxMarked}
        />
      </div>
      <div
        className={hstack({
          w: 'full',
          justifyContent: 'space-between',
          mt: '8'
        })}
      >
        <Button
          className={css({ w: 'full' })}
          palette="action"
          usage="filled"
          onClick={handleOnSubmit}
        >
          Yes, remove
        </Button>
        <Button
          className={css({ w: 'full' })}
          palette="action"
          usage="outlined"
          onClick={handleOnClose}
        >
          No, keep learner
        </Button>
      </div>
    </CustomModal>
  );
};
