import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import type { createCheckboxColumnProps } from './createCheckboxColumn.types';

/**
 * Description: createCheckboxColumn is a function that returns a column object for a checkbox column.
 * @date 4/25/2023 - 3:32:56 PM
}}
 */

export const createCheckboxColumn = ({
  isChanged,
  accessorKey = 'checkbox',
  idType = 'id',
  selectedRows
}: createCheckboxColumnProps) => {
  return {
    header: '',
    id: accessorKey,
    accessorKey,
    enableSorting: false,
    cell: ({ row }) => {
      const isChecked = !!selectedRows[row.original[idType]];
      const checkboxId = `checkbox-${row.original[idType]}-[${idType}-${row.id}]`;
      return (
        <Checkbox
          onChange={() => isChanged(row.original[idType])}
          describedBy="checkbox-column"
          value={isChecked}
          id={checkboxId}
          labelText={null}
          name={row.original[idType]}
        />
      );
    }
  };
};
