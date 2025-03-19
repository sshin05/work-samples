'use client';

import { grid } from '@cerberus/styled-system/patterns';

type Props = {
  children: React.ReactNode;
};

export function MarketplaceCardsContainer({ children }: Props) {
  return (
    <div
      className={grid({
        gridTemplateColumns: {
          base: 'repeat(3, 1fr)',
          xlDown: 'repeat(2, 1fr)',
          mdDown: 'repeat(1, 1fr)'
        },
        gridAutoRows: 'auto',
        gridGap: '8',
        gap: '8',
        mb: '8'
      })}
    >
      {children}
    </div>
  );
}
