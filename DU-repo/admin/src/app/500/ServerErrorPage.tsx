'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';

export const ServerErrorPage = () => {
  const router = useRouter();

  return (
    <div
      className={vstack({
        maxW: 'xl',
        h: '70vh',
        m: [0, 'auto'],
        p: 4,
        justifyContent: 'center',
        textAlign: 'center'
      })}
    >
      <h2
        className={css({
          textStyle: 'h2',
          background: `linear-gradient(225deg, action.bg.active 0%, action.border.initial 100%)`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        })}
      >
        Looks like Digital University is having an unexpected issue.
      </h2>
      <div className={css({ m: 5, textAlign: 'left' })}>
        <p>
          We&apos;ll be up and running soon. In the meantime, here is what you
          can do:
        </p>
        <ul className={css({ listStyle: 'initial', pl: 8, mt: 2 })}>
          <li>Refresh the page after 30 seconds</li>
          <li>Try again in 30 minutes</li>
        </ul>
      </div>
      <div className={css({ mt: 8, p: 4 })}>
        <Button shape="rounded" usage="outlined" onClick={() => router.back()}>
          Refresh page
        </Button>
      </div>
    </div>
  );
};
