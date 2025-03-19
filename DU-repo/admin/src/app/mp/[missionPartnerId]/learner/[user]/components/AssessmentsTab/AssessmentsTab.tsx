import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Add } from '@cerberus/icons';
import { useFindLearnerAssessments } from '@/api/assessment';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { GetUserQuery } from '@/api/codegen/graphql';

const columns = [
  { header: 'Title', accessorKey: 'assessmentTitle' },
  { header: 'Vendor', accessorKey: 'vendorName' },
  {
    header: 'Start Date',
    accessorKey: 'startedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  },
  {
    header: 'Completion Date',
    accessorKey: 'markedCompletedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  }
];

interface AssessmentsTabProps {
  user: GetUserQuery['getUser'];
  missionPartnerId: string;
  pageLoading: boolean;
}

export const AssessmentsTab = ({
  user,
  missionPartnerId,
  pageLoading
}: AssessmentsTabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    learnerAssessments,
    learnerAssessmentsLoading,
    refetchLearnerAssessments
  } = useFindLearnerAssessments(user.id, missionPartnerId);

  useEffect(() => {
    if (user.id && missionPartnerId) {
      refetchLearnerAssessments(user.id, missionPartnerId);
    }
  }, [user.id, missionPartnerId, refetchLearnerAssessments]);

  const handleAddAssessment = () => {
    router.push(
      getRouteUrl(routeGenerators.CurriculumCatalog({ missionPartnerId }), {
        targetId: user.id,
        targetType: 'user',
        missionPartnerId,
        allowedContent: ['assessment'],
        callbackPath: pathname
      })
    );
  };
  return (
    <LocalTable
      data={learnerAssessments}
      columns={columns}
      loading={learnerAssessmentsLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage
          message="Once you have assigned an assessment to a learner, it will appear here"
          buttonText="Add Assessment"
          cta={handleAddAssessment}
        />
      }
      searchPlaceholder="Search by title or vendor"
      buttonProps={{
        buttonIcon: <Add />,
        buttonContent: 'Assessment',
        onButtonClick: handleAddAssessment
      }}
    />
  );
};
