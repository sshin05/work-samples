'use client';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { LocalTable } from '@/components_new/table/LocalTable';
import { Add } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface TableLoaderProps<ColumnDef> {
  buttonContent?: string;
  columns: ColumnDef[];
  noButton?: boolean;
  hasToolbar?: boolean;
}

/**
 * This is the TableLoader component. It can be reused for all pages that need a loading state for a table.
 * @param buttonContent - Text on the button
 * @param columns - Columns for the table
 * @param noButton - If true, the button will not be displayed
 *
 */
export const TableLoader = ({
  buttonContent,
  columns,
  noButton,
  hasToolbar
}: TableLoaderProps<ColumnDef<unknown, unknown>>) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messages = [
      'Unleashing the digital kraken',
      'The beast approaches the surface',
      'The kraken breaks through',
      'Harnessing its power'
    ];
    let currentIndex = 0;

    setMessage(messages[currentIndex]);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setMessage(messages[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css({ w: 'full' })}>
      <LocalTable
        columns={columns}
        data={[]}
        hasToolbar={hasToolbar}
        searchPlaceholder="Search by course or vendor"
        buttonProps={
          !noButton
            ? {
                buttonContent: buttonContent,
                buttonIcon: <Add />
              }
            : undefined
        }
        noDataMessage={<NoDataMessage spinner message={message} />}
      />
    </div>
  );
};
