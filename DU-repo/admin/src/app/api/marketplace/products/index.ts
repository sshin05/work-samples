'use client';

import type { archiveMarketplaceProduct } from '@digital-u/services/marketplace/products/archive-marketplace-product';
import type { createMarketplaceProduct } from '@digital-u/services/marketplace/products/create-marketplace-product';
import type { createMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/create-marketplace-product-customization-definition';
import type { deleteMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/delete-marketplace-product-customization-definition';
import type { findMarketplaceCategories } from '@digital-u/services/marketplace/categories/find-marketplace-categories';
import type { findMarketplaceProductCustomizationDefinitions } from '@digital-u/services/marketplace/products/find-marketplace-product-customization-definitions';
import type { findMarketplaceProducts } from '@digital-u/services/marketplace/products/find-marketplace-products';
import type { getMarketplaceProduct } from '@digital-u/services/marketplace/products/get-marketplace-product';
import type { getMarketplaceCategory } from '@digital-u/services/marketplace/categories/get-marketplace-category';
import type { getMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/get-marketplace-product-customization-definition';
import type { updateMarketplaceProduct } from '@digital-u/services/marketplace/products/update-marketplace-product';
import type { updateMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/update-marketplace-product-customization-definition';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type ArchiveMarketplaceProductOptions = SQLServiceArguments<
  typeof archiveMarketplaceProduct
>;

export function sqlArchiveMarketplaceProduct(): SQLRESTOptions<
  typeof archiveMarketplaceProduct
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'archive-marketplace-product'
  };
}

export type CreateMarketplaceProductOptions = SQLServiceArguments<
  typeof createMarketplaceProduct
>;

export function sqlCreateMarketplaceProduct(): SQLRESTOptions<
  typeof createMarketplaceProduct
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'create-marketplace-product'
  };
}

export type CreateMarketplaceProductCustomizationDefinitionOptions =
  SQLServiceArguments<typeof createMarketplaceProductCustomizationDefinition>;

export function sqlCreateMarketplaceProductCustomizationDefinition(): SQLRESTOptions<
  typeof createMarketplaceProductCustomizationDefinition
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'create-marketplace-product-customization-definition'
  };
}

export type DeleteMarketplaceProductCustomizationDefinitionOptions =
  SQLServiceArguments<typeof deleteMarketplaceProductCustomizationDefinition>;

export function sqlDeleteMarketplaceProductCustomizationDefinition(): SQLRESTOptions<
  typeof deleteMarketplaceProductCustomizationDefinition
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'delete-marketplace-product-customization-definition'
  };
}

export type FindMarketplaceCategoriesOptions = SQLServiceArguments<
  typeof findMarketplaceCategories
>;

export function sqlFindMarketplaceCategories(): SQLRESTOptions<
  typeof findMarketplaceCategories
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'find-marketplace-categories'
  };
}

export type FindMarketplaceProductCustomizationDefinitionsOptions =
  SQLServiceArguments<typeof findMarketplaceProductCustomizationDefinitions> & {
    missionPartnerId?: string | null;
  };

export function sqlFindMarketplaceProductCustomizationDefinitions(): SQLRESTOptions<
  typeof findMarketplaceProductCustomizationDefinitions,
  FindMarketplaceProductCustomizationDefinitionsOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'find-marketplace-product-customization-definitions'
  };
}

export type FindMarketplaceProductsOptions = SQLServiceArguments<
  typeof findMarketplaceProducts
> & {
  missionPartnerId?: string | null;
};

export function sqlFindMarketplaceProducts(): SQLRESTOptions<
  typeof findMarketplaceProducts,
  FindMarketplaceProductsOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'find-marketplace-products'
  };
}

export type GetMarketplaceProductOptions = SQLServiceArguments<
  typeof getMarketplaceProduct
> & {
  missionPartnerId?: string | null;
};

export function sqlGetMarketplaceProduct(): SQLRESTOptions<
  typeof getMarketplaceProduct,
  GetMarketplaceProductOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'get-marketplace-product'
  };
}

export type GetMarketplaceCategoryOptions = SQLServiceArguments<
  typeof getMarketplaceCategory
>;

export function sqlGetMarketplaceCategory(): SQLRESTOptions<
  typeof getMarketplaceCategory,
  GetMarketplaceCategoryOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'get-marketplace-category'
  };
}

export type GetMarketplaceProductCustomizationDefinitionOptions =
  SQLServiceArguments<typeof getMarketplaceProductCustomizationDefinition> & {
    missionPartnerId?: string | null;
  };

export function sqlGetMarketplaceProductCustomizationDefinition(): SQLRESTOptions<
  typeof getMarketplaceProductCustomizationDefinition,
  GetMarketplaceProductCustomizationDefinitionOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/products',
    name: 'get-marketplace-product-customization-definition'
  };
}

export type UpdateMarketplaceProductOptions = SQLServiceArguments<
  typeof updateMarketplaceProduct
>;

export function sqlUpdateMarketplaceProduct(): SQLRESTOptions<
  typeof updateMarketplaceProduct
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'update-marketplace-product'
  };
}

export type UpdateMarketplaceProductCustomizationDefinitionOptions =
  SQLServiceArguments<typeof updateMarketplaceProductCustomizationDefinition>;

export function sqlUpdateMarketplaceProductCustomizationDefinition(): SQLRESTOptions<
  typeof updateMarketplaceProductCustomizationDefinition
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/products',
    name: 'update-marketplace-product-customization-definition'
  };
}
