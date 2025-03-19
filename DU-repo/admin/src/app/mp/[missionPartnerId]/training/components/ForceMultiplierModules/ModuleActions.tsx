import { useCallback, useState } from 'react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { TrashCan } from '@cerberus/icons';
import { Button, useNotificationCenter } from '@cerberus/react';
import { TextEntryModal } from '@digital-u/digital-ui';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useRemoveItemFromForceMultiplier,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import { updateForceMultiplierHandler } from '../utils';

export const ModuleActions = ({
  index,
  moduleTitle,
  moduleItems,
  isFmPublished,
  disabled,
  modulesWithInformation,
  forceMultiplierById,
  forceMultiplierItems,
  setEditTitleLoading
}) => {
  const [showEditModalTitleFor, setShowEditTitleModalFor] = useState(null);
  const { notify } = useNotificationCenter();
  const {
    removeItemFromForceMultiplier,
    removeItemFromForceMultiplierLoading
  } = useRemoveItemFromForceMultiplier();
  const { updateForceMultiplier, updateForceMultiplierLoading } =
    useUpdateForceMultiplier();
  const { fetchForceMultiplierById, forceMultiplierByIdLoading } =
    useFindLatestForceMultiplierByIdAdmin();

  const handleDeleteModuleClick = async index => {
    const itemIdsInModule = forceMultiplierById?.modules[index]?.items.map(
      item => item.itemId
    );

    const itemsToRemove = forceMultiplierItems
      .filter(item => itemIdsInModule?.includes(item.id))
      .map(item => ({ id: item.id, type: item.item.__typename }));

    const input = {
      id: forceMultiplierById.id,
      version: forceMultiplierById.version,
      modules: forceMultiplierById?.modules.filter((_, i) => i !== index)
    };

    const removeItemsInput = {
      id: forceMultiplierById.id,
      version: forceMultiplierById.version,
      removeItems: itemsToRemove
    };

    if (itemsToRemove.length > 0) {
      await removeItemFromForceMultiplier(removeItemsInput);
    }

    return updateForceMultiplierHandler(
      input,
      updateForceMultiplier,
      fetchForceMultiplierById,
      forceMultiplierById.id,
      notify
    );
  };

  const handleEditModuleTitle = useCallback(
    async newTitle => {
      if (showEditModalTitleFor === null) return;
      setEditTitleLoading(true);
      const input = {
        id: forceMultiplierById.id,
        version: forceMultiplierById.version,
        modules: forceMultiplierById?.modules.map((module, index) => {
          if (index === showEditModalTitleFor) {
            return {
              ...module,
              title: newTitle
            };
          }

          return module;
        })
      };

      return updateForceMultiplierHandler(
        input,
        updateForceMultiplier,
        fetchForceMultiplierById,
        forceMultiplierById.id,
        notify,
        setShowEditTitleModalFor,
        setEditTitleLoading
      ).then(() => {
        setShowEditTitleModalFor(null);
      });
    },
    [
      forceMultiplierById,
      updateForceMultiplier,
      fetchForceMultiplierById,
      notify,
      setShowEditTitleModalFor,
      setEditTitleLoading,
      showEditModalTitleFor
    ]
  );

  const handleSetShowEditTitleModalFor = useCallback(() => {
    setShowEditTitleModalFor(index);
  }, [setShowEditTitleModalFor, index]);

  const handleCloseModal = useCallback(() => {
    setShowEditTitleModalFor(null);
  }, [setShowEditTitleModalFor]);

  return (
    <div className={hstack({ alignItems: 'center', gap: '2', w: 'full' })}>
      <h6 className={css({ fontWeight: 'bold' })}>{moduleTitle}</h6>
      {!isFmPublished && (
        <Button
          usage="outlined"
          palette="secondaryAction"
          shape="rounded"
          onClick={handleSetShowEditTitleModalFor}
          disabled={
            disabled ||
            isFmPublished ||
            removeItemFromForceMultiplierLoading ||
            updateForceMultiplierLoading ||
            forceMultiplierByIdLoading
          }
        >
          {/* <p variant="dark" style={{ color: `${colors.teal[800]}` }}> */}
          <p className={css({ color: 'teal.800' })}>Edit Title</p>
        </Button>
      )}
      <p className={css({ flexGrow: 1 })}>{moduleItems.length} Items</p>
      {modulesWithInformation.length > 1 && !isFmPublished && (
        <Button
          palette="danger"
          shape="rounded"
          usage="outlined"
          onClick={() => handleDeleteModuleClick(index)}
          disabled={
            disabled ||
            isFmPublished ||
            removeItemFromForceMultiplierLoading ||
            updateForceMultiplierLoading ||
            forceMultiplierByIdLoading
          }
        >
          Delete Module <TrashCan />
        </Button>
      )}

      {showEditModalTitleFor !== null && (
        <TextEntryModal
          title="Edit Module"
          onClose={handleCloseModal}
          label="Title"
          placeholder={
            forceMultiplierById?.modules[showEditModalTitleFor]?.title ??
            'Module Title'
          }
          onSubmit={handleEditModuleTitle}
        />
      )}
    </div>
  );
};
