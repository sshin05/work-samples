import { useGetVendorsForAggregateTranscriptCourses } from '@/api/course';
import { FieldSelect } from '@/components_new/form';
import { Button } from '@cerberus/react';
import { HStack, Box } from '@cerberus/styled-system/jsx';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

export const CourseMetricsTableFilters = ({
  handleFilterFormSubmit,
  missionPartnerId,
  handleSubmit,
  isSubmitting,
  reset,
  control
}) => {
  const {
    getVendorsForAggregateTranscriptCourses,
    getVendorsForAggregateTranscriptCoursesLoading
  } = useGetVendorsForAggregateTranscriptCourses({
    missionPartnerId
  });

  const vendorOptions = useMemo(
    () => [
      { label: 'All', value: undefined },
      ...getVendorsForAggregateTranscriptCourses.map(vendor => ({
        label: vendor.vendorName,
        value: vendor.vendorId
      }))
    ],
    [getVendorsForAggregateTranscriptCourses]
  );

  return (
    <form onSubmit={handleSubmit(handleFilterFormSubmit)}>
      <HStack
        gap="4"
        p="4"
        w="full"
        justifyContent="space-between"
        bgColor="page.bg.initial"
        borderBottom="1px solid var(--cerberus-colors-page-border-200)"
      >
        <Box w="1/3" minW="200px">
          <Controller
            name="courseVendor"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FieldSelect
                {...field}
                label="Select Course Vendor"
                size="sm"
                options={vendorOptions}
              />
            )}
          />
        </Box>

        {/*
          TODO: this might get re-added, but evidently it never worked in production as it was always adding the value to the sort;
          DOUBLE CHECK WIDTHS, etc.
          <Box w="1/4" minW="150px">
          <Controller
            name="courseStatus"
            control={control}
            disabled={isSubmitting}
            render={({ field, fieldState: { error } }) => (
              <Field disabled={field.disabled} invalid={Boolean(error)}>
                <div className={css({ w: 'full' })}>
                  <Label htmlFor="course-status">Select Course Status</Label>
                  <Select
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    describedBy="help:select-course-status"
                    id="course-status"
                    size="sm"
                  >
                    <Option value={undefined}>All</Option>
                    <Option value="started">Started</Option>
                    <Option value="pendingReview">Pending</Option>
                    <Option value="stopped">Stopped</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="markedCompleted">Marked Completed</Option>
                  </Select>
                </div>
              </Field>
            )}
          />
        </Box>
        */}

        <HStack w="1/4" justifyContent="flex-end">
          <Button
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={
              isSubmitting || getVendorsForAggregateTranscriptCoursesLoading
            }
          >
            Submit
          </Button>
          <Button
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </HStack>
      </HStack>
    </form>
  );
};
