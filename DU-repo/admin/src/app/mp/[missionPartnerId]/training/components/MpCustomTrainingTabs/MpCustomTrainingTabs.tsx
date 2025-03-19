'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import dynamic from 'next/dynamic';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';

const columns = getLoadingColumns([
  'Plan name',
  'Version',
  'Plan type',
  'Status',
  'Duration',
  'Date created',
  'Last updated'
]);

const CustomPlansTab = dynamic(
  () => import('../CustomPlansTab/CustomPlansTab'),
  {
    ssr: false,
    loading: () => (
      <TableLoader buttonContent="Training Plan" columns={columns} />
    )
  }
);

const CustomTrainingTab = dynamic(
  () => import('../CustomTrainingTab/CustomTrainingTab'),
  {
    ssr: false
  }
);

const MpCustomTrainingTabs = ({ missionPartnerId, tab }) => {
  const router = useRouter();
  const { isDuAdmin } = useIsDuAdmin();

  const { missionPartnerLoading, missionPartner } =
    useFindMissionPartnerById(missionPartnerId);

  useEffect(() => {
    if (!missionPartner) return;

    if (!missionPartner.customTrainingEnabled && !isDuAdmin) {
      router.push(
        getRouteUrl(
          routeGenerators.MissionPartnerDashboard({
            missionPartnerId
          })
        )
      );
    }
  }, [missionPartner, missionPartnerId, isDuAdmin, router]);

  return (
    <Tabs defaultValue={tab === '2' ? 'Items' : 'Plans'} lazyMount>
      <TabsList>
        <Tab value="Plans">Plans</Tab>
        <Tab value="Items">Items</Tab>
      </TabsList>
      <TabPanel value="Plans">
        <CustomPlansTab
          missionPartner={missionPartner}
          tab={tab}
          loading={missionPartnerLoading}
          pageLoading={missionPartnerLoading}
        />
      </TabPanel>
      <TabPanel value="Items">
        <CustomTrainingTab
          missionPartner={missionPartner}
          tab={tab}
          loading={missionPartnerLoading}
          pageLoading={missionPartnerLoading}
        />
      </TabPanel>
    </Tabs>
  );
};

export default MpCustomTrainingTabs;
