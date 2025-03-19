'use client';

import { container, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { OrderItemsTable } from '@/app/marketplace/components/OrderItemsTable/OrderItemsTable';
import { OrdersTable } from '@/app/marketplace/components/OrdersTable/OrdersTable';
import { TopNav } from '@/app/marketplace/components/TopNav/TopNav';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';
import { useEffect } from 'react';

const MarketplaceOrders = () => {
  const { missionPartnerId } = useRouteParams();
  const matomoTrackEvent = useMatomoTrackEvent();

  useEffect(() => {
    matomoTrackEvent(
      'Test View Page',
      'Orders Page',
      `Mission Partner Id: ${missionPartnerId}`
    );
  });

  return (
    <div>
      <TopNav />
      <div className={container()}>
        <div className={hstack()}></div>
        <h3
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial',
            mb: '2',
            mt: '2'
          })}
        >
          Orders
        </h3>
        <Tabs defaultValue="orders" unmountOnExit>
          <TabsList className={css({ mb: '6' })}>
            <Tab
              value="orders"
              onClick={() => {
                matomoTrackEvent('Orders', 'Tab Click', 'Orders');
              }}
            >
              Orders
            </Tab>
            <Tab
              value="orderItems"
              onClick={() => {
                matomoTrackEvent('Orders', 'Tab Click', 'Order Items');
              }}
            >
              Order Items
            </Tab>
          </TabsList>

          <TabPanel value="orders">
            <OrdersTable missionPartnerId={missionPartnerId} />
          </TabPanel>

          <TabPanel value="orderItems">
            <OrderItemsTable missionPartnerId={missionPartnerId} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplaceOrders;
