'use client';

import type { Blocks } from '@digital-u/services/block/types';
import { useMemo } from 'react';
import { css } from '@cerberus/styled-system/css';
import { useParams, useRouter } from 'next/navigation';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { LocalTable } from '@/components_new/table/LocalTable';

export const ItemsSection = ({
  data = [],
  loading = false
}: {
  data?: Blocks[];
  loading?: boolean;
}) => {
  const router = useRouter();
  const params = useParams();

  const columns = useMemo(
    () => [
      {
        header: 'Name',
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
                router.push(
                  getRouteUrl(
                    routeGenerators.CurriculumViewFirstItem({
                      missionPartnerId: params.missionPartnerId as string,
                      blockId: info.row.original.id
                    })
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
        header: 'Type',
        accessorKey: 'type',
        enableGlobalFilter: false
      },
      {
        header: 'Created',
        accessorKey: '_createdAt',
        enableGlobalFilter: false
      }
    ],
    []
  );

  return (
    <LocalTable
      columns={columns}
      data={data}
      loading={loading}
      pageLoading={false}
      hasToolbar
      searchPlaceholder="Search by item name"
      defaultSorting={[{ id: '_createdAt', desc: true }]}
      skeletonRows={5}
    />
  );
};
