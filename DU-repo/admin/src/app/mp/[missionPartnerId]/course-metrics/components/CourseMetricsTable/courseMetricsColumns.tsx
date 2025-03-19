import { useMemo, type JSX } from 'react';
import Link from 'next/link';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';

type InfoProps = {
  getValue: () => string | number | null;
  row: { original: { courseId: string } };
};

const getCourseAndVendorArgs = (courseIdString: string) => {
  let vendor = '';
  let courseId = courseIdString;
  if (courseIdString.includes('#')) {
    courseId = courseIdString.slice(courseIdString.indexOf('#') + 1);
    vendor = courseIdString.slice(0, courseIdString.indexOf('#'));
  }

  return { vendor, courseId };
};

const courseColumns = (missionPartnerId: string | number) => [
  {
    header: 'Course',
    accessorKey: 'courseTitle',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '18rem',
          whiteSpace: 'normal',
          wordWrap: 'break-word'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    header: 'Vendor',
    accessorKey: 'vendorName',
    cell: info => <span>{info.getValue()}</span>
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: (info: InfoProps) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Total Enrolled'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
    cell: (info: {
      getValue: () => string | number | null;
      row: { original: { courseId: string } };
    }) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Started'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
    header: 'Pending',
    accessorKey: 'pendingReview',
    cell: (info: InfoProps) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Pending review'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
    header: 'Stopped',
    accessorKey: 'stopped',
    cell: (info: InfoProps) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Stopped'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
    cell: (info: InfoProps) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Completed'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
    header: 'Marked completed',
    accessorKey: 'markedCompleted',
    cell: (info: InfoProps) => {
      const value = info.getValue().toLocaleString();

      if (!value || value === '0') {
        return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;
      }

      const { vendor, courseId } = getCourseAndVendorArgs(
        info.row.original.courseId
      );

      const queryArgs = {
        courseId,
        vendor,
        status: 'Marked completed'
      };

      const url = getRouteUrl(
        routeGenerators.CourseMetricsLearners({
          missionPartnerId: `${missionPartnerId}`
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
  }
];

export type CourseColumnType = {
  header: string;
  accessorKey: string;
  size?: number;
  cell?: (info: InfoProps) => JSX.Element;
};

export const useCourseColumns = missionPartnerId => {
  return useMemo(() => {
    return missionPartnerId ? courseColumns(missionPartnerId) : [];
  }, [missionPartnerId]);
};
