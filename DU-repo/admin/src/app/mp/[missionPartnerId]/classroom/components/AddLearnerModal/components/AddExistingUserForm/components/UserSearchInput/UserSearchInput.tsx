import React, { type ChangeEvent, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDebounce } from '@/utils/use-debounce/useDebounce';
import { sqlFindUsers } from '@/app/api/users';
import { useSQLQuery } from '@/app/api';
import { css } from '@cerberus/styled-system/css';
import type { UserSearchInputProps, User } from './UserSearchInput.types';
import { ResultsList } from './components/ResultsList';
import { EMAIL_VALIDATION_REGEX } from '../../../../AddLearnerModal.constants';
import { TextInput } from '@/components_new/form/TextInput/TextInput';

export const UserSearchInput = ({
  onExistingUserSelect,
  onCreateNewUser,
  onInputChange,
  formControl,
  userInputSearchValue = ''
}: UserSearchInputProps) => {
  const [isShown, setIsShown] = useState(false);
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);

  const {
    loading: usersBySearchLoading,
    data: usersBySearch,
    query: fetchUsersBySearch
  } = useSQLQuery(sqlFindUsers);

  const debouncedSearchTerm: string = useDebounce(userInputSearchValue, 200);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onExistingUserSelect(null);
    onInputChange(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm && !usersBySearchLoading) {
      setUserSuggestions(
        debouncedSearchTerm.length > 2 || debouncedSearchTerm.includes('@')
          ? usersBySearch?.records
          : []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersBySearch, usersBySearchLoading, userInputSearchValue]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchUsersBySearch({
        filter: { search: debouncedSearchTerm }
      });
    }
  }, [debouncedSearchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectUser = (user: User) => {
    onExistingUserSelect(user);
    setIsShown(false);
  };

  const renderSuggestions = () => {
    if (!isMouseHovering) {
      setIsShown(false);
    }
  };

  return (
    <div
      className={css({ position: 'relative', w: 'full' })}
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
      <Controller
        name="email"
        control={formControl}
        rules={{
          required: {
            value: true,
            message: 'Email is required.'
          },
          validate: () => {
            return EMAIL_VALIDATION_REGEX.test(userInputSearchValue) || '';
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextInput
            {...field}
            label="Email"
            placeholder="Search Users"
            value={userInputSearchValue || ''}
            errorMessage={error?.message}
            autoComplete="off"
            maxLength={44}
            type="search"
            required
            onChange={(value: ChangeEvent<HTMLInputElement>) => {
              handleChange(value);
              field.onChange(value);
            }}
          />
        )}
      />
      {userInputSearchValue && isShown && (
        <div
          className={css({
            pos: 'absolute',
            top: '65px',
            maxH: '300px',
            bg: 'page.surface.100',
            w: 'full',
            zIndex: '60000',
            overflowY: 'scroll',
            borderColor: 'action.navigation.initial',
            borderWidth: '1px',
            borderTopStyle: 'none',
            borderBottomStyle: 'solid',
            borderRightStyle: 'solid',
            borderLeftStyle: 'solid'
          })}
        >
          <ResultsList
            results={userSuggestions}
            onCreateNewUser={onCreateNewUser}
            onSelectUser={user => selectUser(user)}
            searchTerm={userInputSearchValue}
            hasMoreResults={false}
          />
        </div>
      )}
    </div>
  );
};
