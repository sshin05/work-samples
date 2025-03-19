import { useEffect } from 'react';
import _ from 'lodash';
import {
  type VendorOptions,
  DuiSelect,
  DuiSelectOption,
  Flex,
  Text,
  spacing,
  typography
} from '@digital-u/digital-ui';
import { Button, Spinner, type UseModalReturnValue } from '@cerberus/react';
import { Controller, useForm } from 'react-hook-form';
import type {
  AddTrainingCriteriaInput,
  AssignedTraining,
  AssignedTrainingInput,
  TrainingCriteria,
  TrainingCriteriaInput
} from '@/api/codegen/graphql';
import {
  TrainingCriteriaType,
  formatTrainingItemType,
  trainingCriteriaDropdownOptions
} from '@/utils/trainingCriteriaHelper';
import ExamTrainingCard from './ExamTrainingCard/ExamTrainingCard';
import {
  AssignTrainingLabel,
  AssignTrainingSelectWrapper,
  LearnerScoreLabel
} from './ExamScoreAssignmentModal.styles';
import { Add } from '@carbon/icons-react';
import { hstack } from '@cerberus/styled-system/patterns';
import { CustomModal } from '@/components_new/modals/CustomModal';

interface ExamScoreAssignmentModalProps {
  trainingCriteriaModal: UseModalReturnValue;
  onClose: () => void;
  onMoreTrainingClick: () => void;
  selectedTrainingCriteria?: TrainingCriteria;
  updatedTrainingItems?: AssignedTraining[];
  handleAddTrainingCriteria: (criteria: AddTrainingCriteriaInput) => void;
  handleEditTrainingCriteria: (criteria: TrainingCriteriaInput) => void;
  loading?: boolean;
}

const percentGradesArray = Array.from({ length: 101 }, (_, index) => ({
  value: index,
  label: `${index}%`
}));

