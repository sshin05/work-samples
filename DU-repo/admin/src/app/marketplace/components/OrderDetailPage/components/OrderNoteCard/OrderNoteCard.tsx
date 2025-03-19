'use client';
import { css } from '@cerberus/styled-system/css';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { replaceOrderStatusInText } from '@/app/marketplace/utils/orderStatus';

import type { JSX } from 'react';

export function OrderNoteCard({ note }): JSX.Element {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        bg: 'page.surface.200',
        px: '6',
        py: '6',
        border: '1px solid #000',
        alignSelf: 'stretch',
        gap: '1rem'
      })}
    >
      <h5
        className={css({
          textStyle: 'h6',
          letterSpacing: '0.01em',
          wordBreak: 'normal',
          whiteSpace: 'normal',
          overflowWrap: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          verticalAlign: 'middle',
          lineClamp: '2'
        })}
      >
        {abbreviatedDayDate(note?._updatedAt)}
        <span className={css({ textStyle: 'mono-xs', ml: '.5rem' })}>
          {note?.user?.firstName && note?.user?.lastName
            ? `by ${note?.user?.firstName} ${note?.user?.lastName}`
            : ''}
        </span>
      </h5>

      {replaceOrderStatusInText(note?.note || '')}
    </div>
  );
}
