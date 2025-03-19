'use client';

import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState, type JSX } from 'react';

type Props = {
  /** The href for navigation to a vendor. */
  href?: string;
  /** The title for categories/vendors. */
  title: string;
  /** The description for categories/vendors. */
  description: string;
  /** The URL for vendor icons. */
  iconUrl?: string;
};

const TITLE_MAX_LINES = 6;
const TITLE_LINE_HEIGHT = 28.8;
// The number of lines available for the description decreases as the title lines increase.
const TITLE_TO_DESCRIPTION_LINES_MAP = { 1: 6, 2: 5, 3: 4, 4: 3, 5: 2 };

/**
 * A `<Link>` card wrapping a title, description, and optional icon.
 *
 * This component provides line clamp handling for the title and description.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <CategoryListCard
 *   href="navigate/to/here"
 *   title="Some Title That Might Be Long"
 *   description="This is a potentially long description."
 *   iconUrl="/path/to/icon.png"
 * />
 */

export function CategoryListCard({
  href,
  title,
  description,
  iconUrl
}: Props): JSX.Element {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [titleLineCount, setTitleLineCount] = useState(1);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const titleHeight = titleRef.current.offsetHeight;
      setTitleLineCount(Math.round(titleHeight / TITLE_LINE_HEIGHT));
    }
  }, []); // Dependency array empty; expecting no title change after initial paint.

  function renderDescription() {
    if (titleLineCount > 5) return null;

    const lines: number = TITLE_TO_DESCRIPTION_LINES_MAP[titleLineCount];

    return (
      <p
        className={css({
          textStyle: 'body-md',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        })}
        // `style` is used to achieve dynamic line clamping to avoid
        // issues with runtime styling in Panda CSS.
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: lines
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    );
  }

  const isLoading = !href;

  return (
    <Link
      aria-busy={isLoading}
      className={css({ bg: 'page.surface.200', p: '6', borderRadius: 'sm' })}
      href={href}
    >
      <div className={flex({ direction: 'row' })}>
        {iconUrl && (
          <span
            className={css({
              display: 'inline-block',
              w: '31',
              h: '31',
              mr: '4',
              verticalAlign: 'middle'
            })}
          >
            <img
              width={31}
              height={31}
              src={iconUrl}
              alt="Vendor icon"
              className={css({ w: 'full', h: 'full', objectFit: 'cover' })}
            />
          </span>
        )}
        <h3
          ref={titleRef}
          className={css({
            mb: '4',
            textStyle: 'h4',
            letterSpacing: '0.01em',
            lineClamp: TITLE_MAX_LINES,
            lineHeight: `${TITLE_LINE_HEIGHT}px`,
            wordBreak: 'normal',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })}
        >
          <span className={css({ verticalAlign: 'middle' })}>{title}</span>
        </h3>
      </div>
      {renderDescription()}
    </Link>
  );
}
