'use client';

import dynamic from 'next/dynamic';
import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { DescriptionLoader } from '@/components_new/loaders/HubLoaders/DescriptionLoader';
import { AdminImageLoader } from '@/components_new/loaders/HubLoaders/AdminImageLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';

const UpdateDescriptionAndAccessCode = dynamic(
  () =>
    import('../UpdateDescriptionAndAccessCode/UpdateDescriptionAndAccessCode'),
  { ssr: false, loading: () => <DescriptionLoader /> }
);

const AdminImage = dynamic(() => import('../AdminImage/AdminImage'), {
  ssr: false,
  loading: () => <AdminImageLoader />
});

const FeaturedTrainingTab = dynamic(
  () => import('../FeaturedTrainingTab/FeaturedTrainingTab'),
  {
    ssr: false,
    loading: () => (
      <TableLoader
        columns={getLoadingColumns([
          'Item name',
          'Type',
          'Date added',
          'Status',
          'Required'
        ])}
        buttonContent="TrainingItem"
      />
    )
  }
);

export const MpTrainingHubPage = ({ missionPartnerId }) => {
  const { missionPartner, refetchMissionPartner, missionPartnerLoading } =
    useFindMissionPartnerById(missionPartnerId);

  // on the todo list = fix the re-render loops caused by useGraphqlErrorHandler(missionPartnerError);

  return (
    <>
      <div
        className={hstack({
          w: 'full',
          h: 'full',
          gap: 8,
          alignItems: 'stretch'
        })}
      >
        <UpdateDescriptionAndAccessCode missionPartner={missionPartner} />
        <AdminImage
          missionPartner={missionPartner}
          refetchMissionPartner={refetchMissionPartner}
        />
      </div>
      <h2
        className={css({
          textStyle: 'heading-md',
          pt: 8
        })}
      >
        Featured training
      </h2>
      <div
        className={css({
          w: 'full'
        })}
      >
        <FeaturedTrainingTab
          isPortalManager
          missionPartner={missionPartner}
          missionPartnerLoading={missionPartnerLoading}
        />
      </div>
    </>
  );
};
