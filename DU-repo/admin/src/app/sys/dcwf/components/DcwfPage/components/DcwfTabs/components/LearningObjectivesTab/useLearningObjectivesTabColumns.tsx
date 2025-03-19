import { useMemo } from 'react';
import { css } from '@cerberus/styled-system/css';
import { Button, IconButton } from '@cerberus/react';
import { ArrowRight, TrashCan } from '@carbon/icons-react';
import type { ColumnDef } from '@tanstack/react-table';

interface LearningObjectivesTabColumnsProps {
  onViewClick?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const buildColumns = ({
  onViewClick,
  onDelete
}: LearningObjectivesTabColumnsProps) => {
  let columns = [
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: true,
      cell: info => (
        <span
          className={css({
            display: 'block',
            // TODO: The TD should have max width, not this span
            minW: 400,
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

export const useLearningObjectivesTabColumns = ({
  onViewClick,
  onDelete
}: LearningObjectivesTabColumnsProps): ColumnDef<unknown, unknown>[] => {
  return useMemo(() => {
    return buildColumns({ onViewClick, onDelete });
  }, [onViewClick, onDelete]);
};
