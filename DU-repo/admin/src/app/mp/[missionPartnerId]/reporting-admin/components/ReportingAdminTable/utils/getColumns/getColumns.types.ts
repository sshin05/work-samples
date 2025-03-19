import { type NotifyOptions } from '@cerberus/react';
import { type FetchResult } from '@apollo/client';
import type {
  DownloadType,
  MissionPartner,
  CreateExportByTypeAndMissionPartnerIdMutation
} from '@/api/codegen/graphql';
import { type TableProps } from '../../ReportingAdminTable.types';

export type EditOptions = {
  onDelete?: TableProps['onDelete'];
};

export type EnabledReport = {
  missionPartnerId: MissionPartner['id'];
  missionPartnerName?: MissionPartner['name'];
  reportId: DownloadType;
  reportName: string;
};

export interface ReportColumn {
  header: string;
  id: string;
  accessorKey: string;
  enableSorting: boolean;
  cell: (info: unknown) => React.JSX.Element;
}

export interface ColumnOptions {
  enabledReports: { id: string; name: string }[];
  handleEnableReports: (reportIds: string[]) => Promise<void>;
  handleDisableReports: (reportIds: string[]) => Promise<void>;
  createReportDownloadHandler: (
    reportDetail: EnabledReport
  ) => () => Promise<void>;
  createExportByTypeAndMissionPartnerId: (
    downloadType: string,
    missionPartnerId: string
  ) => Promise<FetchResult<CreateExportByTypeAndMissionPartnerIdMutation>>;
  notify: (option: NotifyOptions) => void;
  missionPartnerId: string;
  isDuAdmin: boolean;
}
