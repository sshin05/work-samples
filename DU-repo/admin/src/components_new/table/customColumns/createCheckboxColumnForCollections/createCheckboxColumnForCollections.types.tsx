/**
 * Description: createCheckboxColumnForCollections is a function that returns a column object for a checkbox column in collections. It determines also which collection table it is associated with. 
 * 
 * @date 10/15/2024
 * @returns {{cell(arg0): unknown; header: string; accessor: string; cell: ({ row }: { row: any; }) => any; }}
}}
 */

interface CheckedItem {
  courseId: string;
  assessmentId?: string;
  planSourceId?: string;
}

export type createCheckboxColumnForCollectionsProps = {
  /**
   * @param {string, string} isChanged - function that is executed when the checkbox is changed. Takes the id of the row as a parameter. Also returns the parent table id.
   */
  isChanged: (id: string, tableId: string) => void;
  /**
   * @param {string} checkedItems - the ids of the items that are being filtered out
   */
  checkedItems: CheckedItem[];
  /**
   *  @param {string} accessorKey - the name of the id column in the table. Ensure this is a unique column acessor key.
   */
  accessorKey?: string;
  /**
   * @param {string} [idType='id'] - the name of the id column in the table. Ensure this is a unique column acessor key.
   */
  idType?: string;
  /**
   * @param {string} currentTableId - the table id of the parent table.
   */
  currentTableId: string;
};
