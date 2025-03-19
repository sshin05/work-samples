import { PageHeader } from '@/components_new/typography/PageHeader';

const PlanMetricsPageHeader = props => {
  const { name } = props;

  return <PageHeader>{name && `${name} | `}Plans</PageHeader>;
};

export default PlanMetricsPageHeader;
