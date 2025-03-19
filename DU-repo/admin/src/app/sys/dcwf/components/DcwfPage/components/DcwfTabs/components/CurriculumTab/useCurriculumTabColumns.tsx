import { useMemo } from 'react';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';

export const useCurriculumTabColumns = onViewClick => {
  const memoizedColumns = useMemo(() => {
    return [
      {
        accessorKey: 'title',
        header: 'Item title',
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: 100,
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {info.getValue()}
          </span>
        )
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: info => (
          <span
            className={css({
              display: 'block',
              // TODO: The TD should have max width, not this span
              //   w: '570px',
              minW: 400,
              whiteSpace: 'normal'
            })}
          >
            {info.getValue()}
          </span>
        )
      },
      {
        accessorKey: 'provider',
        header: 'Provider',
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'view',
        header: '',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <span>
              <Button
                usage="ghost"
                shape="rounded"
                onClick={() => onViewClick(row.original.id)}
                className={css({
                  color: 'action.navigation.initial',
                  '&:hover': {
                    bgColor: 'transparent',
                    color: 'action.navigation.hover'
                  }
                })}
              >
                View
              </Button>
            </span>
          );
        }
      }
    ];
  }, [onViewClick]);

  return memoizedColumns;
};
