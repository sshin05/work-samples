'use client';
import {
  Flex,
  Button,
  RadioButtonGroup,
  TextInput
} from '@digital-u/digital-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { css } from '@cerberus/styled-system/css';
import { useModal } from '@cerberus/react';
import { Add } from '@cerberus/icons';
import { useFindAllVendors } from '@/api/vendor';
import { useFindCoursesBySource } from '@/api/course';
import { useFindAssessmentsBySource } from '@/api/assessment';
import { LocalTable } from '@/components_new/table/LocalTable';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Text } from '@/components_new/deprecated/Text';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { FieldSelect } from '@/components_new/form';

export const ManualItemsPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      type: 'course',
      vendor: ''
    }
  });
  const router = useRouter();
  const { coursesBySourceLoading, coursesBySource } =
    useFindCoursesBySource('admin-managed');

  const { assessmentsBySourceLoading, assessmentsBySource } =
    useFindAssessmentsBySource('admin-managed');

  const { vendors, vendorsLoading } = useFindAllVendors();
  const currentType = watch('type');
  const addItemModal = useModal();

  const itemOptions = [
    {
      label: 'Course',
      value: 'course'
    },
    {
      label: 'Assessment',
      value: 'assessment'
    }
  ];

  const handleRedirectToItemPage = content => {
    return router.push(
      getRouteUrl(
        routeGenerators.ManageTrainingLibraryManualItemsAdd({
          contentType: content.type
        }),
        {
          title: content.title,
          vendor: content.vendor
        }
      )
    );
  };

  if (coursesBySourceLoading || assessmentsBySourceLoading || vendorsLoading)
    return null;

  const tableRows = [...coursesBySource, ...assessmentsBySource].map(item => ({
    id: item.id,
    title: item?.courseTitle ?? item?.assessmentTitle,
    type: item?.courseTitle ? 'Course' : 'Assessment',
    vendorId: item?.vendorAssessmentId ?? item?.vendorCourseId,
    vendor: item?.vendorName
  }));

  const tableHeaders = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        const itemTypePath =
          row.original.type === 'Course' ? 'course' : 'assessment';
        const itemPath = getRouteUrl(
          routeGenerators.ManageTrainingLibraryManualItem({
            contentType: itemTypePath,
            contentId: row.original.id
          })
        );

        return (
          <Link
            href={itemPath}
            className={css({
              color: 'action.navigation.initial',
              minW: '13rem',
              maxW: '27rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {row.original.title}
          </Link>
        );
      }
    },
    {
      accessorKey: 'type',
      header: 'Type'
    },
    {
      accessorKey: 'vendorId',
      header: 'Vendor ID'
    },
    {
      accessorKey: 'vendor',
      header: 'Vendor'
    }
  ];

  return (
    <>
      <MainContentVStack>
        <div>
          <PageHeader>Manually Created Items</PageHeader>
          <Text context="light" sx={{ fontWeight: 'bold' }} size="m">
            {tableRows.length} Items
          </Text>
        </div>
        <LocalTable
          columns={tableHeaders}
          data={tableRows}
          buttonProps={{
            onButtonClick: addItemModal.show,
            buttonContent: 'New Item',
            buttonIcon: <Add />
          }}
        />
      </MainContentVStack>
      <CustomModal
        customModal={addItemModal}
        title="Add Item"
        onClose={() => {
          addItemModal.close();
          reset();
        }}
      >
        <form onSubmit={handleSubmit(handleRedirectToItemPage)}>
          <div
            className={css({
              display: 'flex',
              gap: '1em',
              flexDirection: 'column',
              minW: '300px'
            })}
          >
            <Flex justifyContent="space-between" alignItems="flex-end">
              <Controller
                name="type"
                control={control}
                rules={{ required: 'The type is required.' }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <RadioButtonGroup
                    {...field}
                    options={itemOptions}
                    defaultValue="course"
                    invalidText={error?.message}
                    invalid={Boolean(error)}
                  />
                )}
              />
              <Text context="light" size="l">
                *Required
              </Text>
            </Flex>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'The title is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  id="item-title"
                  label={
                    currentType === 'course'
                      ? 'Course Title*'
                      : 'Assessment Title*'
                  }
                  invalid={Boolean(error)}
                  invalidText={error?.message}
                  disabled={field.disabled}
                />
              )}
            />
            <Controller
              name="vendor"
              control={control}
              rules={{
                required: 'The vendor is required.',
                validate: value => value !== 'Select a vendor'
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <FieldSelect
                  {...field}
                  label="Vendor"
                  options={vendors.map(vendor => ({
                    label: vendor.name,
                    value: vendor.id
                  }))}
                  placeholder="Select a vendor"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Button
              kind="pill-primary"
              className="mb-1"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  );
};
