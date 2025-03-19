import { useState, useEffect } from 'react';
import { css } from '@cerberus/styled-system/css';
import { TextInput } from '@/components_new/form';
import type { UserSearchProps } from './UserSearch.types';
import { useDebounce } from '@/utils/use-debounce/useDebounce';
import { UserResults } from './components/UserResults';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';

export const UserSearch = ({
  setUser,
  helperText,
  error,
  customPlaceholder,
  waitForAt = false,
  disabled = false,
  styledLabelText = 'Email',
  required = false
}: UserSearchProps) => {
  const [isShown, setIsShown] = useState(false);
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [input, setInput] = useState('');
  const { usersBySearchLoading, usersBySearch, fetchUsersBySearch } =
    useFindUsersBySearchTextLazy();
  const debouncedSearchTerm: string = useDebounce(searchTerm, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    if (!usersBySearchLoading) {
      setUserSuggestions(
        debouncedSearchTerm.length > 2 || debouncedSearchTerm.includes('@')
          ? usersBySearch
          : []
      );
      setUser({
        newResults: usersBySearch,
        input: searchTerm,
        showWarn: usersBySearch?.length === 0 || false
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersBySearch, usersBySearchLoading, searchTerm]);

  useEffect(() => {
    if (waitForAt) {
      if (debouncedSearchTerm.length > 2 || debouncedSearchTerm.includes('@')) {
        fetchUsersBySearch(debouncedSearchTerm);
      } else {
        setUserSuggestions([]);
      }
    } else {
      fetchUsersBySearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectUser = (user: any) => {
    setInput(user.email);
    setUser({ newResults: [user], input: user.email, showWarn: false });
    setIsShown(false);
  };

  const renderSuggestions = () => {
    if (!isMouseHovering) {
      setIsShown(false);
    }
  };

  return (
    <div
      className={css({ pos: 'relative', w: 'full' })}
      onFocus={() => {
        setIsShown(true);
      }}
      onBlur={() => {
        renderSuggestions();
      }}
      onMouseEnter={() => {
        setMouseHovering(true);
      }}
      onMouseLeave={() => {
        setMouseHovering(false);
      }}
    >
      <TextInput
        placeholder={customPlaceholder ?? 'Search Users'}
        disabled={disabled}
        label={styledLabelText}
        helpText={helperText}
        maxLength={44}
        onChange={handleChange}
        value={input}
        autoComplete="off"
        name="user-search-input"
        required={required}
        errorMessage={error}
      />
      {searchTerm && userSuggestions?.length !== 0 && isShown && (
        <div
          className={css({
            pos: 'absolute',
            top: 70.74,
            maxH: 300,
            bg: 'mercury',
            w: 'full',
            zIndex: '10000',
            overflowY: 'scroll'
          })}
        >
          <UserResults
            results={userSuggestions}
            selectUser={selectUser}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
};
