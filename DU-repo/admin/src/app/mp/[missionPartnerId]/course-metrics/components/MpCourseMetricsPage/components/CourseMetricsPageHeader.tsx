import { PageHeader } from '@/components_new/typography/PageHeader';

const CourseMetricsPageHeader = props => {
  const { name } = props;

  return <PageHeader>{name && `${name} | `}Courses</PageHeader>;
};

export default CourseMetricsPageHeader;
