'use client';
import { LibraryItemIcon } from '@/app/mp/components/LibraryItemIcon/LibraryItemIcon';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import React, { type JSX } from 'react';
import type { CohortLibraryItem } from '../../../../../cohort.types';

type Props = {
  /**
   * Array of library items to display.
   */
  libraryItems: CohortLibraryItem[] | null;
};

/**
 * Displays a list of Cohort library items.
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <LibraryList libraryItems={cohort.libraryItems} />
 * ```
 */
export const LibraryList = ({ libraryItems }: Props): JSX.Element => {
  const renderItems = () => {
    if (!(libraryItems && libraryItems.length)) {
      return (
        <span
          className={css({
            textStyle: 'body-md',
            color: 'cerberus.neutral.white'
          })}
        >
          There are no library items.
        </span>
      );
    }
    return (
      <div className={flex({ direction: 'column', gap: '2' })}>
        {libraryItems.map(item => (
          <div
            key={item.id}
            className={flex({
              alignItems: 'center',
              borderRadius: 'md',
              bgColor: 'cerberus.neutral.white',
              py: '4',
              px: '6',
              gap: '4'
            })}
          >
            <LibraryItemIcon type={item.type} size="large" />
            <div className={flex({ direction: 'column' })}>
              <span
                className={css({
                  textStyle: 'label-sm',
                  color: 'page.text.100'
                })}
              >
                File
              </span>
              <span
                className={css({
                  textStyle: 'heading-xs',
                  color: 'page.text.300'
                })}
              >
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4
        className={css({
          textStyle: 'heading-md',
          color: 'cerberus.neutral.white',
          mb: '4'
        })}
      >
        Library
      </h4>
      {renderItems()}
    </div>
  );
};
