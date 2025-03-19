'use client';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SortingState } from '@tanstack/react-table';
import { useNotificationCenter } from '@cerberus/react';
import {
  useExportTrainingPlanTranscriptsForMissionPartner,
  useAggregateTranscriptTrainingPlans
} from '@/api/mission-partner';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import type {
  FilterValue,
  PlanMetricsTableProps
} from './PlanMetricsTable.types';
import { PlanMetricsFilter } from '../PlanMetricsFilter/PlanMetricsFilter';
import { usePlanMetricsColumns } from './usePlanMetricsColumns';

const STATIC_ARRAY = [];
const PAGE_SIZE = 25;

const PlanMetricsTable = ({
  missionPartnerId,
  missionPartnerName
}: PlanMetricsTableProps) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [planType, setPlanType] = useState<string>();

  const columns = usePlanMetricsColumns(missionPartnerId, missionPartnerName);
  const { notify } = useNotificationCenter();

  const planState = useMemo(
    () => ({
      missionPartnerId,
      planType,
      search: searchTerm || '',
      sortField: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : undefined,
      pageNumber: page,
      pageSize: PAGE_SIZE
    }),
    [missionPartnerId, planType, searchTerm, sorting, page]
  );

  const {
    transcriptTrainingPlans,
    transcriptTrainingPlansLoading,
    transcriptTrainingPlansError,
    transcriptTrainingPlansTotal
  } = useAggregateTranscriptTrainingPlans(planState);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset
  } = useForm();

  const updateSearch = (search: string) => {
    setPage(1);
    setSearchTerm(search);
  };

  const applyFilters = (value: FilterValue) => {
    setPage(1);
    setPlanType(value.planType === 'All' ? undefined : value.planType);
  };

  // Filter form reset handler
  const handleFilterResetClick = useCallback(() => {
    setPage(1);
    setPlanType(undefined);
    reset();
  }, [setPlanType, reset]);

  const { exportTrainingPlanTranscriptsForMissionPartner } =
    useExportTrainingPlanTranscriptsForMissionPartner();

  const handleDownload = () =>
    exportTrainingPlanTranscriptsForMissionPartner({
      variables: {
        missionPartnerId,
        missionPartnerName
      }
    })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting transcripts.'
        })
      );

  if (transcriptTrainingPlansError) {
    return (
      <p>
        There was an error loading the plan metrics. Please try again later.
      </p>
    );
  }

  return (
    <ServerSideTable
      columns={columns}
      data={transcriptTrainingPlans || STATIC_ARRAY}
      loading={transcriptTrainingPlansLoading}
      total={transcriptTrainingPlansTotal}
      size={PAGE_SIZE}
      page={page}
      setPage={setPage}
      sorting={sorting}
      setSorting={setSorting}
      hasFiltersApplied={false}
      hasToolbar
      noDataMessage={
        <NoDataMessage message="Once a training plan has been created, it will appear here." />
      }
      searchTerm={searchTerm}
      setSearchTerm={updateSearch}
      searchPlaceholder="Search by plan name"
      downloadProps={{
        onDownload: () => handleDownload()
      }}
      filterProps={{
        openFilters,
        setOpenFilters
      }}
      filterComponent={
        <PlanMetricsFilter
          openFilters={openFilters}
          handleSubmit={handleSubmit}
          applyFilters={applyFilters}
          control={control}
          isSubmitting={isSubmitting}
          reset={handleFilterResetClick}
        />
      }
    />
  );
};

export default PlanMetricsTable;
