import { IconButton, Menu, MenuContent, MenuTrigger } from '@cerberus/react';
import { OverflowMenuVertical } from '@cerberus/icons';
import { UserActionMenuItems } from './components/UserActionMenuItems';

export const UserActionMenu = () => {
  return (
    <Menu>
      <MenuTrigger>
        <IconButton ariaLabel="icon-button" size="sm">
          <OverflowMenuVertical size={20} />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <UserActionMenuItems />
      </MenuContent>
    </Menu>
  );
};
