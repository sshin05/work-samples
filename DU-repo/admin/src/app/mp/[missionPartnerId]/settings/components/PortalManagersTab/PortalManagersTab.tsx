import { Modal, trapFocus, useModal } from '@cerberus/react';
import { useFindRolesByMissionPartnerId } from '@/api/role';
import { NewPortalManagerModalContent } from './components/NewPortalManagerModalContent';
import { MissionPartnerUsersTable } from './components/MissionPartnerUsersTable';
import { css } from '@cerberus/styled-system/css';

export const PortalManagersTab = ({ missionPartner, loading, myUser }) => {
  const newPortalManagerModal = useModal();
  const handleKeyDown = trapFocus(newPortalManagerModal.modalRef);

  const { roleUserInfoData, refetchRoleUserInfo } =
    useFindRolesByMissionPartnerId(missionPartner?.id);

  return (
    <div className={css({ w: 'full' })}>
      <MissionPartnerUsersTable
        users={roleUserInfoData}
        missionPartner={missionPartner}
        myUser={myUser}
        loading={loading}
        showNewPortalManagerModal={newPortalManagerModal.show}
      />
      <Modal
        className={css({ minW: '40rem' })}
        onKeyDown={handleKeyDown}
        ref={newPortalManagerModal.modalRef}
      >
        {newPortalManagerModal.isOpen && (
          <NewPortalManagerModalContent
            onClose={() => {
              newPortalManagerModal.close();
              refetchRoleUserInfo(missionPartner?.id);
            }}
            missionPartner={missionPartner}
          />
        )}
      </Modal>
    </div>
  );
};
