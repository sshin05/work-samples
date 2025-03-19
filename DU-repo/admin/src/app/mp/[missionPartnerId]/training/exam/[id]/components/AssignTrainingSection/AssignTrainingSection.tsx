import { Flex, Text, spacing } from '@digital-u/digital-ui';
import ActionButton from '@/components/ActionButton/ActionButton';
import type { TrainingCriteria } from '@/api/codegen/graphql';
import { TrainingConditionCard } from './components/TrainingConditionCard';

interface AssignTrainingSectionProps {
  trainingCriteria?: TrainingCriteria[];
  onAddConditionClicked: (criteria?: TrainingCriteria) => void;
  onRemoveCondition: (trainingCriteriaId: string) => void;
  isPublished?: boolean;
}

export const AssignTrainingSection = ({
  trainingCriteria,
  onAddConditionClicked,
  onRemoveCondition,
  isPublished = false
}: AssignTrainingSectionProps) => {
  return (
    <Flex direction="column" gap={spacing[4]} style={{ maxWidth: '680px' }}>
      {trainingCriteria?.length > 0 && (
        <>
          <Text size="h5">Conditions</Text>
          {trainingCriteria.map(criteria => (
            <TrainingConditionCard
              trainingCriteria={criteria}
              key={criteria.id}
              onEdit={onAddConditionClicked}
              onRemove={onRemoveCondition}
              isPublished={isPublished}
            />
          ))}
        </>
      )}
      {!isPublished && (
        <ActionButton kind="text" onClick={() => onAddConditionClicked()}>
          Add a condition
        </ActionButton>
      )}
    </Flex>
  );
};
