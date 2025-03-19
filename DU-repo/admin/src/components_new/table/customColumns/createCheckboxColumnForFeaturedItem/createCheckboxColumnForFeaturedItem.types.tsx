/**
 * Description: createCheckboxFeaturedItem is a function that returns a column object for a checkbox column.
 * @date 5/14/2024
 *
 * @param {*} isChanged - function that is executed when the checkbox is changed. Takes the id of the row as a parameter.
 * @param {string} checkedItems - the ids of the items that are being filtered out
 * @param {string} [idType='id'] - the name of the id column in the table. Ensure this is a unique column acessor key.
 * @returns {{cell(arg0): unknown; header: string; accessor: string; cell: ({ row }: { row: any; }) => any; }}
}}
 */

type CheckedItemFeatured = {
  courseId: string;
  assessmentId?: string;
  planSourceId?: string;
  labId?: string;
};

export type createCheckboxColumnForFeaturedItemProps = {
  isChanged: (id: string) => void;
  checkedItems: CheckedItemFeatured[];
  accessorKey?: string;
  idType?: string;
};
