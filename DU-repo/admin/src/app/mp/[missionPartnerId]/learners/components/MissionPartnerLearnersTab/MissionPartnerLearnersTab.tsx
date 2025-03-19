'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  useNotificationCenter,
  useModal,
  Modal,
  trapFocus
} from '@cerberus/react';
import {
  useFindUserById,
  type UseFindUserByIdResult
} from '@/api/users/useFindUserById';
import { useFindAwardedBadges } from '@/api/user/useFindAwardedBadges';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { AddUsersToMissionPartner } from './AddUsersToMissionPartner';
import type { MissionPartnerLearnersTabProps } from './MissionPartnerLearnersTab.types';
import { buildLearnersColumns } from '../MissionPartnerLearnersTab/useLearnersColumns';
import { LearnerSideDrawer } from '../LearnerSideDrawer';

const columns = buildLearnersColumns([]);

const MpLearnersTableContent = dynamic(
  () => import('./MpLearnersTableContent'),
  {
    ssr: false,
    loading: () => <TableLoader buttonContent="Learner" columns={columns} />
  }
);

const MissionPartnerLearnersTab = ({
  missionPartnerId,
  refetchInitialCount
}: MissionPartnerLearnersTabProps) => {
  const { notify } = useNotificationCenter();
  const [currentLearnerForSideDrawer, setCurrentLearnerForSideDrawer] =
    useState<null | { userId: string; viewLearnerDetailsPath: string }>({
      userId: '',
      viewLearnerDetailsPath: ''
    });
  const [isExpanded, setIsExpanded] = useState(false);
  const { userByIdLoading, userById, userByIdError }: UseFindUserByIdResult =
    useFindUserById(currentLearnerForSideDrawer?.userId);
  const { awardedBadges, awardedBadgesLoading } = useFindAwardedBadges(
    currentLearnerForSideDrawer?.userId
  );
  const addMemberModal = useModal();
  const handleKeyDownOnAddMemberModal = trapFocus(addMemberModal.modalRef);

  const callLearnerSideDrawer = data => {
    const { userId, viewLearnerDetailsPath } = data;
    if (isExpanded) {
      setIsExpanded(false);
      setCurrentLearnerForSideDrawer(null);
    } else {
      setCurrentLearnerForSideDrawer({ userId, viewLearnerDetailsPath });
      setIsExpanded(true);
    }
  };

  const resetSideDrawer = () => {
    setIsExpanded(false);
    setCurrentLearnerForSideDrawer(null);
  };

  return (
    <>
      <MpLearnersTableContent
        missionPartnerId={missionPartnerId}
        refetchInitialCount={refetchInitialCount}
        handleShowModal={addMemberModal.show}
        callLearnerSideDrawer={callLearnerSideDrawer}
      />
      <Modal
        onKeyDown={handleKeyDownOnAddMemberModal}
        ref={addMemberModal.modalRef}
      >
        {addMemberModal.isOpen && (
          <AddUsersToMissionPartner
            onClose={addMemberModal.close}
            missionPartnerId={missionPartnerId}
            notify={notify}
            onUsersAdded={() => {
              refetchInitialCount();
            }}
          />
        )}
      </Modal>
      <LearnerSideDrawer
        userById={userById}
        isLoading={userByIdLoading}
        isError={Boolean(userByIdError)}
        isOpen={isExpanded}
        onClose={resetSideDrawer}
        viewLearnerDetailsPath={
          currentLearnerForSideDrawer?.viewLearnerDetailsPath
        }
        awardedBadges={awardedBadges}
        awardedBadgesLoading={awardedBadgesLoading}
      />
    </>
  );
};

export default MissionPartnerLearnersTab;
