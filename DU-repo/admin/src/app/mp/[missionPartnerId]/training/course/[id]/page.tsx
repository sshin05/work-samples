'use client';
import { useState, useEffect } from 'react';
import {
  useModal,
  trapFocus,
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import {
  Flex,
  Button,
  HostedContentModal,
  Text,
  colors,
  spacing,
  InlineNotification
} from '@digital-u/digital-ui';
import { usePathname, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import {
  useUpdateHostedCourse,
  useFindHostedCourseById,
  useAddHostedCourseItem,
  usePublishHostedCourse
} from '@/api/hosted-course';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import DragAndDropList from '../../components/DragAndDropList/DragAndDropList';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { BaseSkeleton } from '@/components_new/loaders';
import { PublishModal } from '@/components_new/modals/PublishModal';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ArrowLeft } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { AddContentModal } from '../../components/AddContentModal';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { EditTitleModal } from '../../components/EditTitleModal';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { TextInput, TextArea } from '@/components_new/form';

const urlTypeMap = {
  'Text Lesson': 'text-lesson',
  'Video Lesson': 'video-lesson',
  Quiz: 'quiz',
  Survey: 'course-survey',
  'Office File': 'office-file'
};

const EditCoursePage = () => {
  const router = useRouter();
  const routePath = usePathname();
  const { id, callbackPath, missionPartnerId } = useRouteParams();
  const editTitleModal = useModal();
  const { notify } = useNotificationCenter();

  const modal = useModal();
  const handleKeyDown = trapFocus(modal.modalRef);

  const {
    hostedCourseById,
    hostedCourseByIdError,
    hostedCourseByIdLoading,
    fetchHostedCourseById
  } = useFindHostedCourseById(id);

  const { missionPartnerMinDetails } = useFindMissionPartnerMinDetails(
    hostedCourseById?.missionPartnerId
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
    setValue,
    getValues,
    reset
  } = useForm();

  useUnsavedChangesPrompt(isDirty);

  const descriptionWatcher = watch('description');

  // mutations
  const { updateHostedCourse, updateHostedCourseLoading } =
    useUpdateHostedCourse();
  const { addHostedCourseItem } = useAddHostedCourseItem();
  const { publishHostedCourse } = usePublishHostedCourse();

  // state
  const [showPreviewCourse, setShowPreviewCourse] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState(false);
  const published = hostedCourseById?.status === 'Published';
  const hasContent = hostedCourseById?.items?.length > 0;

  const disabled =
    removingItems ||
    isSubmitting ||
    editTitleLoading ||
    published ||
    hostedCourseByIdLoading ||
    updateHostedCourseLoading;

  // methods
  const updateCourseHandler = newCourse => {
    const { __typename, ...course } = newCourse;
    return updateHostedCourse({
      ...course
    })
      .then(() => fetchHostedCourseById(id))
      .then(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Course updated successfully',
          description: `The course has been updated successfully`
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
        reset({}, { keepValues: true });
      });
  };

  const handlePublishCourse = newCourse => {
    if (
      hostedCourseById?.status !== 'Published' &&
      newCourse.status === 'Published' &&
      (!hasContent || newCourse.description.trim() === '')
    ) {
      notify({
        heading: 'Error',
        description:
          'You must add at least one content item and description to the course to publish.',
        palette: 'danger'
      });
      return false; // So react-hook-form knows things are not okay
    }

    return publishHostedCourse(
      hostedCourseById?.id,
      hostedCourseById?.missionPartnerId
    )
      .then(() => fetchHostedCourseById(id))
      .then(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
      })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Course updated successfully',
          description: `The course has been updated successfully`
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
        reset({}, { keepValues: true });
      });
  };

  const handleUpdateCourse = data => {
    if (typeof data === 'string') {
      // We are just being passed the title from the update modal
      return updateCourseHandler({
        ...hostedCourseById,
        name: data,
        description: ''
      });
    }

    return updateCourseHandler({
      ...hostedCourseById,
      ...data,
      description: data.description || ''
    });
  };

  const handleAutoSave = newCourse => {
    const { __typename, ...course } = newCourse;

    return updateHostedCourse({
      ...course
    })
      .then(() => fetchHostedCourseById(id))
      .then(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
      })
      .finally(() => reset({}, { keepValues: true }));
  };

  const handleRedirectToEditQuestion = content => {
    const pathname = getRouteUrl(
      routeGenerators.CustomTrainingCourseEdit({
        missionPartnerId: hostedCourseById.missionPartnerId,
        courseId: hostedCourseById.id,
        contentId: content.id,
        contentType: urlTypeMap[content.type]
      }),
      {
        callbackPath: routePath.split('?')[0],
        type: content.type,
        contentId: content.id
      }
    );
    router.push(pathname);
  };

  const handleRemoveQuestion = itemId => {
    setRemovingItems(true);
    const newItems = hostedCourseById.items.filter(item => item.id !== itemId);
    return updateCourseHandler({
      ...hostedCourseById,
      items: newItems
    });
  };

  // TODO: Tech debt, refactor this to just push to the corrosponding
  // content type page, handle the creation of the item on that page
  // and then redirect back to this page.
  // This will clean up the user experience when adding items to a course
  // by not making us force the title and description to be added on this page
  const handleAddNewContent = async ({ type }) => {
    let item = {};
    const newId = crypto.randomUUID();

    switch (type) {
      case 'office-file':
        item = {
          id: newId,
          type: 'Office File',
          title: 'New Office File'
        };
        break;
      case 'video-lesson':
        item = {
          id: newId,
          type: 'Video Lesson',
          title: 'New Video Lesson'
        };
        break;
      case 'text-lesson':
        item = { id: newId, type: 'Text Lesson', title: 'New Text Lesson' };
        break;
      case 'quiz':
        item = { id: newId, type: 'Quiz', title: 'New Quiz' };
        break;
      case 'course-survey':
        item = {
          id: newId,
          type: 'Survey',
          title: 'New Course Survey',
          questions: []
        };
        break;

      default:
        break;
    }

    await addHostedCourseItem({
      id,
      missionPartnerId,
      item
    });

    await fetchHostedCourseById(hostedCourseById?.id);

    const pathname = getRouteUrl(
      routeGenerators.CustomTrainingCourseEdit({
        missionPartnerId: hostedCourseById.missionPartnerId,
        courseId: hostedCourseById.id,
        contentId: newId,
        contentType: type
      }),
      {
        callbackPath: routePath.split('?')[0],
        type,
        contentId: newId
      }
    );

    router.push(pathname);
  };

  useEffect(() => {
    if (!descriptionWatcher && hostedCourseById?.description) {
      setValue('description', hostedCourseById.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostedCourseById]);

  useEffect(() => {
    if (hostedCourseByIdError) {
      setShowErrorModal(true);
    }
  }, [hostedCourseByIdError]);

  return (
    <MainContentVStack>
      {showErrorModal && (
        <Flex justifyContent="center">
          <InlineNotification
            kind="error"
            heading="Error"
            subheading="There was a problem loading the hosted course."
            variant="dark"
            onClose={() => {
              setShowErrorModal(false);
              const route =
                callbackPath ??
                getRouteUrl(
                  routeGenerators.CustomTrainingWithParameters({
                    missionPartnerId,
                    tab: '1'
                  })
                );
              const validRoute = Array.isArray(route) ? route[0] : route;
              router.push(validRoute);
            }}
          />
        </Flex>
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
              {hostedCourseByIdLoading ? (
                <Text size="h2" fontWeight="extraBold">
                  <BaseSkeleton width={200} />
                </Text>
              ) : (
                <Text size="h2" variant="dark" fontWeight="bold">
                  {hostedCourseById.name}
                </Text>
              )}

              <Button
                kind="text"
                size="sm"
                onClick={editTitleModal.show}
                disabled={disabled}
              >
                {!published && (
                  <Text
                    variant="dark"
                    style={{ color: `${colors.purple[800]}` }}
                  >
                    Edit Title
                  </Text>
                )}
              </Button>

              <div
                className={hstack({
                  alignItems: 'flex-start',
                  justify: 'flex-end',
                  gap: '4',
                  flexGrow: 1
                })}
              >
                <CerberusButton
                  palette="action"
                  usage="outlined"
                  shape="rounded"
                  onClick={() => setShowPreviewCourse(true)}
                  disabled={
                    removingItems ||
                    isSubmitting ||
                    editTitleLoading ||
                    hostedCourseByIdLoading ||
                    !hasContent
                  }
                >
                  Preview
                </CerberusButton>

                {!published && (
                  <PublishModal
                    onConfirm={() => {
                      setValue('status', 'Published');
                      handleSubmit(handlePublishCourse)();
                    }}
                    title="Confirm publish"
                    message="Once published, you will no longer be able to add, remove, or rearrange content."
                  />
                )}
              </div>
            </div>
            {hostedCourseByIdLoading ? (
              <div className={vstack({ gap: 4 })}>
                <Text size="p" variant="dark">
                  Item ID: <BaseSkeleton width={200} />
                </Text>
              </div>
            ) : (
              <Text size="p" variant="dark">
                Item ID: {hostedCourseById.id}
              </Text>
            )}
          </div>
          {/* Details */}
          <Flex direction="column" gap={spacing[4]} style={{ width: '100%' }}>
            <Text size="h3" variant="dark" fontWeight="semiBold">
              Details
            </Text>
            {hostedCourseByIdLoading ? (
              <BaseSkeleton />
            ) : (
              <form onSubmit={handleSubmit(handleUpdateCourse)}>
                <Flex
                  style={{
                    background: 'white',
                    borderRadius: '4px',
                    padding: spacing[4]
                  }}
                  direction="column"
                  gap={spacing[4]}
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
                    {hostedCourseById.status}
                  </Text>

                  <Controller
                    name="duration"
                    control={control}
                    rules={{
                      validate: value => {
                        if (getValues('status') === 'Draft') {
                          return true;
                        }

                        return value < 1 ||
                          (getValues('duration') < 1 &&
                            hostedCourseById.duration < 1)
                          ? 'You must enter a duration greater than 0.'
                          : true;
                      }
                    }}
                    defaultValue={hostedCourseById.duration}
                    render={({
                      field: { ref, ...field },
                      fieldState: { error }
                    }) => (
                      <Flex style={{ maxWidth: '50% ' }}>
                        <TextInput
                          {...field}
                          type="number"
                          label="Duration (minutes)"
                          errorMessage={error?.message}
                          onClick={event => {
                            const target = event.target as HTMLInputElement;
                            target.select();
                          }}
                          onChange={event =>
                            field.onChange(Number(event.target.value))
                          }
                          required
                        />
                      </Flex>
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: 'The description is required.',
                      validate: value => {
                        if (getValues('status') === 'Draft') {
                          return true;
                        }
                        return value?.trim() === ''
                          ? 'The description is required.'
                          : true;
                      },
                      maxLength: 500
                    }}
                    defaultValue={hostedCourseById.description}
                    render={({
                      field: { ref, ...field },
                      fieldState: { error }
                    }) => (
                      <Flex style={{ maxWidth: '50% ' }}>
                        <TextArea
                          {...field}
                          label="Description"
                          inputLength={field.value?.length}
                          maxLength={500}
                          errorMessage={error?.message}
                          rows={8}
                          required
                        />
                      </Flex>
                    )}
                  />
                  <div
                    className={hstack({
                      alignItems: 'flex-start',
                      w: 'full'
                    })}
                  >
                    <CerberusButton
                      palette="action"
                      shape="rounded"
                      type="submit"
                    >
                      Save
                    </CerberusButton>
                  </div>
                </Flex>
              </form>
            )}
          </Flex>
          {/* Content */}
          <Flex direction="column" gap={spacing[4]} style={{ width: '100%' }}>
            <Text size="h3" variant="dark" fontWeight="semiBold">
              Content
            </Text>
            <Flex
              style={{
                background: 'white',
                borderRadius: '4px',
                padding: spacing[4]
              }}
              direction="column"
              gap={spacing[4]}
            >
              {hostedCourseByIdLoading ? (
                <BaseSkeleton />
              ) : (
                <>
                  {/* No questions */}
                  {!hostedCourseById.items?.length && (
                    <Text size="p" variant="dark">
                      No content has been added yet.
                    </Text>
                  )}

                  {/* Questions */}
                  <Text size="p" variant="dark">
                    {hostedCourseById.items?.length} items,
                    {' ' + hostedCourseById.duration} minutes total duration
                  </Text>
                  <Flex direction="column" gap={spacing[1]}>
                    <DragAndDropList
                      onReorder={items => {
                        if (!_.isEqual(items, hostedCourseById.items)) {
                          handleAutoSave({
                            ...hostedCourseById,
                            items
                          });
                        }
                      }}
                      onRemoveItem={handleRemoveQuestion}
                      onClickItem={handleRedirectToEditQuestion}
                      items={hostedCourseById.items}
                      disabled={disabled}
                      deleteModalTitle={false}
                    />
                  </Flex>
                  {!published && (
                    <Button
                      type="button"
                      kind="text"
                      size="sm"
                      onClick={modal.show}
                      disabled={disabled}
                    >
                      Add Content +
                    </Button>
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </>
      )}
      {/* Modals */}
      {/* {showEditTitleModal && (
        <TextEntryModal
          title="Edit Title"
          onSubmit={title => {
            setEditTitleLoading(true);
            handleUpdateCourse(title);
          }}
          onClose={() => setShowEditTitleModal(false)}
          label="Title"
          defaultText={hostedCourseById.name}
        />
      )} */}
      {/* Modals */}
      <CustomModal
        customModal={editTitleModal}
        title="Edit Title"
        onClose={editTitleModal.close}
      >
        {editTitleModal.isOpen && (
          <EditTitleModal
            initialValue={hostedCourseById.name}
            onClose={editTitleModal.close}
            onSubmit={title => {
              setEditTitleLoading(true);
              handleUpdateCourse(title);
            }}
          />
        )}
      </CustomModal>
      <AddContentModal
        handleKeyDown={handleKeyDown}
        modal={modal}
        onSubmit={handleAddNewContent}
        options={[
          { label: '- Select -', value: '' },
          { label: 'Text Lesson', value: 'text-lesson' },
          { label: 'Video Lesson', value: 'video-lesson' },
          { label: 'Quiz', value: 'quiz' },
          { label: 'Course Survey', value: 'course-survey' },
          { label: 'Office File', value: 'office-file' }
        ]}
      />

      {showPreviewCourse && (
        <HostedContentModal
          item={{
            ...hostedCourseById,
            description: hostedCourseById.description || '',
            duration: hostedCourseById.duration || 0,
            items: hostedCourseById.items || [],
            __typename: hostedCourseById.__typename
          }}
          onClose={() => setShowPreviewCourse(false)}
          preview
          vendorName={missionPartnerMinDetails?.name}
          courseMethods={{
            onComplete: async () => {
              setShowPreviewCourse(false);
              return Promise.resolve(); // library component requires async/await for onComplete; or TS fails
            }
          }}
        />
      )}
    </MainContentVStack>
  );
};

export default EditCoursePage;
