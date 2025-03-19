import { useState } from 'react';
import type { TrainingCriteria } from '@/api/codegen/graphql';
import { Flex, spacing } from '@digital-u/digital-ui';
import { TrashCan } from '@carbon/icons-react';
import {
  formatTrainingCriteriaRule,
  formatTrainingItemType,
  TrainingCriteriaType
} from '@/utils/trainingCriteriaHelper';
import {
  StyledTrainingConditionCard,
  StyledTrainingInlineButton,
  TrainingConditionText
} from './TrainingConditionCard.styles';
import { css } from '@cerberus/styled-system/css';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { ConfirmModal } from '@cerberus/react';

interface TrainingConditionCardProps {
  trainingCriteria: TrainingCriteria;
  onEdit?: (trainingCriteria: TrainingCriteria) => void;
  onRemove?: (trainingCriteriaId: string) => void;
  isPublished?: boolean;
}

export const TrainingConditionCard = ({
  trainingCriteria,
  onEdit,
  onRemove,
  isPublished = false
}: TrainingConditionCardProps) => {
  const {
    minScore,
    maxScore,
    ruleType,
    training: trainingItems
  } = trainingCriteria;

  const conditionString = formatTrainingCriteriaRule({
    minScore,
    maxScore,
    ruleType: TrainingCriteriaType[ruleType]
  });

  const [isHovered, setIsHovered] = useState(false);

  const showRemoveButton = isHovered && !isPublished;
  const showNonAlways = ruleType !== TrainingCriteriaType.Always;

  return (
    <StyledTrainingConditionCard
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Flex direction="column" gap={spacing[4]}>
        <TrainingConditionText>
          {showNonAlways && 'If learner scores '}
          {!isPublished && (
            <StyledTrainingInlineButton
              kind="text"
              onClick={() => onEdit(trainingCriteria)}
            >
              {conditionString}
            </StyledTrainingInlineButton>
          )}
          {isPublished && (
            <span style={{ fontWeight: 700 }}>{conditionString}</span>
          )}
          {showNonAlways && ', assign them:'}
        </TrainingConditionText>

        <Flex direction="column" gap={spacing[2]}>
          {trainingItems.map(item => (
            <TrainingConditionText
              key={item.planSourceId || item.courseId || item.assessmentId}
            >
              <span style={{ fontWeight: 700 }}>
                {formatTrainingItemType(item)}:{' '}
              </span>
              {item.title}
            </TrainingConditionText>
          ))}
        </Flex>
      </Flex>
      <ConfirmModal>
        <ConfirmActionModal
          heading="Are you sure?"
          description="Do you wish to remove this training condition?"
          actionText="Yes, remove"
          cancelText="No, keep it"
          handleSubmit={() => onRemove(trainingCriteria.id)}
          buttonContent={
            <div className={css({ color: 'red' })}>
              Remove <TrashCan />
            </div>
          }
          disabled={!showRemoveButton}
        />
      </ConfirmModal>
    </StyledTrainingConditionCard>
  );
};
