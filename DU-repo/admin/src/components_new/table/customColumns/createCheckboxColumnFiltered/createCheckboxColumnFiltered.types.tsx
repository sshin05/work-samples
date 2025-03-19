/**
 * Description: createCheckboxColumnFiltered is a function that returns a column object for a checkbox column.
 * @date 5/14/2024
 *
 * @param {*} isChanged - function that is executed when the checkbox is changed. Takes the id of the row as a parameter.
 * @param {string} thatUser - the id of the user that is being filtered out
 * @param {string} [idType='id'] - the name of the id column in the table. Ensure this is a unique column acessor key.
 * @returns {{cell(arg0): unknown; header: string; accessor: string; cell: ({ row }: { row: any; }) => any; }}
}}
 */

export type createCheckboxColumnFilteredProps = {
  isChanged: (id: string) => void;
  mainUser: string;
  checkedItems: string[];
  accessorKey?: string;
  idType?: string;
};
