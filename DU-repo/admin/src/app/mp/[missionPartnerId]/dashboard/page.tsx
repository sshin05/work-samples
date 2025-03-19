import type { PageProps } from '@/app/types';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { DashboardTabs } from './components/DashboardTabs';
import { PageHeader } from '@/components_new/typography/PageHeader';
import DashboardLearningMetrics from './components/DashboardLearningMetrics/DashboardLearningMetrics';
import { UpdateRecentMP } from './components/UpdateRecentMP/UpdateRecentMP';
import TrialBanner from './components/TrialBanner/TrialBanner';

const MpDashboardPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  return (
    <MainContentVStack>
      <UpdateRecentMP missionPartnerId={missionPartnerId} />
      <PageHeader>Dashboard</PageHeader>
      <TrialBanner />
      <DashboardLearningMetrics missionPartnerId={missionPartnerId} />
      <DashboardTabs missionPartnerId={missionPartnerId} />
    </MainContentVStack>
  );
};

export default MpDashboardPage;
