'use client';
import { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  DuiSelect,
  DuiSelectOption,
  Text,
  colors,
  spacing
} from '@digital-u/digital-ui';
import {
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Add } from '@carbon/icons-react';
import DragAndDropMultipleChoice from '../../../../../../../../components/manage-mission-partners/custom-training/DragAndDropMultipleChoice';
import {
  useAddHostedExamQuestion,
  useFindHostedExamById,
  useUpdateHostedExamQuestion
} from '@/api/hosted-exam';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import MainContentVStack from '@/components_new/layout/MainContentVStack/MainContentVStack';
import type { FindHostedExamByIdQuery } from '@/api/codegen/graphql';
import { useRouteParams } from '@/hooks/useRouteParams';
import { TextArea } from '@/components_new/form';
import { hstack } from 'styled-system/patterns';

const EditExamQuestionPage = () => {
  const { notify } = useNotificationCenter();

  const router = useRouter();
  const { id: hostedExamId, questionId } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');
  const type = searchParams.get('type');

  const [isNewQuestion, setIsNewQuestion] = useState(questionId === 'new');

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
    setValue,
    register,
    getValues,
    reset
  } = useForm();

  const typeWatcher = watch('type');
  useUnsavedChangesPrompt(isDirty);

  const getAnswerValidationRules = () => ({
    minLength: {
      value: 2,
      message: `You must include at least two choices`
    },
    validate: {
      choicesNotEmpty: choices => {
        if (!choices) return true;
        return (
          choices.every(choice => choice.choice?.length > 0) ||
          'Choices cannot be empty'
        );
      },
      atLeastOneCorrect: choices => {
        if (!choices) return true;
        return (
          choices.some(choice => choice.isCorrect) ||
          'You must select at least one correct answer'
        );
      }
    }
  });

  const {
    fields: singleChoiceFields,
    append: singleChoiceAppend,
    remove: singleChoiceRemove,
    swap: singleChoiceSwap
  } = useFieldArray({
    control,
    name: 'singleChoiceAnswers',
    rules:
      typeWatcher === 'Single Choice' ? getAnswerValidationRules() : undefined
  });

  const {
    fields: multipleChoiceFields,
    append: multipleChoiceAppend,
    remove: multipleChoiceRemove,
    swap: multipleChoiceSwap
  } = useFieldArray({
    control,
    name: 'multipleChoiceAnswers',
    rules:
      typeWatcher === 'Multiple Choice' ? getAnswerValidationRules() : undefined
  });
  interface HostedExam {
    status: string;
    questions: FindHostedExamByIdQuery['findHostedExamById']['questions'];
  }

  // Queries
  const {
    hostedExamById,
    fetchHostedExamById,
    hostedExamByIdError,
    hostedExamByIdLoading
  } = useFindHostedExamById(hostedExamId);
  useGraphqlErrorHandler(hostedExamByIdError);
  const { addHostedExamQuestion } = useAddHostedExamQuestion();
  const { updateHostedExamQuestion } = useUpdateHostedExamQuestion();

  const published = (hostedExamById as HostedExam)?.status === 'Published';

  // Methods
  const saveSingleChoiceQuestion = async (data, questionId) => {
    const question = {
      title: data.singleChoiceTitle,
      type: data.type,
      choices: data.singleChoiceAnswers.map(answer => {
        return {
          choice: answer.choice,
          isCorrect: answer.isCorrect
        };
      }),
      ...(!isNewQuestion ? { id: questionId } : {})
    };

    return handleUpdateQuestion(question);
  };

  const saveMultipleChoiceQuestion = async (data, questionId) => {
    const question = {
      title: data.multipleChoiceTitle,
      type: data.type,
      choices: data.multipleChoiceAnswers.map(answer => {
        return {
          choice: answer.choice,
          isCorrect: answer.isCorrect
        };
      }),
      ...(!isNewQuestion ? { id: questionId } : {})
    };
    return handleUpdateQuestion(question);
  };

  const saveFreeTextQuestion = async (data, questionId) => {
    const question = {
      title: data.freeTextTitle,
      type: data.type,
      ...(!isNewQuestion ? { id: questionId } : {})
    };

    return handleUpdateQuestion(question);
  };

  const handleMarkCorrect = index => {
    if (typeWatcher === 'Single Choice') {
      const newFields = getValues('singleChoiceAnswers').map((field, i) => {
        if (i === index) {
          return {
            ...field,
            isCorrect: true
          };
        }

        return {
          ...field,
          isCorrect: false
        };
      });

      setValue('singleChoiceAnswers', newFields, { shouldDirty: true });
    } else if (typeWatcher === 'Multiple Choice') {
      const newFields = getValues('multipleChoiceAnswers').map((field, i) => {
        if (i === index) {
          return {
            ...field,
            isCorrect: !field.isCorrect
          };
        }

        return {
          ...field
        };
      });
      setValue('multipleChoiceAnswers', newFields, { shouldDirty: true });
    }
  };

  const handleAddHostedExamQuestion = async (examId, question) =>
    addHostedExamQuestion(examId, question)
      .then(async () => {
        const response = await fetchHostedExamById(hostedExamId);
        const questions = response.data.findHostedExamById.questions;
        const missionPartnerId =
          response.data.findHostedExamById.missionPartnerId;
        const newQuestionId = questions[questions.length - 1].id;
        router.replace(
          `/mp/${missionPartnerId}/training/exam/${hostedExamId}/edit-question/${newQuestionId}?callbackPath=${callbackPath}`
        );
      })
      .then(() => setIsNewQuestion(false))
      .then(() => reset({}, { keepValues: true })) // Resets dirtyFields
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Question updated successfully',
          description: `The exam question has been updated successfully`
        })
      )
      .catch(() =>
        notify({
          heading: 'Error',
          description: 'There was an error updating the question.',
          palette: 'danger'
        })
      );

  const handleUpdateHostedExamQuestion = async (examId, question) =>
    updateHostedExamQuestion(examId, question)
      .then(() => fetchHostedExamById(hostedExamId))
      .then(() => setIsNewQuestion(false))
      .then(() => reset({}, { keepValues: true })) // Resets dirtyFields
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Question updated successfully',
          description: `The exam question has been updated successfully`
        })
      )
      .catch(() =>
        notify({
          heading: 'Error',
          description: 'There was an error updating the question.',
          palette: 'danger'
        })
      );

  const handleSaveQuestion = data => {
    const { type } = data;

    switch (type) {
      case 'Single Choice':
        return saveSingleChoiceQuestion(data, questionId);
      case 'Multiple Choice':
        return saveMultipleChoiceQuestion(data, questionId);
      case 'Free Text':
        return saveFreeTextQuestion(data, questionId);
      default:
        return null;
    }
  };

  const handleUpdateQuestion = async question => {
    return isNewQuestion
      ? handleAddHostedExamQuestion(hostedExamId, question)
      : handleUpdateHostedExamQuestion(hostedExamId, question);
  };

  useEffect(() => {
    const question = hostedExamById?.questions?.find(
      question => question.id === questionId
    );

    if (question) {
      setValue('type', question.type);

      switch (question.type) {
        case 'Single Choice':
          setValue('singleChoiceTitle', question.title);
          setValue('singleChoiceAnswers', question.choices);
          break;
        case 'Multiple Choice':
          setValue('multipleChoiceTitle', question.title);
          setValue('multipleChoiceAnswers', question.choices);
          break;
        case 'Free Text':
          setValue('freeTextTitle', question.title);
          break;
        default:
          break;
      }
    }
  }, [questionId, hostedExamById, setValue]);

  useEffect(() => {
    if (type) {
      setValue('type', type);
    }
  }, [type, setValue]);

  if (hostedExamByIdLoading) return null;

  return (
    <MainContentVStack>
      {/* Title */}
      <Flex direction="column" gap={spacing[4]}>
        <Button kind="text" size="sm" onClick={() => router.push(callbackPath)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>

        <Text size="h2" variant="dark" fontWeight="bold">
          Edit Question
        </Text>
      </Flex>

      {/* Details */}
      <Flex direction="column" gap={spacing[4]} style={{ width: '100%' }}>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text size="h3" variant="dark" fontWeight="semiBold">
            Details
          </Text>
          <Text size="label">*Required</Text>
        </Flex>
        <form onSubmit={handleSubmit(handleSaveQuestion)}>
          <Flex
            style={{
              background: 'white',
              borderRadius: '4px',
              padding: spacing[4]
            }}
            direction="column"
            gap={spacing[4]}
          >
            <DuiSelect
              name="type"
              id="question-type"
              labelText="Question Type*"
              register={register}
              disabled={published || !isNewQuestion}
            >
              <DuiSelectOption value="" disabled hidden>
                Select a question type
              </DuiSelectOption>
              <DuiSelectOption key="multiple-choice" value="Single Choice">
                Single Choice
              </DuiSelectOption>
              <DuiSelectOption key="checkboxes" value="Multiple Choice">
                Multiple Choice
              </DuiSelectOption>
              <DuiSelectOption key="free-response" value="Free Text">
                Free Text
              </DuiSelectOption>
            </DuiSelect>

            {/* Free Text */}
            {typeWatcher === 'Free Text' && (
              <Controller
                name="freeTextTitle"
                control={control}
                rules={{
                  required: 'The question is required.'
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextArea
                    {...field}
                    label="Question*"
                    placeholder="Question goes here"
                    rows={3}
                    errorMessage={error?.message}
                    required
                  />
                )}
              />
            )}

            {/* Single Choice and Multiple Choice */}
            {['Single Choice', 'Multiple Choice'].includes(typeWatcher) && (
              <>
                <Controller
                  name={
                    typeWatcher === 'Single Choice'
                      ? 'singleChoiceTitle'
                      : 'multipleChoiceTitle'
                  }
                  control={control}
                  rules={{
                    required: 'The question is required.'
                  }}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <TextArea
                      {...field}
                      label="Question*"
                      placeholder="Question goes here"
                      rows={3}
                      errorMessage={error?.message}
                      required
                    />
                  )}
                />
                <Flex direction="column" gap={spacing[4]}>
                  <Text>Answer Choices*</Text>
                  <Flex direction="column">
                    <DragAndDropMultipleChoice
                      disabled={published}
                      fields={
                        typeWatcher === 'Single Choice'
                          ? singleChoiceFields
                          : multipleChoiceFields
                      }
                      register={register}
                      swap={
                        typeWatcher === 'Single Choice'
                          ? singleChoiceSwap
                          : multipleChoiceSwap
                      }
                      remove={
                        typeWatcher === 'Single Choice'
                          ? singleChoiceRemove
                          : multipleChoiceRemove
                      }
                      onMarkCorrect={handleMarkCorrect}
                      allowMultipleCorrect={typeWatcher === 'Multiple Choice'}
                    />
                  </Flex>
                </Flex>
                <Button
                  type="button"
                  kind="text"
                  size="sm"
                  rightIcon={<Add />}
                  disabled={published}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();

                    switch (typeWatcher) {
                      case 'Single Choice':
                        singleChoiceAppend({
                          choice: '',
                          isCorrect: false
                        });
                        break;
                      case 'Multiple Choice':
                        multipleChoiceAppend({
                          choice: '',
                          isCorrect: false
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  Add Answer
                </Button>
                {errors && (
                  <Text style={{ color: colors.red[800] }}>
                    {typeof errors?.multipleChoiceAnswers?.root?.message ===
                    'string'
                      ? errors.multipleChoiceAnswers.root.message
                      : typeof errors.checkboxesAnswers?.root?.message ===
                          'string'
                        ? errors.checkboxesAnswers.root.message
                        : typeof errors.singleChoiceAnswers?.root?.message ===
                            'string'
                          ? errors.singleChoiceAnswers.root.message
                          : null}
                  </Text>
                )}
              </>
            )}
            <div
              className={hstack({
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              <CerberusButton
                disabled={isSubmitting}
                palette="action"
                shape="rounded"
              >
                Save
              </CerberusButton>
            </div>
          </Flex>
        </form>
      </Flex>
    </MainContentVStack>
  );
};

export default EditExamQuestionPage;
