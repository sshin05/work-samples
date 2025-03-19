import { usePathname, useRouter } from 'next/navigation';
import { Button, useNotificationCenter } from '@cerberus/react';
import {
  useUpdateForceMultiplier,
  useFindLatestForceMultiplierByIdAdmin,
  useRemoveItemFromForceMultiplier
} from '@/api/force-multipliers';
import {
  handleClickItem,
  handleDeleteItem,
  handleAddContent,
  handleReorderModuleItems
} from '../utils';
import DragAndDropList from '../DragAndDropList/DragAndDropList';
import { durationToString } from '@/utils/string/durationToString';
import { css } from '@cerberus/styled-system/css';

export const ForceMultiplierModuleItem = ({
  module,
  index,
  setModules,
  forceMultiplierById,
  modules,
  isFmPublished,
  disabled,
  forceMultiplierItems,
  setRemovingItems,
  setShowPreviewModalFor
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { notify } = useNotificationCenter();
  const { updateForceMultiplier } = useUpdateForceMultiplier();
  const { fetchForceMultiplierById } = useFindLatestForceMultiplierByIdAdmin();
  const { removeItemFromForceMultiplier } = useRemoveItemFromForceMultiplier();

  const autoSaveModuleHelper = async (items, module, moduleIndex) => {
    const mod = modules.find(item => item.id === module.id).items;
    const diff = (items, mod) => {
      let i = items.length;
      while (i--) {
        if (items[i].id !== mod[i].itemId) return true;
      }

      return false;
    };

    if (diff(items, mod)) {
      return handleReorderModuleItems(
        items,
        moduleIndex,
        modules,
        setModules,
        forceMultiplierById.id,
        forceMultiplierById.version,
        updateForceMultiplier,
        fetchForceMultiplierById,
        notify
      );
    }
  };

  return (
    <div className={css({ w: 'full' })}>
      <DragAndDropList
        key={module.id}
        items={module?.items?.map((item, itemIndex) => ({
          id: item.id,
          itemIndex,
          type: item.item?.__typename,
          title:
            item.item?.courseTitle ||
            item.item?.assessmentTitle ||
            item.item?.name,
          vendorName: item.item?.vendorName || item.item?.missionPartner?.name,
          duration: durationToString(
            item.item?.courseDuration || item.item?.durationInMinutes
          ),
          href: item.item?.courseUrl || item.item?.assessmentUrl
        }))}
        disabled={disabled || isFmPublished}
        onClickItem={itemId =>
          handleClickItem(itemId, forceMultiplierItems, setShowPreviewModalFor)
        }
        onReorder={async newItems =>
          autoSaveModuleHelper(newItems, module, index)
        }
        onRemoveItem={async itemId =>
          handleDeleteItem(
            itemId,
            setRemovingItems,
            forceMultiplierItems,
            removeItemFromForceMultiplier,
            forceMultiplierById,
            updateForceMultiplier,
            fetchForceMultiplierById,
            notify,
            true
          )
        }
        deleteModalTitle="Delete Training Item"
      />
      {!isFmPublished && (
        <Button
          usage="ghost"
          size="sm"
          onClick={async () =>
            handleAddContent(index, router, forceMultiplierById, pathName)
          }
          disabled={disabled || isFmPublished}
        >
          Add Training Item to {module.title} +
        </Button>
      )}
    </div>
  );
};
