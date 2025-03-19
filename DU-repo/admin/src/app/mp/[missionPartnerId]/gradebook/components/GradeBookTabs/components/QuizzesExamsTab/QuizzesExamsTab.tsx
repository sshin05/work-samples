import { useState } from 'react';
import { useFindQuizAndExamsBySearch } from '@/api/mission-partner';
import type { QuizzesExamsTabProps } from './QuizzesExamsTab.types';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import type { SortingState } from '@tanstack/react-table';
import { useQuizTabColumns } from './useQuizTabColumns';

const PAGE_SIZE = 25;

const QuizzesExamsTab = ({
  missionPartnerMinDetails,
  isLoading
}: QuizzesExamsTabProps) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useQuizTabColumns(missionPartnerMinDetails);

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

  const { quizExams, total, quizExamsLoading } =
    useFindQuizAndExamsBySearch(searchParameters);

  const quizExamsData = quizExams.map(quizExam => {
    return {
      ...quizExam,
      downloadResults: 'Download Results'
    };
  });

  return (
    <ServerSideTable
      columns={columns}
      data={quizExamsData}
      noDataMessage={
        <NoDataMessage message="When a learner has completed a quiz/exam, their grade will be reported here." />
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
      loading={quizExamsLoading || isLoading}
    />
  );
};

export default QuizzesExamsTab;
