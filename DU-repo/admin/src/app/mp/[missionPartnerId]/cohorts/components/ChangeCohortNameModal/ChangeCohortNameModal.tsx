import { useState } from 'react';
import { useUpdateGroup } from '@/api/groups';
import { hstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { TextInput } from '@/components_new/form';

export const ChangeCohortNameModal = ({
  changeCohortNameModal,
  title,
  onClose,
  group
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [groupName, setGroupName] = useState(group.name);
  const { updateGroup, updateGroupLoading } = useUpdateGroup();

  const updateGroupName = async () => {
    await updateGroup(group.id, groupName, group.missionPartnerId);
    onClose(true);
  };

  const onInputChange = event => {
    setGroupName(event.target.value);
    if (event.target.value.length > 0 && event.target.value !== group.name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleKeyPress = event => {
    if (
      event.target.value.length > 0 &&
      event.target.value !== group.name &&
      event.key === 'Enter'
    ) {
      updateGroupName();
    }
  };

  return (
    <CustomModal
      customModal={changeCohortNameModal}
      title={title}
      onClose={() => onClose(false)}
    >
      <TextInput
        aria-label="group-name-input"
        name="group-name-input"
        placeholder="Enter a new group name"
        value={groupName}
        label="Cohort Name"
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        required
      />
      <div className={hstack({ gap: '4', mt: '8' })}>
        <Button
          palette="action"
          shape="rounded"
          usage="filled"
          type="submit"
          disabled={buttonDisabled || updateGroupLoading}
          onClick={updateGroupName}
        >
          Save
        </Button>
        <Button
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
      </div>
    </CustomModal>
  );
};
