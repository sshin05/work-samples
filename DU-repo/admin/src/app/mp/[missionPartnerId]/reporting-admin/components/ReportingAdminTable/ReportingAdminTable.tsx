'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useNotificationCenter } from '@cerberus/react';
import {
  useCreateExportsByTypeAndMissionPartnerId,
  useDisableExportsByTypesForMissionPartnerId,
  useEnableExportsByTypesForMissionPartnerId,
  useFindAllMissionPartnersAdminPortal,
  useGetPublicMissionPartnerExports
} from '@/api/mission-partner';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { LocalTable } from '@/components_new/table/LocalTable';
import { createReportDownloadHandler } from './utils/createReportDownloadHandler';
import { getColumns } from './utils/getColumns';

const ReportingAdminTable = ({ missionPartnerId }) => {
  const { notify } = useNotificationCenter();
  const { isDuAdmin } = useIsDuAdmin();

  const [enabledReports, setEnabledReports] = useState([]);

  const { missionPartners, missionPartnersLoading } =
    useFindAllMissionPartnersAdminPortal();
  const {
    enableExportsByTypesForMissionPartner,
    enableExportsByTypesForMissionPartnerData
  } = useEnableExportsByTypesForMissionPartnerId();
  const {
    disableExportsByTypesForMissionPartner,
    disableExportsByTypesForMissionPartnerData
  } = useDisableExportsByTypesForMissionPartnerId();
  const {
    getPublicMissionPartnerExportsData: exports,
    getPublicMissionPartnerExportsLoading
  } = useGetPublicMissionPartnerExports(missionPartnerId);

  useEffect(() => {
    // initial page load, set enabledReports based on currentMissionPartner.enabledReports
    if (missionPartners && !missionPartnersLoading) {
      const currentMissionPartner = missionPartners.find(
        mp => mp.id === missionPartnerId
      );

      if (currentMissionPartner) {
        setEnabledReports(currentMissionPartner.enabledReports || []);
      }
    }
  }, [missionPartners, missionPartnersLoading, missionPartnerId]);

  useEffect(() => {
    // trigger when enableExportsByTypesForMissionPartnerData changes
    if (enableExportsByTypesForMissionPartnerData) {
      setEnabledReports(
        enableExportsByTypesForMissionPartnerData.enabledReports
      );
    }
  }, [enableExportsByTypesForMissionPartnerData]);

  useEffect(() => {
    // trigger when disableExportsByTypesForMissionPartnerData changes
    if (disableExportsByTypesForMissionPartnerData) {
      setEnabledReports(
        disableExportsByTypesForMissionPartnerData.enabledReports
      );
    }
  }, [disableExportsByTypesForMissionPartnerData]);

  const { createExportByTypeAndMissionPartnerId } =
    useCreateExportsByTypeAndMissionPartnerId();

  const handleEnableReports = useCallback(
    async (reportIds: string[]) => {
      await enableExportsByTypesForMissionPartner(reportIds, missionPartnerId);
    },
    [enableExportsByTypesForMissionPartner, missionPartnerId]
  );

  const handleDisableReports = useCallback(
    async (reportIds: string[]) => {
      await disableExportsByTypesForMissionPartner(reportIds, missionPartnerId);
    },
    [disableExportsByTypesForMissionPartner, missionPartnerId]
  );

  const createDownloadHandler = useCallback(
    reportDetail =>
      createReportDownloadHandler({
        createExportByTypeAndMissionPartnerId,
        notificationHandler: notify,
        reportDetail
      }),
    [createExportByTypeAndMissionPartnerId, notify]
  );

  const columnOptions = {
    enabledReports,
    handleEnableReports,
    handleDisableReports,
    createReportDownloadHandler: createDownloadHandler,
    createExportByTypeAndMissionPartnerId,
    notify,
    missionPartnerId,
    isDuAdmin
  };
  const columns = getColumns('report', columnOptions, false);

  return (
    <LocalTable
      columns={columns}
      data={isDuAdmin ? exports : enabledReports}
      loading={missionPartnersLoading}
      hasToolbar={false}
      pageLoading={
        getPublicMissionPartnerExportsLoading || missionPartnersLoading
      }
    />
  );
};

export default ReportingAdminTable;
