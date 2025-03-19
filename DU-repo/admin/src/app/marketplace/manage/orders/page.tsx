'use client';
// ## PLACEHOLDER ##
// This file is a placeholder for the Marketplace Orders page. It is a work in progress and will be updated in a future release.

import { container, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { OrderItemsTable } from '@/app/marketplace/components/OrderItemsTable/OrderItemsTable';
import { OrdersTable } from '@/app/marketplace/components/OrdersTable/OrdersTable';
import ManagePageHeader from '../components/MangePageHeader/ManagePageHeader';
import { getRouteUrl } from '@/utils/getRouteUrl';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

const MarketplaceOrders = () => {
  const { missionPartnerId } = useRouteParams();
  const matomoTrackEvent = useMatomoTrackEvent();

  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'Manage Marketplace',
      href: getRouteUrl('/marketplace/manage')
    },
    {
      text: 'Orders'
    }
  ];

  return (
    <div>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Orders"
        subtitle="Deliver training at the speed of the mission."
        description="Process Orders"
      />
      <div className={container({ mt: 16 })}>
        <div className={hstack()}></div>
        <Tabs defaultValue="orders">
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
