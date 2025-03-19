'use client';
import { css } from '@cerberus/styled-system/css';
import { Tag, Text, Button, Show } from '@cerberus/react';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { flex } from '@cerberus/styled-system/patterns';
import { usePathname } from 'next/navigation';

import type { JSX } from 'react';

type ProductListPageHeroProps = {
  loading: boolean;
  /** The title */
  title: string;
  /** The description */
  description: string;
  /** The logo path */
  logoPath?: string;
  /** Counts of product types */
  tagCounts: {
    /** Number of training items */
    trainings: number;
    /** Number of resource items */
    resources: number;
  };
  onAboutClick?: () => void;
  showAboutUs?: boolean;
};

const getPluralizedText = (count: number, singular: string, plural: string) => {
  if (count === 1) {
    return singular;
  }

  return plural;
};

/**
 * Renders a hero section with breadcrumbs, title, description, and tag counts.
 *
 * @param {ProductListPageHeroProps} props
 * @returns {JSX.Element}
 *
 * @example
 * <ProductListPageHero
 *   title="My Hero Title"
 *   description="Description text goes here."
 *   tagCounts={{ trainings: 3, resources: 2 }}
 * />
 */
export function ProductListPageHero({
  loading,
  title,
  description,
  logoPath,
  tagCounts = {
    trainings: 0,
    resources: 0
  },
  onAboutClick,
  showAboutUs
}: ProductListPageHeroProps): JSX.Element {
  const { missionPartnerId } = useRouteParams();
  const pathname = usePathname();
  const isVendorPage = pathname?.includes('/vendors/');

  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'SOT-X',
      href: getRouteUrl(routeGenerators.Marketplace({ missionPartnerId }))
    },
    {
      text: title
    }
  ];

  return (
    <div
      role="banner"
      className={css({
        h: '396px'
      })}
    >
      <div
        className={css({
          h: 'full',
          w: 'full',
          pos: 'relative'
        })}
      >
        <div
          className={css({
            h: 'full',
            background: `
            url(/admin/images/topo.webp) lightgray 50% / cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '0'
          })}
        >
          {/* Background Overlay */}
          <div
            className={css({
              w: 'full',
              h: 'full',
              position: 'absolute',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 41% 29%, #14120f, #4f3e29)',
                opacity: 0.8
              }
            })}
          />
          <div
            className={flex({
              direction: 'column',
              p: '16',
              maxW: '8xl',
              m: '0 auto',
              position: 'relative',
              zIndex: 1,
              gap: '4'
            })}
          >
            <Breadcrumbs breadcrumbs={breadcrumbs} loading={loading} />
            <div className={css({ pt: '2' })}>
              {tagCounts.trainings > 0 && (
                /// @TODO(Lyle): Update gradient="charon-light" on Cerberus 0.11.
                <Tag
                  gradient="amphiaraus-light"
                  shape="square"
                  className={css({ mr: '4', minWidth: loading && '84px' })}
                  aria-busy={loading}
                >
                  {tagCounts.trainings}{' '}
                  {getPluralizedText(
                    tagCounts.trainings,
                    'Training',
                    'Trainings'
                  )}
                </Tag>
              )}
              {tagCounts.resources > 0 && (
                <Tag gradient="charon-dark" shape="square">
                  {tagCounts.resources}{' '}
                  {getPluralizedText(
                    tagCounts.resources,
                    'Resource',
                    'Resources'
                  )}
                </Tag>
              )}
            </div>
            <div
              className={flex({
                alignItems: 'center',
                maxW: '4xl',
                gap: '4'
              })}
            >
              <div
                aria-busy={loading}
                className={css({
                  maxH: '58px',
                  maxW: '58px',
                  minW: loading && '58px',
                  minH: loading && '58px'
                })}
              >
                {logoPath && <img src={logoPath} alt="Logo" />}
              </div>

              <div
                aria-busy={loading}
                className={css({
                  textStyle: 'display-lg',
                  minWidth: loading && '120px',
                  minHeight: loading && '58px'
                })}
              >
                {title}
              </div>
            </div>
            <Text
              aria-busy={loading}
              className={css({
                minH: '18',
                lineClamp: '3',
                textOverflow: 'ellipsis',
                maxW: loading && '320px'
              })}
            >
              {description}
            </Text>
            <Show when={isVendorPage}>
              <div
                aria-busy={loading}
                className={css({ pb: '4', maxW: loading && '108px' })}
              >
                <Button
                  disabled={loading}
                  className={css({ h: '44px' })}
                  usage="outlined"
                  onClick={onAboutClick}
                >
                  {showAboutUs ? 'Browse Products' : 'About Us'}
                </Button>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
