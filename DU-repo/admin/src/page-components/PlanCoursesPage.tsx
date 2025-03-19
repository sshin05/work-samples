import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useAggregateTranscriptItemsForTrainingPlan,
  useAggregateTrainingPlanVersions
} from '@/api/course';
import { useExportCourseLevelMetricsForTrainingPlan } from '@/api/mission-partner';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { Button, useNotificationCenter } from '@cerberus/react';
import { ArrowLeft } from '@cerberus/icons';
import { PageHeader } from '@/components_new/typography/PageHeader';
import ContentArea from '@/components_new/layout/ContentArea';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import type { SortingState } from '@tanstack/react-table';
import { PlanCoursesFilter } from './PlanCoursesFilter';

const getCellContent = ({
  sourceToDestinationUrl,
  missionPartnerId,
  groupId,
  planType,
  planSourceId,
  planVersion,
  status,
  info,
  title = ''
}) => {
  const value = info.getValue();

  if (!value || value === 0 || value === '0')
    return <p className={css({ color: 'page.text.100' })}>&mdash;</p>;

  const [vendorId, courseId] = info.row.original.itemId.split('#');

  const urlArgs = {
    missionPartnerId,
    groupId,
    planSourceId
  };

  const queryArgs = {
    planType,
    planSourceId,
    planVersion,
    courseId,
    groupId,
    vendor: vendorId,
    status,
    title
  };

  const url = getRouteUrl(
    routeGenerators[sourceToDestinationUrl](urlArgs),
    queryArgs
  );

  return (
    <Link href={url} className={css({ color: 'action.navigation.initial' })}>
      {value}
    </Link>
  );
};

const PlanCourses = ({
  sourceToDestinationUrl,
  missionPartnerId,
  groupId,
  planType,
  planSourceId,
  planVersion,
  title
}) => {
  const router = useRouter();
  const { notify } = useNotificationCenter();

  const [openFilters, setOpenFilters] = useState(false);
  const [componentState, setComponentState] = useState({
    missionPartnerId,
    groupId,
    planType,
    planSourceId,
    planVersion
  });

  const [sorting] = useState<SortingState>([]);
  const {
    trainingPlanVersions: { versions, versionEnabled }
  } = useAggregateTrainingPlanVersions({
    planType: componentState.planType,
    planSourceId: componentState.planSourceId
  });

  const { exportCourseLevelMetricsForTrainingPlan } =
    useExportCourseLevelMetricsForTrainingPlan();

  const { transcriptItems, transcriptItemsLoading } =
    useAggregateTranscriptItemsForTrainingPlan(componentState);

  useEffect(() => {
    setComponentState(componentState => ({
      ...componentState,
      sortField: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : undefined
    }));
  }, [sorting]);

  const columns = [
    {
      header: 'Item Title',
      accessorKey: 'itemTitle',
      cell: info => (
        <span
          className={css({
            display: 'block',
            minW: '16rem',
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
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Total Enrolled',
          info,
          title
        });
      }
    },
    {
      header: 'Started',
      accessorKey: 'started',
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Started',
          info,
          title
        });
      }
    },
    {
      header: 'Pending Review',
      accessorKey: 'pendingReview',
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Pending Review',
          info,
          title
        });
      }
    },
    {
      header: 'Stopped',
      accessorKey: 'stopped',
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Stopped',
          info,
          title
        });
      }
    },
    {
      header: 'Completed',
      accessorKey: 'completed',
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Completed',
          info,
          title
        });
      }
    },
    {
      header: 'Marked Completed',
      accessorKey: 'markedCompleted',
      cell: info => {
        return getCellContent({
          sourceToDestinationUrl,
          missionPartnerId,
          groupId,
          planType,
          planSourceId,
          planVersion,
          status: 'Marked Completed',
          info,
          title
        });
      }
    }
  ];

  const generateFilterOptions = () => {
    return [
      { label: 'All', value: undefined },
      ...(Array.isArray(versions)
        ? versions.map(row => ({ label: row, value: row }))
        : [])
    ];
  };

  const handleDownload = () =>
    exportCourseLevelMetricsForTrainingPlan({
      variables: {
        missionPartnerId,
        groupId: groupId || undefined,
        planSourceId,
        planVersion: componentState.planVersion,
        title
      }
    })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description:
            'There was an error exporting course level training plan metrics.'
        })
      );

  return (
    <div className={vstack({ gap: 10, alignItems: 'start' })}>
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <Button palette="action" usage="ghost" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
            Back
          </span>
        </Button>
        <PageHeader>
          {transcriptItemsLoading ? (
            <div aria-busy="true" />
          ) : (
            `${title} | Plan Courses`
          )}
        </PageHeader>
      </div>
      <ContentArea>
        <LocalTable
          columns={columns}
          data={transcriptItems}
          downloadProps={{
            onDownload: () => handleDownload()
          }}
          loading={transcriptItemsLoading}
          defaultSorting={sorting}
          filterProps={
            versionEnabled
              ? {
                  openFilters,
                  setOpenFilters
                }
              : null
          }
          noDataMessage={
            <NoDataMessage message="Once plan items have been added, they will appear here" />
          }
          hasFiltersApplied={versionEnabled && planVersion}
          hasToolbar
          searchPlaceholder="Search by item title or vendor"
          filterComponent={
            <PlanCoursesFilter
              versionEnabled={versionEnabled}
              openFilters={openFilters}
              componentState={componentState}
              setComponentState={setComponentState}
              generateFilterOptions={generateFilterOptions}
            />
          }
        />
      </ContentArea>
    </div>
  );
};

export default PlanCourses;
