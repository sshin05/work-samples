import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Add } from '@cerberus/icons';
import { useGetLearnerTrainingPlans } from '@/api/training-plan';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
const columns = [
  {
    header: 'Plan',
    accessorKey: 'title'
  },
  {
    header: 'Type',
    accessorKey: 'planType'
  },
  {
    header: 'Date Assigned',
    accessorKey: 'assignedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
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
    accessorKey: 'completedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  },
  {
    header: 'Date Stopped',
    accessorKey: 'stoppedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  }
];

export const TrainingPlansTab = ({ user, missionPartnerId, pageLoading }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { learnerTrainingPlans, learnerTrainingPlansLoading } =
    useGetLearnerTrainingPlans(user.id);

  const handleAddTrainingPlan = () => {
    router.push(
      getRouteUrl(routeGenerators.CurriculumCatalog({ missionPartnerId }), {
        targetId: user.id,
        targetType: 'user',
        missionPartnerId,
        allowedContent: ['plan'],
        callbackPath: pathname,
        excludeCustomContent: true
      })
    );
  };

  return (
    <LocalTable
      data={learnerTrainingPlans ?? []}
      columns={columns}
      loading={learnerTrainingPlansLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage
          message="Once you have assigned a training plan to a learner, it will appear here"
          buttonText="Assign Training Plan"
          cta={handleAddTrainingPlan}
        />
      }
      searchPlaceholder="Search by plan name, type or status"
      buttonProps={{
        buttonIcon: <Add />,
        buttonContent: 'Assign Plans',
        onButtonClick: handleAddTrainingPlan
      }}
    />
  );
};
