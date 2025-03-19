'use client';

import type { addProductToCart } from '@digital-u/services/marketplace/carts/add-product-to-cart';
import type { getMarketplaceCart } from '@digital-u/services/marketplace/carts/get-marketplace-cart';
import type { removeItemFromCart } from '@digital-u/services/marketplace/carts/remove-item-from-cart';
import type { submitCart } from '@digital-u/services/marketplace/carts/submit-cart';
import type { makePaymentWithMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/make-payment-with-marketplace-token-transaction';
import type { makePaymentWithContracting } from '@digital-u/services/marketplace/orders/make-payment-with-contracting';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type GetMarketplaceCartOptions = Omit<
  SQLServiceArguments<typeof getMarketplaceCart>,
  'userId'
>;

export function sqlGetMarketplaceCart(): SQLRESTOptions<
  typeof getMarketplaceCart,
  GetMarketplaceCartOptions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/carts',
    name: 'get-marketplace-cart'
  };
}

export type SubmitCartOptions = Omit<
  SQLServiceArguments<typeof submitCart>,
  'userId'
>;

export function sqlSubmitCart(): SQLRESTOptions<
  typeof submitCart,
  SubmitCartOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/carts',
    name: 'submit-cart',
    invalidatesRoutes: [
      '/admin/api/marketplace/orders',
      '/admin/api/marketplace/order-items'
    ]
  };
}

export type AddProductToCartOptions = Omit<
  SQLServiceArguments<typeof addProductToCart>,
  'userId'
>;

export function sqlAddProductToCart(): SQLRESTOptions<
  typeof addProductToCart,
  AddProductToCartOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/carts',
    name: 'add-product-to-cart'
  };
}

export type RemoveItemFromCartOptions = Omit<
  SQLServiceArguments<typeof removeItemFromCart>,
  'userId'
>;

export function sqlRemoveItemFromCart(): SQLRESTOptions<
  typeof removeItemFromCart,
  RemoveItemFromCartOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/carts',
    name: 'remove-item-from-cart'
  };
}

export type MakePaymentWithMarketplaceTokenTransactionOptions = Omit<
  SQLServiceArguments<typeof makePaymentWithMarketplaceTokenTransaction>,
  'modifyingUserId'
>;

export function sqlMakePaymentWithMarketplaceTokenTransaction(): SQLRESTOptions<
  typeof makePaymentWithMarketplaceTokenTransaction,
  MakePaymentWithMarketplaceTokenTransactionOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/carts',
    name: 'make-payment-with-marketplace-token-transaction',
    invalidatesRoutes: [
      '/admin/api/marketplace/orders',
      '/admin/api/marketplace/order-items'
    ]
  };
}

export type MakePaymentWithContractingOptions = Omit<
  SQLServiceArguments<typeof makePaymentWithContracting>,
  'modifyingUserId'
>;

export function sqlMakePaymentWithContracting(): SQLRESTOptions<
  typeof makePaymentWithContracting,
  MakePaymentWithContractingOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/carts',
    name: 'make-payment-with-contracting',
    invalidatesRoutes: [
      '/admin/api/marketplace/orders',
      '/admin/api/marketplace/order-items'
    ]
  };
}
