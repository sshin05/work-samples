'use client';
import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { OrderDetailPageHeading } from './components/OrderDetailPageHeading/OrderDetailPageHeading';
import { sqlGetMarketplaceOrder } from '@/app/api/marketplace/orders';
import { sqlSumMarketplaceTokenTransactions } from '@/app/api/marketplace/token-transactions';
import { useSQLQuery } from '@/app/api';
import { OrderDetailPageBody } from './components/OrderDetailPageBody/OrderDetailPageBody';
import { TopNav } from '@/app/marketplace/components/TopNav/TopNav';
import { ConfirmModal } from '@cerberus/react';

export const OrderDetailPage = () => {
  const { referenceId, missionPartnerId } = useRouteParams();

  const { data, loading, query } = useSQLQuery(sqlGetMarketplaceOrder, {
    options: {
      referenceId
    }
  });

  const refetchOrder = () => {
    query({
      referenceId
    });
  };

  const { data: tokens } = useSQLQuery(sqlSumMarketplaceTokenTransactions, {
    options: {
      missionPartnerId
    }
  });

  return (
    <>
      <TopNav />
      <main>
        <div
          className={css({
            maxW: '8xl',
            mt: '8',
            mx: 'auto',
            px: '16'
          })}
        >
          <OrderDetailPageHeading referenceId={referenceId} />
          <ConfirmModal>
            <OrderDetailPageBody
              order={data}
              tokenBalance={tokens?.balance}
              loading={loading}
              refectchOrder={refetchOrder}
            />
          </ConfirmModal>
        </div>
      </main>
    </>
  );
};
