import { css } from '@cerberus/styled-system/css';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

export const buildRequestsColumns = (callback, router, missionPartnerName) => [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();
      const crumbNames = JSON.stringify(['MissionPartners', 'MissionPartner']);
      const crumbParameters = JSON.stringify({
        missionPartnerId: original.missionPartnerId,
        missionPartnerName
      });

      if (!value || value === 0 || value === '0') {
        return <div>{value}</div>;
      }

      return (
        <div
          className={css({ cursor: 'pointer' })}
          onClick={() =>
            router.push(
              getRouteUrl(
                routeGenerators.MissionPartnerLearner({
                  missionPartnerId: original.missionPartnerId,
                  userId: original.userId
                }),
                {
                  missionPartnerId: original.missionPartnerId,
                  crumbNames,
                  crumbParameters,
                  userId: original.userId
                }
              )
            )
          }
        >
          <div className={css({ color: 'info.text.100' })}>{value}</div>
        </div>
      );
    }
  },
  {
    header: 'Type',
    accessorKey: 'type'
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }) => row.original.formattedDate,
    // Use Infinity to move nulls last, 0 to move them first: https://tanstack.com/table/v8/docs/api/features/sorting
    sortingFn: (a, b) => {
      const dateA = a.original.date
        ? new Date(a.original.date).getTime()
        : Infinity;
      const dateB = b.original.date
        ? new Date(b.original.date).getTime()
        : Infinity;
      return dateA - dateB;
    }
  },
  {
    header: 'Status',
    accessorKey: 'viewRequest',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();

      if (!value || value === 0 || value === '0') {
        return <div>{value}</div>;
      }

      return (
        <div
          className={css({ cursor: 'pointer' })}
          onClick={() => callback(original.missionPartnerId, original.userId)}
        >
          <div className={css({ color: 'info.text.100' })}>{value}</div>
        </div>
      );
    },
    enableSorting: false
  }
];
