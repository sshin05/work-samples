'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { Field, Input } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

export const SlashMenuEntry = ({
  value,
  onChange,
  isActive,
  onActiveChange
}: {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
  onActiveChange: (active: boolean) => void;
}) => {
  const [inputWidth, setInputWidth] = useState('100%');
  const textMeasureRef = useRef<HTMLSpanElement>(null);

  // Update width based on text content
  useLayoutEffect(() => {
    if (isActive && value) {
      // Add some padding to the width to account for cursor and spacing
      const textWidth = textMeasureRef.current?.offsetWidth || 0;
      setInputWidth(`${textWidth + 40}px`); // Increased padding for better visibility
    } else if (isActive && !value) {
      // When active but no text, set a minimum width
      setInputWidth('150px');
    } else {
      // When not active, use full width
      setInputWidth('100%');
    }
  }, [isActive, value]);

  return (
    <Field>
      {/* Hidden span to measure text width */}
      <span
        ref={textMeasureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          fontSize: '1rem',
          paddingLeft: '8px',
          paddingRight: '8px'
        }}
      >
        {value || ''}
      </span>
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start' // Align content to the left
        }}
      >
        <Input
          className={css({
            background: 'transparent',
            border: '1px solid',
            borderColor: 'transparent',
            _active: {
              border: '1px solid',
              borderColor: 'action.border.initial'
            },
            transition: 'width 0.2s ease-in-out',
            textAlign: 'left',
            paddingLeft: '8px'
          })}
          style={{
            width: inputWidth,
            minWidth: isActive ? '150px' : 'auto',
            transformOrigin: 'left center' // Ensure growth happens from left to right
          }}
          placeholder="Add in content like a slide deck, etc. search by pressing '/'"
          id="slash-menu-entry"
          onFocus={() => onActiveChange(true)}
          onBlur={() => onActiveChange(false)}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </Field>
  );
};
