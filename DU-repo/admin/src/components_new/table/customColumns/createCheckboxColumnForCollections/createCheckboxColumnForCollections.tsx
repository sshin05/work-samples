import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import type { createCheckboxColumnForCollectionsProps } from './createCheckboxColumnForCollections.types';
/**
 * Description: createCheckboxColumnForCollections is a function that returns a column object for a checkbox column in collections. It determines also which collection table it is associated with.
 * @date 10/15/2024
 */

export const createCheckboxColumnForCollections = ({
  isChanged,
  checkedItems = [],
  accessorKey = 'checkbox',
  idType = 'id',
  currentTableId
}: createCheckboxColumnForCollectionsProps) => {
  return {
    header: '',
    id: accessorKey,
    accessorKey,
    enableSorting: false,
    cell: ({ row }) => {
      const isChecked = checkedItems.some(item => {
        return (
          (item.courseId && row.original[idType] === item.courseId) ||
          (item.assessmentId && row.original[idType] === item.assessmentId) ||
          (item.planSourceId && row.original[idType] === item.planSourceId)
        );
      });
      const checkboxId = `checkbox-${row.index}-${row.id}`;

      const handleCheckboxChange = () => {
        if (currentTableId) {
          isChanged(row.original[idType], currentTableId);
        } else {
          console.error('Parent table ID not found for this row');
        }
      };
      return (
        <Checkbox
          onChange={handleCheckboxChange}
          describedBy="checkbox-column"
          value={isChecked}
          id={checkboxId}
          name={row.original[idType]}
          labelText={null}
        />
      );
    }
  };
};
