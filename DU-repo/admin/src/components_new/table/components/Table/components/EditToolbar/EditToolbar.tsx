import type { EditToolbarProps } from './EditToolbar.types';
import { Button } from '@cerberus/react';
import {
  buttonWrapper,
  cancelActionButton,
  editText,
  removeActionButton,
  removeIcon
} from '../../../../styles/toolbar-styles';

/*
 * EditToolbar
 * Description: EditToolbar is a component that provides an item counter, remove, and cancel buttons.
 */

export const EditToolbar = ({
  amountItemsSelected,
  removeProps,
  cancelProps,
  isPortalProps,
  editProps
}: EditToolbarProps) => {
  return (
    <>
      {amountItemsSelected ? (
        <p
          className={editText}
        >{`${amountItemsSelected} ${isPortalProps ? 'of Portal Manager' : 'item'}${
          amountItemsSelected > 1 ? 's' : ''
        } selected`}</p>
      ) : null}
      <div className={buttonWrapper}>
        {removeProps?.buttonIcon && amountItemsSelected > 0 && (
          <span className={removeIcon} onClick={removeProps?.onButtonClick}>
            {removeProps.buttonIcon}
          </span>
        )}
        {removeProps && amountItemsSelected > 0 && (
          <Button
            className={removeActionButton}
            palette="danger"
            usage="ghost"
            onClick={removeProps?.onButtonClick}
            disabled={removeProps?.disabled}
          >
            {removeProps?.buttonText}
          </Button>
        )}
        {editProps?.showEdit && cancelProps && (
          <Button
            className={cancelActionButton}
            palette="action"
            usage="ghost"
            onClick={cancelProps?.onButtonClick}
          >
            {cancelProps?.buttonText}
          </Button>
        )}
      </div>
    </>
  );
};
