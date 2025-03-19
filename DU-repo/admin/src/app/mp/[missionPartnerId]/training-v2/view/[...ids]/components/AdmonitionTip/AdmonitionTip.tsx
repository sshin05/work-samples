'use client';

import {
  AdmonitionHeading,
  AdmonitionDescription,
  Admonition
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useEffect, useState } from 'react';

export const AdmonitionTip = () => {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const hideTip = localStorage.getItem('hide-lesson-tip');
    setShowTip(hideTip !== 'true');
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('hide-lesson-tip', 'true');
    setShowTip(false);
  };

  if (!showTip) return null;

  return (
    <Admonition
      palette="page"
      usage="outlined"
      className={css({
        h: 'fit-content',
        w: 'full',
        marginBottom: '2.5rem'
      })}
    >
      <AdmonitionHeading>Start with a lesson</AdmonitionHeading>
      <AdmonitionDescription>
        Get started quickly with a lesson.{' '}
        <a
          onClick={handleDismiss}
          className={css({
            textStyle: 'label-sm',
            color: 'page.text.secondary',
            cursor: 'pointer'
          })}
        >
          Dismiss
        </a>
      </AdmonitionDescription>
    </Admonition>
  );
};
