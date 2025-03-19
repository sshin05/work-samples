'use client';

import type { findMarketplaceOrderItems } from '@digital-u/services/marketplace/order-items/find-marketplace-order-items';
import type { getMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/get-marketplace-order-item';
import type { deleteMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/delete-marketplace-order-item';
import type { updateMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/update-marketplace-order-item';
import type { updateMarketplaceOrderItemStatus } from '@digital-u/services/marketplace/order-items/update-marketplace-order-item-status';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type FindMarketplaceOrderItemOptions = SQLServiceArguments<
  typeof findMarketplaceOrderItems
> & { missionPartnerId?: string | null };

export function sqlFindMarketplaceOrderItems(): SQLRESTOptions<
  typeof findMarketplaceOrderItems,
  FindMarketplaceOrderItemOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/order-items',
    name: 'find-marketplace-order-items'
  };
}

export type GetMarketplaceOrderItemOptions = SQLServiceArguments<
  typeof getMarketplaceOrderItem
> & { missionPartnerId?: string | null };

export function sqlGetMarketplaceOrderItem(): SQLRESTOptions<
  typeof getMarketplaceOrderItem,
  GetMarketplaceOrderItemOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/order-items',
    name: 'get-marketplace-order-item'
  };
}

export type DeleteMarketplaceOrderItemOptions = SQLServiceArguments<
  typeof deleteMarketplaceOrderItem
> & { missionPartnerId?: string | null };

export function sqlDeleteMarketplaceOrderItem(): SQLRESTOptions<
  typeof deleteMarketplaceOrderItem,
  DeleteMarketplaceOrderItemOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/order-items',
    name: 'delete-marketplace-order-item',
    invalidatesRoutes: [
      '/admin/api/marketplace/carts',
      '/admin/api/marketplace/orders'
    ]
  };
}

export type UpdateMarketplaceOrderItemOptions = Omit<
  SQLServiceArguments<typeof updateMarketplaceOrderItem>,
  'userId'
> & { missionPartnerId?: string | null };

export function sqlUpdateMarketplaceOrderItem(): SQLRESTOptions<
  typeof updateMarketplaceOrderItem,
  UpdateMarketplaceOrderItemOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/order-items',
    name: 'update-marketplace-order-item',
    invalidatesRoutes: [
      '/admin/api/marketplace/carts',
      '/admin/api/marketplace/orders'
    ]
  };
}

export type UpdateMarketplaceOrderItemStatusOptions = SQLServiceArguments<
  typeof updateMarketplaceOrderItem
>;

export function sqlUpdateMarketplaceOrderItemStatus(): SQLRESTOptions<
  typeof updateMarketplaceOrderItemStatus
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/order-items',
    name: 'update-marketplace-order-item-status',
    invalidatesRoutes: [
      '/admin/api/marketplace/carts',
      '/admin/api/marketplace/orders'
    ]
  };
}
