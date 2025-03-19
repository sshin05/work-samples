'use client';

import type { getMarketplaceOrder } from '@digital-u/services/marketplace/orders/get-marketplace-order';
import type { finalizeContracting } from '@digital-u/services/marketplace/orders/finalize-contracting';
import type { findMarketplaceOrders } from '@digital-u/services/marketplace/orders/find-marketplace-orders';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type GetMarketplaceOrderOptions = SQLServiceArguments<
  typeof getMarketplaceOrder
>;

export function sqlGetMarketplaceOrder(): SQLRESTOptions<
  typeof getMarketplaceOrder
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/orders',
    name: 'get-marketplace-order'
  };
}

export type FindMarketplaceOrdersOptions = SQLServiceArguments<
  typeof findMarketplaceOrders
>;

export function sqlFindMarketplaceOrders(): SQLRESTOptions<
  typeof findMarketplaceOrders
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/orders',
    name: 'find-marketplace-orders'
  };
}

export type FinalizeContracingOptions = Omit<
  SQLServiceArguments<typeof finalizeContracting>,
  'modifyingUserId'
>;

export function sqlFinalizeContracing(): SQLRESTOptions<
  typeof finalizeContracting,
  FinalizeContracingOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/orders',
    name: 'finalize-contracting',
    invalidatesRoutes: ['/admin/api/marketplace/order-items']
  };
}
