'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Button,
  HostedContentModal,
  Text,
  colors,
  spacing,
  Checkbox,
  DuiSelect,
  DuiSelectOption,
  InlineNotification,
  type TrainingType,
  type TrainingPlanType
} from '@digital-u/digital-ui';
import {
  useModal,
  trapFocus,
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { useRouter, usePathname } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import { Add, ArrowLeft } from '@carbon/icons-react';
import {
  useFindHostedExamById,
  useUpdateHostedExam,
  useAddTrainingCriteria,
  useDeleteTrainingCriteria,
  useUpdateTrainingCriteria,
  usePublishHostedExam,
  useRemoveHostedExamQuestion
} from '@/api/hosted-exam';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import DragAndDropList from '../../components/DragAndDropList/DragAndDropList';
import { AddContentModal } from '../../components/AddContentModal';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import { AssignTrainingSection } from './components/AssignTrainingSection';
import ExamScoreAssignmentModal from '../../../../../../components/manage-mission-partners/custom-training/exam/ExamScoreAssignmentModal';
import AddCurriculumModal from '../../../../../../components/AddCurriculumModal/AddCurriculumModal';
import generateSummary from '@/utils/generate-summary';
import { stripHtml } from '@/utils/string/stripHtml';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { BaseSkeleton } from '@/components_new/loaders';
import { PublishModal } from '@/components_new/modals/PublishModal';
import { useRouteParams } from '@/hooks/useRouteParams';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { EditTitleModal } from '../../components/EditTitleModal';
import { TextArea } from '@/components_new/form';

/** */
const CustomExam = () => {
  const router = useRouter();
  const pathname = usePathname();
  // this felt safer since `[]` can be manually-passed/keyed into a router.query (browser url bar) and auto-translates into an array:
  const { missionPartnerId, id, callbackPath } = useRouteParams();

  const {
    hostedExamById,
    hostedExamByIdError,
    hostedExamByIdLoading,
    fetchHostedExamById
  } = useFindHostedExamById(id);
  const { missionPartnerMinDetailsError, missionPartnerMinDetails } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  const isPublished = hostedExamById?.status === 'Published';
  const maxAttempts =
    hostedExamById?.maxAttempts === -1
      ? 'Unlimited'
      : hostedExamById?.maxAttempts === undefined
        ? 1
        : hostedExamById?.maxAttempts;

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
    setValue,
    getValues,
    register,
    reset
  } = useForm();

  const { notify } = useNotificationCenter();
  const addCurriculumModal = useModal();
  const addContentModal = useModal();
  const handleKeyDownOnAddContentModal = trapFocus(addContentModal.modalRef);
  const trainingCriteriaModal = useModal();
  const editTitleModal = useModal();

  const descriptionWatcher = watch('description');
  const showPassingScore = watch('showPassingScore');
  const showTrainingCriteria = watch('showTrainingCriteria');

  useUnsavedChangesPrompt(isDirty);

  // mutations
  const { updateHostedExam } = useUpdateHostedExam();
  const { publishHostedExam } = usePublishHostedExam();
  const { removeHostedExamQuestion } = useRemoveHostedExamQuestion();
  const { addTrainingCriteria, addTrainingCriteriaLoading } =
    useAddTrainingCriteria();
  const { updateTrainingCriteria, updateTrainingCriteriaLoading } =
    useUpdateTrainingCriteria();
  const { deleteTrainingCriteria } = useDeleteTrainingCriteria();

  // state
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [showPreviewExam, setShowPreviewExam] = useState(false);
  const [removingItems, setRemovingItems] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [showAddCurriculumModal, setShowAddCurriculumModal] = useState(false);
  const [updatedTrainingItems, setUpdatedTrainingItems] = useState(null);

  const selectedTrainingCriteriaItem = useRef(null);
  const selectedRemoveTrainingCriteriaId = useRef(null);

  const hasContent = hostedExamById?.questions?.length > 0;

  const disabled =
    removingItems ||
    isSubmitting ||
    editTitleLoading ||
    isPublished ||
    hostedExamByIdLoading;

  // methods
  const publishExamHandler = async () => {
    return publishHostedExam(id)
      .then(() => fetchHostedExamById(id))
      .then(() => {
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Exam updated successfully',
          description: `The exam has been updated successfully`
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
        setEditTitleLoading(false);
      });
  };

  const updateExamHandler = async newExam => {
    const { __typename, ...exam } = newExam;

    return updateHostedExam({
      ...exam
    })
      .then(() => fetchHostedExamById(id))
      .then(() => {
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Exam updated successfully',
          description: `The exam has been updated successfully`
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
        setEditTitleLoading(false);
      });
  };

  const handleAutoSave = async newExam => {
    const { __typename, ...exam } = newExam;

    return updateHostedExam({
      ...exam
    })
      .then(() => fetchHostedExamById(id))
      .then(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
      });
  };

  const handlePublishExam = async formData => {
    if (
      hostedExamById?.status !== 'Published' &&
      formData.status === 'Published' &&
      hostedExamById.questions.length === 0
    ) {
      notify({
        heading: 'Error',
        description: 'You must add at least one question to publish the exam.',
        palette: 'danger'
      });
      return false; // So react-hook-form knows things are not okay
    }

    return publishExamHandler().then(() => reset({}, { keepValues: true }));
  };

  const handleUpdateExam = async formData => {
    delete formData.status;
    delete formData.trainingCriteria;
    delete formData.showPassingScore;
    delete formData.showTrainingCriteria;

    if (formData.passingScore === '' && showPassingScore) {
      notify({
        heading: 'Error',
        description: 'You must select a passing score.',
        palette: 'danger'
      });
      return false; // So react-hook-form knows things are not okay
    }

    const hasTrainingCriteria = hostedExamById?.trainingCriteria?.length > 0;
    if (!hasTrainingCriteria && showTrainingCriteria) {
      notify({
        heading: 'Error',
        description: 'You must add at least one condition.',
        palette: 'danger'
      });
      return false; // So react-hook-form knows things are not okay
    }

    if (formData.maxAttempts) {
      formData.maxAttempts = Number(
        formData.maxAttempts === 'Unlimited' ? '-1' : formData.maxAttempts
      );
    }

    formData.passingScore = showPassingScore
      ? Number(formData.passingScore)
      : -1;

    return updateExamHandler({
      id: hostedExamById.id,
      missionPartnerId: hostedExamById.missionPartnerId,
      ...formData
    }).then(() => reset({}, { keepValues: true }));
  };

  const handleUpdateExamTitle = async newName => {
    const name = newName.trim();
    if (!name) {
      setEditTitleLoading(false);
      return notify({
        heading: 'Error',
        palette: 'danger',
        description: 'Please input a title to the exam'
      });
    }

    return updateExamHandler({
      id: hostedExamById.id,
      name
    });
  };

  const handleRemoveQuestion = async questionId => {
    setRemovingItems(true);

    return removeHostedExamQuestion(id, questionId)
      .then(() => fetchHostedExamById(id))
      .then(() => {
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Exam updated successfully',
          description: `The exam has been updated successfully`
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
        setEditTitleLoading(false);
      });
  };

  const handleAddNewContent = ({ type }) => {
    router.push(
      getRouteUrl(
        `${routeGenerators.EditQuestion({
          missionPartnerId: hostedExamById.missionPartnerId,
          examId: hostedExamById.id
        })}/edit-question/new`,
        {
          callbackPath: pathname.split('?')[0],
          type: `${type}`
        }
      )
    );
  };

  const handleAddEditConditionClicked = (trainingCriteria = null) => {
    selectedTrainingCriteriaItem.current = trainingCriteria;
    trainingCriteriaModal.show();
  };

  const handleRemoveTrainingConditionPrompt = async trainingCriteriaId => {
    selectedRemoveTrainingCriteriaId.current = trainingCriteriaId;
    handleRemoveCondition();
  };

  const handleRemoveCondition = async () => {
    return deleteTrainingCriteria(
      hostedExamById.id,
      selectedRemoveTrainingCriteriaId.current
    )
      .then(() => {
        fetchHostedExamById(id);
        notify({
          heading: 'Success',
          description: 'Training criteria removed successfully',
          palette: 'success'
        });
        selectedRemoveTrainingCriteriaId.current = null;
      })
      .catch(error => {
        notify({
          heading: 'Error',
          description: error.message,
          palette: 'danger'
        });
        selectedRemoveTrainingCriteriaId.current = null;
      });
  };

  const handleAddTrainingCriteria = async criteria => {
    return addTrainingCriteria(hostedExamById.id, criteria)
      .then(() => {
        fetchHostedExamById(id);
        trainingCriteriaModal.close();
        setUpdatedTrainingItems(null);

        notify({
          heading: 'Success',
          description: 'Training criteria added',
          palette: 'success'
        });
      })
      .catch(() => {
        notify({
          heading: 'Error',
          description: 'Unable to add training criteria',
          palette: 'danger'
        });
      });
  };

  const handleEditTrainingCriteria = async criteria => {
    return updateTrainingCriteria(hostedExamById.id, criteria)
      .then(() => {
        fetchHostedExamById(id);
        trainingCriteriaModal.close();
        setUpdatedTrainingItems(null);

        notify({
          heading: 'Success',
          description: 'Training criteria updated',
          palette: 'success'
        });
      })
      .catch(() => {
        notify({
          heading: 'Error',
          description: 'Unable to update training criteria',
          palette: 'danger'
        });
      });
  };

  useEffect(() => {
    if (!descriptionWatcher && hostedExamById?.description) {
      setValue('description', hostedExamById.description);
    }

    if (!showPassingScore && hostedExamById?.passingScore) {
      setValue('showPassingScore', Boolean(hostedExamById?.passingScore));
    }

    if (!showTrainingCriteria && hostedExamById?.trainingCriteria) {
      setValue(
        'showTrainingCriteria',
        hostedExamById?.trainingCriteria?.length > 0
      );
    }

    setValue('maxAttempts', maxAttempts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostedExamById]);

  useEffect(() => {
    if (hostedExamByIdError || missionPartnerMinDetailsError) {
      setShowErrorModal(true);
    }
  }, [hostedExamByIdError, missionPartnerMinDetailsError]);

  const existingCurriculum = {
    courses: _.filter(updatedTrainingItems, { __typename: 'Course' }),
    assessments: _.filter(updatedTrainingItems, { __typename: 'Assessment' }),
    plans: _.filter(updatedTrainingItems, item =>
      ['ForceMultiplier', 'Skill', 'LearningPath'].includes(item.__typename)
    )
  };

  return (
    <MainContentVStack>
      {showErrorModal && (
        <div className={hstack({ justifyContent: 'center', w: 'full' })}>
          {/* TODO: double check that this doesn't change UI/Comps; variant was `error`, but I think `kind` with non-light `variant` is the way; (it was variant="error", which is invalid) */}
          <InlineNotification
            variant="dark"
            kind="error"
            heading="Error"
            subheading="There was a problem loading the hosted exam."
            lowContrast
            onClose={() => {
              setShowErrorModal(false);
              router.push(
                callbackPath ??
                  getRouteUrl(
                    routeGenerators.CustomTrainingWithParameters({
                      missionPartnerId,
                      tab: '1'
                    })
                  )
              );
            }}
          />
        </div>
      )}
      {!showErrorModal && (
        <>
          {/* Title */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            {/* TODO: Completely rip out callbackPath */}
            <CerberusButton
              palette="secondaryAction"
              usage="ghost"
              onClick={() =>
                router.push(
                  getRouteUrl(
                    routeGenerators.CustomTrainingWithParameters({
                      missionPartnerId,
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
              className={hstack({
                gap: '4',
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              <Flex alignItems="center" gap={spacing[4]}>
                {hostedExamByIdLoading ? (
                  <Text size="h2" fontWeight="extraBold">
                    <BaseSkeleton width={200} />
                  </Text>
                ) : (
                  <Text size="h2" variant="dark" fontWeight="bold">
                    {hostedExamById.name}
                  </Text>
                )}

                {/* TODO: size WAS `small` so check that the styles for the default value of `Button.size` along with my update to `sm` didn't break something in comps */}
                {/* TODO: `type="text"` was on here and was invalid, so I assume the default value was being applied; double check styles */}
                <Button
                  kind="text"
                  size="sm"
                  onClick={editTitleModal.show}
                  disabled={
                    isSubmitting || hostedExamByIdLoading || removingItems
                  }
                  loading={editTitleLoading}
                >
                  {!isPublished && (
                    <Text
                      variant="dark"
                      style={{ color: `${colors.purple[800]}` }}
                    >
                      Edit Title
                    </Text>
                  )}
                </Button>
              </Flex>
              <Flex
                justifyContent="flex-end"
                flexWrap="wrap"
                gap={spacing[4]}
                style={{ flexGrow: 1 }}
              >
                {hostedExamById?.questions?.length > 0 && (
                  <Button
                    kind="pill-secondary"
                    onClick={() => setShowPreviewExam(true)}
                    disabled={
                      removingItems ||
                      isSubmitting ||
                      editTitleLoading ||
                      hostedExamByIdLoading ||
                      !hasContent
                    }
                  >
                    Preview
                  </Button>
                )}

                {!isPublished && (
                  <PublishModal
                    onConfirm={() => {
                      setValue('status', 'Published');
                      handleSubmit(handlePublishExam)();
                    }}
                    title="Confirm publish"
                    message="Once published, you will no longer be able to add, remove, or rearrange content."
                  />
                )}
              </Flex>
            </div>

            {hostedExamByIdLoading ? (
              <Flex direction="row" gap={spacing[4]}>
                <Text size="p" variant="dark">
                  Item ID: <BaseSkeleton width={200} />
                </Text>
              </Flex>
            ) : (
              <Text size="p" variant="dark">
                Item ID: {hostedExamById.id}
              </Text>
            )}
          </div>

          {/* Detail Form */}
          <div
            className={vstack({
              w: 'full',
              gap: 4,
              alignItems: 'flex-start'
            })}
          >
            <Text size="h4" variant="dark" fontWeight="semiBold">
              Details
            </Text>
            {hostedExamByIdLoading ? (
              <BaseSkeleton />
            ) : (
              <form
                className={vstack({
                  w: 'full',
                  padding: spacing[4],
                  bg: 'white',
                  borderRadius: '4px',
                  gap: 4,
                  alignItems: 'flex-start'
                })}
                onSubmit={handleSubmit(handleUpdateExam)}
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
                <Text size="p" variant="dark">
                  {hostedExamById.status}
                </Text>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    validate: value => {
                      if (getValues('status') === 'Draft') {
                        return true;
                      }

                      return !value || value.trim() === ''
                        ? 'The description is required.'
                        : true;
                    },
                    maxLength: 500
                  }}
                  defaultValue={hostedExamById.description}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <div className={hstack({ w: '50%' })}>
                      <TextArea
                        {...field}
                        id="description"
                        label="Description"
                        inputLength={field.value?.length}
                        maxLength={500}
                        errorMessage={error?.message}
                        rows={8}
                        disabled={isPublished}
                      />
                    </div>
                  )}
                />
                <DuiSelect
                  id="MaxAttempts"
                  defaultValue={maxAttempts.toString()}
                  labelText="Number of attempts"
                  name="maxAttempts"
                  register={register}
                  disabled={isPublished}
                >
                  {Array.from({ length: 10 }, (_, index) => index + 1).map(
                    number => (
                      <DuiSelectOption key={number}>
                        {number.toString()}
                      </DuiSelectOption>
                    )
                  )}
                  <DuiSelectOption>Unlimited</DuiSelectOption>
                </DuiSelect>
                <Controller
                  name="showPassingScore"
                  control={control}
                  defaultValue={hostedExamById.passingScore ?? false}
                  render={({ field: { ref, ...field } }) => (
                    <Checkbox
                      {...field}
                      label="This exam will require a passing score"
                      variant="dark"
                      disabled={isPublished}
                    />
                  )}
                />
                {showPassingScore && (
                  <DuiSelect
                    id="PassingScore"
                    defaultValue={
                      hostedExamById.passingScore
                        ? hostedExamById.passingScore.toString()
                        : ''
                    }
                    labelText="Score to pass"
                    name="passingScore"
                    register={register}
                    disabled={isPublished}
                  >
                    {Array.from(
                      { length: 20 },
                      (_, index) => (index + 1) * 5
                    ).map(number => (
                      <DuiSelectOption key={number} value={number.toString()}>
                        {number.toString()}
                      </DuiSelectOption>
                    ))}
                  </DuiSelect>
                )}
                <Controller
                  name="showTrainingCriteria"
                  control={control}
                  defaultValue={showTrainingCriteria}
                  render={({ field: { ref, ...field } }) => (
                    <Checkbox
                      {...field}
                      label="Assign training based on learners' scores"
                      variant="dark"
                      disabled={isPublished}
                    />
                  )}
                />
                {showTrainingCriteria && (
                  <AssignTrainingSection
                    trainingCriteria={hostedExamById.trainingCriteria}
                    onAddConditionClicked={handleAddEditConditionClicked}
                    onRemoveCondition={handleRemoveTrainingConditionPrompt}
                    isPublished={isPublished}
                  />
                )}
                <div
                  className={hstack({
                    alignItems: 'flex-start',
                    w: 'full'
                  })}
                >
                  <CerberusButton palette="action" shape="rounded">
                    Save
                  </CerberusButton>
                </div>
              </form>
            )}
          </div>

          {/* Questions */}
          <div
            className={vstack({
              w: 'full',
              gap: '4',
              alignItems: 'flex-start'
            })}
          >
            <Text size="h4" variant="dark" fontWeight="semiBold">
              Questions
            </Text>
            <div
              className={vstack({
                w: 'full',
                gap: '4',
                borderRadius: '4px',
                p: '4',
                bg: 'page.surface.100',
                alignItems: 'flex-start'
              })}
            >
              {hostedExamByIdLoading ? (
                <BaseSkeleton />
              ) : (
                <>
                  {/* Questions */}
                  <Text size="p" variant="dark">
                    {`
            ${hostedExamById.questions?.length} question${
              hostedExamById.questions?.length === 1 ? '' : 's'
            },${' '}
            ${hostedExamById.questions?.length} minute${
              hostedExamById.durationInMinutes === 1 ? '' : 's'
            } total duration`}
                  </Text>
                  <div
                    className={vstack({
                      w: 'full',
                      gap: '1',
                      alignItems: 'flex-start'
                    })}
                  >
                    {/* TODO: double check implementations of DragAndDropList */}
                    {/* uploadLibraryItemLoading is a new prop that is required and probably should be optional */}
                    {/* deleteModalTitle was not set; double check that this was intended */}
                    <DragAndDropList
                      deleteModalTitle=""
                      onReorder={questions => {
                        if (!_.isEqual(questions, hostedExamById?.questions)) {
                          handleAutoSave({
                            ...hostedExamById,
                            questions
                          });
                        }
                      }}
                      disabled={disabled}
                      onRemoveItem={handleRemoveQuestion}
                      items={hostedExamById?.questions}
                      onClickItem={question =>
                        router.push(
                          `/mp/${hostedExamById?.missionPartnerId}/training/exam/${hostedExamById?.id}/edit-question/${question.id}?callbackPath=${encodeURIComponent(pathname.split('?')[0])}`
                        )
                      }
                    />
                  </div>

                  {/* TODO: size WAS `small` so check that the styles for the default value of `Button.size` along with my update to `sm` didn't break something in comps */}
                  {/* TODO: `type="text"` was on here and was invalid, so I assume the default value was being applied; double check styles */}
                  {!isPublished && (
                    <Button
                      kind="text"
                      size="sm"
                      rightIcon={<Add />}
                      onClick={addContentModal.show}
                      disabled={disabled}
                    >
                      Add Question
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <CustomModal
        customModal={editTitleModal}
        title="Edit Title"
        onClose={editTitleModal.close}
      >
        {editTitleModal.isOpen && (
          <EditTitleModal
            initialValue={hostedExamById.name}
            onClose={editTitleModal.close}
            onSubmit={title => {
              setEditTitleLoading(true);
              handleUpdateExamTitle(title);
            }}
          />
        )}
      </CustomModal>

      <AddContentModal
        modal={addContentModal}
        handleKeyDown={handleKeyDownOnAddContentModal}
        onSubmit={handleAddNewContent}
        options={[
          { label: '- Select -', value: 'no-choice' },
          { label: 'Free Text', value: 'Free Text' },
          { label: 'Single Choice', value: 'Single Choice' },
          { label: 'Multiple Choice', value: 'Multiple Choice' }
        ]}
      />

      {/* TODO: figure out `item={hostedExamById}` types... my mess below could use a gql-only approach */}
      {showPreviewExam && (
        <HostedContentModal
          item={{
            ...hostedExamById,
            duration: hostedExamById.durationInMinutes,
            description: hostedExamById.description || '',
            questions: hostedExamById.questions || [],
            trainingCriteria: hostedExamById.trainingCriteria?.map(
              criteria => ({
                ...criteria,
                training: criteria.training?.map(trainingItem => ({
                  ...trainingItem,
                  type: trainingItem.type as TrainingType,
                  planType: trainingItem.planType as TrainingPlanType
                }))
              })
            ),
            __typename: hostedExamById.__typename
          }}
          vendorName={missionPartnerMinDetails.name}
          preview
          onClose={() => setShowPreviewExam(false)}
        />
      )}

      {/* Modal for "Add A Condition" link click */}
      {!hostedExamByIdLoading && (
        <ExamScoreAssignmentModal
          trainingCriteriaModal={trainingCriteriaModal}
          onClose={() => {
            selectedTrainingCriteriaItem.current = null;
            setUpdatedTrainingItems(null);
            trainingCriteriaModal.close();
          }}
          selectedTrainingCriteria={selectedTrainingCriteriaItem.current}
          updatedTrainingItems={updatedTrainingItems}
          onMoreTrainingClick={() => addCurriculumModal.show()}
          handleAddTrainingCriteria={criteria =>
            handleAddTrainingCriteria(criteria)
          }
          handleEditTrainingCriteria={criteria =>
            handleEditTrainingCriteria(criteria)
          }
          loading={addTrainingCriteriaLoading || updateTrainingCriteriaLoading}
        />
      )}

      {/* Modal for "Choose More Training" link click (which is in ExamScoreAssignmentModal) */}
      {/* TODO: memoize existingCurriculum on setUpdatedTrainingItems --> then, in the future, when we can edit, we'll need to double check that it works */}
      {/* TODO: Last item here... !!!MISSION PARTNER ID should probably be added here!!! the catalog search passes it in (unless user is duadmin) */}
      {!hostedExamByIdLoading && (
        <AddCurriculumModal
          addCurriculumModal={addCurriculumModal}
          existingCurriculum={existingCurriculum}
          onSubmitCart={shoppingCartData => {
            // TODO: Change planType on models from "Force Multiplier" to "ForceMultiplier"
            const trainingItems = shoppingCartData.map(item => {
              const commonProps = {
                title: item.title,
                vendors: item.vendors
              };

              switch (item.__typename) {
                case 'Course':
                  return {
                    ...item, // TODO: Check with Louis if this is o.k.  I'd like to prevent duplicates (both on add-items and edit-existing-condition-items), and I'm not sure what the best approach will be in the future which supports current catalog search "already added" functionality
                    description: generateSummary(
                      stripHtml(item.courseDescription),
                      140
                    ),
                    type: 'COURSE',
                    courseId: item.id,
                    title: item.courseTitle,
                    vendors: [item.vendorName]
                  };
                case 'Assessment':
                  return {
                    ...item,
                    description: item.assessmentDescription,
                    type: 'ASSESSMENT',
                    title: item.assessmentTitle,
                    vendors: [item.vendorName],
                    assessmentId: item.id
                  };
                case 'ForceMultiplier':
                  return {
                    ...item,
                    ...commonProps,
                    description: item.content?.summary,
                    type: 'TRAINING_PLAN',
                    planType: 'Force Multiplier',
                    planSourceId: item.id,
                    planVersion: item.version
                  };
                case 'Skill':
                  return {
                    ...item,
                    ...commonProps,
                    description: item.content?.summary,
                    type: 'TRAINING_PLAN',
                    planType: 'Skill',
                    planSourceId: item.id,
                    planVersion: item.version
                  };
                case 'LearningPath':
                  return {
                    ...item,
                    ...commonProps,
                    description: item.content?.summary,
                    type: 'TRAINING_PLAN',
                    planType: 'Learning Path',
                    planSourceId: item.id,
                    planVersion: item.version
                  };
                default:
                  return {};
              }
            });

            // FIRST, User may have clicked "Choose more training" once, then, clicked it again; So, if `updatedTrainingItems` already has items, we need to append the new items to the existing ones.
            // Which works since updatedTrainingItems is cleared on ExamScoreAssignmentModal close, keeping state between these two modals in sync.
            setUpdatedTrainingItems([
              ...(updatedTrainingItems || []),
              ...trainingItems
            ]);

            // todo: control bar buttons on the universal modal can only receive labels and no other real props, so I can't yet disable the submit button when there are no items in the cart.
            addCurriculumModal.close();
          }}
          onClose={addCurriculumModal.close}
        />
      )}
    </MainContentVStack>
  );
};

export default CustomExam;
