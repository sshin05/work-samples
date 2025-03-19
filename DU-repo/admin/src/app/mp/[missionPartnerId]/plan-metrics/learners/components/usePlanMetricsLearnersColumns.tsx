import { useMemo } from 'react';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import type { ColumnDef } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';

const buildColumns = (
  status: string | undefined
): ColumnDef<unknown, unknown>[] => {
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

  if (!status || status.toLowerCase() === 'assigned') {
    columns = [
      ...columns,
      {
        header: 'Assigned',
        accessorKey: 'assignedAt',
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

  if (!status || status.toLowerCase() === 'started') {
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

  if (!status || status.toLowerCase() === 'stopped') {
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

  if (!status || status.toLowerCase() === 'completed') {
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

  return columns;
};

export const usePlanMetricsLearnersColumns = (
  status
): ColumnDef<unknown, unknown>[] => {
  return useMemo(() => {
    return buildColumns(status);
  }, [status]);
};
