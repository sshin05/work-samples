'use client';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SotxLogo } from './components/SotxLogo/SotxLogo';
import { TopNavCart } from './components/TopNavCart/TopNavCart';
import { TopNavOrders } from './components/TopNavOrders/TopNavOrders';
import { TopNavUser } from './components/TopNavUser/TopNavUser';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

import type { JSX } from 'react';

/// @TODO(Lyle): Logo will be specific to a given Mission Partner.
// [Source](https://repo.bespin.cce.af.mil/bespin/products/digital-u/licensed/digital-university/-/issues/5764)
const TEMPORARY_SOTX_ICON = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 47H42.9072L47 42.8823V1H1V47ZM38.5001 42.0031C36.0328 40.4821 33.7679 38.6829 31.6727 36.6611C29.7328 34.7877 26.7346 31.8089 24.2167 29.316C24.8489 28.6927 25.4377 28.1066 25.9615 27.591C28.212 29.8835 31.2537 32.8698 33.2802 35.1661C34.8263 36.9171 37.1852 40.0406 38.5759 41.9326C38.6012 41.966 38.6084 42.0105 38.6265 42.0476C38.5832 42.0327 38.5362 42.029 38.5001 42.0031ZM41.4406 7.38435C41.6392 7.48081 41.8488 7.73306 42.0113 7.69968C42.5748 7.58839 43.1203 7.37694 43.673 7.21C43.7416 7.18774 43.8103 7.18403 43.8825 7.1729C43.8717 7.24339 43.8608 7.31016 43.8464 7.38064C43.7163 8.02613 43.2504 8.65677 43.3948 9.32452C43.4671 9.43581 43.5682 9.55452 43.6224 9.67323C43.6911 9.82532 43.7236 9.99226 43.7741 10.1518C43.6188 10.1258 43.4599 10.0665 43.3082 10.0776C43.1637 10.0887 42.9722 10.0887 42.8422 10.1369L40.9746 8.21903C41.036 8.08548 41.036 7.87032 41.0432 7.7071C41.054 7.55129 40.9962 7.38806 40.9709 7.22855C41.1263 7.28048 41.2924 7.31387 41.4369 7.38435H41.4406ZM26.2794 17.7344C26.4131 17.5823 26.4384 17.2855 26.8032 17.6082C27.4679 18.1944 28.1073 18.8064 28.7647 19.4037C28.8008 19.4371 28.8803 19.4223 28.9381 19.4185C29.0826 19.4148 29.2235 19.4074 29.3644 19.3963C29.4113 19.3926 29.4836 19.3926 29.5089 19.3592L34.3386 13.9319C35.2092 13.0527 36.1159 12.2106 37.0732 11.4205C38.2653 10.4374 39.4863 9.48403 40.6783 8.50097L42.5243 10.3966C42.1739 10.7194 41.8379 11.0606 41.5417 11.4316H41.5453C40.7 12.5037 39.9559 13.6611 39.0744 14.6961C36.8709 17.2781 34.3567 19.5224 31.716 21.6221C31.6835 21.6481 31.6763 21.7148 31.6727 21.7631C31.6618 21.9077 31.6546 22.0561 31.651 22.2008C31.651 22.2602 31.6366 22.3418 31.6655 22.3789C32.2471 23.0503 32.8467 23.7106 33.4139 24.3932C33.7281 24.7679 33.4391 24.7902 33.291 24.9311C33.1321 25.0795 32.9515 24.8977 32.9081 24.8458C32.1893 24.0334 31.474 23.2098 30.7551 22.3974C30.7443 22.3863 30.7262 22.3789 30.7046 22.3752L28.6202 20.2347C28.6202 20.2347 28.6022 20.205 28.5913 20.1939C27.8508 19.5039 27.103 18.8176 26.3625 18.1276C26.3119 18.0831 26.1349 17.8976 26.2794 17.7344ZM28.2662 20.754L30.2133 22.7535C28.7972 24.1744 27.392 25.61 25.9615 27.016C25.8315 27.1458 25.6906 27.2831 25.5497 27.4203C25.4811 27.4908 25.4088 27.5613 25.3366 27.6318C25.2246 27.7431 25.109 27.8581 24.9898 27.9768C24.9428 28.025 24.8959 28.0695 24.8489 28.114C24.6755 28.2847 24.4985 28.4627 24.3179 28.6408C24.2673 28.689 24.2204 28.7373 24.1698 28.7892C21.5183 31.4156 18.0685 34.8471 15.9227 36.9208C13.8275 38.9426 11.5626 40.7418 9.09534 42.2664V42.259C9.05921 42.2813 9.01225 42.2887 8.9689 42.3035C8.98335 42.2627 8.99419 42.2182 9.01947 42.1885C10.4139 40.2929 12.7691 37.1731 14.3152 35.4221C16.479 32.9737 19.8024 29.7314 22.0818 27.3906C22.0818 27.3906 22.0782 27.3869 22.0746 27.3832L25.4847 23.8813L28.2662 20.754ZM23.6279 25.1871C23.1005 25.7287 22.5767 26.2666 22.0493 26.8082L21.8723 26.99C21.7928 26.9084 21.7098 26.8305 21.6339 26.7563C20.2034 25.3503 18.7982 23.9147 17.3785 22.4939L19.3256 20.4944L22.1071 23.6216C22.6128 24.1447 23.1222 24.664 23.6279 25.1871ZM10.515 11.1682C11.4723 11.9584 12.379 12.8005 13.2496 13.6797L18.0793 19.1069C18.1046 19.1403 18.1768 19.1403 18.2238 19.144C18.3647 19.1552 18.5092 19.1626 18.6501 19.1663C18.7079 19.1663 18.7873 19.1811 18.8235 19.1515C19.4773 18.5542 20.1203 17.9384 20.785 17.356C21.1498 17.0332 21.1715 17.33 21.3088 17.4821C21.4533 17.6453 21.2763 17.8308 21.2257 17.8753C20.4852 18.5653 19.7374 19.2516 18.9969 19.9416C18.9824 19.9527 18.9752 19.9676 18.968 19.9824L16.8836 22.1229C16.8619 22.1266 16.8403 22.134 16.833 22.1452C16.1142 22.9576 15.4025 23.7811 14.6801 24.5935C14.6367 24.6455 14.4561 24.8273 14.2972 24.6789C14.149 24.5416 13.8601 24.5156 14.1743 24.141C14.7451 23.4584 15.3411 22.8018 15.9227 22.1266C15.9552 22.0895 15.9408 22.0079 15.9372 21.9485C15.9336 21.8039 15.9263 21.6555 15.9155 21.5108C15.9119 21.4626 15.9047 21.3958 15.8722 21.3698C13.2315 19.2702 10.7173 17.0258 8.51374 14.4439C7.62871 13.4089 6.88817 12.2477 6.04288 11.1794H6.04649C5.75389 10.8084 5.41432 10.4671 5.06392 10.1444L6.90985 8.24871C8.10193 9.23177 9.32292 10.1852 10.515 11.1682ZM3.91519 6.95403C4.46788 7.12468 5.01335 7.33242 5.57688 7.44371C5.73944 7.4771 5.94896 7.22484 6.14764 7.12839C6.29574 7.0579 6.4583 7.02452 6.61363 6.97258C6.58835 7.1321 6.53055 7.29532 6.54139 7.45113C6.55222 7.61435 6.55222 7.82952 6.61002 7.96306L4.74242 9.88097C4.61238 9.83274 4.42453 9.83274 4.27643 9.82161H4.28004C4.12832 9.81419 3.96937 9.87355 3.81404 9.89952C3.86461 9.74 3.89713 9.56935 3.96576 9.42097C4.01995 9.30597 4.12109 9.18726 4.19334 9.07226C4.34145 8.40081 3.87545 7.77387 3.74179 7.12468C3.72734 7.05419 3.71651 6.98742 3.70567 6.91694C3.7743 6.92806 3.84655 6.93548 3.91519 6.95403Z"
      fill="#ECA64B"
    />
  </svg>
);

