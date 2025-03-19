'use client';
import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Add } from '@cerberus/icons';
import { Modal, trapFocus, useModal } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { AddPlanModalContent } from '../AddPlanModalContent';
import { abbreviatedDateTime } from '@/utils/date/abbreviatedDateTime';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { CustomPlansTabProps } from './CustomPlansTab.types';

const CustomPlansTab = ({
  missionPartner,
  tab,
  loading,
  pageLoading
}: CustomPlansTabProps) => {
  const router = useRouter();
  const modal = useModal();
  const handleKeyDown = trapFocus(modal.modalRef);

  // Derived
  const plans = missionPartner?.forceMultipliers || [];

  const callbackPath = getRouteUrl(
    routeGenerators.CustomTrainingWithParameters({
      missionPartnerId: missionPartner?.id,
      tab: tab || 'Plans'
    })
  );

  const handleNavigateToPlan = useCallback(
    url => {
      router.push(url);
    },
    [router]
  );

  const onCreateNewPlan = id => {
    modal.close();
    router.push(
      getRouteUrl(
        routeGenerators.CustomTrainingPlan({
          missionPartnerId: missionPartner?.id,
          planId: id
        }),
        {
          callbackPath
        }
      )
    );
  };

  const customPlansTableColumns = useMemo(
    () => [
      {
        header: 'Plan name',
        accessorKey: 'title',
        cell: info => {
          return (
            <div
              className={css({
                display: 'block',
                minW: '13rem',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              })}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleNavigateToPlan(
                  getRouteUrl(
                    routeGenerators.CustomTrainingPlan({
                      missionPartnerId: missionPartner?.id,
                      planId: info.row.original.id
                    }),
                    { callbackPath }
                  )
                )
              }
            >
              <span
                className={css({
                  color: 'action.bg.initial',
                  textDecoration: 'underline'
                })}
              >
                {info.getValue()}
              </span>
            </div>
          );
        }
      },
      {
        header: 'Version',
        accessorKey: 'version',
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: '6.5rem'
            })}
          >
            {info.getValue()}
          </span>
        )
      },
      {
        header: 'Plan type',
        accessorKey: 'type'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: '6rem'
            })}
          >
            {info.getValue()}
          </span>
        )
      },
      {
        header: 'Duration',
        accessorKey: 'totalDuration',
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: '6rem'
            })}
          >
            {info.getValue() ? info.getValue().toLocaleString() : ''}
          </span>
        )
      },
      // Commenting out for now as this number is not reliable
      // {
      //   header: 'Learners',
      //   accessorKey: 'learners'
      // },
      {
        header: 'Date created',
        accessorKey: 'createdAt',
        sortingFn: (a, b) => {
          const dateA = a.original.createdAt
            ? new Date(a.original.createdAt)
            : Infinity;
          const dateB = b.original.createdAt
            ? new Date(b.original.createdAt)
            : Infinity;
          return (
            (dateA instanceof Date ? dateA.getTime() : dateA) -
            (dateB instanceof Date ? dateB.getTime() : dateB)
          );
        },
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: '8.5rem'
            })}
          >
            {info.getValue() ? abbreviatedDateTime(info.getValue()) : ''}
          </span>
        )
      },
      {
        header: 'Last updated',
        accessorKey: 'updatedAt',
        sortingFn: (a, b) => {
          const dateA = a.original.updatedAt
            ? new Date(a.original.updatedAt)
            : Infinity;
          const dateB = b.original.updatedAt
            ? new Date(b.original.updatedAt)
            : Infinity;
          return (
            (dateA instanceof Date ? dateA.getTime() : dateA) -
            (dateB instanceof Date ? dateB.getTime() : dateB)
          );
        },
        cell: info => (
          <span
            className={css({
              display: 'block',
              w: '12rem'
            })}
          >
            {info.getValue() ? abbreviatedDateTime(info.getValue()) : ''}
          </span>
        )
      }
    ],
    [handleNavigateToPlan, missionPartner?.id, callbackPath]
  );

  const planData = plans?.map(plan => {
    return {
      ...plan,
      learners: plan?.enrolledLearners ?? 0,
      type: 'Force Multiplier',
      createdAt: plan._createdAt,
      updatedAt: plan._updatedAt
    };
  });

  const callToAction = () => {
    modal.show();
  };

  return (
    <>
      <LocalTable
        columns={customPlansTableColumns}
        data={planData}
        loading={loading}
        pageLoading={pageLoading}
        noDataMessage={
          <NoDataMessage
            message="Once a custom training plan has been created, it will appear here"
            buttonText="Add Custom Training Plan"
            cta={() => callToAction()}
          />
        }
        searchPlaceholder="Search by plan name, type or status"
        buttonProps={{
          onButtonClick: callToAction,
          buttonContent: 'Training Plan',
          buttonIcon: <Add />
        }}
      />
      <Modal onKeyDown={handleKeyDown} ref={modal.modalRef}>
        <AddPlanModalContent
          missionPartner={missionPartner}
          onClose={modal.close}
          onSubmit={onCreateNewPlan}
        />
      </Modal>
    </>
  );
};

export default CustomPlansTab;
