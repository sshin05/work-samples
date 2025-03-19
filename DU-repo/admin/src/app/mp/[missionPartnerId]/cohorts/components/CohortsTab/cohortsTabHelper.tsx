import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { EllipsisMenuButton } from '@/components_new/buttons/EllipsisMenuButton';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useGetSession } from '@/hooks/useGetSession';
import { css } from '@cerberus/styled-system/css';

export const buildColumns = ellipsisMenuItems => {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => {
        return (
          <Link
            href={getRouteUrl(
              routeGenerators.CohortsGroup({
                missionPartnerId: info.row.original.missionPartnerId,
                groupId: info.row.original.id
              })
            )}
            className={css({
              display: 'block',
              w: '20rem',
              minW: '16rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              color: 'action.navigation.initial'
            })}
          >
            {info.getValue()}
          </Link>
        );
      }
    },
    {
      accessorKey: 'groupMemberCount',
      header: 'Number of learners'
    },
    {
      accessorKey: 'SAVED_AT',
      header: 'Last login',
      cell: info => {
        const value = info.getValue();
        return value ? abbreviatedDayDate(value) : '';
      }
    },
    {
      accessorKey: 'na',
      header: ' ',
      notSortable: true,
      headerStyle: () => {
        return { textAlign: 'center' };
      },
      cell: ({ row }) => (
        <div>
          <EllipsisMenuButton
            row={row}
            menuItems={ellipsisMenuItems}
            label="cohort row action button"
          />
          <div />
        </div>
      )
    }
  ];
};

export const useCohortsColumns = ({
  setSelectedCohort,
  showDeleteCohortModal,
  showChangeCohortNameModal,
  showAssignCohortMissionPartnerModal
}) => {
  const { isDuAdmin } = useGetSession();
  const [modalToShow, setModalToShow] = useState(null);
  useEffect(() => {
    if (modalToShow) {
      modalToShow();
      setModalToShow(null);
    }
  }, [modalToShow]);

  return useMemo(() => {
    const menuItems = [
      {
        label: 'Rename Cohort',
        fontColor: 'page.text.200',
        onClick: ({ original }) => {
          // ChangeGroupNameModal needs `updateGroup(group.id, groupName, group.missionPartnerId);`
          setSelectedCohort(original);
          setModalToShow(() => showChangeCohortNameModal);
        }
      },
      ...(isDuAdmin
        ? [
            {
              label: 'Update Mission Partner',
              fontColor: 'page.text.200',
              onClick: ({ original }) => {
                setSelectedCohort(original);
                setModalToShow(() => showAssignCohortMissionPartnerModal);
              }
            }
          ]
        : []),
      {
        label: (
          <div
            className={css({
              color: 'danger.bg.initial'
            })}
          >
            Delete Cohort
          </div>
        ),
        fontColor: 'danger.bg.initial',
        onClick: ({ original }) => {
          setSelectedCohort(original);
          showDeleteCohortModal(original.name, original.id);
        }
      }
    ];
    return buildColumns(menuItems);
  }, [
    isDuAdmin,
    setSelectedCohort,
    showChangeCohortNameModal,
    showDeleteCohortModal,
    showAssignCohortMissionPartnerModal
  ]);
};
