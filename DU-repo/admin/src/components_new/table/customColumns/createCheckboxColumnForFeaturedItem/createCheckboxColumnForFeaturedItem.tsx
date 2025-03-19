import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
/**
 * Description: createCheckboxFeaturedItem is a function that returns a column object for a checkbox column.
 * @date 5/14/2024
}}
 */

import type { createCheckboxColumnForFeaturedItemProps } from './createCheckboxColumnForFeaturedItem.types';

export const createCheckboxColumnForFeaturedItem = ({
  isChanged,
  checkedItems = [],
  accessorKey = 'checkbox', // string: the name of the id column in the table. Ensure this is a unique column acessor key.
  idType = 'id'
}: createCheckboxColumnForFeaturedItemProps) => {
  return {
    header: '',
    id: accessorKey,
    accessorKey,
    enableSorting: false,
    cell: ({ row }) => {
      const isChecked = checkedItems.some(item => {
        const result =
          (item.courseId && row.original[idType] === item.courseId) ||
          (item.assessmentId && row.original[idType] === item.assessmentId) ||
          (item.planSourceId && row.original[idType] === item.planSourceId) ||
          (item.labId && row.original[idType] === item.labId);
        return result;
      });
      const checkboxId = `checkbox-${row.index}-${row.id}`;
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
