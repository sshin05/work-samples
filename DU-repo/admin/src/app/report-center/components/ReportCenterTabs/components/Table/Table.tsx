'use client';
import { useState, useEffect } from 'react';
import { LocalTable } from '@/components_new/table/LocalTable';
import { getColumns } from './utils/getColumns';
import type { ReportCenterTabsTableProps } from './ReportCenterTabsTable.types';

const Table = ({
  rows,
  loading,
  onDelete,
  type
}: ReportCenterTabsTableProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [columns, setColumns] = useState(
    getColumns(type, showEdit, { onDelete })
  );

  useEffect(() => {
    setColumns(getColumns(type, showEdit, { onDelete }));
  }, [showEdit, type, onDelete]);

  return (
    <LocalTable
      columns={columns}
      data={rows || []}
      loading={loading}
      searchPlaceholder="Search by title"
      editProps={{
        showEdit,
        setShowEdit
      }}
    />
  );
};

export default Table;
