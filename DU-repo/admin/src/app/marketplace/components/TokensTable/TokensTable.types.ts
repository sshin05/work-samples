import type { sqlFindMarketplaceTokenTransactions } from '@/app/api/marketplace/token-transactions';

export type TokenTransactionRecords = Awaited<
  ReturnType<typeof sqlFindMarketplaceTokenTransactions>
>['_serviceData']['records'];

export type TableFilters = 'credits' | 'debits' | null;
