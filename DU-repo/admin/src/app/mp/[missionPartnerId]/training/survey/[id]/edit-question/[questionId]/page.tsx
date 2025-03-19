'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { Button as CerberusButton } from '@cerberus/react';
import { Button, Text, colors, useToast } from '@digital-u/digital-ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useFindSurveyById, useUpdateSurvey } from '@/api/survey';
import DragAndDropMultipleChoice from '../../../../../../../../components/manage-mission-partners/custom-training/DragAndDropMultipleChoice';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ArrowLeft } from '@cerberus/icons';
import { TextArea, TextInput } from '@/components_new/form';

const urlTypeMap = {
  'five-star-rating': 'Five Star Rating',
  nps: 'NPS',
  'free-text': 'Free Text',
  'multiple-choice': 'Multiple Choice'
};

// TODO: Componentize and test
const EditMultipleChoiceSurveyQuestionPage = () => {
  const [, setToast] = useToast();

  const router = useRouter();
  const { id: surveyId, questionId } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');
  const type = searchParams.get('type');

  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    formState: { isSubmitting, errors },
    setValue
  } = useForm({
    defaultValues: {
      type: null,
      multipleChoiceAnswers: [],
      fiveStarTitle: null,
      npsSubject: null,
      freeResponseTitle: null,
      multipleChoiceTitle: null
    }
  });

  const typeWatcher = watch('type');

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
      }
    }
  });

  // Queries
  const { surveyById, fetchSurveyById, surveyByIdError, surveyByIdLoading } =
    useFindSurveyById(surveyId);
  useGraphqlErrorHandler(surveyByIdError);
  const { updateSurvey } = useUpdateSurvey();

  const isPublished = surveyById?.status === 'Published';
  const surveyQuestion = surveyById?.questions?.find(
    currentQuestion => currentQuestion.id === questionId
  );

  // Computed values
  const isNewQuestion = questionId === 'new';

  // Methods
  const saveFiveStarRatingQuestion = async (data, questionId) => {
    const question = {
      id: questionId,
      title: data.fiveStarTitle,
      type: data.type
    };

    return handleUpdateQuestion(question);
  };

  const saveNpsQuestion = async (data, questionId) => {
    const question = {
      id: questionId,
      title: data.npsSubject,
      type: data.type
    };

    return handleUpdateQuestion(question);
  };

  const saveFreeTextQuestion = async (data, questionId) => {
    const question = {
      id: questionId,
      title: data.freeResponseTitle,
      type: data.type
    };

    return handleUpdateQuestion(question);
  };

  const saveMultipleChoiceQuestion = async (data, questionId) => {
    const question = {
      id: questionId,
      title: data.multipleChoiceTitle,
      type: data.type,
      choices: data.multipleChoiceAnswers.map(answer => ({
        choice: answer.answer
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
    if (isNewQuestion) {
      const newSurvey = JSON.parse(JSON.stringify(surveyById));
      newSurvey.questions.push(question);

      return handleUpdateSurvey(newSurvey);
    }

    // Update existing question

    const newSurvey = {
      ...surveyById,
      questions: surveyById.questions.map(currentQuestion => {
        if (currentQuestion.id === question.id)
          return {
            ...currentQuestion,
            ...question
          };

        return currentQuestion;
      })
    };

    return handleUpdateSurvey(newSurvey);
  };

  const handleUpdateSurvey = async survey => {
    const { __typename, ...restOfSurvey } = survey; // Pulling this out for GraphQL
    delete restOfSurvey.missionPartner;

    return updateSurvey({
      ...restOfSurvey
    })
      .then(() => fetchSurveyById(surveyId))
      .then(() => reset({}, { keepValues: true }))
      .then(() =>
        router.push(
          `/mp/${surveyById.missionPartnerId}/training/survey/${surveyById.id}?callbackPath=${callbackPath}`
        )
      )
      .then(() =>
        setToast({
          kind: 'success',
          title: 'Question updated successfully',
          subtitle: `The survey question has been updated successfully`
        })
      )
      .catch(() =>
        setToast({
          title: 'Error',
          subtitle: 'There was an error updating the question.',
          kind: 'error'
        })
      );
  };

  useEffect(() => {
    const question = surveyById?.questions?.find(
      currentQuestion => currentQuestion.id === questionId
    );

    if (question) {
      setValue('type', question.type);

      if (question.type === 'Five Star Rating') {
        setValue('fiveStarTitle', question.title);
      }

      if (question.type === 'NPS') {
        setValue('npsSubject', question.title);
      }

      if (question.type === 'Free Text') {
        setValue('freeResponseTitle', question.title);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, surveyById]);

  useEffect(() => {
    if (type) {
      setValue('type', urlTypeMap[type]);
    }
  }, [type, setValue]);

  if (surveyByIdLoading) return null;

  return (
    <MainContentVStack>
      {/* Title */}
      <div className={vstack({ gap: 4, w: 'full', alignItems: 'flex-start' })}>
        <CerberusButton
          palette="secondaryAction"
          usage="ghost"
          onClick={() => router.push(callbackPath)}
        >
          <ArrowLeft />
          <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
            Back
          </span>
        </CerberusButton>
        <Text size="h2" variant="dark" fontWeight="bold">
          Edit Question
        </Text>
      </div>
      {/* Details */}
      <div className={vstack({ gap: 4, w: 'full' })}>
        <div
          className={hstack({
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            w: 'full'
          })}
        >
          <Text size="h3" variant="dark" fontWeight="semiBold">
            Details
          </Text>
          <Text size="label">*Required</Text>
        </div>
        <div
          className={vstack({
            gap: 4,
            bg: 'page.surface.100',
            p: 4,
            borderRadius: 'sm',
            w: 'full',
            alignItems: 'flex-start'
          })}
        >
          <form
            onSubmit={handleSubmit(handleSaveQuestion)}
            style={{ width: '100%' }}
          >
            <div className={css({ maxWidth: '1/2', mb: 4 })}>
              <Controller
                name="type"
                control={control}
                rules={{
                  required: 'A question type is required.'
                }}
                render={({ field: { ...register }, fieldState: { error } }) => {
                  return (
                    <AdminUiSelect
                      {...register}
                      id="question-type"
                      options={[
                        { label: 'Multiple Choice', value: 'Multiple Choice' },
                        { label: 'NPS', value: 'NPS' },
                        { label: '5 Star Rating', value: 'Five Star Rating' },
                        { label: 'Free Text', value: 'Free Text' }
                      ]}
                      label="Question Type"
                      disabled={isPublished || !isNewQuestion}
                      invalid={Boolean(error)}
                      invalidText={error?.message}
                    />
                  );
                }}
              />
            </div>
            {/* 5 Star Rating */}
            {typeWatcher === 'Five Star Rating' && (
              <div className={css({ maxWidth: '1/2' })}>
                <Controller
                  name="fiveStarTitle"
                  control={control}
                  rules={{
                    required: 'The question is required.'
                  }}
                  render={({
                    field: { ref, ...register },
                    fieldState: { error }
                  }) => (
                    <TextInput
                      {...register}
                      label="Question"
                      errorMessage={error?.message}
                      required
                    />
                  )}
                />
              </div>
            )}
            {/* NPS */}
            {typeWatcher === 'NPS' && (
              <div className={hstack({ alignItems: 'center' })}>
                <Controller
                  name="npsSubject"
                  control={control}
                  rules={{
                    required: 'The subject is required.'
                  }}
                  render={({
                    field: { ref, ...register },
                    fieldState: { error }
                  }) => (
                    <div
                      className={hstack({
                        alignItems: 'center',
                        gap: 2,
                        flex: 1
                      })}
                    >
                      <TextInput
                        {...register}
                        label="Subject"
                        errorMessage={error?.message}
                        required
                        style={{ minWidth: '450px' }}
                      />
                      <div
                        style={{
                          transform: 'translateY(50%)'
                        }}
                        className={hstack({ gap: 1, flexGrow: 1 })}
                      >
                        <Text>
                          On a scale of 1-10, how likely are you to recommend{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {register.value || 'Enter subject here'}
                          </span>{' '}
                          to a friend or colleague
                        </Text>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
            {/* Free Text */}
            {typeWatcher === 'Free Text' && (
              <div className={css({ maxWidth: '1/2' })}>
                <Controller
                  name="freeResponseTitle"
                  control={control}
                  rules={{
                    required: 'The question is required.'
                  }}
                  defaultValue={surveyQuestion?.title || ''}
                  render={({
                    field: { ref, ...register },
                    fieldState: { error }
                  }) => (
                    <TextArea
                      {...register}
                      label="Question"
                      errorMessage={error?.message}
                      required
                      rows={3}
                    />
                  )}
                />
              </div>
            )}
            {/* Multiple Choice */}
            {typeWatcher === 'Multiple Choice' && (
              <>
                <div className={css({ maxWidth: '1/2' })}>
                  <Controller
                    name="multipleChoiceTitle"
                    control={control}
                    rules={{
                      required: 'The question is required.'
                    }}
                    render={({
                      field: { ref, ...register },
                      fieldState: { error }
                    }) => (
                      <TextInput
                        {...register}
                        label="Question"
                        errorMessage={error?.message}
                        required
                      />
                    )}
                  />
                </div>
                <div className={vstack({ gap: 4, alignItems: 'flex-start' })}>
                  <Text>Answer Choices*</Text>
                  <div className={vstack()}>
                    <DragAndDropMultipleChoice
                      fields={fields}
                      swap={swap}
                      remove={remove}
                      register={register}
                      disabled={isPublished}
                    />
                  </div>
                </div>
                <Button
                  kind="text"
                  size="sm"
                  onClick={event => {
                    (event as Event).preventDefault();
                    append({ answer: '' });
                  }}
                  disabled={isPublished}
                >
                  Add Answer +
                </Button>
                {errors?.multipleChoiceAnswers?.root?.message && (
                  <Text style={{ color: colors.red[800] }}>
                    {errors?.multipleChoiceAnswers?.root?.message as string}
                  </Text>
                )}
              </>
            )}
            <CerberusButton
              disabled={isSubmitting}
              type="submit"
              palette="action"
              shape="rounded"
              className={css({ mt: 4 })}
            >
              Save
            </CerberusButton>
          </form>
        </div>
      </div>
    </MainContentVStack>
  );
};

export default EditMultipleChoiceSurveyQuestionPage;
