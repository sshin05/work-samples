import StatusBarChart from '@/app/mp/[missionPartnerId]/dashboard/components/DashboardTabs/components/StatusBarChart/StatusBarChart';
import { Box } from '@cerberus/styled-system/jsx';

export const StatusBarChartLoader = () => {
  return (
    <Box>
      <StatusBarChart missionPartnerId={undefined} statusType={undefined} />
    </Box>
  );
};
