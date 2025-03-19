import React from 'react';
import { render, screen } from '@testing-library/react';
import { TokensPageHeader } from './TokensPageHeader';

describe('TokensPageHeader', () => {
  it('renders token activity header', () => {
    render(
      <TokensPageHeader
        isLoadingTokens={false}
        tokenSumDetail={{ balance: 1000, expiring: 200 }}
      />
    );

    expect(screen.getByText('Token Activity')).toBeInTheDocument();
    expect(screen.getByText('Your token balance')).toBeInTheDocument();
  });

  it('displays formatted token balance', () => {
    render(
      <TokensPageHeader
        isLoadingTokens={false}
        tokenSumDetail={{ balance: 1000, expiring: 0 }}
      />
    );

    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('indicates loading skeleton with aria-busy', () => {
    render(
      <TokensPageHeader
        isLoadingTokens={true}
        tokenSumDetail={{ balance: null, expiring: null }}
      />
    );

    expect(screen.getByRole('contentinfo')).toHaveAttribute(
      'aria-busy',
      'true'
    );
  });

  it('shows expiring tokens message when expiring tokens greater than 0', () => {
    render(
      <TokensPageHeader
        isLoadingTokens={false}
        tokenSumDetail={{ balance: 1000, expiring: 30000 }}
      />
    );

    expect(screen.getByText('30,000 tokens expire soon')).toBeInTheDocument();
  });

  it.each([
    { balance: 1000, expiring: 0, testCase: 'expiring tokens is 0' },
    { balance: 1000, expiring: null, testCase: 'expiring tokens is null' }
  ])(
    'does not show expiring tokens message when $testCase',
    ({ balance, expiring }) => {
      render(
        <TokensPageHeader
          isLoadingTokens={false}
          tokenSumDetail={{ balance, expiring }}
        />
      );

      expect(screen.queryByText(/tokens expire soon/i)).not.toBeInTheDocument();
    }
  );
});
