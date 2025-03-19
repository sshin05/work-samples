import { type FetchResult } from '@apollo/client';
import { type NotificationsValue } from '@cerberus/react';
import type {
  DownloadType,
  CreateExportByTypeAndMissionPartnerIdMutation
} from '@/api/codegen/graphql';
import { type EnabledReport } from '../getColumns/getColumns.types';

export type CreateReportDownloadHandler = {
  createExportByTypeAndMissionPartnerId: (
    downloadType: DownloadType,
    missionPartnerId: string
  ) => Promise<FetchResult<CreateExportByTypeAndMissionPartnerIdMutation>>;
  notificationHandler: NotificationsValue['notify'];
  reportDetail: { reportDetail: EnabledReport };
};

export type CreateReportDownloadHandlerReturn = () => Promise<void>;
