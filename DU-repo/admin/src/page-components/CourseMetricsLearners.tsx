import { useState, useEffect } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';
import { useFindTranscriptCourses } from '@/api/course';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { useCourseLearnersColumns } from '@/app/mp/[missionPartnerId]/course-metrics/learners/useCourseLearnersColumns';
import { useRouter } from 'next/navigation';
import { vstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { PageHeader } from '@/components_new/typography/PageHeader';
import ContentArea from '@/components_new/layout/ContentArea';
import { ArrowLeft } from '@cerberus/icons';

const PAGE_SIZE = 25;

export const CourseMetricsLearners = ({
  missionPartnerId,
  planType,
  planSourceId,
  courseId,
  vendor,
  status
}) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [courseState, setCourseState] = useState({
    missionPartnerId,
    planType,
    planSourceId,
    status: status === 'Total Enrolled' ? undefined : status,
    courseId: vendor ? `${vendor}#${courseId}` : courseId,
    pageSize: PAGE_SIZE,
    pageNumber: 1,
    userSearch: undefined
  });

  const {
    transcriptCoursesData,
    transcriptCoursesLoading,
    transcriptCoursesError,
    transcriptCoursesCount
  } = useFindTranscriptCourses(courseState);

  useEffect(() => {
    setCourseState(state => ({
      ...state,
      pageNumber: page,
      sortField: sorting[0]?.id,
      sortDirection: sorting[0]?.desc ? 'desc' : 'asc'
    }));
  }, [sorting, page]);

  const updateSearch = search => {
    setCourseState(state => ({
      ...state,
      userSearch: search
    }));
  };

  const columns = useCourseLearnersColumns(status);

  const courseTitle =
    transcriptCoursesData && transcriptCoursesData[0]?.course?.courseTitle;

  if (transcriptCoursesError) {
    return (
      <p>There was an error loading course metrics. Please try again later.</p>
    );
  }

  return (
    <div className={vstack({ gap: 10, alignItems: 'start' })}>
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <Button palette="action" usage="ghost" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
            Back
          </span>
        </Button>
        <PageHeader>
          {transcriptCoursesLoading ? (
            <div aria-busy="true" />
          ) : (
            `${courseTitle} | ${status}`
          )}
        </PageHeader>
      </div>
      <ContentArea>
        <ServerSideTable
          columns={columns}
          data={transcriptCoursesData || []}
          loading={transcriptCoursesLoading}
          noDataMessage={
            <NoDataMessage
              message={`Once a learner has been added to the ${courseTitle} course, they will appear here.`}
            />
          }
          page={page}
          setPage={setPage}
          setSorting={setSorting}
          sorting={sorting}
          size={PAGE_SIZE}
          total={transcriptCoursesCount}
          hasToolbar
          searchPlaceholder="Search by learner"
          searchTerm={courseState.userSearch}
          setSearchTerm={updateSearch}
          toolbarType="search"
        />
      </ContentArea>
    </div>
  );
};
