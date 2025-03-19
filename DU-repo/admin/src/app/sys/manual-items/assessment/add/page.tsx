'use client';
import Link from 'next/link';
import { Flex, Text, Button } from '@digital-u/digital-ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useFindVendorById } from '@/api/vendor';
import { useCreateManualAssessment } from '@/api/assessment';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { TextArea, TextInput } from '@/components_new/form';

const AddAssessmentPage = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const vendorId = searchParams.get('vendor');
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      vendorAssessmentId: title?.replace(/ /g, '-')
    }
  });

  const { vendor, vendorError } = useFindVendorById(vendorId);
  const { createManualAssessment } = useCreateManualAssessment();

  const handleAddManualAssessment = async content => {
    const assessmentObject = {
      id: `${vendor.id}#${content.vendorAssessmentId}`,
      vendorId: vendor.id,
      vendorAssessmentId: content.vendorAssessmentId,
      vendorName: vendor.name,
      assessmentDescription: content.description,
      assessmentUrl: content.url,
      assessmentTitle: title,
      durationInMinutes: Number.parseInt(content.duration, 10) ?? 0,
      source: 'admin-managed'
    };

    return createManualAssessment(assessmentObject).then(response => {
      const {
        data: { createManualAssessment }
      } = response;

      router.push(
        getRouteUrl(
          routeGenerators.ManageTrainingLibraryManualItem({
            contentType: 'assessment',
            contentId: createManualAssessment.id
          })
        )
      );
    });
  };

  if (vendorError) return null;

  return (
    <>
      <div
        className={css({
          width: ['calc(100% - 30px)', '737px', '1275px'],
          marginLeft: 'auto',
          marginRight: 'auto'
        })}
      >
        <div
          className={css({
            display: 'flex',
            gap: '6px',
            alignItems: 'center'
          })}
        >
          <Link
            href={getRouteUrl(
              routeGenerators.ManageTrainingLibraryManualItems()
            )}
            legacyBehavior
          >
            {'< Back to Manual Items'}
          </Link>
        </div>
        <div
          className={css({
            pt: 's',
            pb: ['base', 'base', 's'],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1em'
          })}
        >
          <Text size="h2" variant="dark" fontWeight="extraBold">
            {title}
          </Text>
        </div>
        <div className={css({ mt: '6' })}>
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Text size="h5">Details</Text>
            <Text size="label">*Required</Text>
          </Flex>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(handleAddManualAssessment)}
            className={css({
              background: '#fff',
              borderRadius: '5px',
              padding: '1em',
              display: 'flex',
              flexDirection: 'column',
              gap: '1em'
            })}
          >
            <Controller
              name="vendorAssessmentId"
              control={control}
              rules={{ required: 'The vendor assessment ID is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Vendor Assessment ID*"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Controller
              //@ts-expect-error - Type '"url"' is not assignable to type '"vendorAssessmentId"'.ts(2322) - are we safe to change these names?
              name="url"
              control={control}
              rules={{ required: 'The assessment URL is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Assessment URL*"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Controller
              //@ts-expect-error - Type '"duration"' is not assignable to type '"vendorAssessmentId"'.ts(2322)
              name="duration"
              control={control}
              rules={{ required: 'The duration is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
              //@ts-expect-error - Type '"description"' is not assignable to type '"vendorAssessmentId"'.ts(2322)
              name="description"
              control={control}
              rules={{
                required: 'The description is required.',
                maxLength: {
                  value: 500,
                  message: '500 character limit exceeded'
                }
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
            <Button disabled={isSubmitting} kind="pill" type="submit">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAssessmentPage;
