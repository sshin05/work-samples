'use client';

import { Table } from '../Table/Table';
import { useEffect, useMemo, useState } from 'react';
import { getTransactionsColumns } from './components/TransactionColumns/TokensTableColumns';
import type { TableFilters } from './TokensTable.types';
import { useSQLQuery } from '@/app/api';
import { sqlFindMarketplaceTokenTransactions } from '@/app/api/marketplace/token-transactions';

const limit = 20;

type TokensTableProps = {
  missionPartnerId: string;
  filter: TableFilters;
};

export function TokensTable({ missionPartnerId, filter }: TokensTableProps) {
  const [options, setOptions] = useState<any>({
    filter: { missionPartnerId },
    limit: 20,
    page: 0
  });

  const {
    error: tokenTransactionsError,
    data: tokenTransactions,
    loading: tokenTransactionsLoading,
    query: queryMarketplaceTokenTransactions
  } = useSQLQuery(sqlFindMarketplaceTokenTransactions, { options });

  if (tokenTransactionsError) {
    console.error(tokenTransactionsError);
  }

  const columns = useMemo(
    () => getTransactionsColumns(tokenTransactions?.records, filter),
    [tokenTransactions?.records, filter]
  );

  const handleSetOptions = (
    _cursor = null,
    _limit,
    sortKey,
    sortDirection,
    _filter,
    _searchInputValue
  ) => {
    const newOptions = { ...options };

    if (sortKey) {
      newOptions.sort = { key: sortKey, direction: sortDirection };
    }

    // if (searchInputValue) {
    //   newOptions.filter = {
    //     ...options.filter,
    //     search: searchInputValue
    //   };
    // }

    setOptions(newOptions);
    queryMarketplaceTokenTransactions(newOptions);
  };

  useEffect(() => {
    queryMarketplaceTokenTransactions({
      ...options,
      filter: {
        missionPartnerId,
        filter
      }
    });
  }, [filter]);

  return (
    <Table
      caption="Tokens Table"
      setOptions={handleSetOptions}
      data={tokenTransactions?.records ?? []}
      columns={columns}
      total={tokenTransactions?.records?.length || 0}
      limit={limit}
      loading={tokenTransactionsLoading}
      page={1}
      // onRowClick={handleRowClick}
      // searchOptions={{ placeholder: 'Search ' }}
    />
  );
}
