import React, { type ChangeEvent, useState, useEffect } from 'react';
import { TextInput } from '@/components_new/form';
import { useForm, Controller } from 'react-hook-form';
import { ImportUserSearch } from './components/ImportUserSearch';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';
import type { AddSingleUserProps, User } from './AddSingleUser.types';

const inputStyles = css({
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'page.text.initial',
  borderRadius: '0.8',
  fontFamily: 'sans-serif',
  w: '31.25rem'
});

export const AddSingleUser = ({
  handleNewUser = false,
  setHandleNewUser = () => null,
  userNotFoundText = 'No user found with given email',
  error = '',
  setSingleUser,
  singleUser
}: AddSingleUserProps) => {
  const [email, setEmail] = useState('');
  const [multipleUsersFound, setMultipleUsersFound] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [foundUser, setFoundUser] = useState<User>({});

  const showAdditionalTextInputs =
    showWarning && handleNewUser && !multipleUsersFound && email.length > 2;

  const { control, setError, clearErrors } = useForm({
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: ''
    },
    mode: 'onBlur'
  });

  const helperText = (): string | null => {
    if (email && email.length < 3) return null;
    if (showWarning && !multipleUsersFound) return userNotFoundText;
    if (foundUser?.email) return `Found user with email: ${foundUser?.email}`;

    return null;
  };

  const onChangeSearch = ({ newResults, input, showWarn }) => {
    setFoundUser(newResults?.length === 1 ? newResults?.[0] : {});
    setEmail(input);
    setShowWarning(showWarn);
    setMultipleUsersFound(newResults?.length > 1);
    setHandleNewUser(newResults?.length === 0);
  };

  useEffect(() => {
    if (foundUser.email) {
      setSingleUser(foundUser);
    } else {
      setSingleUser({ ...singleUser, email });
    }
    // TODO - add dependencies if they're not new instance on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, foundUser, setError]);

  return (
    <form
      className={css({ mt: '4', minH: '200px' })}
      onPasteCapture={() => {
        setSingleUser({ ...singleUser, email });
      }}
    >
      <div className={css({ mb: '6' })}>
        <ImportUserSearch
          setUserSearch={onChangeSearch}
          helperText={() => helperText()}
          clearErrors={clearErrors}
          error={error}
          email={email}
          formControl={control}
        />
      </div>
      {showAdditionalTextInputs && (
        <div
          className={vstack({
            gap: '6',
            alignItems: 'flex-start',
            w: 'full',
            mb: '6'
          })}
        >
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: 'First name is required'
            }}
            render={({ field: { ref, ...rest }, fieldState: { error } }) => {
              return (
                <TextInput
                  className={inputStyles}
                  {...rest}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    rest.onChange(event);
                    setSingleUser({
                      ...singleUser,
                      firstName: event.target.value
                    });
                  }}
                  label="First Name"
                  errorMessage={error?.message}
                />
              );
            }}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field: { ref, ...rest }, fieldState: { error } }) => (
              <TextInput
                className={inputStyles}
                {...rest}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  rest.onChange(event);
                  setSingleUser({
                    ...singleUser,
                    lastName: event.target.value
                  });
                }}
                label="Last Name"
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      )}
    </form>
  );
};
