'use client';

import dynamic from 'next/dynamic';
import { Tabs, Tab, TabPanel, TabsList } from '@cerberus/react';
import { tabContentStyles, tabListStyles, tabStyles } from './gradebook.styles';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { shouldRedirectToMissionPartnerHome } from '../../utils';
import { QUIZ_TAB, SURVEY_TAB } from './constants';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';

const titles = ['Name', 'Type', 'Total assigned', 'Total completed', ' '];
const columns = getLoadingColumns(titles);

const QuizzesExamsTab = dynamic(
  () => import('./components/QuizzesExamsTab/QuizzesExamsTab'),
  { ssr: false, loading: () => <TableLoader noButton columns={columns} /> }
);

const SurveysTab = dynamic(() => import('./components/SurveysTab/SurveysTab'));

export const GradeBookTabs = ({ missionPartnerId }) => {
  const router = useRouter();
  const { isDuAdmin } = useIsDuAdmin();

  const { missionPartnerMinDetails, missionPartnerMinDetailsLoading } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  useEffect(() => {
    const shouldRedirect = shouldRedirectToMissionPartnerHome({
      missionPartnerMinDetails,
      isDuAdmin
    });

    if (shouldRedirect) {
      getRouteUrl(routeGenerators.MissionPartner({ missionPartnerId }));
    }
  }, [missionPartnerMinDetails, missionPartnerId, isDuAdmin, router]);
  return (
    <div className={tabStyles}>
      <Tabs defaultValue="quizzes">
        <TabsList className={tabListStyles}>
          <Tab value="quizzes">{QUIZ_TAB}</Tab>
          <Tab value="surveys">{SURVEY_TAB}</Tab>
        </TabsList>
        <div className={tabContentStyles}>
          <TabPanel value="quizzes">
            <QuizzesExamsTab
              missionPartnerMinDetails={missionPartnerMinDetails}
              isLoading={missionPartnerMinDetailsLoading}
            />
          </TabPanel>
          <TabPanel value="surveys">
            <SurveysTab missionPartnerMinDetails={missionPartnerMinDetails} />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};
