import type { PageProps } from '@/app/types';
import { MpPlanMetricsPage } from './components/MpPlanMetricsPage';

const MissionPartnerPlanMetrics = async (props: PageProps) => {
  const { missionPartnerId } = await props.params;

  return <MpPlanMetricsPage missionPartnerId={missionPartnerId} />;
};

export default MissionPartnerPlanMetrics;
