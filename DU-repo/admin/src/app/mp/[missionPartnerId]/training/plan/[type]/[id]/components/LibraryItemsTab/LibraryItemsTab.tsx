import { useCallback, useState } from 'react';
import {
  Modal,
  useModal,
  trapFocus,
  Button,
  useNotificationCenter
} from '@cerberus/react';
import { BaseSkeleton } from '@/components_new/loaders';
import DragAndDropList from '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList';
import { AddLibraryItemModalContent } from './components/AddLibraryItemModalContent';
import {
  handleDeleteLibraryItem,
  handleReorderLibraryItems
} from '@/app/mp/[missionPartnerId]/training/components/utils';
import {
  useDeleteLibraryItem,
  useUpdateLibraryItems,
  useUploadLibraryItem
} from '@/api/force-multipliers';
import { useLibraryItems } from '@/components/manage-mission-partners/custom-training/useLibraryItems';
import { vstack } from '@cerberus/styled-system/patterns';

export const LibraryItemsTab = ({
  forceMultiplierById,
  disabled,
  isSubmitting,
  loading,
  isFmPublished,
  forceMultiplierByIdLoading,
  setRemovingItems
}) => {
  const [libraryItems, setLibraryItems] = useState([]);
  const { notify } = useNotificationCenter();
  const addLibraryItemModal = useModal();
  const handleKeyDown = trapFocus(addLibraryItemModal.modalRef);

  const { uploadLibraryItemData, uploadLibraryItemLoading } =
    useUploadLibraryItem();
  const { deleteLibraryItemData, deleteLibraryItemLoading, deleteLibraryItem } =
    useDeleteLibraryItem();
  const { updateLibraryItems } = useUpdateLibraryItems();

  const handleRemoveItemClick = useCallback(
    async itemId => {
      return handleDeleteLibraryItem(
        itemId,
        setRemovingItems,
        libraryItems,
        deleteLibraryItem,
        forceMultiplierById,
        forceMultiplierById.missionPartnerId,
        notify
      );
    },
    [
      setRemovingItems,
      libraryItems,
      deleteLibraryItem,
      forceMultiplierById,
      notify
    ]
  );

  const handleReorderItems = useCallback(
    async items => {
      if (items.some((item, index) => item.id !== libraryItems[index]?.id)) {
        return handleReorderLibraryItems(
          items,
          forceMultiplierById,
          updateLibraryItems,
          notify,
          forceMultiplierById.missionPartnerId,
          setLibraryItems,
          libraryItems
        );
      }
    },
    [forceMultiplierById, updateLibraryItems, notify, libraryItems]
  );

  useLibraryItems({
    forceMultiplierById,
    forceMultiplierByIdLoading,
    uploadLibraryItemData,
    uploadLibraryItemLoading,
    deleteLibraryItemData,
    deleteLibraryItemLoading,
    setLibraryItems
  });

  return (
    <div
      className={vstack({
        bg: 'page.surface.100',
        p: '8',
        borderRadius: '4px',
        alignItems: 'flex-start',
        w: 'full'
      })}
    >
      {forceMultiplierByIdLoading ? (
        <BaseSkeleton baseColor={undefined} highlightColor={undefined} />
      ) : (
        <>
          <p>Add up to 10 files or links for additional context and support</p>
          <div className={vstack({ gap: '4', w: 'full' })}>
            <DragAndDropList
              items={libraryItems?.map((item, index) => {
                return {
                  id: item.id,
                  itemIndex: index,
                  title: item.name,
                  type: item.type,
                  url: item.url,
                  forceMultiplierId: forceMultiplierById.id
                };
              })}
              disabled={disabled || isFmPublished || isSubmitting || loading}
              onRemoveItem={handleRemoveItemClick}
              onReorder={handleReorderItems}
              deleteModalTitle="Delete Library Item"
              libraryItem
              onClickItem={undefined}
            />
          </div>
          {((!isFmPublished && !libraryItems) || libraryItems?.length < 10) && (
            <Button
              size="sm"
              palette="action"
              usage="ghost"
              shape="rounded"
              onClick={addLibraryItemModal.show}
              disabled={disabled || isFmPublished || isSubmitting || loading}
            >
              Add Library Item +
            </Button>
          )}
        </>
      )}
      <Modal onKeyDown={handleKeyDown} ref={addLibraryItemModal.modalRef}>
        {addLibraryItemModal.isOpen && (
          <AddLibraryItemModalContent
            forceMultiplierId={forceMultiplierById?.id}
            forceMultiplierVersion={forceMultiplierById?.version}
            missionPartnerId={forceMultiplierById?.missionPartnerId}
            setLibraryItems={setLibraryItems}
            disabled={disabled}
            loading={loading}
            close={addLibraryItemModal.close}
          />
        )}
      </Modal>
    </div>
  );
};
