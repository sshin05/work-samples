import React, { type JSX } from 'react';
import { css } from '@cerberus/styled-system/css';
import { flex, circle } from '@cerberus/styled-system/patterns';
import type { CarbonIconType } from '@carbon/icons-react';

/**
 * Props for the InfoBlock component.
 */
type Props = {
  /**
   * The heading text displayed at the top of the info block.
   */
  heading: string;
  /**
   * The main content displayed below the heading.
   */
  content: string | React.ReactNode;
  /**
   * An icon component.
   */
  Icon: CarbonIconType;
};

/**
 * An information block with a heading, an icon, and flexible content.
 *
 * - If `content` is a string, it supports multi-line splitting by `\n`.
 *
 * @returns {JSX.Element}
 *
 * @example
 * Render with a string as content:
 * ```tsx
 * <InfoBlock
 *   heading="Address"
 *   content="123 Main Street\nSuite 456\nCity, State, ZIP"
 *   Icon={Location}
 * />
 * ```
 *
 * @example
 * Render with a ReactNode as content:
 * ```tsx
 * <InfoBlock
 *   heading="Additional Information"
 *   content={
 *     <div>
 *       <span>First Line</span>
 *       <br />
 *       <span>Second Line</span>
 *     </div>
 *   }
 *   Icon={Information}
 * />
 * ```
 */
export const InfoBlock = ({ heading, content, Icon }: Props): JSX.Element => {
  const renderContent = () => {
    if (typeof content !== 'string') {
      return content;
    }

    const lines = content.split('\n');
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column'
        })}
      >
        {lines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    );
  };

  return (
    <div className={flex({ direction: 'column', gap: '2' })}>
      <h3
        className={css({
          textStyle: 'heading-md',
          color: 'cerberus.neutral.20'
        })}
      >
        {heading}
      </h3>
      <div className={flex({ gap: '2' })}>
        <div
          className={circle({
            w: '6',
            h: '6',
            p: '1',
            background:
              'linear-gradient(216deg, #EFE5F8 -4.93%, #BB93E1 116.78%)'
          })}
        >
          <Icon size={16} />
        </div>
        <div
          className={css({
            color: 'cerberus.neutral.white',
            textStyle: 'heading-sm'
          })}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
