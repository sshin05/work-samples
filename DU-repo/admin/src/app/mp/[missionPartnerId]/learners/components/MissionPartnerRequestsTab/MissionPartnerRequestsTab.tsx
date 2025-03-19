import { useState } from 'react';
import { useModal, useNotificationCenter } from '@cerberus/react';
import { useRouter } from 'next/navigation';
import { ViewMissionPartnerRequestModal } from './components/ViewMissionPartnerRequestsModal';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { buildRequestsColumns } from './buildRequestsColumns';

const MissionPartnerRequestsTab = ({
  missionPartnerId,
  missionPartnerName,
  loading
}: {
  loading?: boolean;
  missionPartnerId: string;
  missionPartnerName: string;
}) => {
  const router = useRouter();
  const { findOpenForMissionPartnerData, findOpenForMissionPartnerLoading } =
    useFindOpenForMissionPartner(missionPartnerId);

  const { notify } = useNotificationCenter();
  const viewRequestModal = useModal();
  const [userId, setUserId] = useState();
  const [missionPartnerRequestId, setMissionPartnerRequestId] = useState();

  const data = findOpenForMissionPartnerData?.map(request => {
    const dateRequestedAt = request.requestedAt
      ? new Date(request.requestedAt)
      : null;

    return {
      name: `${request.userFirstName} ${request.userLastName}`,
      type: 'Mission Partner Request',
      date: dateRequestedAt,
      formattedDate: request.requestedAt
        ? abbreviatedDayDate(request.requestedAt)
        : null,
      viewRequest: 'View request',
      missionPartnerId: request.missionPartnerId,
      userId: request.userId
    };
  });

  const handleOpenModal = (missionPartnerId, userId) => {
    viewRequestModal.show();
    setUserId(userId);
    setMissionPartnerRequestId(missionPartnerId);
  };

  return (
    <>
      <LocalTable
        data={data}
        columns={buildRequestsColumns(
          handleOpenModal,
          router,
          missionPartnerName
        )}
        noDataMessage={
          <NoDataMessage
            message={`When a learner has requested to join ${
              missionPartnerName ?? 'the mission partner'
            }, their request will appear here.`}
          />
        }
        searchPlaceholder="Search by name, type or status"
        toolbarType="search"
        loading={loading || findOpenForMissionPartnerLoading}
      />
      <ViewMissionPartnerRequestModal
        viewRequestModal={viewRequestModal}
        missionPartnerId={missionPartnerRequestId}
        userId={userId}
        onClose={viewRequestModal.close}
        notify={notify}
      />
    </>
  );
};

export default MissionPartnerRequestsTab;
