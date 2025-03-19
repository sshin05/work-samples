import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Add } from '@carbon/icons-react';
import { useFindTranscriptCoursesByUserId } from '@/api/course';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const columns = [
  {
    header: 'Training Item',
    accessorKey: 'courseTitle',
    cell: info => {
      return <span>{info.getValue()}</span>;
    }
  },
  {
    header: 'Type',
    cell: ({ row }) => {
      const { courseType } = row.original;
      if (courseType) return courseType;
      return 'Course';
    },
    enableSorting: false
  },
  {
    header: 'Vendor',
    accessorKey: 'vendorName'
  },
  {
    header: 'Status',
    accessorKey: 'status'
  },
  {
    header: 'Date Started',
    accessorKey: 'startedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  },
  {
    header: 'Date Completed',
    accessorKey: 'markedCompletedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  }
];

interface IndividualTrainingPlanTabProps {
  user: { id: string };
  missionPartnerId: string;
  pageLoading: boolean;
}

export const IndividualTrainingPlanTab = ({
  user,
  missionPartnerId,
  pageLoading
}: IndividualTrainingPlanTabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    transcriptCourses,
    transcriptCoursesLoading,
    refetchTranscriptCourses
  } = useFindTranscriptCoursesByUserId(user.id);

  useEffect(() => {
    refetchTranscriptCourses();
  }, [refetchTranscriptCourses]);

  const handleAddCourses = () => {
    router.push(
      getRouteUrl(routeGenerators.CurriculumCatalog({ missionPartnerId }), {
        targetId: user.id,
        targetType: 'user',
        missionPartnerId,
        allowedContent: ['course'],
        callbackPath: pathname,
        excludeCustomContent: true
      })
    );
  };

  return (
    <LocalTable
      columns={columns}
      data={transcriptCourses}
      loading={transcriptCoursesLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage
          message="Once you have assigned training to this learner, it will appear here."
          buttonText="Assign Individual Training"
          cta={handleAddCourses}
        />
      }
      searchPlaceholder="Search by training item, vendor or status"
      buttonProps={{
        buttonIcon: <Add />,
        buttonContent: 'Assign Training',
        onButtonClick: handleAddCourses
      }}
    />
  );
};
