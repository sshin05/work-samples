import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';
import { createDeleteColumn } from '@/components_new/table/customColumns/createDeleteColumn';
import { formatDate } from '@/utils/date/formatDate';
import { type Columns } from '../../ReportCenterTabsTable.types';
import { type EditOptions } from './getColumns.types';

export const downloadColumns = [
  {
    header: 'Reports',
    id: 'title',
    accessorKey: 'title',
    cell: info => {
      return (
        <span
          className={css({
            display: 'block',
            minW: '13rem',
            maxW: '28rem',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            color: 'action.navigation.initial'
          })}
        >
          {info.getValue()}
        </span>
      );
    }
  },
  {
    header: 'Date',
    id: 'requestedAt',
    accessorKey: 'requestedAt',
    cell: info => {
      const value = info.getValue();
      return value ? formatDate(value) : '';
    }
  },
  {
    header: 'Status',
    id: 'status',
    accessorKey: 'status',
    cell: info => {
      const status = info.getValue();
      if (status === 'SUCCESS')
        return (
          <div className={css({ maxW: '9rem' })}>
            <a
              href={`/admin/downloads/${info.row.original.id}`}
              download={info.row.original.title}
            >
              <Button usage="ghost" shape="rounded">
                Download
              </Button>
            </a>
          </div>
        );

      return <div className={css({ maxW: '9rem' })}>{status}</div>;
    }
  }
];

export const uploadColumns = [
  {
    header: 'Reports',
    id: 'title',
    accessorKey: 'title',
    cell: info => {
      return (
        <span
          className={css({
            display: 'block',
            minW: '13rem',
            maxW: '27rem',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            color: 'action.navigation.initial'
          })}
        >
          {info.getValue()}
        </span>
      );
    }
  },
  {
    header: 'Date',
    id: 'requestedAt',
    accessorKey: 'requestedAt',
    cell: info => {
      const value = info.getValue();
      return value ? formatDate(value) : '';
    }
  },
  {
    header: 'Status',
    id: 'status',
    accessorKey: 'status',
    cell: info => {
      const status = info.getValue();
      return status;
    }
  }
];

const columnMap = {
  download: downloadColumns,
  upload: uploadColumns
};

export const getColumns = (
  type: Columns,
  displayEditOptions: boolean,
  editOptions: EditOptions
) => {
  const baseColumns = columnMap[type] || [];

  if (displayEditOptions) {
    return [
      ...baseColumns,
      createDeleteColumn({ onDelete: editOptions.onDelete })
    ];
  }

  return baseColumns;
};
