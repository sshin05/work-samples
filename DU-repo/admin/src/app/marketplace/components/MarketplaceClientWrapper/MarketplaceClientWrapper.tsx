'use client';

import { MarketplaceCardsContainer } from '../MarketplaceCardsContainer/MarketplaceCardsContainer';

import { css } from '@cerberus/styled-system/css';
import { sqlFindMarketplaceCategories } from '@/app/api/marketplace/products';
import { sqlFindMarketplaceVendors } from '@/app/api/marketplace/vendors';
import { useSQLQuery } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';
import { TabContent as TabContentWrapper } from './components/TabContent/TabContent';
import { CategoryCards } from './components/CategoryCards/CategoryCards';
import { VendorCards } from './components/VendorCards/VendorCards';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { MarketplaceHero } from '../MarketplaceHero/MarketplaceHero';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

export function MarketplaceClientWrapper() {
  const { missionPartnerId } = useRouteParams();
  const matomoTrackEvent = useMatomoTrackEvent();

  const {
    data: marketplaceCategories,
    loading: marketplaceProductCategoriesLoading
  } = useSQLQuery(sqlFindMarketplaceCategories, {});

  const { data: marketplaceVendors } = useSQLQuery(sqlFindMarketplaceVendors, {
    options: {
      filter: { isArchived: false },
      missionPartnerId
    }
  });

  return (
    <>
      <MarketplaceHero />
      <main>
        <div
          className={css({
            maxW: '8xl',
            mt: '8',
            mx: 'auto',
            px: '16'
          })}
        >
          <div>
            <div className={css({ mb: '6' })}>
              <Tabs defaultValue="categories">
                <TabsList className={css({ mb: '6' })}>
                  <Tab
                    value="categories"
                    onClick={() => {
                      matomoTrackEvent(
                        'Marketplace Admin Portal',
                        'Tab Click',
                        'Categories'
                      );
                    }}
                  >
                    Categories
                  </Tab>
                  <Tab
                    value="vendors"
                    onClick={() => {
                      matomoTrackEvent(
                        'Marketplace Admin Portal',
                        'Tab Click',
                        'Vendors'
                      );
                    }}
                  >
                    Vendors
                  </Tab>
                </TabsList>

                <TabPanel value="vendors">
                  <TabContentWrapper title="Vendors">
                    <MarketplaceCardsContainer>
                      <VendorCards
                        missionPartnerId={missionPartnerId}
                        vendors={marketplaceVendors?.records || []}
                      />
                    </MarketplaceCardsContainer>
                  </TabContentWrapper>
                </TabPanel>

                <TabPanel value="categories">
                  <TabContentWrapper title="Categories">
                    <MarketplaceCardsContainer>
                      <CategoryCards
                        missionPartnerId={missionPartnerId}
                        categories={marketplaceCategories?.records}
                      />
                    </MarketplaceCardsContainer>
                  </TabContentWrapper>
                </TabPanel>
              </Tabs>
              {marketplaceProductCategoriesLoading && (
                <MarketplaceCardsContainer>
                  {['card-0', 'card-1', 'card-2'].map(cardName => {
                    return (
                      <div
                        role="status"
                        aria-busy
                        key={cardName}
                        className={css({
                          borderRadius: 'sm',
                          position: 'relative',
                          h: '240px',
                          // Offset bottom margin from tab item content.
                          bottom: '8'
                        })}
                      >
                        loading
                      </div>
                    );
                  })}
                </MarketplaceCardsContainer>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
