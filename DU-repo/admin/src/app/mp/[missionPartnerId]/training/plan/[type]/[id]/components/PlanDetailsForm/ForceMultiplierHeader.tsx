import { BaseSkeleton } from '@/components_new/loaders';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { Button, useModal, useNotificationCenter } from '@cerberus/react';
import { css } from 'styled-system/css';
import { useCallback } from 'react';
import {
  useFetchForceMultiplierHeaderData,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import { CustomModal } from '@/components_new/modals/CustomModal';
import { EditTitleModal } from '@/app/mp/[missionPartnerId]/training/components/EditTitleModal';

type ForceMultiplierHeaderProps = {
  forceMultiplierId: string;
  forceMultiplierByIdLoading: boolean;
  disabled: boolean;
};

export const ForceMultiplierHeader = ({
  forceMultiplierId,
  forceMultiplierByIdLoading,
  disabled
}: ForceMultiplierHeaderProps) => {
  const { notify } = useNotificationCenter();

  const { refetch, data, loading } =
    useFetchForceMultiplierHeaderData(forceMultiplierId);
  const { updateForceMultiplier } = useUpdateForceMultiplier();

  const isFmPublished = data?.status === 'Published';
  const editTitleModal = useModal();

  const handleSubmit = useCallback(
    async newHeading => {
      const formValues = {
        id: data?.id,
        version: data?.version,
        title: newHeading
      };
      try {
        await updateForceMultiplier(formValues);
        refetch({ forceMultiplerId: formValues.id });
        editTitleModal.close();
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Plan successfully updated.'
        });
      } catch (error) {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: error.message
        });
      }
    },
    [
      data?.id,
      data?.version,
      notify,
      refetch,
      updateForceMultiplier,
      editTitleModal
    ]
  );

  return (
    <div
      className={vstack({
        gap: 2,
        alignItems: 'flex-start',
        w: 'full'
      })}
    >
      <div
        className={hstack({
          gap: 2,
          alignItems: 'flex-start',
          w: 'full'
        })}
      >
        {forceMultiplierByIdLoading ? (
          <span
            className={css({
              textStyle: 'heading-xl'
            })}
          >
            <BaseSkeleton
              width={200}
              baseColor="page.bg.200"
              highlightColor="page.surface.100"
            />
          </span>
        ) : (
          <span
            className={css({
              textStyle: 'heading-xl',
              whiteSpace: 'nowrap'
            })}
          >
            {data?.title ?? 'New Plan'}
          </span>
        )}

        {!isFmPublished && data?.version === '1' && (
          <div
            className={css({
              w: 'full'
            })}
          >
            <Button
              usage="ghost"
              palette="action"
              shape="rounded"
              onClick={editTitleModal.show}
              disabled={loading || disabled}
            >
              Edit Title
            </Button>
          </div>
        )}
      </div>
      <div
        className={hstack({
          gap: 2,
          alignItems: 'flex-start',
          w: 'full'
        })}
      >
        {forceMultiplierByIdLoading ? (
          <p className={css({ textStyle: 'body-md' })}>
            Item ID:
            <BaseSkeleton
              width={200}
              baseColor="page.bg.200"
              highlightColor="page.surface.100"
            />
          </p>
        ) : (
          <>
            <p className={css({ textStyle: 'body-md' })}>
              Item ID: {data?.id ?? forceMultiplierId}
            </p>

            <div
              className={hstack({
                gap: 2,
                alignItems: 'flex-start',
                w: '0.5rem'
              })}
            >
              |
            </div>
            <p className={css({ textStyle: 'body-md' })}>
              Version: {data?.version ?? 1} ({data?.status})
            </p>
          </>
        )}
      </div>
      <CustomModal
        customModal={editTitleModal}
        title="Edit Title"
        onClose={editTitleModal.close}
      >
        <EditTitleModal
          initialValue={data?.title}
          onClose={editTitleModal.close}
          onSubmit={title => {
            handleSubmit(title);
          }}
        />
      </CustomModal>
    </div>
  );
};
