/**
 * Description: createDeleteColumn is a function that returns a column object for a delete column.
 * @date 4/25/2023 - 3:32:56 PM
 *
 * @param {*} onDelete - function that is executed when the delete button is clicked. Takes the id of the row as a parameter.
 * @param {string} [idType='id'] - the name of the id column in the table. Ensure this is a unique column acessor key.
 * @returns {{ header: string; accessor: string; cell: ({ row }: { row: any; }) => any; }}
 *
 */

export type createDeleteColumnProps = {
  header?: string;
  id?: string;
  cell?: ({ row }) => void;
  onDelete: (id: string) => void;
  idType?: string;
};
