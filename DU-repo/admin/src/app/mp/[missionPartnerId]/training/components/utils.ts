import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

export const updateForceMultiplierHandler = async (
  input,
  updateForceMultiplier,
  fetchForceMultiplierById,
  forceMultiplierId,
  notify,
  setShowEditTitleModal = undefined,
  setEditTitleLoading = undefined
) =>
  updateForceMultiplier(input)
    .then(async () => fetchForceMultiplierById(forceMultiplierId))
    .then(() => {
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Plan successfully updated!'
      });
    })
    .catch(error => {
      notify({
        palette: 'error',
        heading: 'Error',
        description: error.message
      });
    })
    .finally(() => {
      if (setShowEditTitleModal && setEditTitleLoading) {
        setShowEditTitleModal(false);
        setEditTitleLoading(false);
      }
    });

export const handleReorderModuleItems = async (
  newItems,
  moduleIndex,
  modules,
  setModules,
  forceMultiplierId,
  forceMultiplierVersion,
  updateForceMultiplier,
  fetchForceMultiplierById,
  notify
) => {
  const moduleNewItems = newItems.map(item => ({ itemId: item.id }));
  const updatedForceMultiplierModules = modules.map((module, index) => {
    if (index === moduleIndex) {
      return {
        ...module,
        items: moduleNewItems
      };
    }

    return module;
  });

  // update the ui ahead of the api call
  setModules(updatedForceMultiplierModules);

  const input = {
    id: forceMultiplierId,
    version: forceMultiplierVersion,
    modules: updatedForceMultiplierModules
  };

  return updateForceMultiplier(input)
    .then(async () => fetchForceMultiplierById(forceMultiplierId))
    .catch(() => {
      notify({
        palette: 'error',
        heading: 'Error',
        description: 'There was an error updating the plan.'
      });
    });
};

export const handleReorderForceMultiplierItems = async (
  newItems,
  forceMultiplierById,
  updateForceMultiplier,
  fetchForceMultiplierById,
  notify,
  forceMultiplierItems,
  setForceMultiplierItems
) => {
  const reorderedItems = newItems.map(
    // Todo: Convert DragAndDropList.js to Typescript to get rid of the any type on item.
    item => forceMultiplierItems[item.itemIndex]
  );

  // update the ui ahead of the api call
  setForceMultiplierItems(reorderedItems);
  const formattedItems = reorderedItems.map(({ id, item }) => ({
    id,
    type: item?.__typename,
    vendorName: item?.vendorName || item?.missionPartner?.name,
    title: item?.courseTitle || item?.assessmentTitle || item?.name,
    // masteryLevel: forceMultiplierById?.masteryLevel,
    duration: item?.courseDuration || item?.durationInMinutes
  }));

  const input = {
    id: forceMultiplierById.id,
    version: forceMultiplierById.version,
    items: formattedItems
  };
  return updateForceMultiplier(input)
    .then(async () => fetchForceMultiplierById(forceMultiplierById.id))
    .catch(() => {
      notify({
        palette: 'error',
        heading: 'Error',
        description: 'There was an error updating the plan.'
      });
    });
};

export const handleDeleteItem = async (
  itemId,
  setRemovingItems,
  forceMultiplierItems,
  removeItemFromForceMultiplier,
  forceMultiplierById,
  updateForceMultiplier,
  fetchForceMultiplierById,
  notify,
  updateModules = false
) => {
  setRemovingItems(true);
  const itemToRemove = forceMultiplierItems.find(item => item.id === itemId);

  return removeItemFromForceMultiplier({
    id: forceMultiplierById?.id,
    version: forceMultiplierById?.version,
    removeItems: [{ id: itemToRemove?.id, type: itemToRemove?.item.__typename }]
  })
    .then(async () => {
      // Running this update AFTER the last so we don't have any wierd update collisions
      // Also implementing this here as it's rather temporary

      if (updateModules) {
        const updatedModuleInput = forceMultiplierById?.modules.map(module => {
          const updatedItems = module.items.filter(
            item => item.itemId !== itemId
          );

          return {
            ...module,
            items: updatedItems
          };
        });

        const input = {
          id: forceMultiplierById.id,
          version: forceMultiplierById.version,
          modules: updatedModuleInput
        };
        return updateForceMultiplier(input);
      }

      return Promise.resolve();
    })
    .then(async () => fetchForceMultiplierById(forceMultiplierById.id))
    .then(() => {
      setRemovingItems(false);
    })
    .then(() => {
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Item successfully removed from plan!'
      });
    })
    .catch(e => {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: ` ${e.message}`
      });
    });
};

