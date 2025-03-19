'use client';
import React, { type JSX } from 'react';
import { ChevronRight } from '@cerberus/icons';
import { flex } from '@cerberus/styled-system/patterns';

import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import type { ProgramLinkProps } from './ProgramLinkProps';
import {
  missionPartnerLogoMap,
  PROGRAM_LINK_BORDER_RADIUS,
  type AffiliateId
} from './programLinkConsts';
import { AwsImage } from '@/components_new/images/AwsImage';

/**
 * Renders a `<Link>` component wrapping program data.
 *
 * @example
 * <ProgramLink
 *   href="/path/for/navigation"
 *   tagName="Trial Phase"
 *   programName="Awesome Program"
 *   affiliateId="air-force"
 *   logoUrl="/path/to/image/resource"
 * />
 */
export const ProgramLink = ({
  logoUrl,
  tagName,
  programName,
  affiliateId,
  href
}: ProgramLinkProps): JSX.Element => {
  const logo = logoUrl || missionPartnerLogoMap(affiliateId as AffiliateId);
  return (
    <Link
      href={href}
      className={flex({
        direction: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '4',
        w: '304px',
        h: '80px',
        px: '6',
        py: '4',
        bg: { base: '#302451', _hover: '#4e476d' },
        color: 'white',
        textStyle: 'h5',
        borderRadius: PROGRAM_LINK_BORDER_RADIUS,
        overflow: 'hidden'
      })}
    >
      {/* @TODO(Lyle): Should we map the fallback image based on
       * the Program section? Example: Air Force Programs may
       * fallback to "public/images/affiliates/air-force.png" */}
      <div className={css({ w: '12', flexShrink: '0' })}>
        <AwsImage
          w="48px"
          h="48px"
          src={logo}
          bg=""
          alt="Mission Partner Logo"
          isCircularImage
        />
      </div>
      <div className={flex({ direction: 'column', gap: '1' })}>
        <span
          className={css({
            fontWeight: '400',
            textStyle: 'body-xs',
            lineHeight: '16px'
          })}
        >
          {tagName}
        </span>
        <span
          className={css({
            position: 'relative',
            boxSizing: 'border-box',
            lineHeight: '1.1',
            WebkitLineClamp: '2',
            lineClamp: '2',
            boxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pb: '4px'
          })}
        >
          {programName}
        </span>
      </div>
      <ChevronRight className={css({ ml: 'auto', flex: 'none' })} size="24" />
    </Link>
  );
};
