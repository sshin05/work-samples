import React, { type ChangeEvent, useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/utils/use-debounce/useDebounce';
import { css } from '@cerberus/styled-system/css';
import { useFindDomainsLazy } from '@/api/dcwf/domain/useFindDomainsLazy';
import { Search } from '@cerberus/icons';
import { TextInput } from '@/components_new/form/TextInput/TextInput';

export type Domain = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
};

type DomainDropdownSearchProps = {
  selectDomain: (domain: Domain) => void;
  selectedDomains: Domain[];
};

const resultStyles = css({
  pl: 25,
  fontSize: 18,
  py: ['7px', '5px', '5px'],
  fontFamily: 'sans-serif',
  bgColor: 'page.surface.initial',
  listStyleType: 'none',
  _hover: {
    bgColor: 'action.ghost.hover',
    cursor: 'pointer'
  }
});

const dropdownStyles = css({
  pos: 'fixed',
  zIndex: '10000',
  maxH: '400px',
  w: 'inherit',
  overflowY: 'auto',
  mt: '1',
  border: '1px solid',
  borderColor: 'page.text.300',
  borderRadius: '1',
  boxShadow: 'sm',
  bgColor: 'page.surface.initial'
});

const MAX_EMAIL_LENGTH = 254;

export const DomainDropdownSearch = ({
  selectDomain,
  selectedDomains
}: DomainDropdownSearchProps) => {
  const [isShown, setIsShown] = useState(false);
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [domainSuggestions, setDomainSuggestions] = useState<Domain[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  const { domainsLoading, domains, fetchDomains } = useFindDomainsLazy();
  const debouncedSearchTerm: string = useDebounce(searchTerm, 300) || null;
  const shouldExecuteQuery = debouncedSearchTerm?.length > 3;
  const inputRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm && !domainsLoading) {
      setDomainSuggestions(shouldExecuteQuery ? domains : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains, domainsLoading, searchTerm]);

  useEffect(() => {
    if (shouldExecuteQuery) {
      fetchDomains({ filter: { search: debouncedSearchTerm } });
    } else {
      setDomainSuggestions([]);
    }
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (inputRef.current && isShown) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isShown, searchTerm]);

  const onDomainClick = (domain: Domain) => {
    setIsShown(false);
    selectDomain(domain);
  };

  const Result = ({ domain }: { domain: Domain }) => {
    const highlightText = (text: string, highlight: string) => {
      if (!highlight.trim()) {
        return text;
      }
      const regex = new RegExp(`(${highlight})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      );
    };

    return (
      <li onClick={() => onDomainClick(domain)} className={resultStyles}>
        {highlightText(domain.name, searchTerm)}
      </li>
    );
  };

  const Results = () => {
    const results = domainSuggestions?.filter(
      suggestion =>
        !selectedDomains.some(selected => selected.id === suggestion.id)
    );

    if (!results?.length) return null;

    return (
      <div
        className={dropdownStyles}
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`
        }}
      >
        {results.map((result, index) => (
          <Result key={index} domain={result} />
        ))}
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!isMouseHovering) {
      setIsShown(false);
    }
  };

  return (
    <div
      ref={inputRef}
      className={css({
        w: 'full',
        pos: 'relative'
      })}
      onFocus={() => setIsShown(true)}
      onBlur={() => renderSuggestions()}
      onMouseEnter={() => setMouseHovering(true)}
      onMouseLeave={() => setMouseHovering(false)}
    >
      <TextInput
        label="Domain"
        startIcon={<Search />}
        aria-label="input-domain"
        autoComplete="off"
        name="domain-search-input"
        id="domain-search"
        placeholder="Search Domains"
        value={searchTerm || ''}
        maxLength={MAX_EMAIL_LENGTH}
        type="search"
        onChange={(value: ChangeEvent<HTMLInputElement>) => {
          handleChange(value);
        }}
      />

      {searchTerm && domainSuggestions?.length !== 0 && isShown && <Results />}
    </div>
  );
};
