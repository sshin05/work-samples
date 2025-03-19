'use client';

import {
  ArrowRight,
  CaretDown,
  CaretUp,
  Logout,
  UserAvatarFilled,
  UserFilled
} from '@cerberus/icons';
import { Button, Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ReactNode, type JSX } from 'react';
import {
  useIsDuAdmin,
  useSignOut
} from '@/hooks/useCurrentSession/useCurrentSession';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useGetSession } from '@/hooks/useGetSession';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

/**
 * Renders a styled div with children and an arrow icon.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Child content.
 * @returns {JSX.Element}
 */
const QuickLink = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div
      className={hstack({
        px: '4',
        py: '3',
        gap: '2',
        _hover: { color: 'var(--cerberus-colors-cerberus-teal-90)' }
      })}
    >
      {children}
      <ArrowRight className={css({ color: 'initial' })} size={16} />
    </div>
  );
};

/**
 * Renders a navigation menu that includes the user icon, user name, and an
 * expandable menu with navigation links.
 *
 * @returns {JSX.Element}
 */
export const TopNavUser = (): JSX.Element => {
  const { isDuAdmin } = useIsDuAdmin();
  const { missionPartnerId } = useRouteParams();
  const matomoTrackEvent = useMatomoTrackEvent();

  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { signOut } = useSignOut();
  const { user } = useGetSession();

  const { firstName, lastName } = user || {};
  const helloUserString = firstName ? `Hello, ${firstName}` : 'Hello';
  const userName = `${firstName} ${lastName}`;

  function toggleExpandedState() {
    setIsExpanded(prev => !prev);
  }

  function handleDropdownClick(e: React.MouseEvent<HTMLElement>) {
    // Avoid altering the expanded state.
    e.stopPropagation();
  }

  /**
   * Uses `router.push` to avoid `basePath` ("admin/") destination.
   */
  function handleCommandCenterClick(e: React.MouseEvent) {
    e.preventDefault();
    router.push(window.location.origin);
  }

  const manageMarketplaceUrl = getRouteUrl(
    routeGenerators.Marketplace({ missionPartnerId })
  );

  const manageTokenUrls = getRouteUrl(
    routeGenerators.MarketplaceTokens({ missionPartnerId })
  );

  return (
    <div
      onClick={toggleExpandedState}
      aria-busy={!user}
      className={hstack({
        pos: 'relative',
        gap: '0',
        userSelect: 'none',
        cursor: 'pointer'
      })}
    >
      <UserFilled size={24} />
      <span
        className={css({
          px: '1',
          py: '3'
        })}
      >
        {helloUserString}
      </span>
      {isExpanded ? <CaretUp size={24} /> : <CaretDown size={24} />}

      <Show when={isExpanded}>
        <div
          onClick={handleDropdownClick}
          className={flex({
            animationName: 'fadeInDown',
            animationDuration: '250ms',
            pos: 'absolute',
            top: '12',
            right: '-1',
            direction: 'column',
            gap: '6',
            p: '6',
            borderRadius: 'md',
            bg: 'white',
            boxShadow: '0px 16px 32px 0px #7B61FF26',
            whiteSpace: 'nowrap',
            cursor: 'default',
            letterSpacing: '0.02rem'
          })}
        >
          <div className={hstack({ gap: '3' })}>
            <UserAvatarFilled
              className={css({ color: 'cerberus.neutral.10' })}
              size={48}
            />
            <div>
              <div className={css({ mb: '1' })}>
                <span
                  className={css({
                    color: 'cerberus.brand.100',
                    lineHeight: '1.25rem'
                  })}
                >
                  {userName}
                </span>
              </div>
              <a
                href="/app/profile"
                className={css({
                  color: 'cerberus.brand.60',
                  textStyle: 'body-sm',
                  fontWeight: '400',
                  letterSpacing: '0'
                })}
              >
                Profile &amp; Settings
              </a>
            </div>
          </div>
          <hr className={css({ color: 'cerberus.neutral.50' })} />

          <div
            className={flex({
              color: 'var(--cerberus-colors-cerberus-teal-80)',
              direction: 'column',
              gap: '4'
            })}
          >
            <Show when={isDuAdmin}>
              <QuickLink>
                <Link href={manageMarketplaceUrl}>Manage Marketplace</Link>
              </QuickLink>
            </Show>
            <Show when={isDuAdmin}>
              <QuickLink>
                <Link href={manageTokenUrls}>Token Activity</Link>
              </QuickLink>
            </Show>
            <QuickLink>
              <Link
                href={getRouteUrl(
                  routeGenerators.MissionPartner({
                    missionPartnerId
                  })
                )}
              >
                Admin Portal
              </Link>
            </QuickLink>
            <QuickLink>
              <Link
                // href is required but intercepted via `onClick`.
                href="/"
                onClick={handleCommandCenterClick}
              >
                Command Center
              </Link>
            </QuickLink>
          </div>
          <hr className={css({ color: 'cerberus.neutral.50' })} />

          <Button
            usage="ghost"
            shape="rounded"
            onClick={() => {
              matomoTrackEvent('Link', 'Click', 'Sign Out');
              signOut();
            }}
            className={hstack({
              justifyContent: 'start',
              px: '4',
              py: '3',
              gap: '2',
              color: 'cerberus.danger.70',
              cursor: 'pointer',
              _hover: { bg: 'none' }
            })}
          >
            Sign out <Logout size={16} />
          </Button>
        </div>
      </Show>
    </div>
  );
};
