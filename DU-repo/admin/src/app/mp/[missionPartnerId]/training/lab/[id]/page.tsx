'use client';
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  Text,
  colors,
  spacing,
  useToast,
  UploadImageModal,
  Image,
  Tabs,
  Tab,
  HostedContentModal,
  Box,
  InlineNotification,
  DuiSelect,
  DuiSelectOption,
  InlineLoading
} from '@digital-u/digital-ui';
import { css } from '@cerberus/styled-system/css';
import { ArrowRight, TrashCan, Upload } from '@carbon/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { isEqual } from 'lodash';
import DragAndDropList from '../../components/DragAndDropList/DragAndDropList';
import { AddContentModal } from '../../components/AddContentModal';
import {
  useUpdateLab,
  useUploadPreviewImage,
  useFindLabAndInfoById
} from '@/api/lab';
import { useDeleteLab } from '@/api/lab/useDeleteLab';
import HostedContentPreviewContainer from '../../../../../../components/manage-mission-partners/custom-training/HostedContentPreviewContainer';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { BaseSkeleton } from '@/components_new/loaders';
import { PublishModal } from '@/components_new/modals/PublishModal';
import { useRouteParams } from '@/hooks/useRouteParams';
import { usePathname, useRouter } from 'next/navigation';
import { trapFocus, useModal, Button as CerberusButton } from '@cerberus/react';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { EditTitleModal } from '../../components/EditTitleModal';
import { cx } from 'styled-system/css';
import { TextArea } from '@/components_new/form';

const urlTypeMap = {
  'Text Instruction': 'text-instruction',
  'Video Instruction': 'video-instruction'
};

const displayTypeMap = {
  'Text Lesson': 'Text Instruction',
  'Video Lesson': 'Video Instruction'
};

const backendTypeMap = {
  'Text Instruction': 'Text Lesson',
  'Video Instruction': 'Video Lesson'
};

