import React from 'react';
import { Add } from '@cerberus/icons';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { css } from '@cerberus/styled-system/css';

const coursesColumns = [
  {
    header: 'Course',
    accessorKey: 'title',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '18rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    header: 'Vendor',
    accessorKey: 'vendorName'
  },
  {
    header: 'Enrolled',
    accessorKey: 'notStarted',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '6rem'
        })}
      >
        {info.row.original.inProgress + info.getValue()}
      </span>
    )
  },
  {
    header: 'In Progress',
    accessorKey: 'inProgress',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '7rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    header: 'Completed',
    accessorKey: 'completed',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '7rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  }
];

interface Course {
  id: string;
  title: string;
  type: string;
  source: string;
  vendorName: string;
  notStarted?: number;
  inProgress?: number;
  pendingReview?: number;
  completed?: number;
}

interface CoursesTabProps {
  courses: Course[];
  isLoading?: boolean;
  pageLoading?: boolean;
  addCourse: () => void;
}

export const CoursesTab = ({
  courses,
  isLoading,
  addCourse,
  pageLoading
}: CoursesTabProps) => {
  return (
    <LocalTable
      columns={coursesColumns}
      data={courses}
      loading={isLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage
          cta={addCourse}
          buttonText="Add Courses"
          message="Once a course has been added, it will appear here."
        />
      }
      hasToolbar
      searchPlaceholder="Search by course or vendor"
      buttonProps={{
        onButtonClick: () => addCourse(),
        buttonContent: 'Course',
        buttonIcon: <Add />
      }}
    />
  );
};
