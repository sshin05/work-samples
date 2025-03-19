import { useMemo, useState } from 'react';
import { useCurriculumTabColumns } from './useCurriculumTabColumns';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';

const PAGE_SIZE = 25;

export const CurriculumTab = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const onViewClick = useMemo(
    () => (_id: string) => {
      // console.log(`View Curriculum clicked: ${id}`);
    },
    []
  );

  const columns = useCurriculumTabColumns(onViewClick);

  const { curriculumDataLoading, mockCurriculumData, total } =
    useMockCurriculumData();

  return (
    <>
      <ServerSideTable
        columns={columns}
        data={mockCurriculumData}
        loading={curriculumDataLoading}
        page={page}
        setPage={setPage}
        sorting={sorting}
        setSorting={setSorting}
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        searchPlaceholder="Search"
        total={total}
        size={PAGE_SIZE}
      />
    </>
  );
};

const useMockCurriculumData = () => {
  return {
    curriculumDataLoading: false,
    mockCurriculumData: [
      {
        id: 0,
        title: 'Course title',
        provider: 'Coursera',
        type: 'Course',
        description:
          'Skill in conducting vulnerability scans and recognizing vulnerabilities in security systems.'
      },
      {
        id: 1,
        title: 'Assessment title',
        provider: 'Udemy',
        type: 'Assessment',
        description:
          'Skill in conducting vulnerability scans and recognizing vulnerabilities in security systems.'
      }
    ],
    total: 2
  };
};
