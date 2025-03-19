/**
 * Description: createCheckboxColumn is a function that returns a column object for a checkbox column.
 * @date 4/25/2023 - 3:32:56 PM
 *
 * @param {*} isChanged - function that is executed when the checkbox is changed. Takes the id of the row as a parameter.
 * @param {string} [idType='id'] - the name of the id column in the table. Ensure this is a unique column acessor key.
 * @returns {{cell(arg0): unknown; header: string; accessor: string; cell: ({ row }: { row: any; }) => any; }}
 */

export type createCheckboxColumnProps = {
  isChanged: (id: string) => void;
  accessorKey?: string;
  idType?: string;
  selectedRows?: Record<string, boolean>;
};
