import React, { type FC, useEffect, useState } from 'react';
import { type ThemeUIStyleObject, Input } from 'theme-ui';
import { Box } from '../Box';
import { Icon } from '@/components_new/deprecated/Icon';

interface SearchBarProps {
  defaultValue?: string;
  onSearch?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  sx?: {
    iconStyles?: Record<string, unknown>;
    inputStyles?: Record<string, unknown>;
  };
  context?: 'dark' | 'light';
}

const SearchBar: FC<SearchBarProps> = ({
  defaultValue = '',
  onSearch,
  placeholder,
  maxLength,
  sx,
  context
}) => {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  useEffect(() => {
    setSearchValue(defaultValue);
  }, [defaultValue, setSearchValue]);

  const isDefaultContext = !context || context === 'dark';

  const defaultStyles = {
    inputStyles: {
      width: '100%',
      bg: isDefaultContext ? 'navyBlue' : 'white',
      fontFamily: 'body',
      height: [40, 60, 60],
      pl: ['s', 'm'],
      borderRadius: 0,
      outline: 'none',
      border: 'none',
      color: isDefaultContext ? 'white' : 'black',
      fontSize: [16, 24, 24],
      '&::placeholder': {
        color: isDefaultContext
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(0, 0, 0, 0.5)'
      },
      '&:focus': {
        bg: isDefaultContext ? 'black' : 'white'
      }
    },
    iconStyles: {
      position: 'absolute',
      cursor: 'pointer',
      top: ['9px', '12px'],
      right: ['15px', '25px'],
      color: focus
        ? isDefaultContext
          ? 'white'
          : 'rgba(0, 0, 0, 0.8)'
        : isDefaultContext
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
      fontSize: [24, 40]
    }
  };

  const containerStyles = { ...sx };
  delete containerStyles?.inputStyles;
  delete containerStyles?.iconStyles;

  return (
    //NOTE: Edited a small part of this for visability on manage-users page
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: ['100%', '100%', '55%'],
        backgroundColor: isDefaultContext ? 'navyBlue' : 'white',
        ...containerStyles
      }}
    >
      <Input
        autoComplete="off"
        placeholder={placeholder}
        value={searchValue}
        maxLength={maxLength}
        onChange={handleChange}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        sx={{ ...defaultStyles.inputStyles, ...sx?.inputStyles }}
        onKeyDown={handleKeyDown}
      />
      <Icon
        role="button"
        name="search"
        sx={
          {
            ...defaultStyles.iconStyles,
            ...sx?.iconStyles
          } as ThemeUIStyleObject
        }
        onClick={() => {
          onSearch(searchValue);
        }}
      />
    </Box>
  );
};

export default SearchBar;
