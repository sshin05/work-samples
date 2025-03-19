import { type FetchResult } from '@apollo/client';
import { type NotificationsValue } from '@cerberus/react';
import { type DeleteDownloadMutation } from '@/api/codegen/graphql';

type ReportType = 'download' | 'upload';

export type DeleteReport = {
  deleteHandler: (id: string) => Promise<FetchResult<DeleteDownloadMutation>>;
  notificationHandler: NotificationsValue['notify'];
  reportType: ReportType;
};
