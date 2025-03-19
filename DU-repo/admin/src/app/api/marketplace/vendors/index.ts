'use client';

import type { archiveMarketplaceVendor } from '@digital-u/services/marketplace/vendors/archive-marketplace-vendor';
import type { createMarketplaceVendor } from '@digital-u/services/marketplace/vendors/create-marketplace-vendor';
import type { deleteMarketplaceVendor } from '@digital-u/services/marketplace/vendors/delete-marketplace-vendor';
import type { findMarketplaceVendors } from '@digital-u/services/marketplace/vendors/find-marketplace-vendors';
import type { getMarketplaceVendor } from '@digital-u/services/marketplace/vendors/get-marketplace-vendor';
import type { updateMarketplaceVendor } from '@digital-u/services/marketplace/vendors/update-marketplace-vendor';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type FindMarketplaceVendorsOptions = SQLServiceArguments<
  typeof findMarketplaceVendors
> & {
  missionPartnerId?: string | null;
};

export function sqlFindMarketplaceVendors(): SQLRESTOptions<
  typeof findMarketplaceVendors,
  FindMarketplaceVendorsOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/vendors',
    name: 'find-marketplace-vendors'
  };
}

export type GetMarketplaceVendorOptions = SQLServiceArguments<
  typeof getMarketplaceVendor
> & {
  missionPartnerId?: string | null;
};

export function sqlGetMarketplaceVendor(): SQLRESTOptions<
  typeof getMarketplaceVendor,
  GetMarketplaceVendorOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/vendors',
    name: 'get-marketplace-vendor'
  };
}

export type CreateMarketplaceVendorOptions = SQLServiceArguments<
  typeof createMarketplaceVendor
>;

export function sqlCreateMarketplaceVendor(): SQLRESTOptions<
  typeof createMarketplaceVendor
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/vendors',
    name: 'create-marketplace-vendor'
  };
}

export type ArchiveMarketplaceVendorOptions = SQLServiceArguments<
  typeof archiveMarketplaceVendor
>;

export function sqlArchiveMarketplaceVendor(): SQLRESTOptions<
  typeof archiveMarketplaceVendor
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/vendors',
    name: 'archive-marketplace-vendor'
  };
}

export type DeleteMarketplaceVendorOptions = SQLServiceArguments<
  typeof deleteMarketplaceVendor
>;

export function sqlDeleteMarketplaceVendor(): SQLRESTOptions<
  typeof deleteMarketplaceVendor
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/vendors',
    name: 'delete-marketplace-vendor'
  };
}

export type UpdateMarketplaceVendorOptions = SQLServiceArguments<
  typeof updateMarketplaceVendor
>;

export function sqlUpdateMarketplaceVendor(): SQLRESTOptions<
  typeof updateMarketplaceVendor
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/vendors',
    name: 'update-marketplace-vendor'
  };
}
