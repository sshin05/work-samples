import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import type { createCheckboxColumnFilteredProps } from './createCheckboxColumnFiltered.types';
/**
 * Description: createCheckboxColumnFiltered is a function that returns a column object for a checkbox column.
 * @date 5/14/2024
 */

export const createCheckboxColumnFiltered = ({
  isChanged,
  mainUser,
  checkedItems = [],
  accessorKey = 'checkbox', // string: the name of the id column in the table. Ensure this is a unique column acessor key.
  idType = 'id'
}: createCheckboxColumnFilteredProps) => {
  return {
    header: '',
    id: accessorKey,
    accessorKey,
    enableSorting: false,
    cell: ({ row }) => {
      if (row.original[idType] !== mainUser) {
        const isChecked = checkedItems.some(
          item => row.original[idType] === item
        );
        const checkboxId = `checkbox-${row.index}-${row.id}`;
        return (
          <Checkbox
            onChange={() => isChanged(row.original[idType])}
            describedBy="filtered-checkbox-column"
            value={isChecked}
            id={checkboxId}
            name={row.original[idType]}
            labelText={null}
          />
        );
      }
    }
  };
};
