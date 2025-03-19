import { useState, useEffect, useMemo, useCallback } from 'react';
import { Add, TrashCan } from '@cerberus/icons';
import { useRouter } from 'next/navigation';
import { useNotificationCenter, useConfirmModal } from '@cerberus/react';
import { find } from 'lodash';
import { useRemoveFeaturedTrainingItems } from '@/api/mission-partner';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { createCheckboxColumnForFeaturedItem } from '@/components_new/table/customColumns/createCheckboxColumnForFeaturedItem';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { ToggleCell } from './ToggleCell';
import { CollectionsTable } from '../Collections';
import { LearnersStatusCell } from './LearnersStatusCell';
import { useToggleRequiredFeaturedTraining } from '@/api/mission-partner/useToggleRequiredFeaturedTraining';
import { css } from '@cerberus/styled-system/css';

const formatTableData = data => {
  return (
    data &&
    data.map(item => ({
      id: `${item.courseId || item.assessmentId || item.planSourceId || item.labId}`,
      title: item.title,
      type:
        item.type === 'COURSE' || item.type === 'Course'
          ? 'Course'
          : item.type === 'ASSESSMENT' || item.type === 'Assessment'
            ? 'Assessment'
            : item.type === 'LAB' || item.type === 'Lab'
              ? 'Lab'
              : 'Plan',
      dateAdded: abbreviatedDayDate(item.dateAdded),
      required: item.required,
      assigned: item.assigned,
      inProgress: item.started,
      stopped: item.stopped,
      completed: item.completed
    }))
  );
};

