import { useState, useMemo, useCallback, Fragment } from 'react';
import { Add, TrashCan } from '@cerberus/icons';
import { useRouter, usePathname } from 'next/navigation';
import { css } from '@cerberus/styled-system/css';
import {
  Modal,
  useModal,
  trapFocus,
  useNotificationCenter,
  Button,
  Portal,
  useConfirmModal
} from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import {
  useCreateCollection,
  useRemoveCollection,
  useRemoveCollectionItems,
  useUpdateCollection,
  useFindMissionPartnerById
} from '@/api/mission-partner';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { createCheckboxColumnForCollections } from '@/components_new/table/customColumns/createCheckboxColumnForCollections/createCheckboxColumnForCollections';
import { EditCollectionModal } from './components/EditCollectionModal';
import { DeleteCollectionModal } from './components/DeleteCollectionModal';
import { CreateCollectionModal } from './components/CreateCollectionsModal';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { type RemoveCollectionItemInput } from '@/api/codegen/graphql';

const formatTableData = data => {
  return (
    data &&
    data.map(item => ({
      id: `${item.courseId || item.assessmentId || item.planSourceId}`,
      title: item.title,
      type:
        item.type === 'COURSE' || item.type === 'Course'
          ? 'Course'
          : item.type === 'ASSESSMENT' || item.type === 'Assessment'
            ? 'Assessment'
            : 'Plan',
      dateAdded: abbreviatedDayDate(item.dateAdded),
      required: item.required
    }))
  );
};
export const CollectionsTable = ({
  isDuAdmin,
  isPortalManager,
  data,
  missionPartnerId
}) => {
  const { createCollection } = useCreateCollection();
  const { removeCollection } = useRemoveCollection();
  const { updateCollection } = useUpdateCollection();
  const { removeCollectionItems: removeCollectionItemsHook } =
    useRemoveCollectionItems();
  const removeCollectionItems = useMemo(
    () => removeCollectionItemsHook,
    [removeCollectionItemsHook]
  );
  const { missionPartnerLoading } = useFindMissionPartnerById(missionPartnerId);
  const router = useRouter();
  const pathName = usePathname();
  const { notify } = useNotificationCenter();
  const createCollectionModal = useModal();
  const handleKeyDownOnCreateCollectionModal = trapFocus(
    createCollectionModal.modalRef
  );

  const tableData = data;

  const [showCheckboxes, setShowCheckboxes] = useState<number | null>(null);

  const [lockEditButton, setLockEditButton] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedListLength, setCheckedListLength] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(null);

  const columns = useCallback(
    () => [
      {
        accessorKey: 'title',
        header: 'Item Name'
      },
      {
        accessorKey: 'type',
        header: 'Type'
      },
      {
        accessorKey: 'dateAdded',
        header: 'Date Added'
      }
    ],
    []
  );

  const checkTableData = useCallback(
    (id: string, tableId: string) => {
      const table = tableData.find(table => table.id === tableId);
      if (!table) {
        console.error(`Table with id ${tableId} not found`);
        return null;
      }

      const foundArray = table.items.find(item => {
        return (
          item.courseId === id ||
          item.assessmentId === id ||
          item.planSourceId === id
        );
      });

      if (foundArray) {
        return foundArray;
      } else {
        return null;
      }
    },
    [tableData]
  );

  const isChanged = useCallback(
    (row: string, tableId: string) => {
      setCheckedItems(prevCheckedItems => {
        const foundIndex = prevCheckedItems.findIndex(item => {
          return Object.values(item).includes(row);
        });

        let newCheckedItems;
        if (foundIndex !== -1) {
          newCheckedItems = prevCheckedItems.filter(
            (_, index) => index !== foundIndex
          );
        } else {
          const tempObj = checkTableData(row, tableId);
          let newItem: {
            type?: string;
            courseId?: string;
            assessmentId?: string;
            planSourceId?: string;
            planType?: string;
            planVersion?: string;
          } = {};

          switch (tempObj.type) {
            case 'COURSE':
              newItem = { type: tempObj.type, courseId: tempObj.courseId };

              break;
            case 'ASSESSMENT':
              newItem = {
                type: tempObj.type,
                assessmentId: tempObj.assessmentId
              };

              break;
            case 'TRAINING_PLAN':
              newItem = {
                type: tempObj.type,
                planSourceId: tempObj.planSourceId,
                planType: tempObj.planType,
                planVersion: tempObj.planVersion
              };
              break;
          }
          newCheckedItems = [...prevCheckedItems, newItem];
        }

        setCheckedListLength(newCheckedItems.length);

        return newCheckedItems;
      });
    },
    [checkTableData]
  );

  const newColumn = useMemo(() => {
    const newColumns = [...columns()];

    if (showCheckboxes !== null) {
      const currentTable = tableData[showCheckboxes];
      if (currentTable) {
        const currentTableId = currentTable.id;
        const checkboxColumn = createCheckboxColumnForCollections({
          isChanged,
          checkedItems,
          currentTableId
        });

        return tableId => {
          if (tableId === currentTableId) {
            return [checkboxColumn, ...newColumns];
          }
          return newColumns;
        };
      }
    }

    return () => newColumns;
  }, [showCheckboxes, columns, isChanged, checkedItems, tableData]);

  const callToAction = (id: string) => {
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId: missionPartnerId
        }),
        {
          targetId: missionPartnerId,
          collectionId: id,
          targetType: 'collections',
          allowedContent: ['course', 'assessment', 'plan'],
          callbackPath: pathName
        }
      )
    );
  };

  const onCancelButtonClick = useCallback(() => {
    setCheckedItems([]);
    setCheckedListLength(0);
    setShowCheckboxes(null);
    setLockEditButton(false);
  }, []);

  const handleRemoveCollectionItems = useCallback(
    (
      missionPartnerId: string,
      collection: { id: string },
      selectedItems: RemoveCollectionItemInput[]
    ) => {
      removeCollectionItems(collection.id, selectedItems, missionPartnerId)
        .then(() => {
          notify({
            palette: 'success',
            heading: 'Success',
            description: `${selectedItems.length} Training Item${
              selectedItems.length > 1 ? 's were' : ' was'
            } successfully removed from the mission partner.`
          });
        })
        .catch(() => {
          notify({
            palette: 'danger',
            heading: 'Error',
            description: `Error trying to remove item${
              selectedItems.length > 1 ? 's' : ''
            } from mission partner`
          });
        });
    },
    [notify, removeCollectionItems]
  );

  const handleRemoveButtonClick = (itemId, item) => {
    handleConfirmRemoveItems(itemId, item);
  };

  const confirmRemoveItemsModal = useConfirmModal();
  const handleConfirmRemoveItems = useCallback(
    async (selectedItems, itemId) => {
      const consent = await confirmRemoveItemsModal.show({
        kind: 'destructive',
        heading: 'Are you sure?',
        description: `Remove ${selectedItems.length} Training Item${selectedItems?.length === 1 ? '' : 's'}?`,
        actionText: 'Yes, remove',
        cancelText: `No, keep training item${selectedItems?.length === 1 ? '' : 's'}`
      });
      if (consent)
        handleRemoveCollectionItems(missionPartnerId, itemId, selectedItems);
    },
    [confirmRemoveItemsModal, handleRemoveCollectionItems, missionPartnerId]
  );

  const handleCreateCollection = (
    missionPartnerId: string,
    collection: { name: string; description: string }
  ) => {
    return createCollection(
      collection.name,
      collection.description,
      missionPartnerId
    )
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Collection was successfully created.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to create collection for mission partner`
        });
      });
  };

  const handleUpdateCollection = (
    missionPartnerId: string,
    collection: { id: string; name: string; description: string }
  ) => {
    return updateCollection(
      collection.id,
      collection.name,
      collection.description,
      missionPartnerId
    )
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Collection was successfully updated.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to update collection from mission partner`
        });
      });
  };

  const handleRemoveCollection = (
    missionPartnerId: string,
    collection: { id: string }
  ) => {
    removeCollection(collection.id, missionPartnerId)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Collection was successfully removed.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to remove collection from mission partner`
        });
      });
  };

  return (
    <>
      {data?.length > 0 &&
        data.map((item, i: number) => {
          return (
            <Fragment key={item.id}>
              <div
                className={css({
                  color: 'page.text.inverse',
                  bgColor: 'action.bg.hover',
                  paddingBlockEnd: '0.313rem 0.625rem',
                  borderRadius: '8px',
                  m: '2rem 0 1rem',
                  w: 'max-content',
                  p: '0.313rem 0.625rem',
                  fontWeight: '600',
                  fontSize: '14px'
                })}
              >
                Collection
              </div>
              <div
                className={vstack({
                  gap: '2',
                  w: 'full',
                  alignItems: 'flex-start'
                })}
                onMouseEnter={() => setControlsVisible(i)}
                onMouseLeave={() => setControlsVisible(null)}
              >
                <div
                  className={hstack({
                    gap: '2',
                    w: 'full',
                    alignItems: 'flex-start',
                    mb: '0.313rem'
                  })}
                >
                  <p
                    className={css({
                      fontWeight: 'semiBold',
                      fontSize: 'h6',
                      mr: '0.313rem'
                    })}
                  >
                    {item.name}

                    {controlsVisible === i && (
                      <>
                        <EditCollectionModal
                          onSubmit={handleUpdateCollection}
                          collections={item}
                          missionPartnerId={missionPartnerId}
                        />
                        <DeleteCollectionModal
                          onSubmit={handleRemoveCollection}
                          collection={item}
                          missionPartnerId={missionPartnerId}
                        />
                      </>
                    )}
                  </p>
                </div>
                <p
                  className={css({
                    color: 'page.text.300',
                    fontSize: 'body-md'
                  })}
                >
                  {item.description}
                </p>
              </div>
              <div
                className={vstack({
                  gap: '2',
                  w: 'full',
                  alignItems: 'flex-start',
                  pt: '8'
                })}
              >
                <LocalTable
                  columns={newColumn(item.id)}
                  data={formatTableData(item.items)}
                  loading={missionPartnerLoading}
                  noDataMessage={
                    <NoDataMessage
                      buttonText="Add Training"
                      cta={() => callToAction(item.id)}
                      message="Once featured training has been added, it will appear here."
                    />
                  }
                  searchPlaceholder="Search by item name or type"
                  toolbarType="search"
                  editProps={
                    (isDuAdmin || isPortalManager) && {
                      disableEdit:
                        item?.items?.length === 0 ||
                        (lockEditButton && showCheckboxes !== i),
                      showEdit: showCheckboxes === i,
                      setShowEdit: () => {
                        setLockEditButton(prev => !prev);
                        setShowCheckboxes(prev => (prev === i ? null : i));
                      }
                    }
                  }
                  amountItemsSelected={
                    showCheckboxes === i ? checkedListLength : 0
                  }
                  removeProps={{
                    disabled: false,
                    buttonText: 'Remove',
                    buttonIcon: <TrashCan />,
                    onButtonClick: () => {
                      handleRemoveButtonClick(checkedItems, item);
                      onCancelButtonClick();
                    }
                  }}
                  cancelProps={{
                    buttonText: 'Cancel',
                    onButtonClick: onCancelButtonClick
                  }}
                  buttonProps={
                    (isDuAdmin || isPortalManager) && {
                      buttonIcon: <Add />,
                      buttonContent: 'Training',
                      onButtonClick: () => callToAction(item.id)
                    }
                  }
                />
              </div>
            </Fragment>
          );
        })}

      <div
        className={hstack({
          gap: '2',
          w: 'full',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          pt: '8'
        })}
      >
        {(data || []).length === 0 && (
          <p
            className={css({
              lineHeight: 'body-lg',
              fontSize: 'body-md',
              mr: '0.188rem'
            })}
          >
            Organize your featured training items by topic with collections
          </p>
        )}
        <Button
          palette="action"
          usage="outlined"
          shape="rounded"
          onClick={createCollectionModal.show}
        >
          Add a collection <Add />
        </Button>
      </div>
      <Portal>
        <Modal
          onKeyDown={handleKeyDownOnCreateCollectionModal}
          ref={createCollectionModal.modalRef}
        >
          {createCollectionModal.isOpen && (
            <CreateCollectionModal
              onClose={createCollectionModal.close}
              onSubmit={handleCreateCollection}
              missionPartnerId={missionPartnerId}
            />
          )}
        </Modal>
      </Portal>
    </>
  );
};
