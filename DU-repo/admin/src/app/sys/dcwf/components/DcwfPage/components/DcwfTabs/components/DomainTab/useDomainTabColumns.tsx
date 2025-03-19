import { useMemo } from 'react';
import { css } from '@cerberus/styled-system/css';
import { Button, IconButton } from '@cerberus/react';
import { ArrowRight, TrashCan } from '@carbon/icons-react';
import type { ColumnDef } from '@tanstack/react-table';

interface DomainTabColumnsProps {
  onViewClick?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const buildColumns = ({ onViewClick, onDelete }: DomainTabColumnsProps) => {
  let columns = [
    {
      accessorKey: 'name',
      header: 'Domain',
      enableSorting: true,
      cell: info => (
        <span
          className={css({
            display: 'block',
            w: 120,
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          })}
        >
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'shortDescription',
      header: 'Short description',
      enableSorting: true,
      cell: info => (
        <span
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxOrient: 'vertical',
            lineClamp: 2,
            minW: 200,
            maxW: 500,
            whiteSpace: 'normal'
          })}
        >
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: true,
      cell: info => (
        <span
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxOrient: 'vertical',
            lineClamp: 2,
            minW: 300,
            maxW: 500,
            whiteSpace: 'normal'
          })}
        >
          {info.getValue()}
        </span>
      )
    }
  ];

  if (onViewClick) {
    columns = [
      ...columns,
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
  }

  if (onDelete) {
    columns = [
      ...columns,
      {
        accessorKey: 'delete',
        header: '',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <span>
              <IconButton
                ariaLabel="Delete Domain"
                usage="ghost"
                size="sm"
                palette="action"
                onClick={() => onDelete(row.original.id)}
              >
                <TrashCan />
              </IconButton>
            </span>
          );
        }
      }
    ];
  }

  return columns;
};

export const useDomainTabColumns = ({
  onViewClick,
  onDelete
}: DomainTabColumnsProps): ColumnDef<unknown, unknown>[] => {
  return useMemo(() => {
    return buildColumns({ onViewClick, onDelete });
  }, [onViewClick, onDelete]);
};
