import { useSQLMutation } from '@/app/api';
import { sqlRemoveCohortMember } from '@/app/api/cohorts';
import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { CloseOutline } from '@cerberus/icons';
import { useConfirmModal } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { useCallback } from 'react';

function RemoveMemberModal({
  user,
  cohortId,
  onSuccess,
  onError
}: {
  user: CohortMemberData;
  cohortId: string;
  onSuccess: () => void;
  onError: () => void;
}) {
  const confirm = useConfirmModal();

  const { mutation: removeCohortMember } = useSQLMutation(
    sqlRemoveCohortMember
  );

  const handleConfirm = useCallback(async () => {
    const handleRemoveMember = async () => {
      try {
        await removeCohortMember({
          userId: user.id,
          cohortId
        });

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        if (onError) {
          onError();
        }
      }
    };

    const consent = await confirm.show({
      kind: 'destructive',
      heading: `Remove ${user.firstName} ${user.lastName}?`,
      description:
        'After removal, learners must be manually re-entered to restore.',
      actionText: 'Confirm',
      cancelText: 'Cancel'
    });

    if (consent === true) {
      handleRemoveMember();
    }
  }, [confirm, user, cohortId, removeCohortMember, onError, onSuccess]);

  return (
    <span
      className={hstack({ py: '3', px: '6', w: 'full' })}
      onClick={handleConfirm}
    >
      <CloseOutline size={16} />
      <span>Remove from class</span>
    </span>
  );
}

export { RemoveMemberModal };
