import React from 'react';
import { useFindLearnerLicenses } from '@/api/license';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';

interface User {
  id: string;
}

interface MissionPartnersTabProps {
  user: User;
  pageLoading: boolean;
  missionPartnerId: string;
}

const columns = [
  {
    header: 'Vendor',
    accessorKey: 'vendorName'
  },
  {
    header: 'License Holder',
    accessorKey: 'missionPartnerName'
  },
  {
    header: 'Date Assigned',
    accessorKey: 'assignedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  }
];

export const LicensesTab = ({
  user,
  pageLoading,
  missionPartnerId
}: MissionPartnersTabProps) => {
  const { learnerLicenses, learnerLicensesLoading } = useFindLearnerLicenses(
    user.id,
    missionPartnerId
  );

  return (
    <LocalTable
      columns={columns}
      data={learnerLicenses}
      loading={learnerLicensesLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage message="Once a license is assigned to a learner, it will appear here" />
      }
      searchPlaceholder="Search by vendor or license holder"
    />
  );
};
