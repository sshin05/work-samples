import { TrashCan } from '@cerberus/icons';
import { IconButton } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import type { createDeleteColumnProps } from './createDeleteColumn.types';
import { removeIcon } from '../../styles/toolbar-styles';

/**
 * Description: createDeleteColumn is a function that returns a column object for a delete column.
 * @date 4/25/2023 - 3:32:56 PM
 */

export const createDeleteColumn = ({
  onDelete, // function: (id: number) => void
  idType = 'id' // property name of the id in the row object
}: createDeleteColumnProps) => {
  return {
    header: '',
    id: 'delete',
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div
          className={hstack({
            justifyContent: 'flex-end',
            alignItems: 'center'
          })}
        >
          <IconButton
            className={removeIcon}
            usage="ghost"
            ariaLabel="Delete"
            palette="danger"
            size="sm"
            onClick={() => {
              onDelete(row.original[idType]);
            }}
          >
            <TrashCan />
          </IconButton>
        </div>
      );
    }
  };
};
