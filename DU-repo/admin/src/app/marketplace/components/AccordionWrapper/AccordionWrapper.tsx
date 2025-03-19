'use client';

import { CaretDown, CaretUp } from '@cerberus/icons';
import { KeyboardCode } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { useState, type JSX } from 'react';

type Props = {
  /** The header title. */
  title: string;
  /** The child content to display when opened. */
  children: React.ReactNode;
  /** Callback when the accordion is expanded. */
  onExpand?: () => void;
  /** The initial expanded state. (Default: `false`)*/
  isExpanded?: boolean;
  /** Flips the caret and title */
  isReversed?: boolean;
  /** The size of the caret icon. (Default: `lg`) */
  size?: 'sm' | 'lg';
};

/**
 * An accordion wrapper that toggles child visibility.
 * Customized to match the Marketplace designs.
 * It can be controlled via mouse clicks or the keyboard.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <AccordionWrapper title="Accordion Title" isExpanded={true}>
 *   <p>This is the accordion content.</p>
 * </AccordionWrapper>
 */
export function AccordionWrapper({
  title,
  children,
  onExpand,
  isExpanded = false,
  isReversed = false,
  size = 'lg'
}: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const caretSize = size === 'sm' ? 24 : 32;
  const titleSize = size === 'sm' ? 'label-md' : 'h5';

  function toggleIsOpen() {
    onExpand?.();
    setIsOpen(prev => !prev);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    const { code: keyCode } = e;
    if (keyCode === KeyboardCode.Space || keyCode === KeyboardCode.Enter) {
      e.preventDefault(); // Avoid "Space" scroll
      toggleIsOpen();
    }
  }

  return (
    <>
      <div
        className={flex({
          direction: 'row',
          alignItems: 'center',
          gap: '2',
          mb: size === 'sm' ? '0' : '3',
          py: '2',
          color: 'action.text.inverse',
          userSelect: 'none',
          cursor: 'pointer',
          flexDirection: isReversed ? 'row-reverse' : 'row',
          justifySelf: 'flex-start'
        })}
        onClick={toggleIsOpen}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {isOpen ? (
          <CaretUp role="icon" data-icon="caret-up" size={caretSize} />
        ) : (
          <CaretDown role="icon" data-icon="caret-down" size={caretSize} />
        )}
        <h2
          className={css({
            textStyle: titleSize
          })}
        >
          {title}
        </h2>
      </div>
      <div className={css({ overflowY: 'hidden' })}>
        <div
          data-state={isOpen ? 'open' : 'closed'}
          aria-hidden={!isOpen}
          className={cx(
            css({
              h: '0',
              visibility: 'hidden',
              overflow: 'hidden',
              transform: 'translateY(-25%)',
              transition: 'all',
              transitionDuration: '0.3s',
              _open: {
                h: 'auto',
                visibility: 'visible',
                transform: 'translateY(0%)'
              }
            })
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
