import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SortingState } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';
import { useAggregateTranscriptCourses } from '@/api/course';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { CourseMetricsTableFilters } from './CourseMetricsTableFilters';
import { useHandleDownloadClick } from './useHandleDownloadClick';
import { useCourseColumns } from './courseMetricsColumns';
import type {
  CourseMetricsQueryFilters,
  CourseMetricsTableProps,
  FilterValue
} from './courseMetricsTable.types';

const PAGE_SIZE = 25;
const TEMP_STATIC_DATA_REMOVE_ME = [];

const CourseMetricsTable = ({
  missionPartnerId,
  missionPartnerName
}: CourseMetricsTableProps) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchText, setSearchText] = useState<string>();
  const [openFilters, setOpenFilters] = useState(false);
  const [vendorId, setVendorId] = useState<string | undefined>(undefined);
  const courseColumns = useCourseColumns(missionPartnerId);
  const [exportState, setExportState] = useState<{
    vendorName: string;
    status: string;
  }>({ vendorName: undefined, status: undefined });

  const [courseMetricsQueryFilters, setCourseMetricsQueryFilters] =
    useState<CourseMetricsQueryFilters>({
      missionPartnerId,
      vendorId,
      search: searchText,
      sortField: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : undefined,
      pageNumber: 1,
      pageSize: PAGE_SIZE
    });

  const {
    transcriptCoursesCount,
    transcriptCoursesData,
    transcriptCoursesLoading
  } = useAggregateTranscriptCourses(courseMetricsQueryFilters);

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm();

  useEffect(() => {
    setCourseMetricsQueryFilters(state => ({
      ...state,
      vendorId,
      search: searchText,
      sortField: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : undefined,
      pageNumber: 1
    }));
    setPage(1);
  }, [vendorId, searchText, sorting]);

  useEffect(() => {
    setCourseMetricsQueryFilters(state => ({
      ...state,
      pageNumber: page
    }));
  }, [page]);

  const handleFilterFormSubmit = useCallback((value: FilterValue) => {
    setVendorId(value.courseVendor === 'All' ? undefined : value.courseVendor);

    setExportState({
      vendorName: value.courseVendor === 'All' ? undefined : value.courseVendor,
      status: value.courseStatus === 'All' ? undefined : value.courseStatus
    });
  }, []);

  // this is the FILTER FORM RESET handler
  const handleFilterResetClick = useCallback(() => {
    setPage(1);
    setVendorId(undefined);
    reset({
      courseVendor: 'All'
    });
  }, [reset]);

  const handleDownload = useHandleDownloadClick({
    exportState,
    missionPartnerId,
    missionPartnerName
  });

  return (
    <div className={css({ w: 'full' })}>
      <ServerSideTable
        columns={courseColumns}
        data={transcriptCoursesData || TEMP_STATIC_DATA_REMOVE_ME}
        total={transcriptCoursesCount}
        loading={transcriptCoursesLoading}
        noDataMessage={
          <NoDataMessage message="Once a course has been added, it will appear here." />
        }
        size={PAGE_SIZE}
        page={page}
        setPage={setPage}
        sorting={sorting}
        setSorting={setSorting}
        hasToolbar
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        searchPlaceholder="Search by course name"
        filterProps={{
          openFilters,
          setOpenFilters
        }}
        downloadProps={{
          onDownload: async () => handleDownload()
        }}
        filterComponent={
          openFilters && (
            <CourseMetricsTableFilters
              handleFilterFormSubmit={handleFilterFormSubmit}
              missionPartnerId={missionPartnerId}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              reset={handleFilterResetClick}
              control={control}
            />
          )
        }
      ></ServerSideTable>
    </div>
  );
};

export default CourseMetricsTable;
