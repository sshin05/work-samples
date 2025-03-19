'use client';

import { ChevronDown, ChevronUp } from '@carbon/icons-react';
import { KeyboardCode } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { useState, type JSX } from 'react';

type Props = {
  /** The header title. */
  title: string;
  /** The child content to display when opened. */
  children: React.ReactNode;
  /** The initial expanded state. (Default: `false`)*/
  isExpanded?: boolean;
};

/**
 * An accordion wrapper that toggles child visibility.
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
  isExpanded = false
}: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(isExpanded);

  function toggleIsOpen() {
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
          gap: '1rem',
          my: '8',
          py: '2',
          color: 'action.text.inverse',
          userSelect: 'none',
          cursor: 'pointer'
        })}
        onClick={toggleIsOpen}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <h2
          className={css({
            textStyle: 'h5'
          })}
        >
          {title}
        </h2>
        {isOpen ? (
          <ChevronUp role="icon" data-icon="caret-up" size={24} />
        ) : (
          <ChevronDown role="icon" data-icon="caret-down" size={24} />
        )}
      </div>
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
              overflowY: 'auto',
              transform: 'translateY(0%)'
            }
          })
        )}
      >
        {children}
      </div>
    </>
  );
}
