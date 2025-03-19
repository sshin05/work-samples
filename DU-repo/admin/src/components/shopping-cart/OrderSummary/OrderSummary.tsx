import { Button } from '@digital-u/digital-ui';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { CartItemCardList } from './CartItemCardList';
import { ArrowRight } from '@carbon/icons-react';
import { TARGET_TYPE_MAP } from '@/app/mp/[missionPartnerId]/curriculum-catalog/components/MpCurriculumCatalogPage/constants/TARGET_TYPE_MAP';
import type { OrderSummaryProps } from './OrderSummary.types';

export const OrderSummary = ({
  cart,
  targetType,
  checkingOut,
  handleSubmitCart,
  handleRemoveFromCart
}: OrderSummaryProps) => {
  const cartItemCounts: Record<string, number> = cart.reduce((acc, item) => {
    const typename = item.__typename?.toLowerCase();
    acc[typename] = (acc[typename] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className={vstack({
        gap: 0,
        borderRadius: 8,
        border: '1px solid',
        borderColor: 'page.border.200',
        backgroundColor: 'page.surface.100',
        w: 'full'
      })}
    >
      <div
        className={vstack({
          w: 'full',
          p: 6,
          gap: 2.5,
          alignItems: 'flex-start',
          borderBottom: '1px solid',
          borderColor: 'page.border.200'
        })}
      >
        <p className={css({ textStyle: 'heading-sm' })}>Order Summary</p>
        <div>
          {Object.entries(cartItemCounts).map(([type, count]) => (
            <p
              key={`summary-count-${type}`}
              className={css({ textStyle: 'body-md' })}
            >
              {count} {count > 1 ? `${type}s` : type}
            </p>
          ))}
        </div>

        <Button
          disabled={checkingOut || cart.length === 0}
          loading={checkingOut}
          loadingText={`Add To ${TARGET_TYPE_MAP[targetType]}`}
          onClick={handleSubmitCart}
          kind="pill-primary"
          fullWidth
        >
          Add To {TARGET_TYPE_MAP[targetType]} <ArrowRight />
        </Button>
      </div>

      <CartItemCardList items={cart} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
};
