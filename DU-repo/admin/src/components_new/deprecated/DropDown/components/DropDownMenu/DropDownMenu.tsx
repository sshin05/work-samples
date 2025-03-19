import React from 'react';
import type { DropDownMenuProps } from './DropDownMenu.types';
import { Box } from '../../../../../components/Box';

export const DropDownMenu = ({
  links,
  onBlur,
  onSelect,
  sx
}: DropDownMenuProps) => {
  const handleKeyPress = ({
    event,
    onClick
  }: {
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.FocusEvent<HTMLDivElement>;
    onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }) => {
    if (event instanceof KeyboardEvent && event.key === 'Enter' && onClick) {
      onClick();
    }

    if (onBlur) {
      onBlur(event as React.FocusEvent<HTMLDivElement>);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '30px', // TODO: Test impact of this change.. does it mess up dropdowns across admin?
        right: '0',
        backgroundColor: 'white',
        border: '1px solid',
        zIndex: 1,
        overflowY: 'auto',
        maxHeight: '256px',
        minWidth: '120px',
        ...sx
      }}
      tabIndex={-1}
      onBlur={onBlur}
    >
      {links.map((link, i) => (
        <Box
          key={i}
          sx={{
            '&:hover, &:focus, &:active': {
              // Allows tab focusing
              backgroundColor: '#e0e0e0'
            },
            cursor: 'pointer',
            padding: 'xs',
            textAlign: 'left',
            color: 'navyBlue',
            ...link.sx
          }}
          tabIndex={0}
          onClick={event => {
            if (link?.onClick) {
              link.onClick(event);
            }

            onSelect(link.title);
          }}
          onKeyUp={event => {
            handleKeyPress({ event, onClick: link?.onClick });
          }}
        >
          {link.title}
        </Box>
      ))}
    </Box>
  );
};
