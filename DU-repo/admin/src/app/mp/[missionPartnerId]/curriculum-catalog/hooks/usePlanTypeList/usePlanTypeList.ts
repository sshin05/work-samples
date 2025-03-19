// todo: add types; MEMPOIZE
export const usePlanTypeList = ({ handleFilterChange }) => {
  const planTypeList = [
    {
      title: 'All',
      onClick: () => handleFilterChange('planType', null)
    },
    {
      title: 'Learning Path',
      onClick: () => handleFilterChange('planType', 'LearningPath')
    },
    {
      title: 'Force Multiplier',
      onClick: () => handleFilterChange('planType', 'ForceMultiplier')
    },
    {
      title: 'Skill',
      onClick: () => handleFilterChange('planType', 'Skill')
    }
  ];

  return planTypeList;
};
