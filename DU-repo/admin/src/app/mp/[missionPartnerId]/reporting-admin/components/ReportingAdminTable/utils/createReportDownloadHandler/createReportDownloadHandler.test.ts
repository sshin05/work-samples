import { createReportDownloadHandler } from '.';
import { DownloadType } from '@/api/codegen/graphql';
import { type CreateReportDownloadHandler } from './createReportDownloadHandler.types';

describe('createReportDownloadHandler', () => {
  const getCreateReportDownloadHandlerArguments =
    (): CreateReportDownloadHandler => ({
      createExportByTypeAndMissionPartnerId: jest.fn(),
      notificationHandler: jest.fn(),
      reportDetail: {
        reportDetail: {
          missionPartnerId: 'MOCK_MISSION_PARTNER_ID',
          missionPartnerName: 'MOCK_MISSION_PARTNER_NAME',
          reportId: DownloadType.MissionPartnerLearnerActivityEvents,
          reportName: 'MISSION_PARTNER_LEARNER_ACTIVITY_EVENTS'
        }
      }
    });

  test('the returned handler calls the delete method with the expected arguments', () => {
    const args = getCreateReportDownloadHandlerArguments();
    const handler = createReportDownloadHandler(args);

    handler();

    expect(args.createExportByTypeAndMissionPartnerId).toHaveBeenCalledWith(
      args.reportDetail.reportDetail.reportId,
      args.reportDetail.reportDetail.missionPartnerId
    );
  });

  describe('notification display', () => {
    it('triggers the success notification', async () => {
      const args = getCreateReportDownloadHandlerArguments();
      const handler = createReportDownloadHandler(args);

      await handler();

      expect(args.notificationHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Success'
        })
      );
      expect(args.notificationHandler).not.toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Error'
        })
      );
    });

    it('triggers the error notification', async () => {
      const args = {
        ...getCreateReportDownloadHandlerArguments(),
        createExportByTypeAndMissionPartnerId: jest
          .fn()
          .mockImplementation(() => {
            throw new Error('Mock Error');
          })
      };
      const handler = createReportDownloadHandler(args);

      await handler();

      expect(args.notificationHandler).not.toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Success'
        })
      );
      expect(args.notificationHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Error'
        })
      );
    });
  });
});
