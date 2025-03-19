'use client';

import { type InputBaseProps } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import React from 'react';
import { Search } from '@cerberus/icons';
import { TextInput } from '@/components_new/form';

/**
 * Props for the SearchInput component.
 */
type Props = {
  /** The input identifier. */
  id: string;
  /** The current value of the input field. */
  value: string;
  /** The function to be called when the "Enter" key is pressed. */
  onSearch: () => void;
  /** The function to be called when the input value changes. */
  onChange: (value: string) => void;
  /** The placeholder text for the input field. Defaults to "Search". */
  placeholder?: string;
  /** The icon to display at the end of the input field. Defaults to a search icon. */
  endIcon?: InputBaseProps['endIcon'];
};

/**
 * A search input field.
 *
 * @example
 * <SearchInput
 *   id="search-content"
 *   placeholder="Search Content"
 *   value={searchText}
 *   onChange={value => setSearchText(value)}
 *   onSearch={() => {
 *     // Handle `Enter` keypress
 *   }}
 * />
 */
export const SearchInput = ({
  id,
  value,
  onSearch,
  onChange,
  placeholder,
  endIcon
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <TextInput
      name={id}
      value={value}
      placeholder={placeholder || 'Search'}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      endIcon={endIcon || <Search size={20} />}
      className={css({
        w: '300px',
        pr: '9',
        textStyle: 'body-sm',
        letterSpacing: '0.32px',
        border: 'none',
        borderBottom: '0.5px solid',
        borderRadius: 'initial',
        outline: 'none'
      })}
    />
  );
};
