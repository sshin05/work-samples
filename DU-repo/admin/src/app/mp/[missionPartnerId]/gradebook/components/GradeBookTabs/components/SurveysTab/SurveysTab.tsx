import { useState } from 'react';
import { useFindSurveysBySearch } from '@/api/mission-partner';
import type { SurveysTabProps } from './SurveysTab.types';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import type { SortingState } from '@tanstack/react-table';
import { useSurveysTabColumns } from './useSurveysTabColumns';

const PAGE_SIZE = 25;

const SurveysTab = ({ missionPartnerMinDetails }: SurveysTabProps) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useSurveysTabColumns(missionPartnerMinDetails);

  const searchParameters = {
    missionPartnerId: missionPartnerMinDetails?.id,
    search: searchText,
    sortKey: sorting.length ? sorting[0].id : undefined,
    sortDirection: sorting.length
      ? sorting[0].desc
        ? 'desc'
        : 'asc'
      : undefined,
    pageNumber: page,
    pageSize: PAGE_SIZE
  };

  const { surveys, surveysLoading, total } =
    useFindSurveysBySearch(searchParameters);

  const surveyData = (surveys || []).map(survey => {
    return {
      ...survey,
      downloadResults: 'Download Results'
    };
  });

  return (
    <ServerSideTable
      data={surveyData}
      columns={columns}
      loading={surveysLoading}
      noDataMessage={
        <NoDataMessage message="When a learner has completed a survey, the results will be reported here." />
      }
      page={page}
      setPage={setPage}
      sorting={sorting}
      setSorting={setSorting}
      searchTerm={searchText}
      setSearchTerm={setSearchText}
      searchPlaceholder="Search by name or type"
      total={total}
      size={PAGE_SIZE}
    />
  );
};

export default SurveysTab;
