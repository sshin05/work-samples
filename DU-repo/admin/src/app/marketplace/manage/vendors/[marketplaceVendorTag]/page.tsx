'use client';
import { container, flex } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { sqlFindMarketplaceProducts } from '@/app/api/marketplace/products';
import { useSQLQuery } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import Link from 'next/link';

const VendorDetails = () => {
  const { marketplaceVendorTag } = useRouteParams();

  const {
    data: getMarketplaceVendorData,
    loading: getMarketplaceVendorLoading
  } = useSQLQuery(sqlGetMarketplaceVendor, {
    options: { uniqueTag: marketplaceVendorTag }
  });

  const { data: marketplaceProducts, loading: marketplaceProductsLoading } =
    useSQLQuery(sqlFindMarketplaceProducts, {
      options: {
        filter: { marketplaceVendorTag }
      }
    });

  console.log('getMarketplaceVendorData', getMarketplaceVendorData);

  return (
    <div>
      <div className={flex()}>
        <h2
          className={css({
            textStyle: 'h2',
            color: 'page.text.initial'
          })}
          aria-busy={getMarketplaceVendorLoading}
        >
          Vendor Details ({marketplaceVendorTag})
          <div style={{ whiteSpace: 'pre-wrap', fontSize: 10 }}>
            {!getMarketplaceVendorData
              ? '[...]'
              : 'The data: ' +
                JSON.stringify(getMarketplaceVendorData, null, 3)}
          </div>
          {'Vendor name: ' + getMarketplaceVendorData?.name}
        </h2>
      </div>

      <div className={container()}>
        <Link
          href={getRouteUrl(
            routeGenerators.ManageMarketplaceVendorProducts({
              marketplaceVendorTag
            })
          )}
        >
          Manage Products
        </Link>

        <h3
          className={css({
            textStyle: 'h3',
            color: 'page.text.initial'
          })}
          aria-busy={marketplaceProductsLoading}
        >
          Products
        </h3>

        <ul>
          {marketplaceProducts?.records?.map(product => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.shortDescription}</p>
              <div style={{ whiteSpace: 'pre-wrap', fontSize: 10 }}>
                {!product
                  ? '[...]'
                  : 'The data: ' + JSON.stringify(product, null, 3)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorDetails;
