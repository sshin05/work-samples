import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import type {
  sqlFindMarketplaceProducts,
  sqlGetMarketplaceProduct
} from '@/app/api/marketplace/products';
import { MarketplaceCardsContainer } from '../MarketplaceCardsContainer/MarketplaceCardsContainer';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductListPageHero } from '../ProductListPageHero/ProductListPageHero';
import { TopNav } from '@/app/marketplace/components/TopNav/TopNav';
import { useState } from 'react';
import { Show } from '@cerberus/react';

type ProductListPageProps = {
  loading: boolean;
  /** Page H1 Text, displayed in "Page Hero" section */
  pageTitle: string;
  /** Path to the logo image, displayed in "Page Hero" section */
  logoPath?: string | null;
  /** Page description, displayed in "Page Hero" section */
  heroDescription: string;
  /** Page description, displayed in the main content area */
  pageDescription?: string;
  /** Page image, displayed in the main content area */
  pageImage?: string;
  /** List of product cards */
  products: Awaited<
    ReturnType<typeof sqlFindMarketplaceProducts>
  >['_serviceData']['records'];
};

function calculateTagCounts(
  products: Awaited<
    ReturnType<typeof sqlFindMarketplaceProducts>
  >['_serviceData']['records']
) {
  return products.reduce(
    (acc, product) => {
      switch (product.productType) {
        case 'TRAINING':
          acc.trainings++;
          break;
        case 'RESOURCE':
          acc.resources++;
          break;
        default:
          console.warn(`Unexpected product type: ${product.productType}`);
      }
      return acc;
    },
    { trainings: 0, resources: 0 }
  );
}

export const ProductListPage = ({
  loading,
  products,
  pageTitle,
  logoPath,
  heroDescription,
  pageDescription,
  pageImage
}: ProductListPageProps) => {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const tagCounts = calculateTagCounts(products);

  const hasImage = Boolean(pageImage);
  const contentStyles = hasImage ? { flexBasis: '50%' } : { flexBasis: '100%' };

  return (
    <>
      <TopNav />
      <ProductListPageHero
        loading={loading}
        title={pageTitle}
        description={heroDescription}
        logoPath={logoPath}
        tagCounts={tagCounts}
        onAboutClick={() => setShowAboutUs(!showAboutUs)}
        showAboutUs={showAboutUs}
      />
      <main>
        <div
          className={css({
            maxW: '8xl',
            mt: '52px',
            mx: 'auto',
            px: '16'
          })}
        >
          <Show when={!showAboutUs}>
            <MarketplaceCardsContainer>
              {products?.map(
                (
                  product: Awaited<
                    ReturnType<typeof sqlGetMarketplaceProduct>
                  >['_serviceData']
                ) => <ProductCard key={product.id} product={product} />
              )}
            </MarketplaceCardsContainer>
          </Show>
          <Show when={showAboutUs}>
            <div
              className={flex({ justifyContent: 'space-between', gap: '8' })}
            >
              <div className={css(contentStyles)}>
                <div
                  className={css({
                    minH: '3px',
                    w: '44px',
                    bgColor: 'action.bg.initial',
                    mb: '6'
                  })}
                ></div>
                <div
                  className={css({
                    '& h1': { textStyle: 'heading-xl', mb: '6' },
                    '& h2': { textStyle: 'heading-lg', mb: '6' },
                    '& h3': { textStyle: 'heading-md', mb: '6' },
                    '& h4': { textStyle: 'heading-sm', mb: '6' },
                    '& h5': { textStyle: 'heading-xs', mb: '6' },
                    '& h6': { textStyle: 'heading-2xs', mb: '6' },
                    '& p': { textStyle: 'body', mb: '8' },
                    '& ol': { mb: '6', listStyleType: 'decimal', pl: '8' },
                    '& ul': { mb: '6', listStyleType: 'disc', pl: '8' },
                    '& li': { mb: '2' }
                  })}
                  dangerouslySetInnerHTML={{ __html: pageDescription }}
                ></div>
              </div>

              <Show when={hasImage}>
                <div
                  className={css({
                    position: 'relative',
                    height: '690px',
                    flexBasis: '40%'
                  })}
                >
                  <img
                    src={pageImage}
                    alt="Vendor brand image"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </Show>
            </div>
          </Show>
        </div>
      </main>
    </>
  );
};
