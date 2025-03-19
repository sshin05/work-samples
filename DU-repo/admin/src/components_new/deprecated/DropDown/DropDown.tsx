import React, { useEffect, useState } from 'react';
import { Box } from '../../../components/Box';
import { Text } from '@/components_new/deprecated/Text';
import { Flex } from '@/components_new/deprecated/Flex';

import { DropDownMenu } from './components';
import type { DropDownProps } from './DropDown.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const DropDown = ({
  icon,
  links,
  onBlur = () => {
    // Intentially left blank.
  },
  placeholder = '',
  userSelectedValue,
  showTextbox = false,
  sx,
  open = null,
  ...props
}: DropDownProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>();
  const [selectedValue, setSelectedValue] = useState<string>();

  useEffect(() => {
    if (userSelectedValue) {
      setSelectedValue(userSelectedValue);
    } else {
      setSelectedValue(null);
    }
  }, [userSelectedValue]);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      setIsMenuVisible(true);
    }
  };

  const onContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      onBlur(event);
      setIsMenuVisible(false);
    }
  };

  const onSelect = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (open !== undefined) setIsMenuVisible(open);
  }, [open, setIsMenuVisible]);

  return (
    <Flex
      sx={{
        position: 'relative',
        backgroundColor: showTextbox ? 'white' : 'unset',
        minWidth: showTextbox ? '120px' : '0',
        height: showTextbox ? '48px' : 'unset',
        cursor: 'pointer',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...sx
      }}
      tabIndex={-1}
      onBlur={onContainerBlur}
      onClick={() => {
        setIsMenuVisible(!isMenuVisible);
      }}
      {...props}
    >
      {showTextbox && (
        <Text
          key={0}
          sx={{
            display: 'inline-block',
            p: 'xs',
            color: 'black'
          }}
        >
          {selectedValue ?? placeholder}
        </Text>
      )}
      {icon && (
        <Box
          sx={{
            display: 'inline-block'
          }}
          tabIndex={0}
          onKeyPress={handleKeyPress}
        >
          {icon}
        </Box>
      )}
      {isMenuVisible && (
        <DropDownMenu
          onBlur={onContainerBlur}
          onSelect={onSelect}
          links={links}
          sx={{ width: '100%' }}
        />
      )}
    </Flex>
  );
};
