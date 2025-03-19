import { useMemo } from 'react';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import type { ColumnDef } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';

const buildColumns = (status: string): ColumnDef<unknown, unknown>[] => {
  let columns = [
    {
      header: 'Learner',
      accessorKey: 'name',
      cell: info => {
        const { firstName, lastName } = info.row.original.user;
        return (
          <div>
            {firstName} {lastName}
          </div>
        );
      }
    },
    {
      header: 'Email Address',
      accessorKey: 'user.email',
      enableSorting: false,
      cell: info => {
        const value = info.getValue();
        return (
          <div
            className={css({
              display: 'block',
              minW: '18rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {value}
          </div>
        );
      }
    }
  ];

  if (status === 'Total Enrolled' || status === 'Started') {
    columns = [
      ...columns,
      {
        header: 'Started',
        accessorKey: 'startedAt',
        cell: info => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                abbreviatedDayDate(value)
              ) : (
                <p className={css({ color: 'page.text.100' })}>&mdash;</p>
              )}
            </div>
          );
        }
      }
    ];
  }

  if (status === 'Total Enrolled' || status === 'Pending Review') {
    columns = [
      ...columns,
      {
        header: 'Pending Review',
        accessorKey: 'pendingReviewAt',
        cell: info => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                abbreviatedDayDate(value)
              ) : (
                <p className={css({ color: 'page.text.100' })}>&mdash;</p>
              )}
            </div>
          );
        }
      }
    ];
  }

  if (status === 'Total Enrolled' || status === 'Completed') {
    columns = [
      ...columns,
      {
        header: 'Completed',
        accessorKey: 'completedAt',
        cell: info => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                abbreviatedDayDate(value)
              ) : (
                <p className={css({ color: 'page.text.100' })}>&mdash;</p>
              )}
            </div>
          );
        }
      }
    ];
  }

  if (status === 'Total Enrolled' || status === 'Marked Completed') {
    columns = [
      ...columns,
      {
        header: 'Marked Completed',
        accessorKey: 'markedCompletedAt',
        cell: info => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                abbreviatedDayDate(value)
              ) : (
                <p className={css({ color: 'page.text.100' })}>&mdash;</p>
              )}
            </div>
          );
        }
      }
    ];
  }

  if (status === 'Stopped' || status === 'Total Enrolled') {
    columns = [
      ...columns,
      {
        header: 'Stopped',
        accessorKey: 'stoppedAt',
        cell: info => {
          const value = info.getValue();
          return (
            <div>
              {value ? (
                abbreviatedDayDate(value)
              ) : (
                <p className={css({ color: 'page.text.100' })}>&mdash;</p>
              )}
            </div>
          );
        }
      }
    ];
  }

  return columns;
};

export const useCourseLearnersColumns = (
  status
): ColumnDef<unknown, unknown>[] => {
  return useMemo(() => {
    return buildColumns(status);
  }, [status]);
};
