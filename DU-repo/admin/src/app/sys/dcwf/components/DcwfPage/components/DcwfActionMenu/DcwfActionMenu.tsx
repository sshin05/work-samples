import { Edit, OverflowMenuVertical, TrashCan } from '@carbon/icons-react';
import {
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger
} from '@cerberus/react';
import { menuItem } from './DcwfActionMenu.styles';

interface DcwfActionMenuItemsProps {
  onEdit: () => void;
  onDelete: (id: string) => void;
  actionId: string;
}

export const DcwfActionMenu = ({
  onEdit,
  onDelete,
  actionId
}: DcwfActionMenuItemsProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <IconButton ariaLabel="icon-button" size="sm">
          <OverflowMenuVertical size={20} />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem className={menuItem} value="edit" onClick={onEdit}>
          Edit
          <Edit />
        </MenuItem>
        <MenuItem
          className={menuItem}
          value="delete"
          onClick={() => onDelete(actionId)}
        >
          Delete
          <TrashCan />
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
