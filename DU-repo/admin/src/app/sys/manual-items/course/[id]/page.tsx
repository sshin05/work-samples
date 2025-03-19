'use client';
import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Text, useModal, useNotificationCenter } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { useFindCourseById, useUpdateAdminManagedCourse } from '@/api/course';
import { useFindAllVendors } from '@/api/vendor';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { useRouteParams } from '@/hooks/useRouteParams';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { TextArea, TextInput } from '@/components_new/form';
import { ArrowLeft } from '@cerberus/icons';
import { useRouter } from 'next/navigation';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const ManualCoursePage = () => {
  const { notify } = useNotificationCenter();
  const router = useRouter();
  const params = useRouteParams();

  const { courseById, courseByIdLoading, fetchCourse } = useFindCourseById();
  const { updateAdminManagedCourse } = useUpdateAdminManagedCourse();
  const manageCourseModal = useModal();

  const handleToggleModalVisibility = () => {
    if (manageCourseModal.isOpen) {
      manageCourseModal.close();
    } else {
      manageCourseModal.show();
    }

    reset(
      {
        title: courseById?.courseTitle,
        vendor: courseById?.vendorId
      },
      { keepDefaultValues: true }
    );
  };

  const { vendors, vendorsLoading } = useFindAllVendors();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm();

  const handleUpdateManualCourse = async content => {
    return updateAdminManagedCourse({
      vendorId: content.vendor,
      vendorCourseId: content.vendorCourseId,
      courseDescription: content.description,
      courseDuration: Number.parseInt(content.duration, 10) ?? 0,
      courseTitle: content.title,
      courseUrl: content.url
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success:',
          description: 'Course was saved successfully.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error:',
          description: 'There was an error saving the course.'
        });
      });
  };

  const handleUpdateManualCourseForModal = async content => {
    return handleUpdateManualCourse(content).then(() => {
      handleToggleModalVisibility();
    });
  };

  const asyncFetchCourse = useCallback(
    () =>
      fetchCourse({
        id: `${params?.id}${window?.location.hash}`
      }),
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.id]
  );

  useEffect(() => {
    asyncFetchCourse();
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  useEffect(() => {
    if (!courseByIdLoading)
      reset({
        title: courseById?.courseTitle,
        vendor: courseById?.vendorId,
        vendorCourseId: courseById?.vendorCourseId,
        url: courseById?.courseUrl,
        duration: courseById?.courseDuration,
        description: courseById?.courseDescription
      });
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseById, courseByIdLoading]);

  if (vendorsLoading || !params?.id) return null;

  return (
    <>
      <CustomModal
        customModal={manageCourseModal}
        title="Update Course"
        onClose={handleToggleModalVisibility}
      >
        <div>
          <form onSubmit={handleSubmit(handleUpdateManualCourseForModal)}>
            <div
              className={hstack({
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                gap: '1rem',
                flexDirection: 'column',
                minWidth: '300px'
              })}
            >
              <Text as="small">*Required</Text>
            </div>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'The title is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Title*"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Controller
              name="vendor"
              control={control}
              rules={{ required: 'The vendor is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <AdminUiSelect
                  {...field}
                  id="vendor"
                  label="Vendor*"
                  invalidText={error?.message}
                  invalid={Boolean(error)}
                  //@ts-expect-error - Property 'placeholder' does not exist on type 'IntrinsicAttributes & AdminUiSelectProps'.ts(2322)
                  placeholder="Select a vendor"
                  options={[
                    { label: 'Select a vendor', value: null },
                    ...vendors.map(vendor => ({
                      label: vendor.name,
                      value: vendor.id
                    }))
                  ]}
                />
              )}
            />
            <div
              className={hstack({
                gap: '4',
                mt: '4'
              })}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                palette="action"
                shape="rounded"
                usage="filled"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </CustomModal>
      <>
        <Button
          palette="secondaryAction"
          usage="ghost"
          onClick={() =>
            router.push(
              getRouteUrl(routeGenerators.ManageTrainingLibraryManualItems())
            )
          }
        >
          <ArrowLeft />
          <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
            Back
          </span>
        </Button>
        <div
          className={css({
            pt: 's',
            pb: ['base', 'base', 's'],
            display: 'flex',
            flexDirection: 'column',
            gap: '1em'
          })}
        >
          <div className={hstack({ gap: '1rem', alignItems: 'center' })}>
            <PageHeader>{courseById?.courseTitle}</PageHeader>
            <Text
              style={{
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              as="h6"
              onClick={handleToggleModalVisibility}
            >
              Edit
            </Text>
          </div>

          <div className={css({ display: 'flex', gap: '1em' })}>
            <Text>
              Course ID: <b>{courseById.id}</b>
            </Text>
            <Text>
              Vendor: <b>{courseById.vendorName}</b>
            </Text>
            <Text>
              Type: <b>Course</b>
            </Text>
          </div>
        </div>
        <div className={css({ mt: 8 })}>
          <div>
            <div
              className={hstack({
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              })}
            >
              <Text as="h3" fontWeight="bold">
                Details
              </Text>
              <Text fontWeight="bold" as="small">
                *Required
              </Text>
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateManualCourse)}
              className={css({
                background: '#fff',
                borderRadius: '5px',
                padding: '1em',
                marginTop: '1em',
                display: 'flex',
                flexDirection: 'column',
                gap: '1em'
              })}
            >
              <Controller
                name="vendorCourseId"
                control={control}
                rules={{ required: 'The vendor course ID is required.' }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextInput
                    {...field}
                    label="Vendor Course ID*"
                    readOnly
                    errorMessage={error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="url"
                control={control}
                rules={{ required: 'The url is required.' }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextInput
                    {...field}
                    placeholder="https://www....."
                    label="Course URL*"
                    errorMessage={error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="duration"
                control={control}
                rules={{ required: 'The duration is required.' }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextInput
                    {...field}
                    label="Duration (minutes)*"
                    errorMessage={error?.message}
                    required
                    type="number"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'The description is required.',
                  maxLength: {
                    value: 500,
                    message: '500 character limit exceeded'
                  }
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextArea
                    {...field}
                    label="Description (500 character limit)*"
                    errorMessage={error?.message}
                    inputLength={field.value?.length}
                    maxLength={500}
                    required
                  />
                )}
              />
              <div
                className={css({
                  mt: '4'
                })}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  palette="action"
                  shape="rounded"
                  usage="filled"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default ManualCoursePage;