const ExamScoreAssignmentModal = ({
  trainingCriteriaModal,
  onClose,
  onMoreTrainingClick,
  selectedTrainingCriteria,
  handleAddTrainingCriteria,
  handleEditTrainingCriteria,
  updatedTrainingItems,
  loading = false
}: ExamScoreAssignmentModalProps) => {
  const { register, control, handleSubmit, watch, formState, setValue } =
    useForm({
      shouldUnregister: true
    });

  const ruleTypeFormValue = watch(
    'ruleType',
    selectedTrainingCriteria?.ruleType
  );

  const trainingArray =
    updatedTrainingItems || selectedTrainingCriteria?.training;

  const hasTraining = trainingArray && trainingArray.length > 0;

  const handleFormSubmit = async data => {
    const criteriaInput = {
      ruleType: data.ruleType,
      minScore: data.minScore && Number(data.minScore),
      maxScore: data.maxScore && Number(data.maxScore),
      training: data.training?.map((trainingItem: AssignedTraining) => {
        // only capture the necessary fields
        const submitItem: AssignedTrainingInput = {
          assessmentId: trainingItem.assessmentId,
          courseId: trainingItem.courseId,
          planSourceId: trainingItem.planSourceId,
          planType: trainingItem.planType,
          planVersion: trainingItem.planVersion,
          type: trainingItem.type
        };

        // undo react-hook-form inserting null values for undefined properties
        return _.omitBy(submitItem, _.isNil) as AssignedTrainingInput;
      })
    };

    if (selectedTrainingCriteria?.id) {
      handleEditTrainingCriteria({
        ...criteriaInput,
        id: selectedTrainingCriteria.id
      });
    } else {
      handleAddTrainingCriteria(criteriaInput);
    }
  };

  useEffect(() => {
    if (updatedTrainingItems) {
      setValue('training', updatedTrainingItems, { shouldDirty: true });
    }
  }, [updatedTrainingItems, setValue]);

  const submitDisabled =
    (!formState.isDirty && formState.isValid) || !trainingArray;

  return (
    <CustomModal
      customModal={trainingCriteriaModal}
      title="Assign training based on score"
      onClose={onClose}
    >
      <form
        id="exam-assign-training-form"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {/* TODO: Convert from Flex to Grid */}
        <Flex direction="row" gap={spacing[4]}>
          <LearnerScoreLabel size="label">If learner scores:</LearnerScoreLabel>
          <Controller
            name="ruleType"
            control={control}
            defaultValue={selectedTrainingCriteria?.ruleType}
            rules={{
              required: 'required'
            }}
            render={({ field }) => (
              <AssignTrainingSelectWrapper>
                <DuiSelect
                  id={field.name}
                  name={field.name}
                  register={register}
                >
                  {trainingCriteriaDropdownOptions.map(({ label, value }) => (
                    <DuiSelectOption key={value} value={value}>
                      {label}
                    </DuiSelectOption>
                  ))}
                </DuiSelect>
              </AssignTrainingSelectWrapper>
            )}
          />

          {(ruleTypeFormValue === TrainingCriteriaType.Between ||
            ruleTypeFormValue === TrainingCriteriaType.AtOrAbove) && (
            <Controller
              name="minScore"
              control={control}
              rules={{
                required: 'required'
              }}
              defaultValue={selectedTrainingCriteria?.minScore || '0'}
              render={({ field }) => (
                <AssignTrainingSelectWrapper>
                  <DuiSelect
                    id={field.name}
                    name={field.name}
                    register={register}
                  >
                    {percentGradesArray.map(({ label, value }) => (
                      <DuiSelectOption key={value} value={String(value)}>
                        {label}
                      </DuiSelectOption>
                    ))}
                  </DuiSelect>
                </AssignTrainingSelectWrapper>
              )}
            />
          )}

          {ruleTypeFormValue === TrainingCriteriaType.Between && (
            <Text
              fontFamily={typography.fontFamily.ibm}
              style={{ paddingTop: '20px' }}
            >
              and
            </Text>
          )}

          {(ruleTypeFormValue === TrainingCriteriaType.Between ||
            ruleTypeFormValue === TrainingCriteriaType.AtOrBelow) && (
            <Controller
              name="maxScore"
              control={control}
              rules={{
                required: 'required'
              }}
              defaultValue={selectedTrainingCriteria?.maxScore}
              render={({ field }) => (
                <AssignTrainingSelectWrapper>
                  <DuiSelect
                    id={field.name}
                    name={field.name}
                    register={register}
                  >
                    {percentGradesArray.map(({ label, value }) => (
                      <DuiSelectOption key={value} value={String(value)}>
                        {label}
                      </DuiSelectOption>
                    ))}
                  </DuiSelect>
                </AssignTrainingSelectWrapper>
              )}
            />
          )}
        </Flex>
        {/* Empty-render field to store training items in the form; almost surely a better way */}
        <Controller
          name="training"
          control={control}
          defaultValue={selectedTrainingCriteria?.training}
          render={() => <></>}
        />
        <div className={hstack({ gap: '4' })}>
          <Button
            palette="action"
            usage="filled"
            shape="rounded"
            type="submit"
            disabled={submitDisabled}
          >
            {loading ? (
              <>
                Loading <Spinner size="1em" />
              </>
            ) : (
              'Save'
            )}
          </Button>
          <Button
            palette="action"
            usage="outlined"
            shape="rounded"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>

      <Flex direction="row" gap={spacing[4]}>
        <AssignTrainingLabel size="label">
          {hasTraining && 'Assign them:'}
        </AssignTrainingLabel>
        <Flex direction="column" gap={spacing[4]} flex="1">
          {hasTraining &&
            trainingArray.map(training => (
              <ExamTrainingCard
                key={training.title}
                title={training.title}
                formattedType={formatTrainingItemType(training)}
                vendors={training.vendors as VendorOptions[]}
              />
            ))}
          <Button
            palette="action"
            usage="ghost"
            shape="rounded"
            onClick={onMoreTrainingClick}
            style={{ marginTop: hasTraining ? '4px' : '-4px' }}
          >
            Choose {trainingArray && trainingArray.length > 0 ? 'more' : ''}{' '}
            training
            <Add />
          </Button>
        </Flex>
      </Flex>
    </CustomModal>
  );
};

export default ExamScoreAssignmentModal;
