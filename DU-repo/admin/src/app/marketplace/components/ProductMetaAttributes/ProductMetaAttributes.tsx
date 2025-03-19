import {
  Badge,
  CategoryNewEach,
  Timer,
  WatsonHealthImageAvailabilityLocal
} from '@cerberus/icons';
import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { formatDurationInHours } from './utils/formatDurationInHours/formatDurationInHours';
import { formatLocationType } from './utils/formatLocationType/formatLocationType';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import type { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';

type ProductMetaAttributesProps = {
  product: Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];
  vendor?: Awaited<ReturnType<typeof sqlGetMarketplaceVendor>>['_serviceData'];
};

export const ProductMetaAttributes = ({
  product,
  vendor
}: ProductMetaAttributesProps) => {
  return (
    <>
      <div
        className={hstack({
          textStyle: 'body-sm',
          flexWrap: 'wrap',
          gap: '4'
        })}
      >
        {vendor?.name && (
          <div className={css({ display: 'flex' })}>
            {vendor?.logoPath && (
              <img
                className={css({
                  w: '20px',
                  h: '20px',
                  display: 'inline',
                  mr: '2'
                })}
                src={vendor.logoPath}
                alt="Vendor Logo"
              />
            )}
            {vendor.name}
          </div>
        )}

        {product?.durationInHours >= 0 && (
          <div className={css({ flexShrink: '0' })}>
            <Timer size={20} className={css({ display: 'inline', mr: '2' })} />
            {formatDurationInHours(product.durationInHours)}
          </div>
        )}

        {product?.locationType && (
          <div className={css({ flexShrink: '0' })}>
            <WatsonHealthImageAvailabilityLocal
              size={20}
              className={css({ display: 'inline', mr: '2' })}
            />
            {formatLocationType(product.locationType)}
          </div>
        )}

        {product?.productType == 'TRAINING' && product?.clearanceRequired && (
          <div className={css({ flexShrink: '0' })}>
            <Badge size={20} className={css({ display: 'inline', mr: '2' })} />
            {product.clearanceRequired}
          </div>
        )}

        {product?.category && product?.category?.name && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              textStyle: 'body-sm',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            })}
          >
            <CategoryNewEach
              size={20}
              className={css({ flexShrink: '0', mr: '2' })}
            />
            <span
              className={css({
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              })}
            >
              {product.category?.name}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
