'use client';
import { Flex, Text } from '@digital-u/digital-ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, useNotificationCenter } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { useForm, Controller } from 'react-hook-form';
import { useFindVendorById } from '@/api/vendor';
import { useCreateAdminManagedCourse } from '@/api/course';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { TextArea, TextInput } from '@/components_new/form';

const AddCoursePage = () => {
  const { notify } = useNotificationCenter();
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
      vendorCourseId: title?.replace(/ /g, '-')
    }
  });

  const { vendor, vendorError } = useFindVendorById(vendorId);
  const { createAdminManagedCourse } = useCreateAdminManagedCourse();

  const handleAddManualCourse = async content => {
    return createAdminManagedCourse({
      vendorId: vendor.id,
      vendorCourseId: content.vendorCourseId,
      courseDescription: content.description,
      courseDuration: Number.parseInt(content.duration, 10) ?? 0,
      courseTitle: title,
      courseUrl: content.url
    })
      .then(response => {
        const {
          data: { createAdminManagedCourse }
        } = response;

        router.push(
          getRouteUrl(
            routeGenerators.ManageTrainingLibraryManualItem({
              contentType: 'course',
              contentId: createAdminManagedCourse.id
            })
          )
        );
      })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success:',
          description: 'Course was created successfully.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error:',
          description: 'There was an error creating the course.'
        });
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
            <Text variant="dark" size="label">
              *Required
            </Text>
          </Flex>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(handleAddManualCourse)}
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
              name="vendorCourseId"
              control={control}
              rules={{ required: 'The vendor course ID is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Vendor Course ID*"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Controller
              //@ts-expect-error - Type '"url"' is not assignable to type '"vendorCourseId"'.ts(2322)
              name="url"
              control={control}
              rules={{ required: 'The course URL is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  label="Course URL*"
                  errorMessage={error?.message}
                  required
                />
              )}
            />
            <Controller
              //@ts-expect-error - Type '"url"' is not assignable to type '"vendorCourseId"'.ts(2322)
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
              // @ts-expect-error - Type '"url"' is not assignable to type '"vendorCourseId"'.ts(2322)
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
                  required
                  maxLength={500}
                  inputLength={field.value?.length}
                />
              )}
            />
            <div
              className={hstack({
                mt: '4'
              })}
            >
              <Button
                type="submit"
                palette="action"
                shape="rounded"
                usage="filled"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoursePage;
