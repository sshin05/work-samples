import type { TableFilters, TokenTransactionRecords } from '../../TokensTable.types';

import { TransactionCell } from '../TransactionCell/TransactionCell';
import { formatTransactionDate } from '../../utils/formatTransactionDate/formatTransactionDate';
import { CreditCell } from '../CreditCell/CreditCell';

const getTransactionById = (
  id: string,
  tokenTransactionRecords: TokenTransactionRecords
) => {
  return (tokenTransactionRecords || []).find(
    transaction => transaction.id === id
  );
};

const getAmountForTransactionType = ({
  id,
  transactionType,
  tokenTransactionRecords
}: {
  id: string;
  transactionType: 'credit' | 'debit';
  tokenTransactionRecords: TokenTransactionRecords;
}): number | string => {
  const transaction = getTransactionById(id, tokenTransactionRecords);
  if (!transaction) {
    return '';
  }

  if (transaction.type === transactionType) {
    return transaction.amount;
  }

  return '';
};

const EXPIRATION_DATE_HEADER = 'Expiration Date';
const CREDIT_HEADER = 'Credit';
const DEBIT_HEADER = 'Debit';

export const getTransactionsColumns = (
  tokenTransactionRecords: TokenTransactionRecords,
  filter: TableFilters
) => {
  const columns = [
    {
      header: 'Transaction',
      accessor: 'id',
      sortable: true,
      render: (id: string) => {
        const transaction = getTransactionById(id, tokenTransactionRecords);

        return <TransactionCell transaction={transaction} />;
      }
    },
    {
      header: 'Effective Date',
      accessor: 'effectiveDate',
      sortable: true,
      render: formatTransactionDate
    },
    {
      header: EXPIRATION_DATE_HEADER,
      accessor: 'expirationDate',
      sortable: true,
      render: formatTransactionDate
    },
    {
      header: CREDIT_HEADER,
      accessor: 'id',
      sortable: true,
      render: (id: string) => {
        const transaction = getTransactionById(id, tokenTransactionRecords);

        return <CreditCell transaction={transaction} />;
      }
    },
    {
      header: DEBIT_HEADER,
      accessor: 'debit',
      sortable: true,
      render: (id: string) => {
        return getAmountForTransactionType({
          id,
          tokenTransactionRecords,
          transactionType: 'debit'
        }).toLocaleString();
      }
    }
  ];

  if (filter === 'credits') {
    return columns.filter(column => column.header !== DEBIT_HEADER);
  }

  if (filter === 'debits') {
    return columns.filter(
      column =>
        column.header !== CREDIT_HEADER &&
        column.header !== EXPIRATION_DATE_HEADER
    );
  }

  return columns;
};
export { formatTransactionDate };
