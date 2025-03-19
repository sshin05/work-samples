'use client';
import { useEffect } from 'react';
import {
  Flex,
  Button,
  Text,
  colors,
  spacing,
  Box
} from '@digital-u/digital-ui';
import {
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { useRouter } from 'next/navigation';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import DragAndDropMultipleChoice from '../../../../../../../../../../../components/manage-mission-partners/custom-training/DragAndDropMultipleChoice';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { useRouteParams } from '@/hooks/useRouteParams';
import { TextInput, TextArea } from '@/components_new/form';
import { hstack } from '@cerberus/styled-system/patterns';

const urlTypeMap = {
  'five-star-rating': 'Five Star Rating',
  nps: 'NPS',
  'free-text': 'Free Text',
  'multiple-choice': 'Multiple Choice'
};

const EditCourseSurveyQuestionPage = () => {
  const { notify } = useNotificationCenter();
  const router = useRouter();
  const {
    id: hostedCourseId,
    missionPartnerId,
    'course-survey-id': courseSurveyId,
    'survey-question-id': questionId,
    type
  } = useRouteParams();

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { isSubmitting, errors },
    setValue
  } = useForm<{
    type: string;
    multipleChoiceAnswers: { answer: string }[];
    fiveStarTitle?: string;
    npsSubject?: string;
    freeTextTitle?: string;
    multipleChoiceTitle?: string;
  }>({
    defaultValues: {
      multipleChoiceAnswers: []
    }
  });

  const [typeWatcher] = watch(['type']);

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'multipleChoiceAnswers',
    rules: {
      required: {
        value: typeWatcher === 'Multiple Choice',
        message: 'You must include multiple choice answers.'
      },
      minLength: {
        value: typeWatcher === 'Multiple Choice' && 2,
        message: 'You must include at least two multiple choice answers.'
      },
      validate: {
        choicesNotEmpty: (choices: { answer: string }[]) => {
          if (!choices) return true;
          return (
            choices.every(choice => choice.answer?.length > 0) ||
            'Choices cannot be empty'
          );
        }
      }
    }
  });

  // Queries
  const {
    hostedCourseItemData,
    hostedCourseItemLoading,
    fetchHostedCourseItem
  } = useFindHostedCourseItem(hostedCourseId, courseSurveyId);
  const { updateHostedCourseItem } = useUpdateHostedCourseItem();

  // Computed values
  const isNewQuestion = questionId === 'new';
  const published = hostedCourseItemData?.status === 'Published';
  const surveyQuestion = hostedCourseItemData?.item?.questions?.find(
    question => question.id === questionId
  );

  // Methods
  const saveFiveStarRatingQuestion = async (data, newQuestionId) => {
    const question = {
      id: newQuestionId,
      title: data.fiveStarTitle,
      type: data.type
    };

    return handleUpdateQuestion(question);
  };

  const saveNpsQuestion = async (data, newQuestionId) => {
    const question = {
      id: newQuestionId,
      title: data.npsSubject,
      type: data.type
    };

    return handleUpdateQuestion(question);
  };

  const saveFreeTextQuestion = async (data, newQuestionId) => {
    const question = {
      id: newQuestionId,
      title: data.freeTextTitle,
      type: 'Free Text'
    };

    return handleUpdateQuestion(question);
  };

  const saveMultipleChoiceQuestion = async (data, newQuestionId) => {
    const question = {
      id: newQuestionId,
      title: data.multipleChoiceTitle,
      type: data.type,
      choices: data.multipleChoiceAnswers.map(answer => ({
        choice: answer.answer,
        isCorrect: false
      }))
    };

    return handleUpdateQuestion(question);
  };

  const handleSaveQuestion = data => {
    const { type } = data;

    switch (type) {
      case 'Five Star Rating':
        return saveFiveStarRatingQuestion(data, questionId);
      case 'NPS':
        return saveNpsQuestion(data, questionId);
      case 'Free Text':
        return saveFreeTextQuestion(data, questionId);
      case 'Multiple Choice':
        return saveMultipleChoiceQuestion(data, questionId);
      default:
        return null;
    }
  };

  const handleUpdateQuestion = async question => {
    const newHostedCourseItem = JSON.parse(
      JSON.stringify(hostedCourseItemData)
    );
    if (isNewQuestion) {
      newHostedCourseItem.item.questions.push(question);

      return handleUpdateSurvey(newHostedCourseItem);
    }

    const newQuestions = hostedCourseItemData.item.questions.map(
      surveyQuestion => {
        return surveyQuestion.id === questionId ? question : surveyQuestion;
      }
    );

    newHostedCourseItem.item.questions = newQuestions;
    return handleUpdateSurvey(newHostedCourseItem);
  };

  const handleUpdateSurvey = async surveyItems => {
    return updateHostedCourseItem({
      id: hostedCourseId,
      missionPartnerId,
      item: {
        ...hostedCourseItemData.item,
        questions: surveyItems.item.questions
      }
    })
      .then(() => fetchHostedCourseItem(hostedCourseId, courseSurveyId))
      .then(() => router.back())
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Question updated successfully',
          description: `The survey question has been updated successfully`
        })
      )
      .catch(() =>
        notify({
          heading: 'Error',
          description: 'There was an error updating the question.',
          palette: 'danger'
        })
      );
  };

  useEffect(() => {
    const survey = hostedCourseItemData?.item;
    const question = survey?.questions?.find(item => item.id === questionId);

    if (question) {
      setValue('type', question.type);

      if (question.type === 'Five Star Rating') {
        setValue('fiveStarTitle', question.title);
      }

      if (question.type === 'NPS') {
        setValue('npsSubject', question.title);
      }

      if (question.type === 'Free Text') {
        setValue('freeTextTitle', question.title);
      }

      if (question.type === 'Multiple Choice') {
        setValue('multipleChoiceTitle', question.title);

        if (fields.length === 0) {
          for (const choice of question.choices) {
            append({ answer: choice.choice });
          }
        }
      }
    }
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, hostedCourseItemData]);

  useEffect(() => {
    if (type) {
      setValue('type', urlTypeMap[type]);
    }
  }, [type, setValue]);

  if (hostedCourseItemLoading) return null;

  return (
    <MainContentVStack>
      {/* Title */}
      <Flex direction="column" gap={spacing[4]}>
        <Button
          type="button"
          kind="text"
          size="sm"
          onClick={() => router.back()}
        >
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
            <Box style={{ maxWidth: '400px' }}>
              <Controller
                name="type"
                control={control}
                rules={{
                  required: 'A question type is required.'
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <AdminUiSelect
                    {...field}
                    id="question-type"
                    disabled={published || !isNewQuestion}
                    label="Question Type*"
                    options={[
                      { label: '- Select -', value: 'no-choice' },
                      { label: 'Multiple Choice', value: 'Multiple Choice' },
                      { label: 'NPS', value: 'NPS' },
                      { label: '5 Star Rating', value: 'Five Star Rating' },
                      { label: 'Free Text', value: 'Free Text' }
                    ]}
                    invalidText={error?.message}
                    invalid={Boolean(error)}
                  />
                )}
              />
            </Box>

            {/* 5 Star Rating */}
            {typeWatcher === 'Five Star Rating' && (
              <Box style={{ maxWidth: '500px' }}>
                <Controller
                  name="fiveStarTitle"
                  control={control}
                  rules={{
                    required: 'The question is required.'
                  }}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <TextInput
                      {...field}
                      style={{ width: '100%' }}
                      label="Question*"
                      errorMessage={error?.message}
                    />
                  )}
                />
              </Box>
            )}

            {/* NPS */}
            {typeWatcher === 'NPS' && (
              <Flex alignItems="center" direction="row">
                <Controller
                  name="npsSubject"
                  control={control}
                  rules={{
                    required: 'The subject is required.'
                  }}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <Flex alignItems="center" gap={spacing[2]} flex="1">
                      <TextInput
                        {...field}
                        label="Subject*"
                        errorMessage={error?.message}
                        style={{ minWidth: '450px' }}
                      />
                      <Flex
                        style={{
                          transform: 'translateY(50%)',
                          flexGrow: 1
                        }}
                        gap={spacing[1]}
                      >
                        <Text>
                          On a scale of 1-10, how likely are you to recommend{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {field.value || 'Enter subject here'}
                          </span>{' '}
                          to a friend or colleague
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                />
              </Flex>
            )}

            {/* Free Text */}
            {typeWatcher === 'Free Text' && (
              <Box style={{ maxWidth: '500px' }}>
                <Controller
                  name="freeTextTitle"
                  control={control}
                  rules={{
                    required: 'The question is required.'
                  }}
                  defaultValue={surveyQuestion?.title || ''}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <TextArea
                      {...field}
                      label="Question*"
                      errorMessage={error?.message}
                      rows={3}
                    />
                  )}
                />
              </Box>
            )}

            {/* Multiple Choice */}
            {typeWatcher === 'Multiple Choice' && (
              <>
                <Box style={{ maxWidth: '500px' }}>
                  <Controller
                    name="multipleChoiceTitle"
                    control={control}
                    rules={{
                      required: 'The question is required.'
                    }}
                    render={({
                      field: { ref, ...field },
                      fieldState: { error }
                    }) => (
                      <TextInput
                        {...field}
                        label="Question*"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                </Box>
                <Flex direction="column" gap={spacing[4]}>
                  <Flex alignItems="flex-end">
                    <Text>Answer Choices*</Text>
                    <Text size="label">(≥2)</Text>
                  </Flex>
                  <Flex direction="column">
                    <DragAndDropMultipleChoice
                      fields={fields}
                      swap={swap}
                      remove={remove}
                      register={register}
                      disabled={published}
                    />
                  </Flex>
                </Flex>
                <Button
                  type="button"
                  kind="text"
                  size="sm"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    append({ answer: '' });
                  }}
                  disabled={published}
                >
                  Add Answer +
                </Button>
                {errors?.multipleChoiceAnswers?.root?.message && (
                  <Text style={{ color: colors.red[800] }}>
                    {errors?.multipleChoiceAnswers?.root?.message}
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

export default EditCourseSurveyQuestionPage;