type Props = {
  /**
   * Determines the display variant of the navigation bar.
   * - 'block' positions the bar as sticky at the top of the page.
   * - 'floating' positions the bar as a transparent overlay.
   * @default 'block'
   */
  variant?: 'block' | 'floating';
};

/**
 * Renders a marketplace navigation bar with mission partner-specific branding.
 *
 * @param {Props} props - The properties for the TopNav component.
 * @returns {JSX.Element} The rendered TopNav component.
 *
 * @example
 * <TopNav />
 */
export const TopNav = ({ variant = 'block' }: Props): JSX.Element => {
  const { missionPartnerId } = useRouteParams();

  const pathname = usePathname();
  const isSelected = !pathname.includes('/orders');

  const blockStyle = css({
    position: 'sticky',
    top: '0',
    zIndex: 'overlay',
    bg: 'page.surface.initial',
    py: '4'
  });

  const floatingStyle = css({
    position: 'fixed',
    top: 0,
    zIndex: 'overlay',
    bg: 'page.surface.initial',
    height: '98px'
  });

  const variantStyle = variant == 'block' ? blockStyle : floatingStyle;

  const renderAdminPortalLink = () => {
    if (variant == 'block') {
      return (
        <div className={hstack({ gap: 'inherit' })}>
          <Link
            className={css({ justifySelf: 'center' })}
            href={getRouteUrl(
              routeGenerators.Marketplace({ missionPartnerId })
            )}
          >
            <TEMPORARY_SOTX_ICON />
          </Link>
          <Link
            aria-selected={isSelected}
            href={getRouteUrl(
              routeGenerators.Marketplace({ missionPartnerId })
            )}
            className={css({
              ml: '8',
              px: '1',
              py: '3',
              _hover: {
                color: 'secondaryAction.navigation.hover'
              },
              _selected: {
                color: 'secondaryAction.navigation.hover'
              }
            })}
          >
            {/* /// @TODO(Lyle): This value will be dynamic. */}
            SOT-X
          </Link>
        </div>
      );
    } else {
      return (
        <Link
          href={getRouteUrl(
            routeGenerators.MissionPartner({ missionPartnerId })
          )}
          className={hstack({ gap: '2' })}
        >
          <Image
            src="/admin/images/digitalu-logo.svg"
            alt=""
            width={36}
            height={36}
          />
          <span
            className={css({
              py: '3',
              px: '1'
            })}
          >
            Admin Portal
          </span>
        </Link>
      );
    }
  };

  return (
    <div className={hstack({ w: 'full', justifyContent: 'center' })}>
      <div
        role="navigation"
        className={cx(
          variantStyle,
          hstack({
            position: 'relative',
            gap: '0',
            justifyContent: 'space-between',
            w: 'full',
            maxW: '1440px',
            px: '16',
            color: 'page.text.initial',
            textStyle: 'h6',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap'
          })
        )}
      >
        {renderAdminPortalLink()}
        <div
          className={css({
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0)'
          })}
        >
          {variant == 'floating' && <SotxLogo />}
        </div>
        <div className={hstack({ gap: '6' })}>
          <TopNavUser />
          <TopNavOrders />
          <TopNavCart />
        </div>
      </div>
    </div>
  );
};
