import React, { type ChangeEvent, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDebounce } from '@/utils/use-debounce/useDebounce';
import { css } from '@cerberus/styled-system/css';
import type { ImportUserSearchProps, User } from './ImportUserSearch.types';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';
import { TextInput } from '@/components_new/form/TextInput/TextInput';

const styles = {
  resultStyles: css({
    pl: 25,
    fontSize: 18,
    py: ['7px', '5px', '5px'],
    mb: '1',
    fontFamily: 'sans-serif',
    color: 'page.text.300',
    listStyleType: 'none',
    _hover: { color: 'page.text.100', cursor: 'pointer' }
  }),
  inputStyles: css({
    alignItems: 'center',
    alignSelf: 'stretch',
    bg: 'page.surface.initial',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'page.text.300',
    borderRadius: '1',
    color: 'page.text.300',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '125%',
    pt: '0.5',
    pb: '0.5',
    pl: '4',
    pr: '4',
    fontFamily: 'sans-serif',
    w: '31rem'
  })
};

const MAX_EMAIL_LENGTH = 254;

export const ImportUserSearch = ({
  setUserSearch,
  clearErrors,
  helperText,
  error,
  email,
  formControl,
  customPlaceholder,
  waitForAt = false
}: ImportUserSearchProps) => {
  const [isShown, setIsShown] = useState(false);
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isMore, usersBySearchLoading, usersBySearch, fetchUsersBySearch } =
    useFindUsersBySearchTextLazy();
  const debouncedSearchTerm: string = useDebounce(searchTerm, 1000) || null;
  const shouldExecuteQuery =
    debouncedSearchTerm?.length > 4 ||
    (waitForAt &&
      debouncedSearchTerm?.length > 2 &&
      debouncedSearchTerm?.includes('@'));

  // THIS IS GETTING CALLED ON EVERY KEYSTROKE ONCHANGE (debounce not a thing here)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setUserSearch({
        newResults: [
          {
            email: '',
            firstName: '',
            lastName: ''
          }
        ],
        input: '',
        showWarn: false
      });
    } else {
      setUserSearch({
        newResults: usersBySearch,
        input: event.target.value,
        showWarn: usersBySearch?.length === 0 || false
      });
    }

    setSearchTerm(event.target.value);
    clearErrors();
  };

  useEffect(() => {
    if (email) {
      setSearchTerm(email);
    }
  }, [email]);

  useEffect(() => {
    if (debouncedSearchTerm && !usersBySearchLoading) {
      setUserSuggestions(shouldExecuteQuery ? usersBySearch : []);
      setUserSearch({
        newResults: usersBySearch,
        input: searchTerm,
        showWarn: usersBySearch?.length === 0 || false
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersBySearch, usersBySearchLoading, searchTerm]);

  useEffect(() => {
    if (shouldExecuteQuery) {
      fetchUsersBySearch(debouncedSearchTerm);
    } else {
      setUserSuggestions([]);
    }
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectUser = (user: User) => {
    setUserSearch({
      newResults: [user],
      input: user?.email || '',
      showWarn: false
    });
    setIsShown(false);
    clearErrors();
  };

  const Result = ({ user }: { user: User }) => {
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
      <li onClick={() => selectUser(user)} className={styles.resultStyles}>
        {highlightText(user.email, searchTerm)} |{' '}
        {highlightText(user.firstName, searchTerm)}{' '}
        {highlightText(user.lastName, searchTerm)}
      </li>
    );
  };

  const Results = ({ results }: { results: User[] }) => {
    return (
      <div>
        {results?.length > 0 &&
          results.map((result, index) => {
            return <Result key={index} user={result} />;
          })}
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
      className={css({ w: 'full' })}
      onFocus={() => setIsShown(true)}
      onBlur={() => renderSuggestions()}
      onMouseEnter={() => setMouseHovering(true)}
      onMouseLeave={() => setMouseHovering(false)}
    >
      <Controller
        name="email"
        control={formControl}
        rules={{
          required: {
            value: true,
            message: 'Email is required.'
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([a-z\-\d]+\.)+[a-z]{2,}))$/i,
            message: 'Please enter a valid email.'
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextInput
            {...field}
            label="Email"
            aria-label="input-email"
            placeholder={customPlaceholder ?? 'Search Users'}
            value={searchTerm || ''}
            autoComplete="off"
            helpText={helperText()}
            errorMessage={error?.message}
            type="search"
            onChange={(value: ChangeEvent<HTMLInputElement>) => {
              handleChange(value);
              field.onChange(value);
            }}
            className={styles.inputStyles}
            maxLength={MAX_EMAIL_LENGTH}
          />
        )}
      />

      <p className={css({ color: 'danger.text.initial' })}>{error}</p>
      {searchTerm && userSuggestions?.length !== 0 && !isMore && isShown && (
        <div
          className={css({
            pos: 'absolute',
            top: '210px',
            w: 'calc(100% - 4rem)',
            maxH: '150px',
            bg: 'page.bg.100',
            zIndex: '10000',
            overflowY: 'scroll'
          })}
        >
          <Results results={userSuggestions} />
        </div>
      )}
      {searchTerm && isMore && (
        <p
          className={css({
            display: 'block',
            fontSize: '.75rem'
          })}
        >
          20+ matches. Keep typing to narrow results.
        </p>
      )}
    </div>
  );
};
