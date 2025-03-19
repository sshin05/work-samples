import type { AssignedTraining } from '@/api/codegen/graphql';

type TrainingCriteriaMinScore = {
  minScore: number;
  ruleType: TrainingCriteriaType;
};

type TrainingCriteriaMaxScore = {
  maxScore: number;
  ruleType: TrainingCriteriaType;
};

type TrainingCriteriaScore = TrainingCriteriaMinScore &
  TrainingCriteriaMaxScore;

export enum TrainingCriteriaType {
  AtOrAbove = 'AtOrAbove',
  AtOrBelow = 'AtOrBelow',
  Between = 'Between',
  Always = 'Always'
}

const TrainingCriteriaTypeLabels = {
  [TrainingCriteriaType.AtOrAbove]: 'At or above',
  [TrainingCriteriaType.AtOrBelow]: 'At or below',
  [TrainingCriteriaType.Between]: 'Between',
  [TrainingCriteriaType.Always]: 'Always'
};

export const trainingCriteriaDropdownOptions = Object.entries(
  TrainingCriteriaTypeLabels
).map(([value, label]) => ({ label, value }));

export const formatTrainingCriteriaRule = (
  criteria: TrainingCriteriaMinScore | TrainingCriteriaMaxScore
): string => {
  const {
    minScore,
    maxScore,
    ruleType: ruleType
  } = criteria as TrainingCriteriaScore;

  switch (ruleType) {
    case TrainingCriteriaType.Always:
      return `Always assign no matter the score:`;
    case TrainingCriteriaType.AtOrAbove:
      return `at or above ${minScore}%`;
    case TrainingCriteriaType.AtOrBelow:
      return `at or below ${maxScore}%`;
    case TrainingCriteriaType.Between:
      return `between ${minScore}% and ${maxScore}%`;
  }
};

export const formatTrainingItemType = (item: AssignedTraining): string => {
  if (item.type.match(/^course$/i)) {
    return 'Course';
  }

  if (item.type.match(/^assessment$/i)) {
    return 'Assessment';
  }

  if (item.type.match(/^training_plan$/i)) {
    return item.planType;
  }

  return '';
};
