'use client';

import type { findMarketplaceTokenTransactions } from '@digital-u/services/marketplace/token-transactions/find-marketplace-token-transactions';
import type { getMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/get-marketplace-token-transaction';
import type { sumMarketplaceTokenTransactions } from '@digital-u/services/marketplace/token-transactions/sum-marketplace-token-transactions';
import type { createMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/create-marketplace-token-transaction';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type FindMarketplaceTokenTransactionsOptions = SQLServiceArguments<
  typeof findMarketplaceTokenTransactions
>;

export function sqlFindMarketplaceTokenTransactions(): SQLRESTOptions<
  typeof findMarketplaceTokenTransactions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/token-transactions',
    name: 'find-marketplace-token-transactions'
  };
}

export type GetMarketplaceTokenTransactionOptions = SQLServiceArguments<
  typeof getMarketplaceTokenTransaction
>;

export function sqlGetMarketplaceTokenTransaction(): SQLRESTOptions<
  typeof getMarketplaceTokenTransaction
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/token-transactions',
    name: 'get-marketplace-token-transaction'
  };
}

export type SumMarketplaceTokenTransactionsOptions = SQLServiceArguments<
  typeof sumMarketplaceTokenTransactions
>;

export function sqlSumMarketplaceTokenTransactions(): SQLRESTOptions<
  typeof sumMarketplaceTokenTransactions
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/token-transactions',
    name: 'sum-marketplace-token-transactions'
  };
}

export type CreateMarketplaceTokenTransactionOptions = Omit<
  SQLServiceArguments<typeof createMarketplaceTokenTransaction>,
  'modifyingUserId'
>;

export function sqlCreateMarketplaceTokenTransaction(): SQLRESTOptions<
  typeof createMarketplaceTokenTransaction,
  CreateMarketplaceTokenTransactionOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/token-transactions',
    name: 'create-marketplace-token-transaction'
  };
}
