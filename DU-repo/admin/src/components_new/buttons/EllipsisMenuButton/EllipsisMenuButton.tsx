import React from 'react';
import type { EllipsisMenuButtonProps } from './EllipsisMenuButton.types';
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  IconButton
} from '@cerberus/react';
import { OverflowMenuVertical } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';

export const EllipsisMenuButton = ({
  row,
  menuItems,
  label
}: EllipsisMenuButtonProps) => {
  return (
    <Menu>
      <MenuTrigger
        className={css({
          '&:hover': {
            cursor: 'pointer',
            bgColor: 'action.ghost.hover'
          },
          '&:active': {
            bgColor: 'action.ghost.active'
          }
        })}
      >
        <IconButton
          palette="action"
          usage="ghost"
          size="sm"
          ariaLabel="ellipsis-action-button"
        >
          <OverflowMenuVertical aria-label={label} />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {menuItems?.map((item, index) => (
          <React.Fragment key={item.label}>
            <MenuItem
              value="item_1"
              onClick={() => {
                item.onClick(row);
              }}
              className={css({
                color: item.fontColor ? item.fontColor : 'black',
                bgColor: 'page.surface.100',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textDecorationColor: item.fontColor
                }
              })}
            >
              {item.label}
            </MenuItem>
            {index < menuItems.length - 1 && (
              <MenuSeparator className={css({ marginX: '.5rem' })} />
            )}
          </React.Fragment>
        ))}
      </MenuContent>
    </Menu>
  );
};
