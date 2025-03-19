import { useState, useMemo, useRef, useCallback } from 'react';
import { useModal, useNotificationCenter } from '@cerberus/react';
import { Add, TrashCan } from '@cerberus/icons';
import {
  useExportLearners,
  useCreateExportsByTypeAndMissionPartnerId,
  useExportIndividualLearnerActivity
} from '@/api/mission-partner';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { createCheckboxColumn } from '@/components_new/table/customColumns/createCheckboxColumn';
import { useLearnersColumns } from './useLearnersColumns';
import { useRemoveUsersFromMissionPartner } from '@/api/users';
import { RemoveUsersFromMissionPartnerModal } from './components/RemoveUsersFromMissionPartnerModal';
import { DownloadType } from '@/api/codegen/graphql';

export const LearnersTable = ({
  missionPartner,
  learners,
  loading,
  page,
  setPage,
  sort,
  setSort,
  searchText,
  setSearchText,
  total,
  size,
  setShowAddMemberModal,
  showConfirmModal,
  callLearnerSideDrawer
}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [toolbarType, setToolbarType] = useState('search');
  const checkedListRef = useRef([]);
  const [checkedListLength, setCheckedListLength] = useState(0);

  const { exportLearners } = useExportLearners();

  const { createExportByTypeAndMissionPartnerId: exportActivity } =
    useCreateExportsByTypeAndMissionPartnerId();

  const { exportIndividualLearnerActivity } =
    useExportIndividualLearnerActivity();

  const {
    removeUsersFromMissionPartner,
    removeUsersFromMissionPartnerLoading
  } = useRemoveUsersFromMissionPartner();

  const { notify } = useNotificationCenter();
  const removeBulkUsersModal = useModal();

  const isChanged = useCallback(
    userId => {
      setSelectedRows(prevSelectedRows => {
        const newSelectedRows = { ...prevSelectedRows };

        if (newSelectedRows[userId]) {
          delete newSelectedRows[userId];
        } else {
          newSelectedRows[userId] = true;
        }

        const selectedKeys = Object.keys(newSelectedRows);
        checkedListRef.current = selectedKeys;
        setCheckedListLength(selectedKeys.length);

        return newSelectedRows;
      });
    },
    [setSelectedRows, checkedListRef, setCheckedListLength]
  );

  const onCancelButtonClick = () => {
    setSelectedRows({});
    setCheckedListLength(0);
    setToolbarType('search');
    setShowCheckboxes(false);
  };

  // NOTE: These are used together in the learners search-toolbar.
  const downloadProps = useMemo(() => {
    const handleLearnerDownload = () =>
      exportLearners({
        variables: {
          missionPartnerId: missionPartner?.id,
          missionPartnerName: missionPartner?.name
        }
      })
        .then(() =>
          notify({
            palette: 'success',
            heading: 'Success',
            description: `You will receive a notification when your download is ready to view in your Report Center.`
          })
        )
        .catch(() =>
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'There was an error exporting learners.'
          })
        );

    const handleActivityDownload = () => {
      exportActivity(
        DownloadType.MissionPartnerLearnerActivityEvents,
        missionPartner.id
      )
        .then(() =>
          notify({
            palette: 'success',
            heading: 'Success',
            description: `You will receive a notification when your download is ready to view in your Report Center.`
          })
        )
        .catch(() =>
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'There was an error exporting learners activity.'
          })
        );
    };

    return [
      {
        name: 'Download learner list',
        onDownload: () => {
          handleLearnerDownload();
        }
      },
      {
        name: 'Download learner activity report',
        onDownload: () => {
          handleActivityDownload();
        }
      }
    ];
  }, [
    exportActivity,
    exportLearners,
    missionPartner?.id,
    missionPartner?.name,
    notify
  ]);

  // This used in the individual learner columns
  const downloadLearnerProps = {
    name: 'Download learner activity report',
    onDownload: (missionPartnerId, userId) => {
      // userId and mpId are out-of-order all over the place here; including the `onDownload` call.

      // eslint-disable-next-line sonarjs/arguments-order
      handleIndividualActivityDownload(userId, missionPartnerId);
    }
  };

  const learnersColumns = useLearnersColumns({
    missionPartnerId: missionPartner?.id,
    downloadLearnerProps,
    showConfirmModal,
    callLearnerSideDrawer
  });

  const columns = useMemo(() => {
    const newColumns = [...learnersColumns];
    if (showCheckboxes)
      newColumns.unshift(createCheckboxColumn({ isChanged, selectedRows }));
    return newColumns;
  }, [showCheckboxes, selectedRows, learnersColumns, isChanged]);

  const handleIndividualActivityDownload = (missionPartnerId, userId) => {
    exportIndividualLearnerActivity({
      variables: {
        missionPartnerId,
        userId
      }
    })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `You will receive a notification when your download is ready to view in your Report Center.`
        })
      )
      .catch(() =>
        notify({
          heading: 'Error',
          description: 'There was an error exporting learner activity.',
          palette: 'danger'
        })
      );
  };

  const handleBulkRemoveLearners = async file =>
    removeUsersFromMissionPartner(file, missionPartner?.id)
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Learner removal in progress',
          description: `You will receive an email when the file has finished processing.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error removing learners.'
        })
      );

  return (
    <>
      <ServerSideTable
        columns={columns}
        data={learners}
        hasFiltersApplied={false}
        noDataMessage={`Once a learner has been added to ${
          missionPartner?.name ?? 'this mission partner'
        }, they will appear here.`}
        buttonProps={{
          buttonIcon: <Add />,
          buttonContent: 'Learner',
          onButtonClick: () => setShowAddMemberModal(true)
        }}
        downloadProps={downloadProps}
        loading={loading}
        page={page}
        setPage={setPage}
        sorting={sort}
        setSorting={setSort}
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        searchPlaceholder="Search by first name or last name"
        toolbarType={toolbarType}
        editProps={{
          showEdit: showCheckboxes,
          setShowEdit: setShowCheckboxes,
          bulkAction: removeBulkUsersModal.show,
          disableEdit: removeUsersFromMissionPartnerLoading,
          itemLabel: 'learner'
        }}
        amountItemsSelected={checkedListLength}
        removeProps={{
          disabled: false,
          buttonText: 'Remove',
          buttonIcon: <TrashCan />,
          onButtonClick: () => {
            showConfirmModal(checkedListRef.current);
            onCancelButtonClick();
          }
        }}
        cancelProps={{
          buttonText: 'Cancel',
          onButtonClick: () => onCancelButtonClick()
        }}
        total={total}
        size={size}
      />
      <RemoveUsersFromMissionPartnerModal
        removeBulkUsersModal={removeBulkUsersModal}
        onClose={removeBulkUsersModal.close}
        onUpload={handleBulkRemoveLearners}
      />
    </>
  );
};
