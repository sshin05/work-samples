'use client';

import dynamic from 'next/dynamic';
import { Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useGetMissionPartnerById } from '@/api/mission-partner/useGetMissionPartnerById';
import { useFindLearnersTotal } from '@/api/mission-partner/useFindLearnersTotal';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { buildLearnersColumns } from '../MissionPartnerLearnersTab/useLearnersColumns';

const columns = buildLearnersColumns([]);

const MissionPartnerLearnersTab = dynamic(
  () => import('../MissionPartnerLearnersTab/MissionPartnerLearnersTab'),
  {
    ssr: false,
    loading: () => <TableLoader buttonContent="Learner" columns={columns} />
  }
);

const MissionPartnerRequestsTab = dynamic(
  () => import('../MissionPartnerRequestsTab/MissionPartnerRequestsTab')
);
interface LearnersTabsProps {
  missionPartherRequestCount: number;
  missionPartnerId: string;
}

export const LearnersTabs = (props: LearnersTabsProps) => {
  const { data } = useGetMissionPartnerById(props.missionPartnerId);

  const { refetchLearnersTotal } = useFindLearnersTotal({
    missionPartnerId: props.missionPartnerId
  });

  const { findOpenForMissionPartnerData } = useFindOpenForMissionPartner(
    props.missionPartnerId
  );

  return (
    <Tabs defaultValue="learners" lazyMount>
      <TabsList>
        <Tab value="learners">Learners</Tab>
        <Tab value="requests">
          Mission Partner Requests ({findOpenForMissionPartnerData?.length || 0}
          )
        </Tab>
      </TabsList>
      <TabPanel value="learners" className={css({ w: 'full' })}>
        <MissionPartnerLearnersTab
          missionPartnerId={props.missionPartnerId}
          refetchInitialCount={refetchLearnersTotal}
        />
      </TabPanel>
      <TabPanel value="requests" className={css({ w: 'full' })}>
        <MissionPartnerRequestsTab
          missionPartnerId={props.missionPartnerId}
          missionPartnerName={data?.findMissionPartnerById.name}
        />
      </TabPanel>
    </Tabs>
  );
};