// This function has a Cognitive Complexity of 21 and the max is 20.
// eslint-disable-next-line sonarjs/cognitive-complexity
const CreateLabsPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { id, missionPartnerId, callbackPath } = useRouteParams();
  const errorModal = useModal();

  const {
    relevantLabInfo,
    findLabAndInfoByIdLoading,
    findLabAndInfoByIdError,
    findLabById,
    fetchLabAndInfoById
  } = useFindLabAndInfoById(id);

  const isPublished = findLabById?.status === 'Published';
  const previewImage = findLabById?.previewImageUrl;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setValue,
    reset,
    getValues,
    register
  } = useForm();

  const [, setToast] = useToast();
  const addContentModal = useModal();
  const handleKeyDownOnAddContentModal = trapFocus(addContentModal.modalRef);
  const editTitleModal = useModal();

  const { updateLab } = useUpdateLab();
  const { uploadPreviewImage, uploadPreviewImageLoading } =
    useUploadPreviewImage();

  const { deleteLab, deleteLabLoading } = useDeleteLab();

  useUnsavedChangesPrompt(isDirty);

  // state
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPreviewLab, setShowPreviewLab] = useState(false);
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState(false);
  const [removingImage, setRemovingImage] = useState(false);
  const [showPreviewModalFor, setShowPreviewModalFor] = useState(null);
  const [tab, setTab] = useState(0);
  const [relatedTrainingPlans, setRelatedPlans] = useState([]);

  const hasContent =
    findLabById?.coreConceptItems?.length > 0 ||
    findLabById?.content?.length > 0;

  const disabled =
    isPublished ||
    findLabAndInfoByIdLoading ||
    uploadPreviewImageLoading ||
    isSubmitting ||
    removingItems ||
    editTitleLoading ||
    deleteLabLoading;
  // Image handlers

  const onSelectUploadImage = async file => {
    try {
      if (file) {
        await handleUploadImage(file);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUploadImage = file =>
    file
      ? uploadPreviewImage(findLabById.id, file).then(() =>
          fetchLabAndInfoById(id)
        )
      : Promise.resolve(null);

  const updateLabHandler = async newLab => {
    const {
      missionPartner: _missionPartner,
      launchConfig: _launchConfig,
      path: _path,
      labType: _labType,
      __typename,
      ...lab
    } = newLab;

    return updateLab({
      ...lab,
      description: newLab.description || '',
      launchConfig: {
        type: getValues('labType'),
        path: getValues('path')
      }
    })
      .then(() => fetchLabAndInfoById(id))
      .then(() =>
        setToast({
          kind: 'success',
          title: 'Lab updated successfully',
          subtitle: `The lab has been updated successfully`
        })
      )
      .catch(error => {
        setToast({
          title: 'Error',
          subtitle: error.message,
          kind: 'error'
        });
      })
      .finally(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
        setRemovingImage(false);
      });
  };

  const handleAutoSave = async newLab => {
    const {
      missionPartner: _missionPartner,
      launchConfig: _launchConfig,
      path: _path,
      labType: _labType,
      __typename,
      ...lab
    } = newLab;

    return updateLab({
      ...lab,
      description: newLab.description || '',
      launchConfig: {
        type: getValues('labType'),
        path: getValues('path')
      }
    })
      .then(() => fetchLabAndInfoById(id))
      .then(() => {
        setEditTitleLoading(false);
        setRemovingItems(false);
        setRemovingImage(false);
      });
  };

  const handleSubmitDetails = data => {
    return updateLabHandler({
      ...findLabById,
      ...data,
      launchConfig: {
        type: data.labType,
        path: data.path
      }
    }).then(() => reset({}, { keepValues: true }));
  };

  // Change Once Video/Text instruction is implemented
  const handleRedirectToEditInstruction = content => {
    router.push(
      `/mp/${
        findLabById.missionPartnerId
      }/training/lab/${findLabById.id}/edit-content/${
        urlTypeMap[content.type]
      }/${content.id}?callbackPath=${pathName}&type=${content.type}`
    );
  };

  const handleRemoveInstructions = itemId => {
    setRemovingItems(true);
    const newItems = findLabById.instructions.filter(
      item => item.id !== itemId
    );
    return updateLabHandler({
      ...findLabById,
      instructions: newItems
    });
  };

  const handleRemoveDescriptions = itemId => {
    setRemovingItems(true);
    const newItems = findLabById.content.filter(item => item.id !== itemId);
    return updateLabHandler({
      ...findLabById,
      content: newItems
    });
  };

  const handleRemoveConcept = item => {
    setRemovingItems(true);
    const newItems = findLabById.coreConceptItems.filter(
      conceptItem => conceptItem.itemId !== item
    );

    return updateLabHandler({
      ...findLabById,
      coreConceptItems: newItems
    });
  };

  const handleRemoveTrainingPlans = itemId => {
    setRemovingItems(true);
    const newItems = findLabById.relevantLearningPaths.filter(
      item => item.itemId !== itemId
    );

    return updateLabHandler({
      ...findLabById,
      relevantLearningPaths: newItems
    });
  };

  const handleAutoSaveList = (items, type) => {
    let autoSaveItems;
    switch (type) {
      case 'concepts':
        autoSaveItems = {
          coreConceptItems: items.map(item => {
            return {
              itemId: item.id,
              itemType: item.itemType,
              itemTitle: item.title
            };
          })
        };
        break;
      case 'paths':
        autoSaveItems = {
          relevantLearningPaths: items.map(item => {
            return {
              itemId: item.id,
              itemType: item.itemType,
              itemTitle: item.title,
              itemVersion: item.version
            };
          })
        };
        break;
      case 'instructions':
        autoSaveItems = {
          instructions: items.map(item => {
            return {
              id: item.id,
              type: item.type,
              title: item.title,
              content: item.content,
              videoFilename: item?.videoFilename,
              videoUrl: item?.videoUrl
            };
          })
        };
        break;
      default:
        autoSaveItems = {
          content: items.map(item => {
            return {
              id: item.id,
              title: item.title,
              description: item.description
            };
          })
        };
        break;
    }

    handleAutoSave({ ...findLabById, ...autoSaveItems });
  };

  const handleAddNewInstructions = ({ type }) => {
    const callbackPath = pathName;
    router.push(
      getRouteUrl(
        `/mp/${findLabById.missionPartnerId}/training/lab/${findLabById.id}/edit-content/${type}/new`,
        {
          callbackPath: callbackPath
        }
      )
    );
  };

  const handleAddNewContent = () => {
    const callbackPath = pathName;
    router.push(
      getRouteUrl(
        `/mp/${findLabById.missionPartnerId}/training/lab/${findLabById.id}/edit-description/new`,
        {
          callbackPath: callbackPath
        }
      )
    );
  };

  const handleRedirectToEditDescription = content => {
    const callbackPath = pathName;
    router.push(
      getRouteUrl(
        `/mp/${findLabById.missionPartnerId}/training/lab/${findLabById.id}/edit-description/${content.id}`,
        {
          callbackPath: callbackPath
        }
      )
    );
  };

  const handleAddNewConcepts = () => {
    const callbackPath = pathName;
    const mpid = findLabById.missionPartnerId ?? 'all';
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId
        }),
        {
          targetId: findLabById.id,
          targetType: 'lab',
          allowedContent: 'course',
          missionPartnerId: mpid,
          callbackPath: callbackPath
        }
      )
    );
  };

  const handleAddRelatedTrainingPlans = () => {
    const callbackPath = pathName;
    const mpid = findLabById.missionPartnerId ?? 'all';
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId
        }),
        {
          targetId: findLabById.id,
          targetType: 'lab',
          allowedContent: 'plan',
          missionPartnerId: mpid,
          callbackPath: callbackPath
        }
      )
    );
  };

  const handleDeleteLab = async () => {
    try {
      await deleteLab(id);
      setToast({
        kind: 'success',
        title: 'Lab deleted',
        subtitle: 'The lab has been deleted successfully'
      });
      // Redirect back to the labs list page
      router.push(
        getRouteUrl(
          routeGenerators.CustomTrainingWithParameters({
            missionPartnerId,
            tab: '1'
          })
        )
      );
    } catch (error) {
      setToast({
        title: 'Error',
        subtitle: error.message,
        kind: 'error'
      });
    }
  };

  type LearningPathItemWithDetail = {
    __typename?: 'learningPathItemWithDetail';
    id?: string;
    itemType: string;
    schoolId?: string;
    title: string;
    version: string;
    href?: string;
  };

  const handleListRelevantTrainingPlanInfo = () => {
    const plansWithHrefs = relevantLabInfo.relevantLearningPaths.map(item => {
      if (item.itemType === 'Skill') {
        item = {
          ...item,
          href:
            window.location.origin + `/app/skills/${item.id}?skillid=${item.id}`
        } as LearningPathItemWithDetail;
      }

      if (item.itemType === 'Learning Path') {
        item = {
          ...item,
          href:
            window.location.origin +
            `/app/learning-paths/${item.schoolId}/${item.id}`
        } as LearningPathItemWithDetail;
      }

      if (item.itemType === 'Force Multiplier') {
        item = {
          ...item,
          href: window.location.origin + `/app/force-multipliers/${item.id}`
        } as LearningPathItemWithDetail;
      }

      return item;
    });
    setRelatedPlans(plansWithHrefs);
  };

  const handleClickItem = item => {
    if (item.source === 'du-create') {
      setShowPreviewModalFor({ ...item });
    } else {
      window.open(item.href, '_blank');
    }
  };

  const handleReorderInstructions = (
    items,
    originalItems,
    handleAutoSaveList
  ) => {
    // Convert to backend types before comparing and saving
    const backendItems = items.map(item => ({
      ...item,
      type: backendTypeMap[item.type] || item.type
    }));

    const originalBackendItems = originalItems.map(item => ({
      ...item,
      type: item.type
    }));

    if (!isEqual(backendItems, originalBackendItems)) {
      handleAutoSaveList(backendItems, 'instructions');
    }
  };

  useEffect(() => {
    if (findLabById?.description) {
      setValue('description', findLabById.description);
    }
    if (findLabById.launchConfig?.path) {
      setValue('launchConfig', findLabById.launchConfig.path);
    }
    if (findLabById.launchConfig?.type) {
      setValue('labType', findLabById.launchConfig.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findLabById]);

  useEffect(() => {
    if (relevantLabInfo?.relevantLearningPaths) {
      handleListRelevantTrainingPlanInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relevantLabInfo]);

  useEffect(() => {
    if (findLabAndInfoByIdError) {
      errorModal.show();
    }
  }, [errorModal, findLabAndInfoByIdError]);

  return (
    <MainContentVStack>
      {errorModal.isOpen && (
        <Flex justifyContent="center">
          <InlineNotification
            heading="Error"
            subheading="There was a problem loading the hosted lab."
            lowContrast
            onClose={() => {
              errorModal.close();
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
        </Flex>
      )}
      {!errorModal.isOpen && (
        <>
          {/* Title */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <Button
              type="button"
              kind="text"
              size="sm"
              onClick={() =>
                router.push(
                  getRouteUrl(
                    routeGenerators.CustomTraining({
                      missionPartnerId
                    })
                  )
                )
              }
            >
              <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
                &lt; BACK
              </Text>
            </Button>

            <div
              className={hstack({
                gap: '4',
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              {findLabAndInfoByIdLoading ? (
                <Text size="h2" fontWeight="extraBold">
                  <BaseSkeleton width={200} />
                </Text>
              ) : (
                <Text size="h2" variant="dark" fontWeight="bold">
                  {findLabById.name}
                </Text>
              )}
              {!isPublished && (
                <Button
                  kind="text"
                  size="sm"
                  onClick={editTitleModal.show}
                  disabled={
                    isSubmitting || findLabAndInfoByIdLoading || removingItems
                  }
                >
                  <Text
                    variant="dark"
                    style={{ color: `${colors.purple[800]}` }}
                  >
                    Edit Title
                  </Text>
                </Button>
              )}

              <CerberusButton
                style={{ marginLeft: 'auto' }}
                usage="outlined"
                palette="action"
                shape="rounded"
                onClick={() => {
                  setShowPreviewLab(true);
                }}
                disabled={
                  findLabById?.instructions?.length < 1 ||
                  isSubmitting ||
                  findLabAndInfoByIdLoading ||
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
                    handleSubmit(handleSubmitDetails)();
                  }}
                  title="Confirm publish"
                  message="Once published, you will no longer be able to add, remove, or rearrange content."
                />
              )}
            </div>
            {findLabAndInfoByIdLoading ? (
              <Flex direction="row" gap={spacing[4]}>
                <Text size="p" variant="dark">
                  Item ID: <BaseSkeleton width={200} />
                </Text>
              </Flex>
            ) : (
              <Text size="p" variant="dark">
                Item ID: {id}
              </Text>
            )}
          </div>

          {/* Details */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <Text size="h3" variant="dark" fontWeight="semiBold">
              Details
            </Text>
            {findLabAndInfoByIdLoading ? (
              <BaseSkeleton />
            ) : (
              <form
                className={vstack({
                  w: 'full',
                  gap: 4,
                  alignItems: 'flex-start'
                })}
                onSubmit={handleSubmit(handleSubmitDetails)}
              >
                <Flex
                  justifyContent="flex-end"
                  flexWrap="wrap"
                  gap={spacing[4]}
                  direction="column"
                  style={{ flexGrow: 1 }}
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
                    {findLabById.status}
                  </Text>
                </Flex>

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
                    maxLength: 90
                  }}
                  defaultValue={findLabById.description || ''}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <div className={hstack({ w: '50%' })}>
                      <TextArea
                        {...field}
                        label="Card Summary"
                        inputLength={field.value?.length}
                        maxLength={90}
                        errorMessage={error?.message}
                        rows={8}
                        disabled={disabled}
                        required
                      />
                    </div>
                  )}
                />

                <DuiSelect
                  id="Type"
                  defaultValue={findLabById.launchConfig?.type || 'jupyter'}
                  labelText="Lab Type"
                  name="labType"
                  register={register}
                >
                  <DuiSelectOption value="jupyter">Jupyter</DuiSelectOption>
                  <DuiSelectOption value="sagemaker">Sagemaker</DuiSelectOption>
                </DuiSelect>

                <Controller
                  name="path"
                  control={control}
                  rules={{
                    validate: value => {
                      return value.trim() === ''
                        ? 'The Lab Path is required.'
                        : true;
                    }
                  }}
                  defaultValue={findLabById.launchConfig?.path || ''}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <div className={hstack({ w: '50%' })}>
                      <TextArea
                        {...field}
                        label="Lab Path"
                        rows={1}
                        disabled={disabled}
                        errorMessage={error?.message}
                        required
                      />
                    </div>
                  )}
                />

                <Button
                  disabled={disabled || isSubmitting}
                  loading={isSubmitting}
                  kind="pill-primary"
                  type="submit"
                >
                  Save
                </Button>
              </form>
            )}
          </div>
          <Tabs adminPortal onChange={i => setTab(i)}>
            <Tab label="Overview" />
            <Tab label="Tutorial" />
          </Tabs>
          {tab === 0 ? (
            // Description
            <>
              <Flex
                style={{ width: '100%' }}
                direction="column"
                gap={spacing[4]}
              >
                <Flex alignItems="center" gap={spacing[2]}>
                  <Text size="h3" variant="dark" fontWeight="semiBold">
                    Description Blocks
                  </Text>
                </Flex>

                <Flex
                  style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '4px',
                    padding: spacing[4]
                  }}
                  direction="column"
                  gap={spacing[4]}
                >
                  {findLabAndInfoByIdLoading ? (
                    <BaseSkeleton />
                  ) : (
                    <>
                      {/* No Blocks */}
                      {findLabById.content?.length === 0 && (
                        <Text size="p" variant="dark">
                          0 content blocks
                        </Text>
                      )}
                      {findLabById.content?.length === 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.content?.length} content block
                        </Text>
                      )}
                      {findLabById.content?.length > 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.content?.length} content blocks
                        </Text>
                      )}

                      {/* Blocks */}
                      <Flex direction="column" gap={spacing[1]}>
                        <DragAndDropList
                          removeType
                          deleteModalTitle="Delete Content Block"
                          onReorder={items => {
                            if (!isEqual(items, findLabById.content)) {
                              handleAutoSaveList(items, 'content');
                            }
                          }}
                          onRemoveItem={handleRemoveDescriptions}
                          onClickItem={handleRedirectToEditDescription}
                          items={findLabById.content}
                          disabled={disabled}
                        />
                      </Flex>

                      <Button
                        type="button"
                        kind="text"
                        size="sm"
                        onClick={handleAddNewContent}
                        disabled={disabled}
                      >
                        Add Content <ArrowRight />
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
              {/* Core Concepts */}
              <Flex
                style={{ width: '100%' }}
                direction="column"
                gap={spacing[4]}
              >
                <Text size="h3" variant="dark" fontWeight="semiBold">
                  Core Concepts
                </Text>
                <Flex
                  style={{
                    width: '100%',
                    padding: spacing[4],
                    background: 'white',
                    borderRadius: '4px'
                  }}
                  direction="column"
                  gap={spacing[4]}
                >
                  {findLabAndInfoByIdLoading ? (
                    <BaseSkeleton />
                  ) : (
                    <>
                      {/* No concepts */}
                      {findLabById.coreConceptItems?.length === 0 && (
                        <Text size="p" variant="dark">
                          0 items
                        </Text>
                      )}
                      {findLabById.coreConceptItems?.length === 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.coreConceptItems?.length} item
                        </Text>
                      )}
                      {findLabById.coreConceptItems?.length > 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.coreConceptItems?.length} items
                        </Text>
                      )}

                      {/* Concepts */}
                      <Flex direction="column" gap={spacing[1]}>
                        <DragAndDropList
                          removeType
                          onReorder={items => {
                            if (!isEqual(items, relevantLabInfo.coreConcepts)) {
                              handleAutoSaveList(items, 'concepts');
                            }
                          }}
                          onRemoveItem={handleRemoveConcept}
                          onClickItem={handleClickItem}
                          items={relevantLabInfo.coreConcepts}
                          deleteModalTitle="Delete Core Concept Item"
                          disabled={disabled}
                        />
                      </Flex>

                      <Button
                        type="button"
                        kind="text"
                        size="sm"
                        onClick={handleAddNewConcepts}
                        disabled={disabled}
                      >
                        Add Item <ArrowRight />
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
              {/* Related Training Plans */}
              <Flex
                style={{ width: '100%' }}
                direction="column"
                gap={spacing[4]}
              >
                <Text size="h3" variant="dark" fontWeight="semiBold">
                  Related Training Plans
                </Text>
                <Flex
                  style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '4px',
                    padding: spacing[4]
                  }}
                  direction="column"
                  gap={spacing[4]}
                >
                  {findLabAndInfoByIdLoading ? (
                    <BaseSkeleton />
                  ) : (
                    <>
                      {/* No Related Training Plans */}
                      {findLabById.relevantLearningPaths?.length === 0 && (
                        <Text size="p" variant="dark">
                          0 items
                        </Text>
                      )}
                      {findLabById.relevantLearningPaths?.length === 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.relevantLearningPaths?.length} item
                        </Text>
                      )}
                      {findLabById.relevantLearningPaths?.length > 1 && (
                        <Text size="p" variant="dark">
                          {findLabById.relevantLearningPaths?.length} items
                        </Text>
                      )}

                      {/* Training Plans */}
                      <Flex direction="column" gap={spacing[1]}>
                        <DragAndDropList
                          removeType
                          onReorder={items => {
                            if (!isEqual(items, relatedTrainingPlans)) {
                              handleAutoSaveList(items, 'paths');
                            }
                          }}
                          onRemoveItem={handleRemoveTrainingPlans}
                          onClickItem={handleClickItem}
                          items={relatedTrainingPlans}
                          deleteModalTitle="Delete Related Training Plan"
                          disabled={disabled}
                        />
                      </Flex>

                      <Button
                        type="button"
                        kind="text"
                        size="sm"
                        onClick={handleAddRelatedTrainingPlans}
                        disabled={disabled}
                      >
                        Add Item <ArrowRight />
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
              <Flex
                style={{ width: '100%' }}
                direction="column"
                gap={spacing[4]}
              >
                <Text size="h3" variant="dark" fontWeight="semiBold">
                  Lab Screenshot
                </Text>
                <Flex
                  style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '4px',
                    padding: spacing[4]
                  }}
                  direction="column"
                  gap={spacing[4]}
                >
                  <Flex
                    direction="column"
                    style={{ maxWidth: '30%' }}
                    gap={spacing[4]}
                  >
                    {findLabAndInfoByIdLoading ? (
                      <BaseSkeleton />
                    ) : (
                      <>
                        <Text size="label">Preview Image (Optional)</Text>
                        <Flex direction="row" gap={spacing[4]}>
                          {previewImage ? (
                            <>
                              <Image
                                // To prevent browser caching
                                // eslint-disable-next-line sonarjs/pseudo-random
                                src={`${previewImage}?${Math.random()}`}
                                size="m"
                                style={{
                                  height: 'fit-content',
                                  maxWidth: '50%'
                                }}
                                alt="Preview Image"
                              />
                              {!isPublished && (
                                <Flex direction="column" gap={spacing[4]}>
                                  <Button
                                    type="button"
                                    kind="text"
                                    size="sm"
                                    onClick={(
                                      event: React.MouseEvent<HTMLButtonElement>
                                    ) => {
                                      event.preventDefault();
                                      setShowImageModal(true);
                                    }}
                                    disabled={disabled}
                                  >
                                    Change Image
                                  </Button>
                                  <Button
                                    type="button"
                                    kind="text"
                                    size="sm"
                                    onClick={() => {
                                      setRemovingImage(true);
                                      updateLabHandler({
                                        ...findLabById,
                                        previewImageUrl: ''
                                      });
                                    }}
                                    style={{ color: colors.red[800] }}
                                    disabled={disabled}
                                  >
                                    Remove Image
                                    <TrashCan />
                                  </Button>
                                </Flex>
                              )}
                            </>
                          ) : (
                            <Button
                              type="button"
                              kind="text"
                              size="sm"
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                event.preventDefault();
                                setShowImageModal(true);
                              }}
                              disabled={disabled}
                            >
                              Upload Image <Upload />
                            </Button>
                          )}
                        </Flex>
                        {uploadPreviewImageLoading && (
                          <InlineLoading
                            description="Your image is uploading"
                            status="active"
                          />
                        )}
                        {removingImage && (
                          <InlineLoading
                            description="Your image is being removed"
                            status="active"
                          />
                        )}
                      </>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </>
          ) : (
            // Instructions
            <Flex style={{ width: '100%' }} direction="column" gap={spacing[4]}>
              <Flex direction="row" gap={spacing[4]}>
                <Text size="h3" variant="dark" fontWeight="semiBold">
                  Tutorial Instructions
                </Text>
                <Button
                  disabled={
                    findLabById?.instructions?.length < 1 ||
                    isSubmitting ||
                    findLabAndInfoByIdLoading ||
                    removingItems ||
                    editTitleLoading ||
                    !hasContent
                  }
                  kind="pill-secondary"
                  onClick={() => setShowPreviewLab(true)}
                  style={{ marginLeft: 'auto' }}
                >
                  Preview Tutorial
                </Button>
              </Flex>

              <Flex
                style={{
                  width: '100%',
                  background: 'white',
                  borderRadius: '4px',
                  padding: spacing[4]
                }}
                direction="column"
                gap={spacing[4]}
              >
                {findLabAndInfoByIdLoading ? (
                  <BaseSkeleton />
                ) : (
                  <>
                    {/* No instructions */}
                    {findLabById.instructions?.length === 0 && (
                      <Text size="p" variant="dark">
                        0 content blocks
                      </Text>
                    )}
                    {findLabById.instructions?.length > 0 && (
                      <Text size="p" variant="dark">
                        {findLabById.instructions?.length} items
                      </Text>
                    )}

                    {/* Instructions */}
                    <Flex direction="column" gap={spacing[1]}>
                      <DragAndDropList
                        deleteModalTitle="Delete Item"
                        onReorder={items =>
                          handleReorderInstructions(
                            items,
                            findLabById.instructions,
                            handleAutoSaveList
                          )
                        }
                        onRemoveItem={handleRemoveInstructions}
                        onClickItem={handleRedirectToEditInstruction}
                        disabled={disabled}
                        // Transform display types for UI rendering
                        items={findLabById.instructions?.map(item => ({
                          ...item,
                          type: displayTypeMap[item.type] || item.type
                        }))}
                      />
                    </Flex>

                    {!isPublished && (
                      <Button
                        type="button"
                        kind="text"
                        size="sm"
                        onClick={addContentModal.show}
                        disabled={disabled}
                      >
                        Add Content <ArrowRight />
                      </Button>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
          )}
        </>
      )}

      {/* **** Commented out for POC ****
      <Button
        type="text"
        kind="text"
        size="small"
        onClick={() => {
          console.log('delete');
        }}
        style={{ color: colors.red[800] }}
      >
        Delete Lab
        <TrashCan />
      </Button> */}

      {/* Modals */}
      <CustomModal
        customModal={editTitleModal}
        title="Edit Title"
        onClose={editTitleModal.close}
      >
        {editTitleModal.isOpen && (
          <EditTitleModal
            initialValue={findLabById.name}
            onClose={editTitleModal.close}
            onSubmit={name => {
              setEditTitleLoading(true);
              updateLabHandler({ ...findLabById, name });
            }}
          />
        )}
      </CustomModal>
      {showImageModal && (
        <UploadImageModal
          onClose={() => setShowImageModal(false)}
          onSelect={onSelectUploadImage}
        />
      )}

      <AddContentModal
        modal={addContentModal}
        handleKeyDown={handleKeyDownOnAddContentModal}
        onSubmit={handleAddNewInstructions}
        options={[
          { label: 'Select a type', value: '' },
          { label: 'Text Instruction', value: 'text-instruction' },
          { label: 'Video Instruction', value: 'video-instruction' }
        ]}
      />

      {showPreviewModalFor && (
        <HostedContentPreviewContainer
          item={showPreviewModalFor}
          onClose={() => setShowPreviewModalFor(null)}
        />
      )}

      {showPreviewLab && (
        <HostedContentModal
          item={{
            ...findLabById,
            description: findLabById.description || '',
            instructions: findLabById.instructions.map(instruction => ({
              ...instruction,
              videoUrl: instruction.videoUrl || '', // Ensure videoUrl is provided
              videoFilename: instruction.videoFilename || '' // Ensure videoFilename is provided
            })),
            __typename: findLabById.__typename || 'Lab'
          }}
          onClose={() => setShowPreviewLab(false)}
          preview
          vendorName={findLabById?.missionPartner?.name}
          labMethods={{
            onComplete: () => Promise.resolve(setShowPreviewLab(false))
          }}
        />
      )}

      {!isPublished && (
        <ConfirmActionModal
          heading="Delete Lab"
          description="Are you sure you want to delete this lab? This action cannot be undone."
          actionText="Delete"
          cancelText="Cancel"
          handleSubmit={handleDeleteLab}
          buttonContent={
            <div className={cx(hstack(), css({ color: 'danger.bg.initial' }))}>
              Delete Lab <TrashCan style={{ marginRight: spacing[5] }} />
            </div>
          }
          disabled={disabled}
        />
      )}

      <CustomModal
        customModal={errorModal}
        title="Error Loading Data"
        onClose={errorModal.close}
      >
        <Box
          style={{
            padding: `${spacing[1]} ${spacing[1]} ${spacing[4]} ${spacing[1]}`
          }}
        >
          There was a problem loading the requested lab. Please try again later.
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 4 }}>
          <Button context="light" onClick={errorModal.close}>
            Close
          </Button>
        </Box>
      </CustomModal>
    </MainContentVStack>
  );
};

export default CreateLabsPage;
