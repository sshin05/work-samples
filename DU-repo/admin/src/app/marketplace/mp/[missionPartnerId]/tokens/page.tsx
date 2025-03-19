'use client';

import { useRouteParams } from '@/hooks/useRouteParams';

import { css } from '@cerberus/styled-system/css';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { container, hstack } from '@cerberus/styled-system/patterns';
import { TopNav } from '@/app/marketplace/components/TopNav/TopNav';
import { TokensTable } from '@/app/marketplace/components/TokensTable/TokensTable';
import { sqlSumMarketplaceTokenTransactions } from '@/app/api/marketplace/token-transactions';
import { TokensPageHeader } from './components/TokensPageHeader/TokensPageHeader';
import { useSQLQuery } from '@/app/api';

const MarketplaceTokenTransactions = () => {
  const { missionPartnerId } = useRouteParams();

  const {
    error: tokenSumError,
    data: tokenSumDetail,
    loading: tokenSumLoading
  } = useSQLQuery(sqlSumMarketplaceTokenTransactions, {
    options: { missionPartnerId }
  });

  if (tokenSumError) {
    console.error(tokenSumError);
  }

  return (
    <div>
      <TopNav />
      <div className={container({ mt: 10, maxW: '1440px', px: '16' })}>
        <div className={hstack()}></div>
        <TokensPageHeader
          tokenSumDetail={tokenSumDetail}
          isLoadingTokens={tokenSumLoading !== false || tokenSumDetail === null}
        />
        <Tabs defaultValue="transactions">
          <TabsList className={css({ mb: '6' })}>
            <Tab value="transactions">Transactions</Tab>
            <Tab value="credits">Credits</Tab>
            <Tab value="debits">Debits</Tab>
          </TabsList>

          <TabPanel value="transactions">
            <TokensTable missionPartnerId={missionPartnerId} filter={null} />
          </TabPanel>

          <TabPanel value="credits">
            <TokensTable missionPartnerId={missionPartnerId} filter="credits" />
          </TabPanel>

          <TabPanel value="debits">
            <TokensTable missionPartnerId={missionPartnerId} filter="debits" />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplaceTokenTransactions;
