'use client';
import React, { type ReactNode, useState } from 'react';
import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

interface NullHoverProps {
  enabled: boolean;
  width: string;
  children: ReactNode | undefined;
  onClick?: () => Promise<boolean>;
  text?: string;
  element?: React.JSX.Element;
}

export const NullHover = ({
  enabled,
  onClick,
  width,
  text,
  element,
  children
}: NullHoverProps) => {
  const [showNullHover, setShowNullHover] = useState(false);

  const handleNullHover = (hover: boolean) => {
    if (hover && enabled) {
      setShowNullHover(true);
      return;
    }

    setShowNullHover(false);
  };

  return (
    <div
      className={hstack({
        pos: 'relative',
        w: width,
        alignItems: 'stretch'
      })}
      onMouseEnter={() => {
        handleNullHover(true);
      }}
      onMouseLeave={() => {
        handleNullHover(false);
      }}
    >
      {showNullHover && (
        <div
          className={css({
            pos: 'absolute',
            w: '100%',
            h: '100%',
            bgColor: 'rgba(0, 0, 0, 50%)',
            zIndex: 10,
            cursor: onClick ? 'pointer' : 'default'
          })}
          onClick={onClick}
        >
          <div
            className={hstack({
              alignItems: 'center',
              justifyContent: 'center',
              h: '100%',
              mr: '8',
              ml: '8'
            })}
          >
            {text && <p>{text}</p>}
            {element}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
