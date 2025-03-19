import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionCell } from './TransactionCell';
import type { TokenTransactionRecords } from '../../TokensTable.types';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Tooltip: () => <div>Mock Tooltip</div>
}));

const mockTransaction = {
  orderNumber: '12345',
  source: null,
  note: null
} as TokenTransactionRecords[number];

describe('TransactionCell', () => {
  it('renders order number as a link', () => {
    render(
      <TransactionCell
        transaction={
          {
            ...mockTransaction,
            source: 'CC', // Not a manual adjustment
            note: ''
          } as TokenTransactionRecords[number]
        }
      />
    );

    const orderLink = screen.getByRole('link', {
      name: mockTransaction.orderNumber
    });
    expect(orderLink).toBeInTheDocument();
    expect(orderLink).toHaveAttribute(
      'href',
      `orders/${mockTransaction.orderNumber}`
    );
  });

  it('displays a tooltip when transaction source is MANUAL ADJUSTMENT', () => {
    render(
      <TransactionCell
        transaction={
          {
            ...mockTransaction,
            source: 'MANUAL ADJUSTMENT',
            note: 'This is a manual adjustment note.'
          } as TokenTransactionRecords[number]
        }
      />
    );

    expect(screen.getByText('Mock Tooltip')).toBeInTheDocument();
  });

  it('does not display manual adjustment tooltip by default', () => {
    render(<TransactionCell transaction={mockTransaction} />);
    expect(screen.queryByText('Mock Tooltip')).not.toBeInTheDocument();
  });
});
