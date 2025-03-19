import DragAndDropList from '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList';
import _ from 'lodash';
import { useContext } from 'react';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { sqlRemoveLibraryItem } from '@/app/api/cohorts';
import { useSQLMutation } from '@/app/api';
import { useNotificationCenter } from '@cerberus/react';
import type { LibraryItem } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { vstack } from '@cerberus/styled-system/patterns';

interface DragAndDropItem extends LibraryItem {
  title: string;
}

export const CohortLibraryItemsList = () => {
  const {
    createCohortState,
    updateCohortState,
    updateAndSaveCohortState,
    cohortDetails
  } = useContext(CreateCohortContext);
  const { mutation: removeLibraryItem } = useSQLMutation(sqlRemoveLibraryItem);
  const { notify } = useNotificationCenter();

  const handleReorderItems = async (items: DragAndDropItem[]) => {
    const formattedItems: LibraryItem[] = items.map(item => {
      const { title, ...rest } = item;
      return {
        ...rest,
        displayName: title
      };
    });

    if (!_.isEqual(formattedItems, createCohortState.libraryItems)) {
      try {
        await updateAndSaveCohortState({
          ...cohortDetails.cohort,
          libraryItems: formattedItems
        });
      } catch {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to reorder library items'
        });
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    const newItems = createCohortState.libraryItems.filter(
      item => item.id !== itemId
    );

    try {
      await removeLibraryItem({ libraryItemId: itemId });

      updateCohortState({
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: newItems
      });

      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Library item removed'
      });
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Failed to remove library item'
      });
    }
  };

  const toTitleCase = (str: string): string =>
    str.toLowerCase().replace(/\b\w/g, (s: string) => s.toUpperCase());

  const getLibraryItemType = (type: string, sourceType: string): string => {
    if (!type) {
      return 'Link';
    }

    if (type === 'Unknown') {
      return toTitleCase(sourceType);
    }

    return type;
  };

  return (
    <div
      className={vstack({
        overflowY: 'auto',
        maxH: '500px',
        w: 'full',
        alignItems: 'flex-start'
      })}
    >
      <DragAndDropList
        onReorder={handleReorderItems}
        onRemoveItem={handleRemoveItem}
        onClickItem={() => null}
        items={createCohortState.libraryItems.map(item => ({
          ...item,
          title: item.displayName,
          type: getLibraryItemType(item.type, item.sourceType)
        }))}
        disabled={false}
        deleteModalTitle={false}
      />
    </div>
  );
};
