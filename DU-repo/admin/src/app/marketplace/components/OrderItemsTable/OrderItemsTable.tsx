'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  type FindMarketplaceOrderItemOptions,
  sqlFindMarketplaceOrderItems,
  sqlGetMarketplaceOrderItem,
  sqlUpdateMarketplaceOrderItem
} from '@/app/api/marketplace/order-items';
import { sqlFindMarketplaceVendors } from '@/app/api/marketplace/vendors';
import { useSQLQuery, useSQLMutation } from '@/app/api';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { OrderItemEditDrawer } from '@/app/marketplace/components/OrderItemEditDrawer/OrderItemEditDrawer';
import { StatusTag } from '@/app/marketplace/components/StatusTag/StatusTag';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import type { SortingState } from '@tanstack/react-table';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { useSession } from 'next-auth/react';
import type { DuSession } from '@/types/DuSession';
import { getUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import { css } from '@cerberus/styled-system/css';
import { OrdersTableFilters } from '../OrdersTable/components/OrdersTableFilters/OrdersTableFilters';

const limit = 20;

export function OrderItemsTable({ missionPartnerId, onRowClick = null }) {
  const { data: session } = useSession() ?? {};
  const { isDuAdmin } = getUserRoles(session as DuSession);
  const [sstSorting, setSstSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [missionPartnerFilter, setMissionPartnerFilter] = useState<
    string | undefined
  >();
  const [vendorFilter, setVendorFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const validSortKeys: Array<
      '_createdAt' | 'price' | 'status' | '_idx' | 'productTitle' | 'vendorName'
    > = ['productTitle', '_createdAt', 'vendorName', 'price', 'status'];

    const sortKey =
      sstSorting.length && validSortKeys.includes(sstSorting[0].id as any)
        ? (sstSorting[0].id as
            | '_createdAt'
            | 'price'
            | 'status'
            | '_idx'
            | 'productTitle'
            | 'vendorName')
        : undefined;

    setOptions({
      ...options,
      page: page - 1,
      sort: sortKey
        ? { key: sortKey, direction: sstSorting[0].desc ? 'desc' : 'asc' }
        : undefined
    });
  }, [page, sstSorting]);

  const renderMaxWidthTextColumn = info => {
    return (
      <div
        className={css({
          display: 'inline-block',
          maxW: '400px',
          overflow: 'hidden',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere'
        })}
      >
        {info.getValue()}
      </div>
    );
  };

  const sstColumns = useMemo(() => {
    return [
      {
        accessorKey: 'marketplaceProduct.title',
        header: 'Order Item',
        enableSorting: true,
        cell: info => renderMaxWidthTextColumn(info)
      },
      {
        accessorKey: '_createdAt',
        header: 'Date Submitted',
        enableSorting: true,
        cell: info => (
          <span>{abbreviatedDayDate(info.getValue() as string)}</span>
        )
      },
      ...(isDuAdmin
        ? [
            {
              accessorKey: 'missionPartner.name',
              header: 'Mission Partner',
              enableSorting: false,
              cell: info => {
                return (
                  <div
                    className={css({
                      display: 'inline-block',
                      maxW: '20rem',
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere'
                    })}
                  >
                    {info.getValue()}
                  </div>
                );
              }
            }
          ]
        : []),
      {
        accessorKey: 'marketplaceVendor.name',
        header: 'Vendor',
        enableSorting: true,
        cell: info => {
          return (
            <div
              className={css({
                display: 'inline-block',
                maxW: '20rem',
                overflow: 'hidden',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere'
              })}
            >
              {info.getValue()}
            </div>
          );
        }
      },
      {
        accessorKey: 'price',
        header: 'Price',
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

  const persistentFilter = {
    missionPartnerId,
    containerIsOrder: true
  };
  const [options, setOptions] = useState<FindMarketplaceOrderItemOptions>({
    filter: persistentFilter,
    page: page - 1,
    limit
  });

  const {
    data: marketplaceOrderItems,
    loading: marketplaceOrderItemsLoading,
    query: queryMarketplaceOrderItems
  } = useSQLQuery(sqlFindMarketplaceOrderItems, { options, clearData: true });

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const missionPartnerOptions = useMemo(() => {
    const uniquePartners = new Map();
    marketplaceOrderItems?.records?.forEach(order => {
      if (order.missionPartner?.name) {
        uniquePartners.set(order.missionPartner.name, {
          label: order.missionPartner.name,
          value: order.missionPartner.id
        });
      }
    });
    return Array.from(uniquePartners.values());
  }, [marketplaceOrderItems?.records]);

  const vendorOptions = useMemo(() => {
    const uniqueVendors = new Map();
    marketplaceOrderItems?.records?.forEach(order => {
      if (order.marketplaceVendor?.name) {
        uniqueVendors.set(order.marketplaceVendor.name, {
          label: order.marketplaceVendor.name,
          value: order.marketplaceVendor.id
        });
      }
    });
    return Array.from(uniqueVendors.values());
  }, [marketplaceOrderItems?.records]);

  useEffect(() => {
    queryMarketplaceOrderItems(options);
  }, [options]);

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      filter: {
        ...persistentFilter,
        status: statusFilter as
          | 'PROCESSING'
          | 'READY_FOR_PAYMENT'
          | 'PAID'
          | 'IN_CONTRACTING'
          | 'CANCELLED'
          | 'REFUNDED'
          | undefined,
        missionPartnerId: missionPartnerFilter,
        vendorTag: vendorFilter
      },
      page: page - 1
    }));
  }, [statusFilter, missionPartnerFilter, vendorFilter]);

  const { loading: marketplaceVendorsLoading } = useSQLQuery(
    sqlFindMarketplaceVendors,
    {
      options: {
        filter: { isArchived: false },
        missionPartnerId
      }
    }
  );

  const {
    data: orderItemData,
    loading: orderItemLoading,
    query: fetchOrderItem
  } = useSQLQuery(sqlGetMarketplaceOrderItem, {
    lazyLoad: true,
    forceFetch: true
  });
  const { mutation: updateOrderItem } = useSQLMutation(
    sqlUpdateMarketplaceOrderItem
  );

  const [drawerIsExpanded, setDrawerIsExpanded] = useState(false);
  const handleCloseDrawer = () => {
    setDrawerIsExpanded(false);
    queryMarketplaceOrderItems(options);
  };
  const handleOnExit = () => setDrawerIsExpanded(false);

  const handleOrderItemClick = orderItem => {
    fetchOrderItem({ id: orderItem.id });
    setDrawerIsExpanded(true);
    if (onRowClick) {
      onRowClick(orderItem);
    }
  };

  const handleSubmit = async formData => {
    await updateOrderItem(formData);

    handleCloseDrawer();
  };

  return (
    <>
      <ServerSideTable
        data={marketplaceOrderItems?.records ?? []}
        columns={sstColumns}
        total={marketplaceOrderItems?.total}
        loading={marketplaceOrderItemsLoading || marketplaceVendorsLoading}
        page={page}
        setPage={setPage}
        sorting={sstSorting}
        setSorting={setSstSorting}
        size={limit}
        onRowClick={handleOrderItemClick}
        noDataMessage={<NoDataMessage message="No order items found." />}
        customStyle={css({ minW: 'unset' })}
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
            vendorFilter={vendorFilter}
            setVendorFilter={setVendorFilter}
            vendorOptions={vendorOptions}
          />
        }
      />

      <OrderItemEditDrawer
        handleCloseDrawer={handleCloseDrawer}
        drawerIsExpanded={drawerIsExpanded}
        handleOnExit={handleOnExit}
        onSubmit={handleSubmit}
        missionPartnerId={missionPartnerId}
        orderItem={orderItemData}
        loading={orderItemLoading}
      />
    </>
  );
}
