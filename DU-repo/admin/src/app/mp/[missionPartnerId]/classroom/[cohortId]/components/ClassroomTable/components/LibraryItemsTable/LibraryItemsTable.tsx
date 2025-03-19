'use client';
import { LibraryItemIcon } from '@/app/mp/components/LibraryItemIcon/LibraryItemIcon';
import { LocalTable } from '@/components_new/table/LocalTable';
import { css } from '@cerberus/styled-system/css';
import { useEffect, useState } from 'react';
import type { CohortData, CohortLibraryItem } from '../../../../cohort.types';
import { Button } from '@cerberus/react';
import { UploadFileModal } from '../../../UploadFileModal';
import { hstack } from '@cerberus/styled-system/patterns';
import { ChevronDown, Download, TrashCan } from '@cerberus/icons';
import { useSQLQuery } from '@/app/api';
import { sqlGetCohort } from '@/app/api/cohorts';

const getPluralizedText = (count: number, singular: string, plural: string) => {
  if (count === 1) {
    return singular;
  }

  return plural;
};

type TableData =
  | CohortLibraryItem
  | (CohortLibraryItem & { date: string; url: string });

const mockLibraryItems: TableData[] = [
  {
    id: '1',
    url: 'https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/02/file_example_JSON_1kb.json',
    name: 'Introduction to Programming',
    type: 'File',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '2',
    url: 'https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/02/file_example_JSON_1kb.json',
    name: 'JavaScript Basics',
    type: 'Video',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '3',
    url: 'https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/02/file_example_JSON_1kb.json',
    name: 'CSS Styling Guide',
    type: 'Audio',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '4',
    url: 'https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/02/file_example_JSON_1kb.json',
    name: 'Frontend Development Resources',
    type: 'Link',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '5',
    url: 'https://file-examples.com/storage/fefaeec240676402c9bdb74/2017/02/file_example_JSON_1kb.json',
    name: 'Advanced React Patterns',
    type: 'Video',
    date: '2024-12-16T12:34:56Z'
  }
];

const limit = 20;

// const createLibraryColumns = () => [
const createLibraryColumns = (
  onDownload: (item: TableData) => void,
  onDelete: (item: TableData) => void
) => [
  {
    header: 'Library Content',
    accessorKey: 'name',
    cell: info => {
      const row = info.row.original;
      return row.name ? (
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            px: '3',
            py: '4'
          })}
        >
          <LibraryItemIcon type={row.type} size="normal" />
          <span className={css({ color: 'action.text.200' })}>{row.name}</span>
        </div>
      ) : (
        'N/A'
      );
    },
    enableSorting: true
  },
  // {
  //   header: 'Document Type',
  //   accessorKey: 'type',
  //   cell: info => info.getValue() || 'N/A',
  //   enableSorting: true
  // },
  {
    header: 'Date Added',
    accessorKey: 'date',
    cell: info => {
      const rawDate = info.getValue();
      if (!rawDate) return 'N/A';

      const date = new Date(rawDate);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).format(date);

      return formattedDate;
    },
    enableSorting: true
  },
  {
    header: '',
    accessorKey: 'download',
    cell: info => {
      const row = info.row.original;
      return (
        <div className={css({ maxW: '0.5rem' })}>
          <Download
            className={css({ cursor: 'pointer', color: 'action.text.100' })}
            onClick={() => onDownload(row)}
          />
        </div>
      );
    },
    enableSorting: false
  },
  {
    header: '',
    accessorKey: 'delete',
    cell: info => {
      const row = info.row.original;
      return (
        <div className={css({ maxW: '0.5rem' })}>
          <TrashCan
            className={css({ cursor: 'pointer', color: 'action.error' })}
            onClick={() => onDelete(row)}
          />
        </div>
      );
    },
    enableSorting: false
  }
];

// TODO: row: type CohortLibraryItem
const onDownload = async (row: { url: string }) => {
  if (!row.url) {
    console.error('No URL provided for the file.');
  }
};

const onDelete = (row: CohortLibraryItem) => {
  console.log('Handle delete for item:', row);
};

type Props = {
  cohortId: CohortData['id'];
};

export const LibraryItemsTable = ({ cohortId }: Props) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  useState<boolean>(false);
  const [showUploadLibraryItemModal, setShowUploadLibraryItemModal] =
    useState<boolean>(false);

  const [options] = useState<any>({
    id: cohortId,
    filter: { cohortId },
    limit
  });

  const {
    data: cohort,
    loading
    // query: fetchCohort
  } = useSQLQuery(sqlGetCohort, {
    options
  });

  useEffect(() => {
    if (!loading) {
      if (cohort?.libraryItems?.length) {
        setTableData(cohort.libraryItems as unknown as CohortLibraryItem[]);
      } else {
        setTableData(mockLibraryItems);
      }
    }
  }, [loading, cohort]);

  const localTableColumns = createLibraryColumns(onDownload, onDelete);

  const numLibraryItemsText =
    tableData.length > 0
      ? `${tableData.length} ${getPluralizedText(
          tableData.length,
          'Item',
          'Items'
        )}`
      : '0 Items';

  return (
    <div>
      <div className={hstack({})}>
        <p>{numLibraryItemsText}</p>
        <Button
          className={css({ ml: 'auto' })}
          palette="action"
          shape="rounded"
          usage="filled"
          onClick={() => setShowUploadLibraryItemModal(true)}
        >
          Add Library Item
          <ChevronDown />
        </Button>
      </div>
      <LocalTable
        columns={localTableColumns}
        data={tableData}
        defaultSorting={[{ id: 'name', desc: false }]}
        searchPlaceholder="Search Library Items"
        // loading={!libraryItems}
        skeletonRows={10}
        pageSize={limit}
        downloadProps={
          tableData
            ? {
                onDownload: () => {
                  const csvContent = tableData
                    .map(item =>
                      [item.name, item.type, item.url]
                        .map(value => `"${value}"`)
                        .join(',')
                    )
                    .join('\n');

                  const blob = new Blob([csvContent], {
                    type: 'text/csv;charset=utf-8;'
                  });
                  const link = document.createElement('a');
                  const url = URL.createObjectURL(blob);
                  link.setAttribute('href', url);
                  link.setAttribute('download', 'library_items.csv');
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }
              }
            : null
        }
      />

      {showUploadLibraryItemModal && (
        <UploadFileModal
          cohortId={cohortId}
          visible={showUploadLibraryItemModal}
          onClose={() => setShowUploadLibraryItemModal(false)}
          title="Add Library Item"
        />
      )}
    </div>
  );
};
