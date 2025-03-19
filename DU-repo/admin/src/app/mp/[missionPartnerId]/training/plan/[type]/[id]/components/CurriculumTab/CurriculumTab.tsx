'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  useModal,
  trapFocus,
  useNotificationCenter
} from '@cerberus/react';
import { usePathname, useRouter } from 'next/navigation';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useRemoveItemFromForceMultiplier,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import { BaseSkeleton } from '@/components_new/loaders';
import DragAndDropList from '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList';
import {
  handleDeleteItem,
  updateForceMultiplierHandler,
  handleCreateModule,
  handleReorderForceMultiplierItems,
  handleClickItem,
  compareItemList,
  handleAddContent
} from '../../../../../components/utils';
import HostedContentPreviewContainer from '@/components/manage-mission-partners/custom-training/HostedContentPreviewContainer';
import { CurriculumTabModules } from '../../../../../components/ForceMultiplierModules/CurriculumTabModules';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { durationToString } from '@/utils/string/durationToString';
import { AddModuleModalContent } from './components/AddModuleModalContent';

export const CurriculumTab = ({
  forceMultiplierById,
  forceMultiplierByIdLoading,
  isModularizedForceMultiplier,
  isFmPublished,
  disabled,
  setEditTitleLoading,
  setRemovingItems
}) => {
  const addModuleModal = useModal();
  const handleKeyDownOnAddModuleModal = trapFocus(addModuleModal.modalRef);

  const [showPreviewModalFor, setShowPreviewModalFor] = useState(null);
  const [forceMultiplierItems, setForceMultiplierItems] = useState([]);

  const router = useRouter();
  const pathName = usePathname();
  const { notify } = useNotificationCenter();
  const { fetchForceMultiplierById } = useFindLatestForceMultiplierByIdAdmin();
  const { updateForceMultiplier, updateForceMultiplierLoading } =
    useUpdateForceMultiplier();
  const {
    removeItemFromForceMultiplier,
    removeItemFromForceMultiplierLoading
  } = useRemoveItemFromForceMultiplier();
  const totalItems = forceMultiplierItems?.length ?? 0;
  const totalDuration =
    forceMultiplierItems?.length > 0
      ? durationToString(forceMultiplierById?.totalDuration)
      : '';

  const loading =
    updateForceMultiplierLoading ||
    removeItemFromForceMultiplierLoading ||
    forceMultiplierByIdLoading;

  const handleRemoveClick = async itemId => {
    handleDeleteItem(
      itemId,
      setRemovingItems,
      forceMultiplierItems,
      removeItemFromForceMultiplier,
      forceMultiplierById,
      updateForceMultiplierHandler,
      fetchForceMultiplierById,
      notify
    );
  };

  const handleClickCreateModule = async data => {
    await handleCreateModule(
      data.moduleName,
      forceMultiplierById,
      notify,
      data =>
        updateForceMultiplierHandler(
          data,
          updateForceMultiplier,
          fetchForceMultiplierById,
          forceMultiplierById.id,
          notify
        ),
      addModuleModal.close
    );
  };

  const handleReorderItems = newItems =>
    handleReorderForceMultiplierItems(
      newItems,
      forceMultiplierById,
      updateForceMultiplier,
      fetchForceMultiplierById,
      notify,
      forceMultiplierItems,
      setForceMultiplierItems
    );

  useEffect(() => {
    if (forceMultiplierById && !forceMultiplierByIdLoading) {
      setForceMultiplierItems(forceMultiplierById?.items ?? []);
    }
  }, [forceMultiplierById, forceMultiplierByIdLoading]);

  return (
    <div
      className={vstack({
        background: 'page.bg.initial',
        borderRadius: '1',
        padding: '4',
        gap: '4',
        alignItems: 'flex-start'
      })}
    >
      <div className={hstack({ gap: '2', w: 'full' })}>
        {forceMultiplierByIdLoading ? (
          <BaseSkeleton highlightColor={undefined} />
        ) : (
          <>
            <p className={css({ textStyle: 'body-md', fontWeight: 'bold' })}>
              Version {forceMultiplierById?.version}.0 (
              {forceMultiplierById?.status}):
            </p>
            <p className={css({ textStyle: 'body-md' })}>{totalItems} Items</p>
            {totalDuration !== '' && (
              <div
                className={hstack({
                  width: '0.5',
                  background: `page.surface.inverse`
                })}
              >
                &nbsp;
              </div>
            )}
            <p className={css({ textStyle: 'body-md', flexGrow: 1 })}>
              {totalDuration}
            </p>
            {isModularizedForceMultiplier && !isFmPublished && (
              <Button
                usage="outlined"
                shape="rounded"
                onClick={addModuleModal.show}
                disabled={disabled || isFmPublished || loading}
              >
                Create New Module +
              </Button>
            )}
          </>
        )}
      </div>
      <div className={vstack({ gap: '1', w: 'full' })}>
        {forceMultiplierByIdLoading ? (
          <BaseSkeleton baseColor={undefined} highlightColor={undefined} />
        ) : isModularizedForceMultiplier ? (
          <CurriculumTabModules
            isFmPublished={isFmPublished}
            disabled={disabled || loading}
            forceMultiplierById={forceMultiplierById}
            forceMultiplierItems={forceMultiplierItems}
            setShowPreviewModalFor={setShowPreviewModalFor}
            setEditTitleLoading={setEditTitleLoading}
            setRemovingItems={setRemovingItems}
          />
        ) : (
          <DragAndDropList
            items={forceMultiplierItems.map((item, index) => ({
              id: item.id,
              itemIndex: index,
              type: item.item?.__typename,
              title:
                item.item?.courseTitle ||
                item.item?.assessmentTitle ||
                item.item?.name,
              vendorName:
                item.item?.vendorName || item.item?.missionPartner?.name,
              duration: durationToString(
                item.item?.courseDuration || item.item?.durationInMinutes
              ),
              href: item.item?.courseUrl || item.item?.assessmentUrl
            }))}
            disabled={disabled || isFmPublished || loading}
            onClickItem={itemId =>
              handleClickItem(
                itemId,
                forceMultiplierItems,
                setShowPreviewModalFor
              )
            }
            onReorder={async items => {
              if (!compareItemList(items, forceMultiplierById?.items)) {
                return handleReorderItems(items);
              }
            }}
            onRemoveItem={handleRemoveClick}
            deleteModalTitle="Delete Training Item"
          />
        )}
      </div>
      {!isFmPublished &&
        !isModularizedForceMultiplier &&
        !forceMultiplierByIdLoading && (
          <Button
            usage="outlined"
            shape="rounded"
            onClick={() =>
              handleAddContent(undefined, router, forceMultiplierById, pathName)
            }
            disabled={disabled || isFmPublished || loading}
          >
            Add Training Item +
          </Button>
        )}

      <Modal
        onKeyDown={handleKeyDownOnAddModuleModal}
        ref={addModuleModal.modalRef}
      >
        {addModuleModal.isOpen && (
          <AddModuleModalContent
            close={addModuleModal.close}
            handleClickCreateModule={handleClickCreateModule}
          />
        )}
      </Modal>

      {showPreviewModalFor !== null && (
        <HostedContentPreviewContainer
          item={showPreviewModalFor}
          onClose={() => setShowPreviewModalFor(null)}
        />
      )}
    </div>
  );
};
