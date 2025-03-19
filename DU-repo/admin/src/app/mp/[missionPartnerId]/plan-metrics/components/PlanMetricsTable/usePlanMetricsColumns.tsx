import { useMemo } from 'react';
import Link from 'next/link';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';

const planMetricsColumns = (
  missionPartnerId: string,
  missionPartnerName: string
) => [
  {
    header: 'Plan Name',
    accessorKey: 'planTitle',
    cell: info => {
      const value = info.getValue();
      const {
        row: {
          original: { planTitle, planType, planSourceId }
        }
      } = info;

      const queryArgs = {
        missionPartnerId,
        missionPartnerName,
        planType,
        planSourceId,
        title: planTitle
      };

      const url = getRouteUrl(
        routeGenerators.PlanMetricsPlan({ missionPartnerId }),
        queryArgs
      );

      return (
        <Link
          href={url}
          className={css({
            color: 'action.navigation.initial',
            display: 'block',
            minW: '18rem',
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          })}
        >
          {value}
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
    cell: info => {
      const value = info.getValue().toLocaleString();
      const {
        row: {
          original: { planType, planSourceId, planTitle }
        }
      } = info;

      if (!value || value === 0 || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const queryArgs = {
        planType,
        planSourceId,
        title: planTitle,
        type: 'enrolled'
      };

      const url = getRouteUrl(
        getRouteUrl(
          routeGenerators.PlanMetricsLearners({ missionPartnerId }),
          queryArgs
        )
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
    header: 'Assigned',
    accessorKey: 'assigned',
    cell: info => {
      const value = info.getValue().toLocaleString();
      const {
        row: {
          original: { planType, planSourceId, planTitle }
        }
      } = info;

      if (!value || value === 0 || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const queryArgs = {
        planType,
        planSourceId,
        title: planTitle,
        type: 'assigned',
        status: 'Assigned'
      };

      const url = getRouteUrl(
        routeGenerators.PlanMetricsLearners({
          missionPartnerId
        }),
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
    cell: info => {
      const {
        row: { original }
      } = info;
      const value = info.getValue().toLocaleString();
      if (!value || value === 0 || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { planType, planSourceId, planTitle } = original;
      const queryArgs = {
        planType,
        planSourceId,
        title: planTitle,
        type: 'inProgress',
        status: 'Started'
      };
      const url = getRouteUrl(
        routeGenerators.PlanMetricsLearners({ missionPartnerId }),
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
    cell: info => {
      const {
        row: { original }
      } = info;
      const value = info.getValue().toLocaleString();
      if (!value || value === 0 || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { planType, planSourceId, planTitle } = original;
      const queryArgs = {
        planType,
        planSourceId,
        title: planTitle,
        type: 'stopped',
        status: 'Stopped'
      };

      const url = getRouteUrl(
        routeGenerators.PlanMetricsLearners({
          missionPartnerId
        }),
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
    cell: info => {
      const {
        row: { original }
      } = info;
      const value = info.getValue().toLocaleString();
      if (!value || value === 0 || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { planType, planSourceId, planTitle } = original;
      const queryArgs = {
        planType,
        planSourceId,
        title: planTitle,
        type: 'completed',
        status: 'Completed'
      };

      const url = getRouteUrl(
        getRouteUrl(routeGenerators.PlanMetricsLearners({ missionPartnerId })),
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

export const usePlanMetricsColumns = (missionPartnerId, missionPartnerName) => {
  return useMemo(() => {
    return missionPartnerId
      ? planMetricsColumns(missionPartnerId, missionPartnerName)
      : [];
  }, [missionPartnerId, missionPartnerName]);
};
