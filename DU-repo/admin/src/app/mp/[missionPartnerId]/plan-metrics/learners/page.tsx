'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { PlanMetricsLearnersTable } from '@/page-components/PlanMetricsLearnersTable';
import { getSubtitle } from '@/components/manage-mission-partners/utils/getSubtitle';
import { useRouteParams } from '@/hooks/useRouteParams';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { PageHeader } from '@/components_new/typography/PageHeader';
import ContentArea from '@/components_new/layout/ContentArea';
import { ArrowLeft } from '@cerberus/icons';

const MissionPartnerPlanMetricsLearners = () => {
  const router = useRouter();
  const { missionPartnerId } = useRouteParams();
  const searchParams = useSearchParams();
  const planType = searchParams.get('planType');
  const planSourceId = searchParams.get('planSourceId');
  const status = searchParams.get('status') || undefined;
  const title = searchParams.get('title');
  const type = searchParams.get('type');

  return (
    <div className={vstack({ gap: 10, alignItems: 'start' })}>
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <Button palette="action" usage="ghost" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          <span
            className={css({
              textStyle: 'body-sm',
              fontWeight: 'bold'
            })}
          >
            Back
          </span>
        </Button>
        <PageHeader>{`${title} | ${getSubtitle(type)}`}</PageHeader>
      </div>
      <ContentArea>
        <PlanMetricsLearnersTable
          planType={planType}
          planSourceId={planSourceId}
          missionPartnerId={missionPartnerId}
          status={status}
        />
      </ContentArea>
    </div>
  );
};

export default MissionPartnerPlanMetricsLearners;
