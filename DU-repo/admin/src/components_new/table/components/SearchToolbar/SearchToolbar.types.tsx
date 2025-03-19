import type { ReactNode } from 'react';
/* Props:
 *  searchTerm: string that is the current value of the search input. (not passed to LocalTqble.  required by ServerSideTable. )
 *  setSearchTerm: function that sets the searchTerm state in the parent component. (not passed to LocalTable. required by ServerSideTable.)
 *  Optional Props.  If not passed, Toolbar will not render the button.
 *     buttonProps object.  Normally contains props for an 'add' button that is used to add a new record to the table.
 *       buttonProps.buttonContent: string that is the content of the button.
 *       buttonProps.buttonIcon: Icon that is the icon of the button. Normally a @cerberus/icon icon.
 *       buttonProps.onButtonClick: function that is executed when the button is clicked.
 *     filterProps: object that contains the props to open/close the filter panel.
 *       filterProps.openFilters: boolean that is the state of the filter button.
 *       filterProps.setOpenFilters: function that sets the openFilters state in the parent component (ie opening/closing the filter panel)
 *     editProps object: Nomally used to delete a record from the table.  The action is defined my adding the button-column.js - createDeleteColumn to the table columns object.
 *       editProps.showEdit: boolean that is the state of the edit button. If true, the trash can is displayed in the table.
 *       editProps.setShowEdit: function that sets the showEdit state in the parent component.
 *       editProps.bulkAction: function that is executed when the bulk context menu option is selected.. typically used to show a modal
 *       editProps.itemLabel: string that is the name of the item that is being deleted.  Used in the bulkAction modal.
 *     downloadProps: object that contains the props for the download option.
 *       downloadProps.onDownload: function executed when the download option is clicked. Normally would send the table data to the server for download.
 *       downloadProps.loading: boolean that is the state of the download option.  If true, the download button is disabled.
 */
type DownloadProps = {
  name?: string;
  onDownload?: () => void;
  loading?: boolean;
};

export type SearchToolbarProps = {
  searchTerm: string;
  setSearchTerm: (value?: string) => void;
  searchPlaceholder?: string;
  buttonProps?: {
    buttonContent?: string;
    buttonIcon?: ReactNode;
    onButtonClick?: () => void;
  };
  secondaryButtonProps?: {
    buttonContent?: string;
    buttonIcon?: ReactNode;
    onButtonClick?: () => void;
  };
  filterProps?: {
    openFilters?: boolean;
    setOpenFilters?: (
      value: boolean | ((prevState: boolean) => boolean)
    ) => void;
  };
  editProps?: {
    disableEdit?: boolean;
    showEdit?: boolean;
    setShowEdit?: (value: boolean | ((prevState: boolean) => boolean)) => void;
    bulkAction?: () => void;
    itemLabel?: string;
  };
  downloadProps?: DownloadProps | DownloadProps[];
  hasToolbar?: boolean;
  toolbarType?: string;
  children?: ReactNode;
};
