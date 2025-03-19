import { useMemo } from 'react';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';
import { ArrowRight } from '@cerberus/icons';

export const useKsatTabColumns = onViewClick => {
  const memoizedColumns = useMemo(() => {
    return [
      {
        accessorKey: 'code',
        header: 'KSAT Code',
        cell: info => (
          <span
            className={css({
              display: 'block',
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
            {info.getValue() || 'No description'}
          </span>
        )
      },
      {
        accessorKey: 'ksatType',
        header: 'Type',
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'domain',
        header: 'Domain',
        cell: info => <span>{info.getValue()?.name || 'None'}</span>
      },
      {
        accessorKey: 'view',
        header: '',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <span
              className={css({
                float: 'right'
              })}
            >
              <Button
                usage="ghost"
                shape="rounded"
                palette="secondaryAction"
                onClick={() => onViewClick(row.original.id)}
                className={css({
                  color: 'secondaryAction.text.200',
                  float: 'right',
                  '&:hover': {
                    bgColor: 'transparent',
                    color: 'secondaryAction.text.100'
                  }
                })}
              >
                View
                <ArrowRight />
              </Button>
            </span>
          );
        }
      }
    ];
  }, [onViewClick]);

  return memoizedColumns;
};
