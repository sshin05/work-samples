import { type DeleteReport } from './deleteReport.types';

export const deleteReport = ({
  deleteHandler,
  notificationHandler,
  reportType
}: DeleteReport): ((id: string) => Promise<void>) => {
  return async (id: string) => {
    try {
      await deleteHandler(id);

      notificationHandler({
        palette: 'success',
        heading: 'Success',
        description: `The ${reportType} has been deleted.`
      });
    } catch {
      notificationHandler({
        palette: 'danger',
        heading: 'Error',
        description: `Error trying to delete the ${reportType}.`
      });
    }
  };
};
