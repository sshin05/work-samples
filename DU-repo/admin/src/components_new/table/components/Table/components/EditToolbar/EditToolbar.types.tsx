import type { ReactNode } from 'react';

/* Props:
 *  Optional Props.  If not passed, Toolbar will not render the button.
 *     amountItemsSelected: Number that tracks amount of items selected.
 *     removeProps: object that contains the props for the remove button.
 *       removeProps.loading: boolean that disables the button and shows a spinner
 *       removeProps.disabled: boolean that disables the button
 *       removeProps.buttonIcon: Accepts icon component then displays it to the right of the text
 *       removeProps.buttonText: Changes the text of the cancel button
 *       removeProps.onButtonClick: function that is executed when the button is clicked.
 *     cancelProps: object that contains the props for the cancel button.
 *       cancelProps.buttonText: Changes the text of the cancel button
 *       cancelProps.onButtonClick: function that is executed when the button is clicked.
 *     isPortalProps: boolean that determines if the toolbar is being used in the portal manager
 */

export type EditToolbarProps = {
  amountItemsSelected?: number;
  removeProps?: {
    disabled?: boolean;
    buttonIcon?: ReactNode;
    buttonText: string;
    onButtonClick: () => void;
  };
  cancelProps?: {
    buttonText: string;
    onButtonClick: () => void;
  };
  editProps?: {
    showEdit?: boolean;
    setShowEdit?: (showEdit: boolean) => void;
    disableEdit?: boolean;
  };
  isPortalProps?: boolean;
};
