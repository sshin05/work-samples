'use client';

import dynamic from 'next/dynamic';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { LicensesLoader } from '@/components_new/loaders/LicensesLoader';

const LicensesTab = dynamic(
  () => import('../components/LicensesTab/LicensesTab'),
  {
    loading: () => <LicensesLoader />,
    ssr: false
  }
);

const LicenseRequestsTab = dynamic(
  () => import('../components/LicenseRequestsTab/LicenseRequestsTab'),
  { ssr: false }
);

const LicensesTabs = ({ missionPartnerId }) => {
  const { refetchMissionPartner, missionPartner, missionPartnerLoading } =
    useFindMissionPartnerById(missionPartnerId);

  return (
    <Tabs defaultValue="licenses" lazyMount>
      <TabsList>
        <Tab value="licenses">Licenses</Tab>
        <Tab value="requests">Requests</Tab>
      </TabsList>
      <TabPanel value="licenses">
        <LicensesTab
          missionPartnerId={missionPartnerId}
          provisionedLicenses={missionPartner?.provisionedLicenses}
          refetchMissionPartner={refetchMissionPartner}
        />
      </TabPanel>
      <TabPanel value="requests">
        <LicenseRequestsTab
          missionPartner={missionPartner}
          loading={missionPartnerLoading}
        />
      </TabPanel>
    </Tabs>
  );
};

export default LicensesTabs;
