'use client';
import { useEffect, useCallback } from 'react';
import {
  Breadcrumbs,
  Button,
  Flex,
  useToast,
  Text
} from '@digital-u/digital-ui';
import { useForm, Controller } from 'react-hook-form';
import { useGetAssessmentById, useUpdateAssessment } from '@/api/assessment';
import { useFindAllVendors } from '@/api/vendor';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { useModal } from '@cerberus/react';
import { TextArea, TextInput } from '@/components_new/form';

const ManualAssessmentPage = () => {
  const [, setToast] = useToast();
  const manageAssessmentModal = useModal();
  const params = useRouteParams();

  const { assessmentById, assessmentByIdLoading, fetchAssessment } =
    useGetAssessmentById();

  const { updateAssessment } = useUpdateAssessment();

  const handleToggleModalVisibility = () => {
    if (manageAssessmentModal.isOpen) {
      manageAssessmentModal.close();
    } else {
      manageAssessmentModal.show();
    }

    reset(
      {
        title: assessmentById?.assessmentTitle,
        vendor: assessmentById?.vendorId
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

  const breadcrumbs = [
    {
      text: 'Manage Training Library',
      href: getRouteUrl('ManageTrainingLibrary')
    },
    {
      text: 'Manual Items',
      href: getRouteUrl('ManageTrainingLibraryManualItems')
    },
    {
      text: assessmentById?.assessmentTitle,
      href: ''
    }
  ];

  const handleUpdateManualAssessment = async content => {
    const assessmentObject = {
      id: assessmentById?.id,
      vendorId: content.vendor,
      vendorAssessmentId: content.vendorAssessmentId,
      vendorName: vendors.find(vendor => vendor.id === content.vendor)?.name,
      assessmentDescription: content.description,
      assessmentUrl: content.url,
      assessmentTitle: content.title,
      durationInMinutes: Number.parseInt(content.duration, 10) ?? 0,
      source: 'admin-managed'
    };

    return updateAssessment(assessmentObject).then(() => {
      setToast({
        kind: 'success',
        title: 'Success:',
        subtitle: 'Assessment was saved successfully.'
      });

      handleToggleModalVisibility();
    });
  };

  const asyncFetchAssessment = useCallback(
    () =>
      fetchAssessment({
        id: `${params?.id}${window?.location.hash}`
      }),
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.id]
  );

  useEffect(() => {
    asyncFetchAssessment();
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  useEffect(() => {
    if (!assessmentByIdLoading)
      reset({
        title: assessmentById?.assessmentTitle,
        vendor: assessmentById?.vendorId,
        vendorAssessmentId: assessmentById?.vendorAssessmentId,
        url: assessmentById?.assessmentUrl,
        description: assessmentById?.assessmentDescription,
        duration: assessmentById?.durationInMinutes
      });
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentById, assessmentByIdLoading]);

  if (vendorsLoading || !params?.id) return null;

  return (
    <>
      <CustomModal
        customModal={manageAssessmentModal}
        title="Update Assessment"
        onClose={handleToggleModalVisibility}
      >
        <form
          onSubmit={handleSubmit(handleUpdateManualAssessment)}
          className={css({
            display: 'flex',
            gap: '1em',
            flexDirection: 'column',
            minWidth: '300px'
          })}
        >
          <Flex justifyContent="flex-end">
            <Text size="label">*Required</Text>
          </Flex>
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
          <Button disabled={isSubmitting} kind="pill-primary" type="submit">
            Save
          </Button>
        </form>
      </CustomModal>
      <>
        <Breadcrumbs paths={breadcrumbs} />
        <div
          className={css({
            pt: 's',
            pb: ['base', 'base', 's'],
            display: 'flex',
            flexDirection: 'column',
            gap: '1em'
          })}
        >
          <Flex alignItems="center" gap="1em">
            <Text size="h2" fontWeight="extraBold">
              {assessmentById?.assessmentTitle}
            </Text>
            <Text
              style={{
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              size="h6"
              onClick={handleToggleModalVisibility}
            >
              Manage
            </Text>
          </Flex>
          <div className={css({ display: 'flex', gap: '1em' })}>
            <Text>
              Assessment ID: <b>{assessmentById.id}</b>
            </Text>
            <Text>
              Vendor: <b>{assessmentById.vendorName}</b>
            </Text>
            <Text>
              Type: <b>Assessment</b>
            </Text>
          </div>
        </div>
        <div>
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text size="h4" fontWeight="bold">
              Details
            </Text>
            <Text size="label">*Required</Text>
          </Flex>

          <div>
            <form
              onSubmit={handleSubmit(handleUpdateManualAssessment)}
              className={css({
                background: '#fff',
                borderRadius: '5px',
                padding: '1em',
                display: 'flex',
                marginTop: '1em',
                flexDirection: 'column',
                gap: '1em'
              })}
            >
              <Controller
                name="vendorAssessmentId"
                control={control}
                rules={{ required: 'The vendor assessment ID is required.' }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextInput
                    {...field}
                    label="Vendor Assessment ID*"
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
                    label="Assessment URL*"
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
                    label="Description* (500 character limit)"
                    inputLength={field.value?.length}
                    maxLength={500}
                    errorMessage={error?.message}
                    required
                  />
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                kind="pill-secondary"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default ManualAssessmentPage;
