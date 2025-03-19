import { useMemo } from 'react';
import Link from 'next/link';

import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';

export const cohortTrainingPlansColumns = ({
  missionPartnerId,
  missionPartnerName,
  groupId,
  groupName
}) => [
  {
    header: 'Plan Name',
    accessorKey: 'planTitle',
    cell: ({ getValue, row: { original } }) => {
      const queryArgs = {
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle
      };

      const urlArgs = {
        missionPartnerId,
        groupId
      };

      const url = getRouteUrl(
        routeGenerators.CohortPlanCourse(urlArgs),
        queryArgs
      );

      return (
        <Link
          href={url}
          className={css({
            color: 'action.navigation.initial'
          })}
        >
          {getValue()}
        </Link>
      );
    }
  },
  {
    header: 'Type',
    accessorKey: 'planType',
    enableSorting: false
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();
      if (!value || value === 0 || value === '0') {
        return <p>{value}</p>;
      }

      const urlArgs = {
        missionPartnerId
      };

      const queryArgs = {
        missionPartnerName,
        groupId,
        groupName,
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle,
        type: 'enrolled',
        status: ''
      };

      const url = getRouteUrl(routeGenerators.CohortPlan(urlArgs), queryArgs);

      return (
        <Link
          href={url}
          className={css({ color: 'action.navigation.initial' })}
        >
          {value}
        </Link>
      );
    }
  },
  {
    header: 'Assigned',
    accessorKey: 'assigned',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();

      if (!value || value === 0 || value === '0') {
        return <p>{value}</p>;
      }

      const queryArgs = {
        missionPartnerName,
        groupId,
        groupName,
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle,
        type: 'assigned',
        status: 'Assigned'
      };

      const url = getRouteUrl(
        routeGenerators.CohortPlan({ missionPartnerId }),
        queryArgs
      );
      return (
        <Link
          href={url}
          className={css({ color: 'action.navigation.initial' })}
        >
          {value}
        </Link>
      );
    }
  },
  {
    header: 'Started',
    accessorKey: 'started',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();

      if (!value || value === 0 || value === '0') {
        return <p>{value}</p>;
      }

      const queryArgs = {
        missionPartnerName,
        groupId,
        groupName,
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle,
        type: 'started',
        status: 'Started'
      };

      const url = getRouteUrl(
        routeGenerators.CohortPlan({ missionPartnerId }),
        queryArgs
      );

      return (
        <Link
          href={url}
          className={css({ color: 'action.navigation.initial' })}
        >
          {value}
        </Link>
      );
    }
  },
  {
    header: 'Stopped',
    accessorKey: 'stopped',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();

      if (!value || value === 0 || value === '0') {
        return <p>{value}</p>;
      }

      const queryArgs = {
        missionPartnerName,
        groupId,
        groupName,
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle,
        type: 'stopped',
        status: 'Stopped'
      };

      const url = getRouteUrl(
        routeGenerators.CohortPlan({ missionPartnerId }),
        queryArgs
      );

      return (
        <Link
          href={url}
          className={css({ color: 'action.navigation.initial' })}
        >
          {value}
        </Link>
      );
    }
  },
  {
    header: 'Completed',
    accessorKey: 'completed',
    cell: ({ getValue, row: { original } }) => {
      const value = getValue();

      if (!value || value === 0 || value === '0') {
        return <p>{value}</p>;
      }

      const queryArgs = {
        missionPartnerName,
        groupId,
        groupName,
        planType: original.planType,
        planSourceId: original.planSourceId,
        title: original.planTitle,
        type: 'completed',
        status: 'Completed'
      };

      const url = getRouteUrl(
        routeGenerators.CohortPlan({ missionPartnerId }),
        queryArgs
      );

      return (
        <Link
          href={url}
          className={css({ color: 'action.navigation.initial' })}
        >
          {value}
        </Link>
      );
    }
  }
];

export const useCohortTrainingPlansColumns = ({
  missionPartnerId,
  missionPartnerName,
  groupId,
  groupName
}) => {
  return useMemo(() => {
    return cohortTrainingPlansColumns({
      missionPartnerId,
      missionPartnerName,
      groupId,
      groupName
    });
  }, [missionPartnerId, missionPartnerName, groupId, groupName]);
};