const FeaturedTrainingTab = ({
  isPortalManager,
  missionPartner,
  missionPartnerLoading
}) => {
  const { isDuAdmin } = useIsDuAdmin();
  const router = useRouter();
  const data = missionPartner?.featuredTraining;
  const { notify } = useNotificationCenter();
  const { removeFeaturedTrainingItems } = useRemoveFeaturedTrainingItems();
  const [tableData, setTableData] = useState(formatTableData(data || []));
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedListLength, setCheckedListLength] = useState(0);
  const {
    toggleRequiredFeaturedTraining,
    toggleRequiredFeaturedTrainingLoading
  } = useToggleRequiredFeaturedTraining();

  const toggleRequiredValue = useCallback(
    async rowData => {
      const databaseRow = find(
        data,
        item =>
          item.courseId === rowData.id ||
          item.assessmentId === rowData.id ||
          item.planSourceId === rowData.id ||
          item.labId === rowData.id
      );

      if (!databaseRow) {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Your data is out-of-date. Refresh your browser.'
        });
        return;
      }

      try {
        await toggleRequiredFeaturedTraining(databaseRow, missionPartner?.id);
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Featured training updated.'
        });
      } catch (_error) {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Featured training failed to update.'
        });
      }
    },
    [data, notify, toggleRequiredFeaturedTraining, missionPartner]
  );

  useEffect(() => {
    setTableData(formatTableData(data));
  }, [data]);

  const columns = useCallback(
    () => [
      {
        accessorKey: 'title',
        header: 'Item name',
        cell: info => (
          <span
            className={css({
              display: 'block',
              minW: '18rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {info.getValue()}
          </span>
        )
      },
      {
        accessorKey: 'type',
        header: 'Type'
      },
      {
        accessorKey: 'dateAdded',
        header: 'Date added',
        sortingFn: (a, b) => {
          const dateA = a.original.dateAdded
            ? new Date(a.original.dateAdded)
            : Infinity;
          const dateB = b.original.dateAdded
            ? new Date(b.original.dateAdded)
            : Infinity;
          return (
            (dateA instanceof Date ? dateA.getTime() : dateA) -
            (dateB instanceof Date ? dateB.getTime() : dateB)
          );
        }
      },
      {
        accessorKey: 'learnersStatus',
        header: 'Status',
        enableSorting: false,
        cell: ({ row: { original } }) => {
          return <LearnersStatusCell original={original} />;
        }
      },
      {
        accessorKey: 'required',
        header: 'Required',
        enableSorting: false,
        cell: ({ row: { original } }) => (
          <ToggleCell
            original={original}
            callback={toggleRequiredValue}
            disabled={
              missionPartnerLoading || toggleRequiredFeaturedTrainingLoading
            }
          />
        )
      }
    ],
    [
      missionPartnerLoading,
      toggleRequiredValue,
      toggleRequiredFeaturedTrainingLoading
    ]
  );

  const checkTableData = useCallback(
    id => {
      return tableData.find(data => data.id === id);
    },
    [tableData]
  );

  const checkMPPlanData = useCallback(
    id => {
      return data.find(mpData => mpData.planSourceId === id);
    },
    [data]
  );

  const isChanged = useCallback(
    row => {
      setCheckedItems(prevCheckedItems => {
        const foundIndex = prevCheckedItems.findIndex(item => {
          return Object.values(item).includes(row);
        });
        let newCheckedItems = [];
        if (foundIndex !== -1) {
          newCheckedItems = prevCheckedItems.filter(
            (_, index) => index !== foundIndex
          );
        } else {
          let tempObj = checkTableData(row);
          let newItem;
          switch (tempObj.type) {
            case 'Course':
              newItem = { type: tempObj.type, courseId: tempObj.id };

              break;
            case 'Assessment':
              newItem = { type: tempObj.type, assessmentId: tempObj.id };

              break;
            case 'Lab':
              newItem = { type: tempObj.type, labId: tempObj.id };

              break;
            case 'Plan':
              tempObj = checkMPPlanData(tempObj.id);
              newItem = {
                type: tempObj.type,
                planSourceId: tempObj.planSourceId,
                planType: tempObj.planType,
                planVersion: tempObj.planVersion
              };
              break;
          }
          newCheckedItems = [...(prevCheckedItems || []), newItem];
        }

        setCheckedListLength(newCheckedItems?.length);
        return newCheckedItems;
      });
    },
    [checkMPPlanData, checkTableData]
  );

  const newColumn = useMemo(() => {
    const newColumns = [...columns()];

    if (showCheckboxes)
      newColumns.unshift(
        createCheckboxColumnForFeaturedItem({ isChanged, checkedItems })
      );
    return newColumns;
  }, [showCheckboxes, columns, isChanged, checkedItems]);

  const callToAction = () => {
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId: missionPartner.id
        }),
        {
          targetId: missionPartner.id,
          targetType: 'mission-partner-featured-training',
          allowedContent: ['course', 'assessment', 'plan', 'lab'],
          missionPartnerId: missionPartner.id,
          excludeCustomContent: true,
          callbackPath: getRouteUrl(
            routeGenerators.MissionPartnerTrainingHub({
              missionPartnerId: missionPartner.id
            })
          )
        }
      )
    );
  };

  const onCancelButtonClick = useCallback(() => {
    setCheckedItems([]);
    setCheckedListLength(0);
    setShowCheckboxes(false);
  }, []);

  const handleRemoveItems = useCallback(
    (missionPartnerId, selectedItems) => {
      const formattedItems = selectedItems.map(item => ({
        ...item,
        type: item.type.toUpperCase()
      }));

      removeFeaturedTrainingItems(missionPartnerId, formattedItems)
        .then(() => {
          notify({
            palette: 'success',
            heading: 'Success',
            description: `${selectedItems?.length} Training Item${
              selectedItems?.length > 1 ? 's were' : ' was'
            } successfully removed from the mission partner.`
          });
          setTableData(formatTableData(data));
        })
        .catch(() => {
          notify({
            palette: 'danger',
            heading: 'Error',
            description: `Error trying to remove item${
              selectedItems.length > 1 ? 's' : ''
            } from mission partner.`
          });
        });
    },
    [data, notify, removeFeaturedTrainingItems]
  );

  const handleRemoveButtonClick = itemId => {
    handleConfirmRemoveItems(itemId);
  };

  const confirmRemoveItemsModal = useConfirmModal();

  const handleConfirmRemoveItems = useCallback(
    async selectedItems => {
      const consent = await confirmRemoveItemsModal.show({
        heading: 'Are you sure?',
        description: `Remove 
          ${selectedItems?.length} Training Item${selectedItems?.length === 1 ? '' : 's'}?`,
        actionText: 'Yes, remove',
        cancelText: `No, keep training item${selectedItems?.length === 1 ? '' : 's'}`
      });
      if (consent) handleRemoveItems(missionPartner?.id, selectedItems);
    },
    [confirmRemoveItemsModal, handleRemoveItems, missionPartner?.id]
  );

  return (
    <div>
      <LocalTable
        columns={newColumn}
        data={tableData}
        loading={missionPartnerLoading}
        noDataMessage={
          <NoDataMessage
            buttonText="Add Training"
            cta={callToAction}
            message="Once featured training has been added, it will appear here."
          />
        }
        searchPlaceholder="Search by item name or type"
        toolbarType="search"
        editProps={
          (isDuAdmin || isPortalManager) && {
            disableEdit: tableData?.length === 0,
            showEdit: showCheckboxes,
            setShowEdit: setShowCheckboxes
          }
        }
        amountItemsSelected={checkedListLength}
        removeProps={{
          disabled: false,
          buttonText: 'Remove',
          buttonIcon: <TrashCan />,
          onButtonClick: () => {
            handleRemoveButtonClick(checkedItems);
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
            buttonContent: 'Training item',
            onButtonClick: callToAction
          }
        }
      />
      <CollectionsTable
        missionPartnerId={missionPartner?.id}
        isDuAdmin={isDuAdmin}
        data={missionPartner?.collections}
        isPortalManager={isPortalManager}
      />
    </div>
  );
};

export default FeaturedTrainingTab;
