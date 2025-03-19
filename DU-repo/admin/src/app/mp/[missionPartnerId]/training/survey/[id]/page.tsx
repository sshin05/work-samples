'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Text,
  colors,
  TextEntryModal,
  HostedContentModal,
  InlineNotification
} from '@digital-u/digital-ui';
import { usePathname, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import {
  useFindSurveyById,
  usePublishSurvey,
  useUpdateSurvey
} from '@/api/survey';
import { AddContentModal } from '../../components/AddContentModal';
import DragAndDropList from '../../components/DragAndDropList/DragAndDropList';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PublishModal } from '@/components_new/modals/PublishModal';
import { useRouteParams } from '@/hooks/useRouteParams';
import { css } from '@cerberus/styled-system/css';
import { ArrowLeft } from '@carbon/icons-react';
import {
  trapFocus,
  useModal,
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { TextArea } from '@/components_new/form';

const EditSurveyPage = () => {
  const router = useRouter();
  const { id } = useRouteParams();
  const pathname = usePathname();

  const { surveyById, surveyByIdError, surveyByIdLoading, fetchSurveyById } =
    useFindSurveyById(id);

  const isPublished = surveyById?.status === 'Published';

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
    setValue,
    reset,
    getValues
  } = useForm();

  const { notify } = useNotificationCenter();
  const addContentModal = useModal();
  const handleKeyDownOnAddContentModal = trapFocus(addContentModal.modalRef);

  const descriptionWatcher = watch('description');
  const statusWatcher = watch('status');

  useUnsavedChangesPrompt(isDirty);

  // mutations
  const { updateSurvey } = useUpdateSurvey();
  const { publishSurvey } = usePublishSurvey();

  // state
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const hasContent = surveyById?.questions?.length > 0;
  const disabled =
    removingItems ||
    isSubmitting ||
    editTitleLoading ||
    surveyByIdLoading ||
    isPublished;

  // methods
  const updateSurveyHandler = async newSurvey => {
    const { __typename, ...survey } = newSurvey;

    return updateSurvey({
      ...survey
    })
      .then(() => fetchSurveyById(id))
      .then(() => {
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Survey updated successfully',
          description: `The survey has been updated successfully`
        })
      )
      .catch(error => {
        notify({
          heading: 'Error',
          description: error.message,
          palette: 'danger'
        });
      })
      .finally(() => {
        setShowEditTitleModal(false);
        setEditTitleLoading(false);
      });
  };

  const handlePublishSurvey = () => {
    return publishSurvey(id)
      .then(() => fetchSurveyById(id))
      .then(() => {
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Survey updated successfully',
          description: `The survey has been updated successfully`
        })
      )
      .catch(error => {
        notify({
          heading: 'Error',
          description: error.message,
          palette: 'danger'
        });
      })
      .finally(() => {
        setShowEditTitleModal(false);
        setEditTitleLoading(false);
      });
  };

  const handleUpdateSurvey = async data => {
    const { ...restOfSurvey } = surveyById; // Pull mission partner out
    delete restOfSurvey.missionPartner;

    if (typeof data === 'string') {
      // We are just being passed the title from the update modal
      return updateSurveyHandler({
        ...restOfSurvey,
        name: data
      });
    }

    return updateSurveyHandler({
      ...restOfSurvey,
      ...data
    }).then(() => reset({}, { keepValues: true }));
  };

  const handleAutoSave = async newSurvey => {
    const { __typename, ...restOfSurvey } = newSurvey; // Pull mission partner out
    delete restOfSurvey.missionPartner;

    return updateSurvey({
      ...restOfSurvey
    })
      .then(() => fetchSurveyById(id))
      .then(() => setEditTitleLoading(false))
      .then(() => setRemovingItems(false));
  };

  const handleRemoveQuestion = questionId => {
    const { ...restOfSurvey } = surveyById; // Pull mission partner out
    delete restOfSurvey.missionPartner;

    setRemovingItems(true);

    const newQuestions = restOfSurvey.questions.filter(
      question => question.id !== questionId
    );

    return updateSurveyHandler({
      ...restOfSurvey,
      questions: newQuestions
    });
  };

  const handleAddNewContent = ({ type }) =>
    router.push(
      getRouteUrl(
        routeGenerators.CustomTrainingSurveyEdit({
          missionPartnerId: surveyById.missionPartnerId,
          surveyId: surveyById.id
        }),
        {
          callbackPath: pathname,
          type
        }
      )
    );

  const handleRedirectToEditQuestion = question =>
    router.push(
      getRouteUrl(
        routeGenerators.CustomTrainingSurveyEditQuestion({
          missionPartnerId: surveyById.missionPartnerId,
          surveyId: surveyById.id,
          questionId: question.id
        }),
        {
          callbackPath: pathname,
          type: question.type
        }
      )
    );

  useEffect(() => {
    if (!descriptionWatcher && surveyById?.description) {
      setValue('description', surveyById.description);
    }

    if (!statusWatcher && surveyById?.status) {
      setValue('status', surveyById.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyById]);

  useEffect(() => {
    if (surveyByIdError || !surveyById) {
      setShowErrorModal(true);
    }
  }, [surveyByIdError, surveyById]);

  return (
    <MainContentVStack>
      {showErrorModal && (
        <div className={hstack({ justifyContent: 'center' })}>
          <InlineNotification
            heading="Error"
            subheading="There was a problem loading the hosted survey."
            lowContrast
            onClose={() => {
              setShowErrorModal(false);
              router.push(
                getRouteUrl(
                  routeGenerators.CustomTrainingWithParameters({
                    missionPartnerId: surveyById.missionPartnerId,
                    tab: '1'
                  })
                )
              );
            }}
          />
        </div>
      )}
      {!showErrorModal && (
        <div
          aria-busy={surveyByIdLoading}
          className={vstack({ w: 'full', gap: 8 })}
        >
          {/* Title */}
          <div
            className={vstack({ alignItems: 'flex-start', gap: 1, w: 'full' })}
          >
            <CerberusButton
              palette="secondaryAction"
              usage="ghost"
              onClick={() =>
                router.push(
                  getRouteUrl(
                    routeGenerators.CustomTrainingWithParameters({
                      missionPartnerId: surveyById.missionPartnerId,
                      tab: '2'
                    })
                  )
                )
              }
            >
              <ArrowLeft />
              <span
                className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}
              >
                Back
              </span>
            </CerberusButton>
            <div
              className={hstack({ gap: 2, alignItems: 'center', w: 'full' })}
            >
              <Text size="h2" variant="dark" fontWeight="bold">
                {surveyById.name}
              </Text>
              <Button
                type="button"
                kind="text"
                size="sm"
                onClick={() => setShowEditTitleModal(true)}
                disabled={isSubmitting || surveyByIdLoading || removingItems}
                loading={editTitleLoading}
              >
                <Text variant="dark" style={{ color: `${colors.purple[800]}` }}>
                  Edit Title
                </Text>
              </Button>
              <div
                className={hstack({
                  gap: 4,
                  flexWrap: 'wrap',
                  justifyContent: 'flex-end',
                  flexGrow: 1
                })}
              >
                <CerberusButton
                  usage="outlined"
                  palette="action"
                  shape="rounded"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={
                    isSubmitting ||
                    surveyByIdLoading ||
                    removingItems ||
                    editTitleLoading ||
                    !hasContent
                  }
                >
                  Preview
                </CerberusButton>
                {!isPublished && (
                  <PublishModal
                    onConfirm={() => {
                      setValue('status', 'Published');
                      handleSubmit(handlePublishSurvey)();
                    }}
                    title="Confirm publish"
                    message="Once published, you will no longer be able to add, remove, or rearrange content."
                  />
                )}
              </div>
            </div>
            <div className={hstack({ gap: 4 })} aria-busy={surveyByIdLoading}>
              <Text size="p" variant="dark">
                Item ID: {surveyById.id}
              </Text>
            </div>
          </div>
          {/* Details */}
          <div className={vstack({ w: 'full', gap: 4 })}>
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
              className={css({
                w: 'full',
                p: 4,
                bg: 'page.surface.100',
                borderRadius: 'sm'
              })}
            >
              <form onSubmit={handleSubmit(handleUpdateSurvey)}>
                <div
                  className={vstack({
                    gap: 4,
                    bg: 'page.surface.100',
                    borderRadius: 'sm',
                    alignItems: 'flex-start',
                    w: 'full'
                  })}
                >
                  <Text
                    size="label"
                    style={{
                      color: `${colors.gray[800]}`,
                      marginBottom: '-15px'
                    }}
                  >
                    Status
                  </Text>
                  <Text size="p">{surveyById.status}</Text>
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      validate: value => {
                        if (getValues('status') === 'Draft') {
                          return true;
                        }

                        return value.trim() === ''
                          ? 'The description is required.'
                          : true;
                      },
                      maxLength: 500
                    }}
                    defaultValue={surveyById.description}
                    render={({
                      field: { ref, ...field },
                      fieldState: { error }
                    }) => (
                      <div className={hstack({ w: '1/2' })}>
                        <TextArea
                          {...field}
                          label="Description*"
                          inputLength={field.value?.length}
                          maxLength={500}
                          errorMessage={error?.message}
                          required
                          rows={8}
                        />
                      </div>
                    )}
                  />

                  <Button
                    disabled={descriptionWatcher === '' || isSubmitting}
                    loading={isSubmitting}
                    kind="pill-primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {/* Questions */}
          <div
            className={vstack({
              w: 'full',
              gap: 4,
              alignItems: 'flex-start'
            })}
          >
            <Text size="h3" variant="dark" fontWeight="semiBold">
              Survey Questions
            </Text>
            <div
              className={vstack({
                gap: 4,
                p: 4,
                borderRadius: 'sm',
                bg: 'page.surface.100',
                w: 'full'
              })}
            >
              <div
                className={vstack({
                  w: 'full',
                  gap: 4,
                  alignItems: 'flex-start'
                })}
              >
                {/* No questions */}
                {!surveyById.questions?.length && (
                  <Text size="p" variant="dark">
                    No questions have been added yet.
                  </Text>
                )}

                {/* Questions */}
                <Text size="p" variant="dark">
                  {surveyById.questions?.length} questions,{' '}
                  {surveyById.durationInMinutes} minutes total duration
                </Text>
                <div className={vstack({ gap: 1, w: 'full' })}>
                  <DragAndDropList
                    onReorder={questions => {
                      if (!_.isEqual(questions, surveyById.questions)) {
                        handleAutoSave({
                          ...surveyById,
                          questions
                        });
                      }
                    }}
                    onRemoveItem={handleRemoveQuestion}
                    onClickItem={handleRedirectToEditQuestion}
                    items={surveyById.questions}
                    disabled={disabled}
                    deleteModalTitle="Confirm Delete"
                  />
                </div>
                {!isPublished && (
                  <Button
                    type="button"
                    kind="text"
                    size="sm"
                    onClick={addContentModal.show}
                    disabled={disabled}
                  >
                    Add Question +
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showEditTitleModal && (
        <TextEntryModal
          title="Edit Title"
          onSubmit={title => {
            setEditTitleLoading(true);
            handleUpdateSurvey(title);
          }}
          onClose={() => setShowEditTitleModal(false)}
          label="Title"
          placeholder={surveyById.name}
        />
      )}
      <AddContentModal
        modal={addContentModal}
        handleKeyDown={handleKeyDownOnAddContentModal}
        onSubmit={handleAddNewContent}
        options={[
          { label: '- Select -', value: 'no-choice' },
          { label: 'Multiple Choice', value: 'multiple-choice' },
          { label: 'NPS', value: 'nps' },
          { label: '5 Star Rating', value: 'five-star-rating' },
          { label: 'Free Text', value: 'free-text' }
        ]}
      />

      {showPreviewModal && (
        <HostedContentModal
          preview
          item={{
            ...surveyById,
            duration: surveyById.durationInMinutes || 0,
            description: surveyById.description || '',
            questions: surveyById.questions || [],
            __typename: surveyById.__typename
          }}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </MainContentVStack>
  );
};

export default EditSurveyPage;
