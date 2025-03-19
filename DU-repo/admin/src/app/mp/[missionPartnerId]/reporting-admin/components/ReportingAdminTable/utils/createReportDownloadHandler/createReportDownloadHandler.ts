import {
  type CreateReportDownloadHandler,
  type CreateReportDownloadHandlerReturn
} from './createReportDownloadHandler.types';

export const createReportDownloadHandler = ({
  createExportByTypeAndMissionPartnerId,
  notificationHandler,
  reportDetail,
}: CreateReportDownloadHandler): CreateReportDownloadHandlerReturn => {
  return async () => {
    try {
      const { reportId, missionPartnerId } = reportDetail.reportDetail;
      await createExportByTypeAndMissionPartnerId(
        reportId,
        missionPartnerId 
      );

      notificationHandler({
        palette: 'success',
        heading: 'Success',
        description: `The export has been started. You will receive an email when it is ready.`
      });
    } catch {
      notificationHandler({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error exporting transcripts.'
      });
    }
  };
};
