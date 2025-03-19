import { useState } from 'react';
import { Button, useNotificationCenter, useModal } from '@cerberus/react';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { LicenseRequestModalContent } from './components/LicenseRequestModalContent';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import {
  useApproveLicenseRequest,
  useDeclineLicenseRequest,
  useExportMissionPartnerLicenseRequests,
  useGetVendorsForOpenLicenseRequests,
  useGetBranchesForOpenLicenseRequest,
  useFindOpenLicenseRequestsFilter
} from '@/api/license-requests';
import { useMedia } from 'react-use';
import type { SortingState } from '@tanstack/react-table';
import { useSortHandler } from './utils/useSortHandler';
import { LicenseFilter } from './components/LicenseFilter/LicenseFilter';
import { CustomModal } from '@/components_new/modals/CustomModal';

const size = 25;

const LicenseRequestsTab = ({ missionPartner, loading }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const missionPartnerId = missionPartner?.id;

  const [licenseInfo, setLicenseInfo] = useState({
    missionPartnerId,
    vendorName: '',
    branch: '',
    search: searchText,
    sortField: sorting.length ? sorting[0].id : undefined,
    sortDirection: sorting.length
      ? sorting[0].desc
        ? 'desc'
        : 'asc'
      : undefined,
    pageNumber: page,
    pageSize: size
  });

  const isSmallScreen = useMedia(`(max-width: 1060px)`, false);
  const { notify } = useNotificationCenter();
  const licenseRequestModal = useModal();
  const { approveLicenseRequest, approveLicenseRequestLoading } =
    useApproveLicenseRequest();
  const { declineLicenseRequest, declineLicenseRequestLoading } =
    useDeclineLicenseRequest();
  const {
    exportMissionPartnerLicenseRequests,
    exportMissionPartnerLicenseRequestsLoading
  } = useExportMissionPartnerLicenseRequests();
  const {
    vendorsForOpenLicenseRequests,
    vendorsForOpenLicenseRequestsLoading
  } = useGetVendorsForOpenLicenseRequests(missionPartnerId);

  const {
    branchesForOpenLicenseRequests,
    branchesForOpenLicenseRequestsLoading
  } = useGetBranchesForOpenLicenseRequest(missionPartnerId);

  const { requests, requestsLoading, total, refetchRequests } =
    useFindOpenLicenseRequestsFilter(licenseInfo);

  useSortHandler(sorting, page, searchText, setLicenseInfo);

  const approveRequest = () => {
    approveLicenseRequest(selectedRequest.id)
      .then(() => {
        setSelectedRequest(null);
        notify({
          palette: 'success',
          heading: 'License Approved',
          description: 'The license request has been approved'
        });
        refetchRequests();
      })
      .catch(error => setErrorMessage(error.message));
  };

  const declineRequest = () => {
    declineLicenseRequest(selectedRequest.id)
      .then(() => {
        setSelectedRequest(null);
        notify({
          palette: 'success',
          heading: 'License Denied',
          description: 'The license request has been denied'
        });
        refetchRequests();
      })
      .catch(error => setErrorMessage(error.message));
  };

  const applyFilters = (values: {
    vendorName?: string;
    organizationName?: string;
  }) => {
    setLicenseInfo(state => ({
      ...state,
      vendorName: values?.vendorName || '',
      branch: values?.organizationName || ''
    }));
  };

  const handleDownloadLicenseRequests = async () => {
    exportMissionPartnerLicenseRequests(
      missionPartnerId,
      missionPartner?.name,
      licenseInfo?.vendorName || undefined,
      licenseInfo?.branch || undefined
    )
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description:
            'The export has been started. You will receive an email when it is ready.'
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting license requests.'
        })
      );
  };

  const columns = [
    {
      accessorKey: 'userFirstName',
      header: 'Name',
      cell: info => {
        return `${info.row.original.userFirstName} ${info.row.original.userLastName}`;
      }
    },
    {
      accessorKey: 'userOrganization',
      header: 'Organization',
      enableSorting: false,
      cell: info => {
        return info.row.original.userOrganization;
      }
    },
    {
      accessorKey: 'vendorName',
      header: 'Vendor',
      enableSorting: false,
      cell: info => {
        return info.row.original.vendorName;
      }
    },
    {
      accessorKey: 'requestedAt',
      header: 'Date',
      cell: info => {
        return abbreviatedDayDate(info.getValue());
      }
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        return (
          <Button
            usage="ghost"
            onClick={() => {
              setSelectedRequest(info.row.original);
              licenseRequestModal.show();
            }}
          >
            View Request
          </Button>
        );
      },
      enableSorting: false
    }
  ];

  return (
    <>
      <CustomModal
        customModal={licenseRequestModal}
        title="Requests"
        onClose={() => {
          if (!approveLicenseRequestLoading && !declineLicenseRequestLoading) {
            setSelectedRequest(null);
          }
          setErrorMessage(null);
          licenseRequestModal.close();
        }}
      >
        {licenseRequestModal.isOpen && (
          <LicenseRequestModalContent
            request={selectedRequest}
            onApprove={() => {
              approveRequest();
              licenseRequestModal.close();
            }}
            onDecline={() => {
              declineRequest();
              licenseRequestModal.close();
            }}
            onApproveLoading={approveLicenseRequestLoading}
            onDeclineLoading={declineLicenseRequestLoading}
            error={errorMessage}
            onClose={() => {
              if (
                !approveLicenseRequestLoading &&
                !declineLicenseRequestLoading
              ) {
                setSelectedRequest(null);
              }
              setErrorMessage(null);
              licenseRequestModal.close();
            }}
          />
        )}
      </CustomModal>
      {requests && (
        <ServerSideTable
          columns={columns}
          data={requests}
          noDataMessage={
            <NoDataMessage message="When a learner has requested a license to a vendor, their request will appear here." />
          }
          searchPlaceholder="Search by name, organization or vendor"
          loading={
            requestsLoading ||
            exportMissionPartnerLicenseRequestsLoading ||
            loading
          }
          page={page}
          setPage={setPage}
          sorting={sorting}
          setSorting={setSorting}
          toolbarType="search"
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          total={total}
          size={size}
          filterProps={{
            openFilters,
            setOpenFilters
          }}
          downloadProps={{
            onDownload: handleDownloadLicenseRequests
          }}
          filterComponent={
            <LicenseFilter
              applyFilters={applyFilters}
              openFilters={openFilters}
              isSmallScreen={isSmallScreen}
              branchesForOpenLicenseRequestsLoading={
                branchesForOpenLicenseRequestsLoading
              }
              branchesForOpenLicenseRequests={branchesForOpenLicenseRequests}
              vendorsForOpenLicenseRequestsLoading={
                vendorsForOpenLicenseRequestsLoading
              }
              vendorsForOpenLicenseRequests={vendorsForOpenLicenseRequests}
              setLicenseInfo={setLicenseInfo}
            />
          }
        />
      )}
    </>
  );
};

export default LicenseRequestsTab;
