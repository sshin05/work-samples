import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { ColumnDef } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';
import { EllipsisMenuButton } from '@/components_new/buttons/EllipsisMenuButton';
import { LearnersTypePill } from './components/LearnersTypePill';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

export const buildLearnersColumns = ellipsisMenuItems => [
  {
    accessorKey: 'firstName',
    header: 'First name',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '8.125rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '8.125rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email address',
    cell: info => <span>{info.getValue()}</span>
  },

  {
    accessorKey: 'userType',
    header: 'Type',
    cell: info => {
      const value = info.getValue();

      return <LearnersTypePill value={value} />;
    },
    enableSorting: false
  },
  {
    accessorKey: 'lastLoginAt',
    header: 'Last login',
    cell: info => {
      const value = info.getValue();

      return value ? abbreviatedDayDate(value) : '';
    },
    enableSorting: false
  },
  {
    accessorKey: 'keycloakUserCreatedAt',
    header: 'Registration',
    cell: info => {
      const value = info.getValue();

      return value ? abbreviatedDayDate(value) : '';
    },
    sortingFn: (a, b) => {
      const dateA = a.original.dateAdded
        ? new Date(a.original.dateAdded)
        : Infinity;
      const dateB = b.original.dateAdded
        ? new Date(b.original.dateAdded)
        : Infinity;

      const timeA =
        dateA instanceof Date && !isNaN(dateA.getTime())
          ? dateA.getTime()
          : Infinity;
      const timeB =
        dateB instanceof Date && !isNaN(dateB.getTime())
          ? dateB.getTime()
          : Infinity;

      return timeA - timeB;
    }
  },
  {
    accessorKey: 'dropdown',
    header: '',
    cell: info => (
      <div>
        <EllipsisMenuButton
          row={info.row}
          menuItems={ellipsisMenuItems}
          label="learner row action button"
        />
      </div>
    ),
    enableSorting: false
  }
];

export const useLearnersColumns = ({
  missionPartnerId,
  showConfirmModal,
  downloadLearnerProps,
  callLearnerSideDrawer
}): ColumnDef<unknown, unknown>[] => {
  const router = useRouter();
  return useMemo(() => {
    const menuItems = [
      {
        label: 'View learner',
        fontColor: 'page.text.200',
        onClick: row => {
          const { id } = row.original;
          const queryParameters = {
            missionPartnerId,
            userId: id,
            mister: 0
          };
          const viewLearnerDetailsPath = getRouteUrl(
            routeGenerators.MissionPartnerLearner({
              missionPartnerId,
              userId: id
            }),
            queryParameters
          );

          // call open side drawer
          callLearnerSideDrawer({
            userId: id,
            missionPartnerId,
            viewLearnerDetailsPath
          });
        }
      },
      {
        label: 'Download learner activity report',
        fontColor: 'page.text.200',
        onClick: row => {
          const { id } = row.original;
          downloadLearnerProps.onDownload(id, missionPartnerId);
        }
      },
      {
        label: (
          <div
            className={css({
              color: 'danger.bg.initial'
            })}
          >
            Delete learner
          </div>
        ),
        fontColor: 'danger.bg.initial',
        onClick: row => {
          const { id, firstName, lastName } = row.original;
          showConfirmModal([id], firstName, lastName, true);
        }
      }
    ];
    return buildLearnersColumns(menuItems);
  }, [missionPartnerId, downloadLearnerProps, showConfirmModal, router]);
};
