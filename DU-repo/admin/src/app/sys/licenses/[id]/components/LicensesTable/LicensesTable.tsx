import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { uniq } from 'lodash';
import {
  useExportMissionPartnerLicensesForVendor,
  useGetLicensesByVendorId
} from '@/api/license';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';
import { abbreviatedDateTime } from '@/utils/date/abbreviatedDateTime';
import {
  Button,
  Flex,
  DuiSelect,
  DuiSelectOption,
  colors,
  spacing,
  useToast
} from '@digital-u/digital-ui';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import type { SortingState } from '@tanstack/react-table';
import type { LicensesTablePropTypes } from './LicensesTablePropTypes';

const PAGE_SIZE = 10;

export const LicensesTable = ({ vendor }: LicensesTablePropTypes) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string | undefined>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [, setToast] = useToast();
  const { licensesLoading, licensesError, licenses } = useGetLicensesByVendorId(
    {
      vendorId: vendor.id,
      missionPartnerName:
        filters?.licenseProvider === 'All'
          ? undefined
          : filters?.licenseProvider,
      branch: filters?.branch === 'All' ? undefined : filters?.branch,
      search: searchText,
      sortBy: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : 'asc',
      pageNumber: page,
      pageSize: PAGE_SIZE
    }
  );
  const { missionPartnersMinDetails } = useFindAllMissionPartnersMinDetails();

  // create an array of distinct list of branches and organizations€
  // TODO: Let logan know that once migrated, only AF users will show up
  // We need to know what to show here for the equivalent organization for all other users
  const branchAndOrgOptions = uniq(
    licenses?.records?.map(
      license => license.user.branch || license.user.metadata?.command
    ) || []
  );

  // do the same for mission partners
  const missionPartnersExported = licenses?.records
    ?.map(license => ({
      id: license.missionPartnerId,
      name: license.missionPartnerName
    }))
    .filter(
      (missionPartner, index, self) =>
        index ===
        self.findIndex(
          value =>
            value.id === missionPartner.id && value.name === missionPartner.name
        )
    );

  const handlePageChange = page => {
    setPage(page);
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
    reset
  } = useForm();

  const {
    exportMissionPartnerLicensesForVendor,
    exportMissionPartnerLicensesForVendorLoading
  } = useExportMissionPartnerLicensesForVendor();

  const handleDownloadLicenses = async () => {
    try {
      missionPartnersExported?.map(
        async missionPartner =>
          await exportMissionPartnerLicensesForVendor(
            missionPartner?.id,
            missionPartner?.name,
            vendor.id,
            vendor.name
          )
      );
    } catch (error) {
      setToast({
        title: 'Error',
        subtitle: `There was an error exporting licenses. ${error}`,
        kind: 'error'
      });
    } finally {
      setToast({
        kind: 'success',
        title: 'Success',
        subtitle: `The export has been started. You will receive an email when it is ready.`
      });
    }
  };

  if (licensesError) {
    console.log('An error occurred loading the licenses.');
    console.log(licensesError);
    return <div>An error occurred loading the licenses.</div>;
  }

  const columns = [
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ getValue, row }) => {
        return (
          <span
            onClick={() =>
              router.push(
                getRouteUrl(
                  routeGenerators.MissionPartnerLearner({
                    missionPartnerId: row.original.missionPartnerId,
                    userId: row.original.id
                  })
                )
              )
            }
            style={{ color: '#0062fe', cursor: 'pointer' }}
          >
            {getValue()}
          </span>
        );
      }
    },
    {
      header: 'Branch / Org',
      accessorKey: 'branch',
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue()}</span>
    },
    {
      header: 'License provider',
      accessorKey: 'missionPartnerName',
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue()}</span>
    },
    {
      header: 'Assigned at',
      accessorKey: 'assignedAt',
      enableSorting: false,
      cell: ({ getValue }) => <span>{getValue()}</span>
    },
    {
      header: 'Last used at',
      accessorKey: 'lastUsedAt',
      cell: ({ getValue }) => <span>{getValue()}</span>
    }
  ];

  const data = licenses?.records?.map(license => ({
    id: license.userId,
    email: license.userEmail,
    branch: license.user.branch, // TODO: Verify that we can now JUST use branch (why was organization here?)
    missionPartnerId: license.missionPartnerId,
    missionPartnerName: license.missionPartnerName,
    assignedAt: license.assignedAt
      ? abbreviatedDateTime(license.assignedAt)
      : undefined,
    lastUsedAt: license.lastUsedAt
      ? abbreviatedDateTime(license.lastUsedAt)
      : undefined
  }));

  return (
    <ServerSideTable
      columns={columns}
      data={data}
      page={page}
      setPage={handlePageChange}
      sorting={sorting}
      setSorting={setSorting}
      searchTerm={searchText}
      setSearchTerm={setSearchText}
      hasToolbar
      toolbarType="search"
      loading={licensesLoading || exportMissionPartnerLicensesForVendorLoading}
      total={licenses?.total || 0}
      size={PAGE_SIZE}
      downloadProps={{
        onDownload: handleDownloadLicenses
      }}
      filterProps={{
        openFilters,
        setOpenFilters
      }}
    >
      <form onSubmit={handleSubmit(setFilters)}>
        <Flex
          direction="column"
          justifyContent="flex-start"
          gap={spacing[4]}
          style={{
            display: openFilters ? 'flex' : 'none',
            background: 'white',
            borderTop: `1px solid ${colors.gray[300]}`,
            padding: 20
          }}
        >
          <Flex direction="row">
            <div style={{ width: '25%', minWidth: 300, gap: '1rem' }}>
              <DuiSelect
                id="branch-filter"
                arial-label="Select Branch or Organization"
                labelText="Select Branch or Organization"
                register={register}
                name="branch"
                disabled={isSubmitting}
                defaultValue={null}
              >
                <DuiSelectOption value={null}>All</DuiSelectOption>
                {branchAndOrgOptions?.map(
                  (branchAndOrg, index) =>
                    branchAndOrg && (
                      <DuiSelectOption
                        key={`${index}_${branchAndOrg}`}
                        value={branchAndOrg as string}
                      >
                        {branchAndOrg as string}
                      </DuiSelectOption>
                    )
                )}
              </DuiSelect>
              <br />
              <DuiSelect
                id="license-provider-filter"
                arial-label="Select License Provider"
                labelText="Select License Provider"
                register={register}
                name="licenseProvider"
                disabled={isSubmitting}
                defaultValue={undefined}
              >
                <DuiSelectOption value={undefined}>All</DuiSelectOption>
                {missionPartnersMinDetails?.map(missionPartner => (
                  <DuiSelectOption
                    key={missionPartner.id}
                    value={missionPartner.name}
                  >
                    {missionPartner.name}
                  </DuiSelectOption>
                ))}
              </DuiSelect>
            </div>
          </Flex>
          <Flex direction="row" gap={spacing[4]}>
            <Button
              type="submit"
              kind="pill-primary"
              disabled={isSubmitting}
              loading={licensesLoading}
            >
              Submit
            </Button>
            <Button type="button" kind="pill-secondary" onClick={() => reset()}>
              Reset
            </Button>
          </Flex>
        </Flex>
      </form>
    </ServerSideTable>
  );
};
