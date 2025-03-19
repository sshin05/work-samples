import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreditCell } from './CreditCell';
import type { TokenTransactionRecords } from '../../TokensTable.types';
import { formatTransactionDate } from '../TransactionColumns/TokensTableColumns';

jest.mock('../TransactionColumns/TokensTableColumns', () => ({
  formatTransactionDate: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Tooltip: () => <div>Mock Tooltip</div>
}));

const daysToMilliSeconds = (days: number): number => days * 24 * 60 * 60 * 1000;

describe('CreditCell', () => {
  const mockTransaction: TokenTransactionRecords[number] = {
    amount: 100000,
    expirationDate: new Date('2024-03-15').toISOString()
  } as TokenTransactionRecords[number];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the formatted transaction amount', () => {
    render(<CreditCell transaction={mockTransaction} />);

    expect(screen.getByText('100,000')).toBeInTheDocument();
  });

  it('renders the information icon and tooltip when the transaction is expiring soon', () => {
    const expiringTransaction = {
      ...mockTransaction,
      expirationDate: new Date(
        Date.now() + daysToMilliSeconds(89)
      ).toISOString()
    };
    (formatTransactionDate as jest.Mock).mockReturnValue('Mar 15, 2024');

    render(<CreditCell transaction={expiringTransaction} />);

    expect(screen.getByText('Mock Tooltip')).toBeInTheDocument();
  });

  it('does not render the information icon when the transaction is not expiring soon', () => {
    const nonExpiringTransaction = {
      ...mockTransaction,
      expirationDate: new Date(
        Date.now() + daysToMilliSeconds(91)
      ).toISOString()
    };

    render(<CreditCell transaction={nonExpiringTransaction} />);
    expect(screen.queryByText('Mock Tooltip')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Expiration notice')
    ).not.toBeInTheDocument();
  });

  it('handles invalid expiration date values', () => {
    const invalidDateTransaction = {
      ...mockTransaction,
      expirationDate: 'invalid-date'
    };

    render(<CreditCell transaction={invalidDateTransaction} />);
    expect(screen.queryByText('Mock Tooltip')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Expiration notice')
    ).not.toBeInTheDocument();
  });
});