export const handleClickItem = (
  itemId,
  forceMultiplierItems,
  setShowPreviewModalFor
) => {
  const { item, id } = forceMultiplierItems.find(
    originalItem => originalItem.id === itemId
  );

  if (
    item.source === 'du-create' ||
    item.__typename === 'Survey' ||
    item.__typename === 'Lab'
  ) {
    setShowPreviewModalFor({ ...item, id });
  } else {
    window.open(item?.courseUrl || item?.assessmentUrl, '_blank');
  }
};

export const handleCreateModule = async (
  title,
  forceMultiplierById,
  notify,
  updateForceMultiplierHandler,
  setShowAddModuleModal
) => {
  const existingModule = forceMultiplierById?.modules.find(
    module => module.title === title
  );

  if (existingModule) {
    notify({
      palette: 'error',
      heading: 'Error',
      description: 'A module with that title already exists.'
    });
    return;
  }

  const input = {
    id: forceMultiplierById.id,
    version: forceMultiplierById.version,
    modules: [
      ...forceMultiplierById.modules,
      {
        title,
        items: []
      }
    ]
  };

  return updateForceMultiplierHandler(input).then(() => {
    setShowAddModuleModal(false);
  });
};

export const handleAddContent = async (
  moduleIndex,
  router,
  forceMultiplierById,
  currentPathName
) => {
  const missionPartnerId = forceMultiplierById.missionPartnerId;
  await router.push(
    getRouteUrl(
      routeGenerators.CurriculumCatalog({
        missionPartnerId
      }),
      {
        targetId: forceMultiplierById.id,
        targetType: 'force-multiplier',
        allowedContent: ['course', 'assessment', 'survey', 'lab'],
        missionPartnerId,
        callbackPath: currentPathName,
        moduleIndex: moduleIndex?.toString()
      }
    )
  );
};

export const handleReorderLibraryItems = async (
  newLibraryItems,
  forceMultiplierById,
  updateLibraryItems,
  notify,
  missionPartnerId,
  setLibraryItems,
  libraryItems
) => {
  const reorderedLibraryItems = newLibraryItems.map(
    item => libraryItems[item.itemIndex]
  );

  const input = {
    id: forceMultiplierById.id,
    missionPartnerId,
    libraryItems: reorderedLibraryItems
  };

  return updateLibraryItems(input)
    .then(() => setLibraryItems(reorderedLibraryItems))
    .catch(() => {
      notify({
        palette: 'error',
        heading: 'Error',
        description: 'There was an error updating the plan.'
      });
    });
};

export const handleDeleteLibraryItem = async (
  itemId,
  setRemovingItems,
  libraryItems,
  deleteLibraryItem,
  forceMultiplierById,
  missionPartnerId,
  notify
) => {
  setRemovingItems(true);
  const itemToRemove = libraryItems.find(item => item.id === itemId);

  const input = {
    forceMultiplierId: forceMultiplierById.id,
    version: forceMultiplierById.version,
    libraryItemId: itemToRemove.id,
    missionPartnerId
  };

  return deleteLibraryItem(input)
    .then(() => {
      setRemovingItems(false);
    })
    .then(() => {
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Item successfully removed from plan!'
      });
    })
    .catch(() => {
      notify({
        palette: 'error',
        heading: 'Error',
        description: 'There was an error removing the item from the plan.'
      });
    });
};

export const compareItemList = (newItems, currentItems) =>
  newItems.every((item, index) => item.id === currentItems[index].id);
