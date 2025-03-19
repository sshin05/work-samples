import React from 'react';

import { render, screen } from '@@/test-utils';

import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { isValidDate } from '@/app/marketplace/utils/isValidDate';
import { getTransactionsColumns } from './TokensTableColumns';
import type { TokenTransactionRecords } from '../../TokensTable.types';

jest.mock('@/utils/date/abbreviatedDayDate', () => ({
  abbreviatedDayDate: jest.fn()
}));

jest.mock('@/app/marketplace/utils/isValidDate', () => ({
  isValidDate: jest.fn()
}));

jest.mock('../TransactionCell/TransactionCell', () => ({
  TransactionCell: jest.fn(() => <div>Mock TransactionCell</div>)
}));

describe('getTransactionsColumns', () => {
  const mockTokenTransactionRecords = [
    {
      id: '1',
      type: 'credit',
      amount: 1000,
      effectiveDate: '2023-01-01',
      expirationDate: '2024-01-01',
      source: 'MANUAL ADJUSTMENT',
      note: 'Adjustment Note',
      orderNumber: '12345'
    },
    {
      id: '2',
      type: 'debit',
      amount: 500,
      effectiveDate: '2023-02-01',
      expirationDate: '2024-02-01',
      source: '',
      note: '',
      orderNumber: '67890'
    }
  ] as unknown as TokenTransactionRecords;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all columns by default', () => {
    const filter = null;
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    expect(columns).toHaveLength(5);
    expect(columns.map(col => col.header)).toEqual([
      'Transaction',
      'Effective Date',
      'Expiration Date',
      'Credit',
      'Debit'
    ]);
  });

  it('filters columns as expected for "credits"', () => {
    const filter = 'credits';
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    expect(columns).toHaveLength(4);
    expect(columns.map(col => col.header)).toEqual([
      'Transaction',
      'Effective Date',
      'Expiration Date',
      'Credit'
    ]);
  });

  it('filters columns as expected for "debits"', () => {
    const filter = 'debits';
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    expect(columns).toHaveLength(3);
    expect(columns.map(col => col.header)).toEqual([
      'Transaction',
      'Effective Date',
      'Debit'
    ]);
  });

  it('filters out Debit column when filter is credits', () => {
    const columns = getTransactionsColumns(
      mockTokenTransactionRecords,
      'credits'
    );
    expect(columns.map(col => col.header)).not.toContain('Debit');
  });

  it('filters out Credit and Expiration Date columns when filter is debits', () => {
    const columns = getTransactionsColumns(
      mockTokenTransactionRecords,
      'debits'
    );
    expect(columns.map(col => col.header)).not.toContain('Credit');
    expect(columns.map(col => col.header)).not.toContain('Expiration Date');
  });

  it('renders TransactionCell for the Transaction column', () => {
    const filter = null;
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    const transactionColumn = columns.find(col => col.header === 'Transaction');

    render(transactionColumn.render(mockTokenTransactionRecords[0].id));

    expect(screen.getByText('Mock TransactionCell')).toBeInTheDocument();
  });

  it('calls abbreviatedDayDate for date columns when date is valid', () => {
    (isValidDate as jest.Mock).mockReturnValue(true);
    (abbreviatedDayDate as jest.Mock).mockReturnValue('Jan 01, 2023');

    const filter = null;
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    const effectiveDateColumn = columns.find(
      col => col.header === 'Effective Date'
    );
    const renderResult = effectiveDateColumn.render(
      mockTokenTransactionRecords[0].id
    );

    expect(renderResult).toEqual('Jan 01, 2023');
  });

  it('returns an empty string for invalid dates in date columns', () => {
    (isValidDate as jest.Mock).mockReturnValue(false);

    const filter = null;
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);
    const effectiveDateColumn = columns.find(
      col => col.header === 'Effective Date'
    );
    const renderResult = effectiveDateColumn.render('invalid-date');

    expect(renderResult).toEqual('');
  });

  it('returns the transaction amount for the correct type in the debit column', () => {
    const filter = null;
    const columns = getTransactionsColumns(mockTokenTransactionRecords, filter);

    const debitColumn = columns.find(col => col.header === 'Debit');
    const debitRender = debitColumn.render(mockTokenTransactionRecords[1].id);

    expect(debitRender).toEqual('500');
  });
});
