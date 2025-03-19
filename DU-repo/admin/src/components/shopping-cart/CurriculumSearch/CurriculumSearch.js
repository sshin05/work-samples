import React, { useState, useEffect } from 'react';
import { Search } from '@cerberus/icons';
import { TextInput } from '@/components_new/form';
import { css } from '@cerberus/styled-system/css';

const CurriculumSearch = ({ onSearch, disabled = false }) => {
  const [query, setQuery] = useState('');

  // Debounces the search calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <TextInput
      name="catalog_search"
      label="Keyword"
      labelSize="sm"
      value={query}
      disabled={disabled}
      onChange={event => setQuery(event.target.value)}
      onKeyDown={event => event.key === 'Enter' && onSearch(query)}
      size="md"
      startIcon={<Search />}
      className={css({ display: 'flex', w: 'full' })}
    />
  );
};

export default CurriculumSearch;
