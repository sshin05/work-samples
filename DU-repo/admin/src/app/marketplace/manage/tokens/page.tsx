'use client';
// ## PLACEHOLDER ##
// This file is a placeholder for the Marketplace Orders page. It is a work in progress and will be updated in a future release.

import { TopNav } from '@/app/marketplace/components/TopNav/TopNav';
import { container, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { TokensTable } from '@/app/marketplace/components/TokensTable/TokensTable';

const MarketplaceOrders = () => {
  const { _missionPartnerId } = useRouteParams();

  return (
    <div>
      <TopNav />
      <div className={container({ mt: 10, maxW: '1440px', px: '16' })}>
        <div className={hstack()}></div>
        <h3
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial',
            mb: '2',
            mt: '2'
          })}
        >
          Token Transactions
        </h3>
        <Tabs defaultValue="transactions">
          <TabsList className={css({ mb: '6' })}>
            <Tab value="transactions">Transactions</Tab>
            <Tab value="credits">Credits</Tab>
            <Tab value="debits">Debits</Tab>
          </TabsList>

          <TabPanel value="transactions">
            <TokensTable
              missionPartnerId="abcdef10-1234-1234-1234-000000000001"
              filter={null}
            />
          </TabPanel>

          <TabPanel value="credits">
            <TokensTable
              missionPartnerId="abcdef10-1234-1234-1234-000000000001"
              filter="credits"
            />
          </TabPanel>

          <TabPanel value="debits">
            <TokensTable
              missionPartnerId="abcdef10-1234-1234-1234-000000000001"
              filter="debits"
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplaceOrders;
