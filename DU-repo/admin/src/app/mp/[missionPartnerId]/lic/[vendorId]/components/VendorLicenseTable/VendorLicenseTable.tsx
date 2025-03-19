import { useState, useRef, useMemo, useCallback } from 'react';
import { Add, TrashCan } from '@cerberus/icons';
import {
  Modal,
  useNotificationCenter,
  useModal,
  trapFocus
} from '@cerberus/react';
import { useFindLicensesByMissionPartnerAndVendor } from '@/api/license';
import { AddLicensesToUsers } from '../../../components/AddLicensesToUsers';
import { RevokeLicensesFromUsersModal } from './components/RevokeLicensesFromUsersModal';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { columns } from './licenseColumns';
import { createCheckboxColumn } from '@/components_new/table/customColumns/createCheckboxColumn';
import { useHandleDownloadLicenses } from './utils/useHandleDownloadLicenses';
import { useHandleBulkRemoveLicenses } from './utils/useHandleBulkRemoveLicenses';
import { useHandleRemoveLicenses } from './utils/useHandleRemoveLicenses';
import type { SortingState } from '@tanstack/react-table';
import { useSortingEffects } from './utils/useSortingEffects';

const ITEMS_PER_PAGE = 25;
const STATIC_ARRAY = [];

export const VendorLicenseTable = ({
  missionPartner,
  missionPartnerId,
  missionPartnerName,
  missionPartnerLoading,
  vendorId,
  vendorName
}) => {
  const { notify } = useNotificationCenter();
  const addLicensesToUsersModal = useModal();
  const revokeLicensesFromUsersModal = useModal();
  const handleKeyDownOnAddLicensesToUsersModal = trapFocus(
    addLicensesToUsersModal.modalRef
  );
  const selectedUsersRef = useRef([]);
  const [selectedUsersLength, setSelectedUsersLength] = useState(0);
  const [selectedRows, setSelectedRows] = useState({});
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  // FYI: there is already a `debounce` on setSearchTerm inside the table component
  const [searchTerm, setSearchTerm] = useState<string>();

  // changes to QUERY STATE will update/rerun the useFindLicensesByMissionPartnerAndVendor query
  const { queryState } = useSortingEffects({
    missionPartnerId,
    vendorId,
    pageSize: ITEMS_PER_PAGE,
    pageNumber: page,
    sorting,
    searchTerm
  });

  const { licenses, licensesTotal, licensesLoading, refetchLicenses } =
    useFindLicensesByMissionPartnerAndVendor(queryState);

  const { handleDownloadLicenses } = useHandleDownloadLicenses({
    missionPartnerId,
    missionPartnerName,
    vendorId,
    vendorName
  });

  const { handleRemoveLicenses, removeLicensesLoading } =
    useHandleRemoveLicenses({
      vendorId,
      missionPartnerId,
      selectedUsersRef,
      setSelectedRows,
      setSelectedUsersLength,
      setShowCheckboxes,
      refetchLicenses
    });

  const handleAssignModalClose = () => {
    addLicensesToUsersModal.close();
  };

  const { handleBulkRemoveLicenses, revokeVendorLicensesForUsersLoading } =
    useHandleBulkRemoveLicenses({
      missionPartnerId,
      vendorId,
      refetchLicenses
    });

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
        selectedUsersRef.current = selectedKeys;
        setSelectedUsersLength(selectedKeys.length);

        return newSelectedRows;
      });
    },
    [setSelectedRows, selectedUsersRef, setSelectedUsersLength]
  );

  const tableColumns = useMemo(() => {
    const newColumns = [...columns];

    if (showCheckboxes) {
      newColumns.unshift(
        createCheckboxColumn({ isChanged, idType: 'userId', selectedRows })
      );
    }
    return newColumns;
  }, [showCheckboxes, isChanged, selectedRows]);

  const noDataMessage = `When a learner has been given ${vendorName} licenses, they will appear
        here.`;

  return (
    <>
      <ServerSideTable
        columns={tableColumns}
        data={licenses || STATIC_ARRAY}
        page={page}
        setPage={setPage}
        sorting={sorting}
        setSorting={setSorting}
        loading={
          removeLicensesLoading ||
          revokeVendorLicensesForUsersLoading ||
          missionPartnerLoading ||
          licensesLoading
        }
        total={licensesTotal ? Number(licensesTotal) : 0}
        size={ITEMS_PER_PAGE}
        noDataMessage={
          <NoDataMessage
            message={noDataMessage}
            buttonText="Assign License"
            cta={addLicensesToUsersModal.show}
          />
        }
        toolbarType="search"
        amountItemsSelected={selectedUsersLength}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search by name"
        buttonProps={{
          onButtonClick: addLicensesToUsersModal.show,
          buttonContent: 'Assign License',
          buttonIcon: <Add />
        }}
        downloadProps={{
          onDownload: handleDownloadLicenses
        }}
        editProps={{
          showEdit: showCheckboxes,
          setShowEdit: setShowCheckboxes,
          bulkAction: revokeLicensesFromUsersModal.show,
          disableEdit: revokeVendorLicensesForUsersLoading
        }}
        removeProps={{
          disabled: false,
          buttonText: 'Revoke',
          buttonIcon: <TrashCan />,
          onButtonClick: handleRemoveLicenses
        }}
      />
      <Modal
        onKeyDown={handleKeyDownOnAddLicensesToUsersModal}
        ref={addLicensesToUsersModal.modalRef}
      >
        {addLicensesToUsersModal.isOpen && (
          <AddLicensesToUsers
            missionPartner={missionPartner}
            vendorId={vendorId}
            onClose={handleAssignModalClose}
            notify={notify}
            refetchLicenses={refetchLicenses}
          />
        )}
      </Modal>
      <RevokeLicensesFromUsersModal
        revokeLicensesFromUsersModal={revokeLicensesFromUsersModal}
        onClose={revokeLicensesFromUsersModal.close}
        onUpload={handleBulkRemoveLicenses}
      />
    </>
  );
};
