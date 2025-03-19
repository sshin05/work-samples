'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { vstack } from '@cerberus/styled-system/patterns';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import ContentArea from '@/components_new/layout/ContentArea';
import { BackArrowButton } from '@/components_new/buttons/BackArrowButton';
import { PageHeaderLoader } from '@/components_new/loaders/PageHeaderLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';
import { TableLoader } from '@/components_new/loaders/TableLoader';

const PlanMetricsPageHeader = dynamic(
  () => import('./components/PlanMetricsPageHeader/PlanMetricsPageHeader'),
  {
    ssr: false,
    loading: () => <PageHeaderLoader name="Plans" />
  }
);

const PlanMetricsTable = dynamic(
  () => import('../PlanMetricsTable/PlanMetricsTable'),
  {
    ssr: false,
    loading: () => (
      <TableLoader
        columns={getLoadingColumns([
          'Plan name',
          'Type',
          'Total',
          'Assigned',
          'Started',
          'Stopped',
          'Completed'
        ])}
        noButton
      />
    )
  }
);

const MpPlanMetricsContent = props => {
  const { missionPartnerId } = props;

  const { missionPartnerMinDetailsError, missionPartnerMinDetails } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  useGraphqlErrorHandler(missionPartnerMinDetailsError);

  if (!missionPartnerId) return null;

  return (
    <div className={vstack({ gap: 10, alignItems: 'start' })}>
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <BackArrowButton />
        <PlanMetricsPageHeader name={missionPartnerMinDetails?.name} />
      </div>
      <ContentArea>
        <PlanMetricsTable
          missionPartnerId={missionPartnerId}
          missionPartnerName={missionPartnerMinDetails?.name}
        />
      </ContentArea>
    </div>
  );
};

export const MpPlanMetricsPage = React.memo(
  MpPlanMetricsContent,
  (prevProps, nextProps) =>
    prevProps.missionPartnerId === nextProps.missionPartnerId
);
