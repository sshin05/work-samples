'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  type FindMarketplaceOrdersOptions,
  sqlFindMarketplaceOrders
} from '@/app/api/marketplace/orders';
import { useSQLQuery } from '@/app/api';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useRouter } from 'next/navigation';
import { StatusTag } from '@/app/marketplace/components/StatusTag/StatusTag';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import type { SortingState } from '@tanstack/react-table';
import { css } from '@cerberus/styled-system/css';
import { getUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import type { DuSession } from '@/types/DuSession';
import { useSession } from 'next-auth/react';
import { OrdersTableFilters } from './components/OrdersTableFilters/OrdersTableFilters';

const limit = 20;

export function OrdersTable({ missionPartnerId }) {
  const { data: session } = useSession() ?? {};
  const { isDuAdmin } = getUserRoles(session as DuSession);
  const [marketplaceOrders, setMarketplaceOrders] = useState({
    records: [],
    total: 0
  });
  /// @TODO(Lyle): Use search term when available in services.
  // const [searchTerm, setSearchTerm] = useState('');

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'referenceId',
        header: 'Order Id',
        cell: info => (
          <span
            className={css({
              _hover: { textDecoration: 'underline' }
            })}
          >
            {info.getValue()}
          </span>
        ),
        enableSorting: false
      },
      {
        accessorKey: 'itemsCount',
        header: 'Quantity',
        enableSorting: true,
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'submittedAt',
        header: 'Order Date',
        enableSorting: true,
        cell: info => (
          <span>{abbreviatedDayDate(info.getValue() as string)}</span>
        )
      },
      ...(isDuAdmin
        ? [
            {
              header: 'Mission Partner',
              accessorKey: 'missionPartner.name',
              enableSorting: false
            }
          ]
        : []),
      {
        accessorKey: 'price',
        header: 'Order Total',
        enableSorting: true,
        cell: info => (
          <span>{info.getValue() ? `$${info.getValue()}` : 'N/A'}</span>
        )
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: info => <StatusTag status={info.getValue() as string} />
      }
    ];
  }, [isDuAdmin]);

  const missionPartnerOptions = useMemo(() => {
    const uniquePartners = new Map();

    marketplaceOrders.records.forEach(order => {
      if (order.missionPartner?.name) {
        uniquePartners.set(order.missionPartner.name, {
          label: order.missionPartner.name,
          value: order.missionPartner.id
        });
      }
    });

    return Array.from(uniquePartners.values());
  }, [marketplaceOrders.records]);

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [missionPartnerFilter, setMissionPartnerFilter] = useState<
    string | undefined
  >();

  const handleRowClick = row => {
    router.push(`orders/${row.referenceId}`);
  };

  const [options, setOptions] = useState<FindMarketplaceOrdersOptions>({
    filter: { missionPartnerId },
    limit,
    page: page - 1
  });

  const {
    data,
    loading: marketplaceOrdersLoading,
    query: queryMarketplaceOrders
  } = useSQLQuery(sqlFindMarketplaceOrders, {
    options,
    forceFetch: true,
    noCache: true
  });

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (data) {
      setMarketplaceOrders({
        records: [...(data.records ?? [])],
        total: data.total ?? 0
      });
    }
  }, [data]);

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      filter: {
        missionPartnerId: missionPartnerFilter,
        status: statusFilter as
          | 'PROCESSING'
          | 'READY_FOR_PAYMENT'
          | 'PAID'
          | 'IN_CONTRACTING'
          | 'CANCELLED'
          | 'REFUNDED'
          | undefined
      },
      page: page - 1
    }));
  }, [statusFilter, missionPartnerFilter, page]);

  useEffect(() => {
    queryMarketplaceOrders(options);
  }, [options]);

  useEffect(() => {
    const validSortKeys = [
      'price',
      'status',
      'itemsCount',
      'submittedAt',
      '_idx'
    ];
    const sortKey =
      sorting.length && validSortKeys.includes(sorting[0].id)
        ? (sorting[0].id as
            | 'itemsCount'
            | 'submittedAt'
            | 'price'
            | 'status'
            | '_idx')
        : undefined;

    setOptions({
      ...options,
      page: page - 1,
      sort: sortKey
        ? { key: sortKey, direction: sorting[0].desc ? 'desc' : 'asc' }
        : undefined
    });
  }, [page, sorting]);

  return (
    <ServerSideTable
      data={marketplaceOrders?.records}
      columns={columns}
      loading={marketplaceOrdersLoading}
      noDataMessage={<NoDataMessage message="No orders found." />}
      page={page}
      setPage={setPage}
      sorting={sorting}
      setSorting={setSorting}
      total={marketplaceOrders?.total}
      size={limit}
      onRowClick={handleRowClick}
      customStyle={css({ minW: 'unset ' })}
      filterProps={{
        openFilters,
        setOpenFilters
      }}
      filterComponent={
        <OrdersTableFilters
          openFilters={openFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          missionPartnerFilter={missionPartnerFilter}
          setMissionPartnerFilter={setMissionPartnerFilter}
          missionPartnerOptions={missionPartnerOptions}
        />
      }
      /*
      @TODO(Lyle): Add search capability when available in services.
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchPlaceholder="Search by name or type"
      */
    />
  );
}
