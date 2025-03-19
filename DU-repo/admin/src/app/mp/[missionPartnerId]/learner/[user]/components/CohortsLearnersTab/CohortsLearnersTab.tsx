import React from 'react';
import { useFindLearnerCohortMemberships } from '@/api/user';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';

interface User {
  id: string;
}

interface CohortsLearnerTabProps {
  user: User;
  missionPartnerId: string;
  pageLoading: boolean;
}

const columns = [
  { header: 'Name', accessorKey: 'group.name' },
  { header: 'Users', accessorKey: 'count' },
  { header: 'Mission Partner', accessorKey: 'missionPartner.name' }
];

export const CohortsLearnersTab = ({
  user,
  missionPartnerId,
  pageLoading
}: CohortsLearnerTabProps) => {
  const { learnerCohortMemberships, learnerCohortsLoading } =
    useFindLearnerCohortMemberships(user.id, missionPartnerId);

  return (
    <LocalTable
      columns={columns}
      data={learnerCohortMemberships}
      loading={learnerCohortsLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage message="Once a learner is assigned to a Cohort, it will appear here" />
      }
      searchPlaceholder="Search by name or mission partner"
    />
  );
};
