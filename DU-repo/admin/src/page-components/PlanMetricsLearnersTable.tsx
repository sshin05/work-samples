import { useState, useEffect } from 'react';
import { useFindTranscriptTrainingPlans } from '@/api/training-plan/useFindTranscriptTrainingPlans';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import type { SortingState } from '@tanstack/react-table';
import { usePlanMetricsLearnersColumns } from '@/app/mp/[missionPartnerId]/plan-metrics/learners/components/usePlanMetricsLearnersColumns';

const PAGE_SIZE = 25;

export const PlanMetricsLearnersTable = ({
  planType,
  planSourceId,
  missionPartnerId,
  status
}) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [planState, setPlanState] = useState({
    missionPartnerId,
    planType,
    planSourceId,
    status: status === 'Total Enrolled' ? undefined : status,
    search: searchTerm,
    sortField: sorting.length ? sorting[0].id : undefined,
    sortDirection: sorting.length
      ? sorting[0].desc
        ? 'desc'
        : 'asc'
      : undefined,
    pageSize: PAGE_SIZE,
    pageNumber: page
  });

  const {
    transcriptTrainingPlans,
    transcriptTrainingPlansLoading,
    transcriptTrainingPlansTotal
  } = useFindTranscriptTrainingPlans(planState);

  const columns = usePlanMetricsLearnersColumns(status);

  useEffect(() => {
    setPlanState(state => ({
      ...state,
      pageNumber: page,
      sortField: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : undefined
    }));
  }, [sorting, page]);

  const updateSearch = search => {
    setPlanState(state => ({
      ...state,
      pageNumber: 1,
      search
    }));
    setSearchTerm(search);
  };

  return (
    <ServerSideTable
      columns={columns}
      data={transcriptTrainingPlans || []}
      sorting={sorting}
      setSorting={setSorting}
      size={PAGE_SIZE}
      page={page}
      setPage={setPage}
      searchTerm={searchTerm}
      setSearchTerm={updateSearch}
      loading={transcriptTrainingPlansLoading}
      noDataMessage={
        <NoDataMessage message="Once a training plan has been assigned, it will appear here" />
      }
      total={transcriptTrainingPlansTotal}
      // Toolbar props
      hasToolbar
      searchPlaceholder="Search by learner name"
    />
  );
};
