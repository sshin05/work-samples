import { useState, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, UserSearch } from '@/components_new/form';
import { useNotificationCenter, Button } from '@cerberus/react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { useCreateRole, useFindRolesByMissionPartnerId } from '@/api/role';
import { css } from '@cerberus/styled-system/css';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

interface NewPortalManagerModalProps {
  onClose: () => void;
  missionPartner?: {
    id: string;
  };
}

interface FoundUser {
  email?: string;
  firstName?: string;
  lastName?: string;
}

type ContentType = {
  userId: string;
  missionPartnerId: string;
  name: string;
};

enum RoleName {
  PortalManager = 'PORTAL_MANAGER'
}

export const NewPortalManagerModalContent = ({
  onClose,
  missionPartner
}: NewPortalManagerModalProps) => {
  const { createRole } = useCreateRole();
  const { refetchRoleUserInfo } = useFindRolesByMissionPartnerId(
    missionPartner?.id
  );
  const { notify } = useNotificationCenter();
  const userNotFoundText = 'No users were found with this email.';

  const multipleUsersFoundText =
    'Multiple users found, please refine your search.';

  const [searchData, setSearchData] = useState({
    foundUser: {} as FoundUser,
    multiple: false,
    showWarn: false,
    queryValue: ''
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      affiliate: '',
      userId: ''
    }
  });

  const helperText = useMemo(() => {
    const { multiple, showWarn, queryValue, foundUser } = searchData;

    if (queryValue?.length < 3) return null;
    if (multiple) return multipleUsersFoundText;
    if (showWarn && !multiple) return userNotFoundText;
    if (foundUser?.email) return `Found user with email: ${foundUser?.email}`;
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
      setValue('userId', newResults?.length === 1 ? newResults?.[0].id : '', {
        shouldValidate: input !== ''
      });
    },
    [setSearchData, setValue]
  );

  const handleNewMissionPartner = async (data: {
    name: string;
    userId: string;
  }) => {
    const content: ContentType = {
      userId: data.userId,
      missionPartnerId: missionPartner?.id,
      name: RoleName.PortalManager
    };
    await createRole({
      userId: content.userId,
      missionPartnerId: missionPartner?.id,
      name: RoleName.PortalManager
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Portal Manager Added.'
        });
        reset();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Something went wrong. Try again.'
        });
      })
      .finally(() => {
        onClose();
      });
    await refetchRoleUserInfo(missionPartner?.id);
  };

  return (
    <div
      className={vstack({
        overflow: 'visible',
        alignItems: 'flex-start',
        gap: '8',
        w: 'full'
      })}
    >
      <StandardModalHeader title="New Portal Manager" onClose={onClose} />
      <form
        className={vstack({ gap: '8', alignItems: 'flex-start', w: 'full' })}
        onSubmit={handleSubmit(handleNewMissionPartner)}
      >
        <div className={css({ w: 'full' })}>
          <Controller
            name="userId"
            control={control}
            rules={{
              validate: value => {
                if (!value) {
                  return 'Please enter a valid email to search for a user.';
                }
                return true;
              }
            }}
            render={({
              field: { ref, ...register },
              fieldState: { error }
            }) => (
              <UserSearch
                {...register}
                setUser={onChangeSearch}
                helperText={helperText}
                error={error?.message}
                required
              />
            )}
          />
        </div>
        <TextInput
          name="first-name"
          label="First Name"
          value={searchData?.foundUser?.firstName ?? ''}
          readOnly
        />
        <TextInput
          name="last-name"
          label="Last Name"
          value={searchData?.foundUser?.lastName ?? ''}
          readOnly
        />
        <div
          className={hstack({
            gap: '4',
            pl: '1.5'
          })}
        >
          <Button
            className={css({ w: '6.25rem' })}
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={isSubmitting}
          >
            Add
          </Button>
          <Button
            className={css({ w: '6.25rem' })}
            palette="action"
            shape="rounded"
            usage="outlined"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
