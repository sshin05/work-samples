import React, { useCallback } from 'react';
import {
  useExportIndividualLearnerActivity,
  useFindMissionPartnerMembersByUserId
} from '@/api/mission-partner';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { Button, useNotificationCenter } from '@cerberus/react';

interface User {
  id: string;
}

interface MissionPartnersTabProps {
  user: User;
  pageLoading: boolean;
}

export const MissionPartnersTab = ({
  user,
  pageLoading
}: MissionPartnersTabProps) => {
  const { userMissonPartners, userMissonPartnersLoading } =
    useFindMissionPartnerMembersByUserId(user.id);

  const { exportIndividualLearnerActivity } =
    useExportIndividualLearnerActivity();

  const { notify } = useNotificationCenter();

  const handleDownload = useCallback(
    async info => {
      return exportIndividualLearnerActivity({
        variables: {
          missionPartnerId: info.row.original.missionPartnerId,
          userId: user.id
        }
      })
        .then(() =>
          notify({
            palette: 'success',
            heading: 'Success',
            description:
              'You will receive a notification when your download is ready to view in your Report Center.'
          })
        )
        .catch(() =>
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'There was a problem with the download'
          })
        );
    },
    [exportIndividualLearnerActivity, notify, user]
  );

  const columns = [
    {
      header: 'Mission Partner',
      accessorKey: 'missionPartnerName'
    },
    {
      header: 'Date Added to Mission Partner',
      accessorKey: 'createdAt',
      cell: info => {
        const value = info.getValue();
        return <p>{value ? abbreviatedDayDate(value) : ''}</p>;
      }
    },
    {
      header: '',
      accessorKey: 'download',
      cell: info => {
        return (
          <Button
            style={{
              textDecoration: 'underline'
            }}
            palette="secondaryAction"
            usage="ghost"
            size="sm"
            onClick={() => handleDownload(info)}
          >
            Download report
          </Button>
        );
      },
      enableSorting: false
    }
  ];

  return (
    <LocalTable
      columns={columns}
      data={userMissonPartners}
      loading={userMissonPartnersLoading}
      pageLoading={pageLoading}
      noDataMessage={
        <NoDataMessage message="Once a learner is assigned to a Mission Partner, it will appear here" />
      }
      searchPlaceholder="Search by mission partner"
    />
  );
};
