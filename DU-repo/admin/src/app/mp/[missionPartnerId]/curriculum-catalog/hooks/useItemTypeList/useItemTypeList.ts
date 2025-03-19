type UseItemTypeList = {
  isAllSourcesSelected: boolean;
  handleFilterChange: (key: string, value: string) => void;
  allowedContent: string[];
};

export const useItemTypeList = ({
  handleFilterChange,
  isAllSourcesSelected,
  allowedContent
}: UseItemTypeList) => {
  const itemTypeList = [
    {
      title: 'All',
      onClick: () => handleFilterChange('type', null)
    },
    {
      // Assessments and Courses
      title: 'Curriculum',
      onClick: () => handleFilterChange('type', 'Curriculum')
    },
    {
      title: 'Assessment',
      onClick: () => handleFilterChange('type', 'Assessment')
    },
    {
      title: 'Course',
      onClick: () => handleFilterChange('type', 'Course')
    },
    {
      title: 'Survey',
      onClick: () => handleFilterChange('type', 'Survey')
    },
    {
      title: 'Plan',
      onClick: () => handleFilterChange('type', 'Plan')
    },
    {
      title: 'Lab',
      onClick: () => handleFilterChange('type', 'Lab')
    }
  ].filter(({ title }) =>
    isAllSourcesSelected ? true : allowedContent.includes(title.toLowerCase())
  );

  return {
    itemTypeList
  };
};
