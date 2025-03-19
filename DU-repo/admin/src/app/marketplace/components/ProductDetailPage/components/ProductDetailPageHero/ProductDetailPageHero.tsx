import { Button, Show, Tag } from '@cerberus/react';
import type { ProductDetailPageHeroProps } from './ProductDetailPageHero.types';
import { CTA_TEXT } from './ProductDetailPageHero.constants';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { CategoryNewEach } from '@cerberus/icons';
import { ProductMetaAttributes } from '../../../ProductMetaAttributes/ProductMetaAttributes';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Breadcrumbs } from '../../../Breadcrumbs/Breadcrumbs';
import { getBreadcrumbs } from './utils/getBreadcrumbs/getBreadcrumbs';
import { usePathname } from 'next/navigation';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

export const ProductDetailPageHero = ({
  loading,
  product,
  vendor,
  onAddAndCustomizeButtonClick
}: ProductDetailPageHeroProps) => {
  const pathname = usePathname();
  const { missionPartnerId } = useRouteParams();
  const matomoTrackEvent = useMatomoTrackEvent();

  return (
    <div
      className={hstack({
        minH: '396px',
        py: '16',
        w: '100%',
        bg: `radial-gradient(134.17% 134.17% at 41.69% 32.57%, rgba(27, 26, 25, 0.3) 0%, rgba(94, 67, 30, 0.3) 78.5%);`
      })}
      role="banner"
    >
      <div
        className={css({
          display: 'flex',
          flexDir: 'row',
          justifyContent: 'space-between',
          flexGrow: 1,
          maxW: '8xl',
          mx: 'auto',
          px: '16'
        })}
      >
        <div className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
          <div>
            <Breadcrumbs
              loading={loading}
              breadcrumbs={getBreadcrumbs({
                product,
                vendor,
                missionPartnerId,
                pathname
              })}
            />
          </div>

          <div
            aria-busy={loading}
            className={css({ pt: '2', minHeight: loading && '26px' })}
          >
            <Show when={Boolean(product && product.productType)}>
              <Tag
                gradient="amphiaraus-light"
                shape="square"
                className={css({ textTransform: 'capitalize' })}
              >
                {product?.productType?.toLocaleLowerCase()}
              </Tag>
            </Show>
          </div>

          <div
            aria-busy={loading}
            className={css({ minHeight: loading && '58px' })}
          >
            <h1
              className={css({
                textStyle: 'display-lg',
                color: 'page.text.300'
              })}
            >
              {product?.title || ''}
            </h1>
          </div>

          <div>
            {/* <Tag
              shape="square"
              gradient="charon-dark"
              className={css({ mr: '4' })}
              usage="outlined"
            >
              <Events />
              Quantity
            </Tag>

            <Tag shape="square" gradient="charon-dark" usage="outlined">
              <CurrencyDollar />
              Cost
            </Tag> */}
          </div>

          <p
            aria-busy={loading}
            className={css({ minHeight: loading && '24px' })}
          >
            {product?.shortDescription}
          </p>

          <div aria-busy={loading}>
            <Button
              className={css({ h: loading && '44px' })}
              onClick={() => {
                matomoTrackEvent(
                  'Product',
                  'Add and Customize',
                  `${product.marketplaceVendorTag} : ${product.sku}`
                );
                onAddAndCustomizeButtonClick();
              }}
            >
              {CTA_TEXT}
            </Button>
          </div>
        </div>

        <div
          aria-busy={loading}
          className={css({
            h: '100%',
            my: 'auto',
            minWidth: loading && '360px'
          })}
        >
          <div
            aria-busy={loading}
            className={css({
              mx: '4',
              xl: {
                mx: '12'
              },
              bg: 'page.surface.100',
              p: '6'
            })}
          >
            <ProductMetaAttributes product={product} vendor={vendor} />

            {product?.instructor && (
              <div className={css({ mt: '6', textStyle: 'body-sm' })}>
                <CategoryNewEach
                  size={20}
                  className={css({ display: 'inline', mr: '2' })}
                />
                {product.instructor}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
