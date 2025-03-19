import React from 'react';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';

export const ServerErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div className={vstack({ justifyContent: 'center' })}>
      <h3
        className={css({
          textStyle: 'h3',
          background: `linear-gradient(225deg, action.bg.active 0%, action.border.initial 100%)`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })}
      >
        Looks like Digital University is having an unexpected issue.
      </h3>
      <div className={css({ m: '5' })}>
        <p>
          We&apos;ll be up and running soon. In the meantime, here is what you
          can do:
        </p>
        <ul className={css({ listStyle: 'initial', pl: 8, mt: 2 })}>
          <li>Refresh the page after 30 seconds</li>
          <li>Try again in 30 minutes</li>
        </ul>
      </div>
      <div className={css({ mt: 1, p: 4 })}>
        <Button
          shape="rounded"
          usage="outlined"
          onClick={() => resetErrorBoundary()}
          size="sm"
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
