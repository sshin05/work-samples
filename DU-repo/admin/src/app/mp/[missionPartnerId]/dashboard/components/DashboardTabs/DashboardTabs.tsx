'use client';

import { Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import dynamic from 'next/dynamic';
import { StatusBarChartLoader } from '@/components_new/loaders/StatusBarChartLoader';
import { TopItemsLoader } from '@/components_new/loaders/TopItemsLoader';

const StatusBarChart = dynamic(
  () => import('./components/StatusBarChart/StatusBarChart'),
  {
    ssr: false,
    loading: () => <StatusBarChartLoader />
  }
);

const TopItems = dynamic(() => import('./components/TopItems/TopItems'), {
  ssr: false,
  loading: () => <TopItemsLoader />
});

export const DashboardTabs = ({ missionPartnerId }) => {
  return (
    <Tabs defaultValue="plans" lazyMount>
      <TabsList>
        <Tab value="plans">Plans</Tab>
        <Tab value="courses">Courses</Tab>
        {/* <Tab value="assessments">Assessments</Tab> */}
      </TabsList>
      <TabPanel value="plans" className={css({ mt: '4' })}>
        <div
          className={hstack({
            gap: '8',
            alignItems: 'stretch'
          })}
        >
          <StatusBarChart
            missionPartnerId={missionPartnerId}
            statusType="Plans"
          />
          <TopItems
            missionPartnerId={missionPartnerId}
            topItemsCategory="Plans"
          />
        </div>
      </TabPanel>
      <TabPanel value="courses" className={css({ mt: '4' })}>
        <div
          className={hstack({
            gap: '8',
            alignItems: 'stretch'
          })}
        >
          <StatusBarChart
            missionPartnerId={missionPartnerId}
            statusType="Courses"
          />

          <TopItems
            missionPartnerId={missionPartnerId}
            topItemsCategory="Courses"
          />
        </div>
      </TabPanel>
      {/* <TabPanel value="assessments" className={css({ mt: '4' })}></TabPanel> */}
    </Tabs>
  );
};
