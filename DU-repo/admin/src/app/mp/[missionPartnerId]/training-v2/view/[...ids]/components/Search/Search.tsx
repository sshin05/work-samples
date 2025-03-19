'use client';
import { TextInput } from '@/components_new/form/TextInput/TextInput';
import { Search as SearchCarbon } from '@carbon/icons-react';

export const Search = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <TextInput
      name="search"
      placeholder="Search"
      startIcon={<SearchCarbon />}
      disabled={disabled}
    />
  );
};
