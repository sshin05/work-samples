import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { IconButton, Button } from '@cerberus/react';
import { TextInput, UserSearch, FieldSelect } from '@/components_new/form';
import { Controller, useForm } from 'react-hook-form';
import { useCreateMissionPartner } from '@/api/mission-partner';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Close, CheckmarkOutline } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';

interface FoundUser {
  email: string;
  firstName: string;
  lastName: string;
}

export const AddMissionPartnerModalContent = ({
  affiliates,
  sections,
  onClose,
  setNotify
}) => {
  const { createMissionPartner } = useCreateMissionPartner();

  const userNotFoundText = 'No users were found with this email.';

  const multipleUsersFoundText =
    'Multiple users found, please refine your search.';

  const [searchData, setSearchData] = useState<{
    foundUser: FoundUser;
    multiple: boolean;
    showWarn: boolean;
    queryValue: string;
  }>({
    foundUser: { email: '', firstName: '', lastName: '' },
    multiple: false,
    showWarn: false,
    queryValue: ''
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
    unregister
  } = useForm({
    defaultValues: {
      name: '',
      affiliate: '',
      userId: '',
      sectionType: undefined
    }
  });

  const watchAffiliates = watch('affiliate');

  useEffect(() => {
    if (watchAffiliates !== 'space-force') {
      setValue('sectionType', undefined);
      unregister('sectionType');
    }
  }, [watchAffiliates, setValue, unregister]);

  const helperText = useMemo(() => {
    const { multiple, showWarn, queryValue, foundUser } = searchData;
    if (queryValue?.length < 3) return null;
    if (multiple) return multipleUsersFoundText;
    if (showWarn && !multiple) return userNotFoundText;
    if (foundUser?.email)
      return (
        <div
          className={hstack({
            alignItems: 'flex-start',
            alignSelf: 'left'
          })}
        >
          <CheckmarkOutline
            className={css({ color: 'success.text.initial' })}
            size={16}
          />
          <span className={css({ textStyle: 'body-sm' })}>
            User is in Digital University
          </span>
        </div>
      );
    return null;
  }, [searchData, userNotFoundText]);

  const onChangeSearch = useCallback(
    ({ newResults, input, showWarn }) => {
      setSearchData({
        foundUser: newResults?.length === 1 ? newResults?.[0] : {},
        queryValue: input,
        showWarn,
        multiple: newResults?.length > 1
      });
      setValue(
        'userId',
        newResults?.length === 1 &&
          input.toLowerCase() === newResults?.[0].email
          ? newResults?.[0].id
          : '',
        {
          shouldValidate: input !== ''
        }
      );
    },
    [setSearchData, setValue]
  );

  const handleNewMissionPartner = ({
    name,
    affiliate,
    userId,
    sectionType
  }) => {
    return createMissionPartner({
      name,
      affiliateId: affiliate,
      sectionType,
      portalManagerUserId: userId
    })
      .then(response => {
        setNotify({
          palette: 'success',
          heading: 'Success!',
          description: 'Mission Partner created.'
        });
        reset();
        onClose(response.data.createMissionPartner.id);
      })
      .catch(error => {
        const errorMessage = error?.message;
        const missionPartnerExistsErrorMessage = `Mission Partner with name ${name} already exists.`;
        const errorMessageToTitleMap = {
          [missionPartnerExistsErrorMessage]: 'Mission Partner Already Exists',
          'Mission Partner name can only contain letters, numbers, spaces, parentheses and dashes.':
            'Invalid Mission Partner Name',
          'Mission Partner name must contain at least one letter or number.':
            'Invalid Mission Partner Name'
        };

        if (errorMessageToTitleMap[errorMessage]) {
          setNotify({
            palette: 'danger',
            heading: errorMessageToTitleMap[errorMessage],
            description: errorMessage
          });
        } else {
          setNotify({
            palette: 'danger',
            heading: 'Error!',
            description: 'Something went wrong. Try again.'
          });
        }
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <div className={vstack({ gap: '8', overflowY: 'auto', maxW: '30rem' })}>
      <div className={hstack({ w: 'full', justifyContent: 'space-between' })}>
        <p className={css({ textStyle: 'heading-lg' })}>
          Add a new Mission Partner
        </p>
        <IconButton
          ariaLabel="modalCloseButton"
          palette="action"
          usage="ghost"
          size="lg"
          onClick={onClose}
        >
          <Close size={20} />
        </IconButton>
      </div>
      <form
        className={vstack({ gap: '8' })}
        onSubmit={handleSubmit(handleNewMissionPartner)}
      >
        <div className={vstack({ gap: '4', w: '29rem' })}>
          <p
            className={hstack({
              textStyle: 'heading-sm',
              justifyContent: 'left',
              w: 'full'
            })}
          >
            Mission Partner Details
          </p>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'The name is required.',
              maxLength: {
                value: 32,
                message: 'Must be fewer than 32 characters'
              }
            }}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <TextInput
                {...field}
                className={css({ w: '29rem', alignSelf: 'flex-start' })}
                label="Mission Partner Name"
                errorMessage={error?.message}
                max={32}
                autoComplete="off"
                required
              />
            )}
          />
          <Controller
            name="affiliate"
            control={control}
            rules={{ required: 'An affiliate is required.' }}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <FieldSelect
                {...field}
                label="Affiliation"
                labelSize="md"
                options={affiliates}
                className={css({ bgColor: 'page.surface.100' })}
                errorMessage={error?.message}
                required
              />
            )}
          />
          {watchAffiliates === 'space-force' && (
            <Controller
              name="sectionType"
              control={control}
              rules={{ required: 'Section is required' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <FieldSelect
                  {...field}
                  label="Section"
                  labelSize="md"
                  options={sections}
                  className={css({ bgColor: 'page.surface.100' })}
                  errorMessage={error?.message}
                  required
                />
              )}
            />
          )}
        </div>
        <div className={vstack({ gap: '4' })}>
          <p
            className={css({
              textStyle: 'heading-sm',
              lineHeight: '120%',
              letterSpacing: '0.0125rem',
              alignSelf: 'flex-start'
            })}
          >
            Portal Manager
          </p>

          <Controller
            name="userId"
            control={control}
            rules={{ required: 'Email Address is required' }}
            render={({ fieldState: { error } }) => (
              <UserSearch
                setUser={onChangeSearch}
                helperText={helperText}
                styledLabelText="Email Address"
                customPlaceholder="Enter email address"
                waitForAt
                error={error?.message}
                required
              />
            )}
          />

          <TextInput
            className={css({ w: '29rem' })}
            name="first-name"
            label="First Name"
            value={searchData?.foundUser?.firstName ?? ''}
            readOnly
          />
          <TextInput
            className={css({ w: '29rem' })}
            name="last-name"
            label="Last Name"
            value={searchData?.foundUser?.lastName ?? ''}
            readOnly
          />
        </div>
        <div className={hstack({ w: 'full', justifyContent: 'space-between' })}>
          <Button
            className={css({ w: 'full' })}
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={isSubmitting}
            type="submit"
          >
            Add
          </Button>
          <Button
            className={css({ w: 'full' })}
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
