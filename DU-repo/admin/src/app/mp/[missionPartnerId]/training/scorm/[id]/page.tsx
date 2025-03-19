'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Text,
  FileInput,
  HostedContentModal,
  colors,
  InlineNotification
} from '@digital-u/digital-ui';
import {
  Button as CerberusButton,
  useModal,
  useNotificationCenter
} from '@cerberus/react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Upload } from '@carbon/icons-react';
import {
  useFindHostedScormById,
  useUpdateHostedScorm,
  useUploadHostedScormPackage,
  usePublishHostedScorm
} from '@/api/hosted-scorm';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PublishModal } from '@/components_new/modals/PublishModal';
import { useRouteParams } from '@/hooks/useRouteParams';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { EditTitleModal } from '../../components/EditTitleModal';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { TextArea, TextInput } from '@/components_new/form';

const EditScorm = () => {
  const router = useRouter();
  const { id, callbackPath, missionPartnerId } = useRouteParams();
  const editTitleModal = useModal();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    getValues,
    setValue,
    reset
  } = useForm();
  const { notify } = useNotificationCenter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  useUnsavedChangesPrompt(isDirty);

  const [scormFileValue, setScormFileValue] = useState<File | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { missionPartnerMinDetails, missionPartnerMinDetailsError } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  const {
    hostedScormById,
    hostedScormByIdLoading,
    hostedScormByIdError,
    fetchHostedScormById
  } = useFindHostedScormById(id);

  const { updateHostedScorm } = useUpdateHostedScorm();

  const { uploadHostedScormPackage, uploadHostedScormPackageLoading } =
    useUploadHostedScormPackage();

  const { publishHostedScorm } = usePublishHostedScorm();

  const isPublished = hostedScormById.status === 'Published';
  const disabled =
    uploadHostedScormPackageLoading ||
    isPublished ||
    isSubmitting ||
    hostedScormByIdLoading ||
    editTitleLoading;

  const handleUpdateScorm = async values => {
    const newValues = { ...values };
    const shouldPublish = newValues.status === 'Published';
    delete newValues.status; // status is not a field allowed in the save/update

    // If the user has not uploaded a new SCORM package,
    // and they are trying to publish, render an error toast.
    if (shouldPublish && !hostedScormById?.scormUrl) {
      return notify({
        heading: 'Error',
        description: 'A SCORM must be uploaded to publish this as a course.',
        palette: 'danger'
      });
    }

    return (
      updateHostedScorm({
        id: hostedScormById.id,
        missionPartnerId: hostedScormById.missionPartnerId,
        name: hostedScormById.name,
        ...newValues
      })
        // If we are publishing, we can do that - otherwise lets show the toast
        .then(result => {
          if (shouldPublish) {
            return publishHostedScorm(id, hostedScormById.missionPartnerId);
          } else {
            notify({
              heading: 'Success',
              description: 'SCORM updated successfully.',
              palette: 'success'
            });
            return result;
          }
        })
        .then(() => setEditTitleLoading(false))
        .then(() => {
          if (shouldPublish)
            notify({
              heading: 'Success',
              description: 'SCORM published successfully.',
              palette: 'success'
            });

          return fetchHostedScormById(hostedScormById.id);
        })
        .then(() => reset({}, { keepValues: true }))
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
        })
    );
  };

  const handleFileChange = () => {
    const file = fileInputRef.current && fileInputRef.current?.files[0];
    setScormFileValue(file || null);
  };

  // THIS DOES NOT UPDATE scormUrl WHICH IS REQUIRED TO BE ABLE TO PUBLISH
  // scormFileValue works, but the data coming back from fetchHostedScormById always has scormUrl as null
  const handleSubmitScorm = async () =>
    uploadHostedScormPackage(
      {
        id,
        file: scormFileValue
      },
      hostedScormById.missionPartnerId
    )
      .then(() => fetchHostedScormById(id))
      .then(() => setScormFileValue(null))
      .then(() =>
        notify({
          heading: 'Success',
          description: 'SCORM package updated',
          palette: 'success'
        })
      )
      .catch(error => {
        setScormFileValue(null);
        notify({
          heading: 'Error',
          description: error.message,
          palette: 'danger'
        });
      });

  useEffect(() => {
    if (missionPartnerMinDetailsError || hostedScormByIdError) {
      setShowErrorModal(true);
    }
  }, [hostedScormByIdError, missionPartnerMinDetailsError]);

  return (
    <MainContentVStack>
      {showErrorModal && (
        <div className={hstack({ justifyContent: 'center' })}>
          <InlineNotification
            heading="Error"
            subheading="There was a problem loading the hosted scorm."
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
              aria-busy={hostedScormByIdLoading}
            >
              <Text size="h2" variant="dark" fontWeight="bold">
                {hostedScormById.name}
              </Text>
              <Button
                kind="text"
                size="sm"
                onClick={editTitleModal.show}
                disabled={
                  editTitleLoading ||
                  isSubmitting ||
                  hostedScormByIdLoading ||
                  uploadHostedScormPackageLoading
                }
              >
                <Text variant="dark" style={{ color: `${colors.purple[800]}` }}>
                  Edit Title
                </Text>
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
                  usage="outlined"
                  shape="rounded"
                  palette="action"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={
                    isSubmitting || hostedScormByIdLoading || editTitleLoading
                  }
                >
                  Preview
                </CerberusButton>
                {!isPublished && (
                  <PublishModal
                    onConfirm={() => {
                      setValue('status', 'Published');
                      handleSubmit(handleUpdateScorm)();
                    }}
                    title="Confirm publish"
                    message="Once published, you will be unable to upload a new SCORM file."
                  />
                )}
              </div>
            </div>

            <div
              className={hstack({
                gap: 1
              })}
              aria-busy={hostedScormByIdLoading}
            >
              <Text as="p">
                <strong>Item ID:</strong> {hostedScormById.id}
              </Text>
            </div>
          </div>

          {/* Details */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
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
              <Text textStyle="label-sm">*Required</Text>
            </div>
            <div
              className={css({
                bg: 'page.surface.100',
                borderRadius: 'sm',
                p: '4',
                w: 'full'
              })}
              aria-busy={hostedScormByIdLoading}
            >
              <form
                className={vstack({
                  gap: '4',
                  alignItems: 'flex-start',
                  p: '4',
                  borderRadius: '4px',
                  w: 'full'
                })}
                onSubmit={handleSubmit(handleUpdateScorm)}
              >
                <Text
                  textStyle="label-sm"
                  style={{
                    color: `${colors.gray[800]}`,
                    marginBottom: '-15px'
                  }}
                >
                  Status
                </Text>
                <Text as="p">{hostedScormById.status}</Text>
                <Controller
                  name="duration"
                  control={control}
                  rules={{
                    required: 'The duration is required.',
                    min: {
                      value: 1,
                      message: 'You must enter a duration greater than 0.'
                    }
                  }}
                  defaultValue={hostedScormById.duration}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <div className={css({ maxWidth: '50%' })}>
                      <TextInput
                        {...field}
                        type="number"
                        label="Duration* (minutes)"
                        errorMessage={error?.message}
                        onChange={event =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </div>
                  )}
                />
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
                  defaultValue={hostedScormById.description}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <div className={hstack({ w: '50%' })}>
                      <TextArea
                        {...field}
                        label="Description*"
                        inputLength={field.value?.length}
                        maxLength={500}
                        errorMessage={error?.message}
                        rows={8}
                        required
                      />
                    </div>
                  )}
                />

                <CerberusButton
                  disabled={isSubmitting}
                  type="submit"
                  usage="filled"
                  palette="action"
                  shape="rounded"
                >
                  Save
                </CerberusButton>
              </form>
            </div>
          </div>
          <div
            className={vstack({
              w: 'full',
              gap: '4',
              alignItems: 'flex-start'
            })}
          >
            <Text as="h4" fontWeight="semiBold">
              SCORM File
            </Text>
            <div
              aria-busy={hostedScormByIdLoading}
              className={vstack({
                w: 'full',
                gap: '4',
                borderRadius: '4px',
                p: '4',
                bg: 'page.surface.100',
                alignItems: 'center'
              })}
            >
              {scormFileValue ? (
                <>
                  <Text as="p">{scormFileValue?.name || ''}</Text>
                  <CerberusButton
                    onClick={handleSubmitScorm}
                    usage="outlined"
                    disabled={
                      !scormFileValue ||
                      disabled ||
                      uploadHostedScormPackageLoading
                    }
                  >
                    Upload
                  </CerberusButton>
                </>
              ) : (
                <>
                  <FileInput
                    name="scormFile"
                    accept=".zip"
                    disabled={uploadHostedScormPackageLoading}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    hidden
                  />
                  {hostedScormById.scormFilename && (
                    <div className={css({ gap: '2' })}>
                      <Text as="p">{hostedScormById.scormFilename}</Text>
                    </div>
                  )}
                  <CerberusButton
                    usage="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                  >
                    {hostedScormById.scormFilename
                      ? 'Replace SCORM file'
                      : 'Upload SCORM file'}
                    <Upload />
                  </CerberusButton>
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
            initialValue={hostedScormById.name}
            onClose={editTitleModal.close}
            onSubmit={title => {
              setEditTitleLoading(true);
              handleUpdateScorm({ name: title });
            }}
          />
        )}
      </CustomModal>
      {showPreviewModal && (
        <HostedContentModal
          item={{
            ...hostedScormById,
            questions: [],
            description: hostedScormById.description || '',
            duration: hostedScormById.duration || 0,
            __typename: hostedScormById.__typename
          }}
          vendorName={missionPartnerMinDetails.name}
          preview
          scormMethods={{
            onComplete: async () => {
              setShowPreviewModal(false);
              Promise.resolve(); // because onComplete expects a promise in library.
            }
          }}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </MainContentVStack>
  );
};

export default EditScorm;
