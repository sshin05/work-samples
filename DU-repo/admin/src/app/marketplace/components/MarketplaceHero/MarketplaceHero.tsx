'use client';

import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import Image from 'next/image';
import { TopNav } from '../TopNav/TopNav';

export function MarketplaceHero() {
  return (
    <div className={css({ maxW: '1440px', mx: 'auto' })}>
      <TopNav variant="floating" />
      <div
        role="banner"
        className={css({
          pos: 'relative',
          h: '512px',
          mx: 'auto',
          px: '16',
          boxShadow: 'inset 0px 0px 4px 2px #0e0d0d',
          background:
            'linear-gradient(295.55deg, rgba(14, 13, 12, 0) 54%, #0E0D0C 75.35%)',
          _before: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',

            backgroundImage: 'url(/admin/images/sotx-hero.webp)',
            backgroundSize: { base: 'auto 1085px' },
            backgroundPosition: { base: '-380px -200px' },
            backgroundRepeat: 'no-repeat',
            transform: 'scaleX(-1)',
            zIndex: 'hide'
          }
        })}
      >
        <div
          className={css({
            position: 'absolute',
            top: '0',
            right: '0',
            h: 'full',
            overflow: 'hidden',
            mixBlendMode: 'color-dodge',
            _after: {
              boxShadow: 'inset 0px 0px 32px 48px #000'
            }
          })}
        >
          <Image
            src="/admin/images/sotx-hero-pattern.webp"
            width={1440}
            height={512}
            alt=""
          />
        </div>

        <div
          className={flex({
            direction: 'column',
            justifyContent: 'center',
            w: '641px',
            h: 'full'
          })}
        >
          <h1
            className={css({
              textStyle: 'display-lg',
              mt: '16',
              mb: '4',
              backgroundImage:
                'var(--cerberus-gradients-acheron-dark-charon-light)',
              bgClip: 'text',
              color: 'transparent',
              whiteSpace: 'pre-wrap'
            })}
          >
            <span>ACQUIRE TRAINING AT THE</span>
            <span
              className={css({
                _before: {
                  content: "'\\A'"
                }
              })}
            >
              SPEED OF MISSION.
            </span>
          </h1>
          <p
            className={css({
              w: '624px',
              textStyle: 'body-lg',
              lineHeight: '27px',
              lineClamp: '4',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            })}
          >
            Search, select, and purchase SOF-peculiar training
          </p>
        </div>
      </div>
    </div>
  );
}
