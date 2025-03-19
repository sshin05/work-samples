import { useExportTrainingPlanCoursesForMissionPartner } from '@/api/mission-partner';
import { useNotificationCenter } from '@cerberus/react';
import { useCallback } from 'react';

export const useHandleDownloadClick = ({
  exportState,
  missionPartnerId,
  missionPartnerName
}) => {
  const { notify } = useNotificationCenter();
  const { exportTrainingPlanCoursesForMissionPartner } =
    useExportTrainingPlanCoursesForMissionPartner();

  return useCallback(async () => {
    const statusLabels = {
      markedCompleted: 'Marked Completed',
      pendingReview: 'Pending Review'
    };

    const tempStatus =
      statusLabels[exportState.status] ||
      (exportState.status
        ? exportState.status[0].toUpperCase() + exportState.status.slice(1)
        : undefined);

    exportTrainingPlanCoursesForMissionPartner({
      variables: {
        missionPartnerId,
        missionPartnerName,
        vendorName: exportState.vendorName,
        status: tempStatus
      }
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description:
            'The export has been started. You will receive an email when it is ready.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting courses.'
        });
      });
  }, [
    exportState,
    missionPartnerId,
    missionPartnerName,
    exportTrainingPlanCoursesForMissionPartner,
    notify
  ]);
};
