'use client';

import dynamic from 'next/dynamic';
import { hstack } from '@cerberus/styled-system/patterns';
import { LearnerDoughnutLoader } from '@/components_new/loaders/LearnerDoughnutLoader';
{
  /* commented out until api call findCategorizedTimeSpentLearning is fixed, at which point qa comments can be addressed */
  //import { LearningHoursBarChart } from './components/LearningHoursBarChart';
}

const LearnerDoughnut = dynamic(
  () => import('./components/LearnerDoughnut/LearnerDoughnut'),
  {
    ssr: false,
    loading: () => <LearnerDoughnutLoader />
  }
);

const DashboardLearningMetrics = ({ missionPartnerId }) => {
  return (
    <div
      className={hstack({
        w: '68rem',
        gap: '6',
        alignItems: 'flex-start'
      })}
    >
      <LearnerDoughnut missionPartnerId={missionPartnerId} />
      {/* <LearningHoursBarChart missionPartnerId={missionPartnerId}/> */}
    </div>
  );
};

export default DashboardLearningMetrics;
