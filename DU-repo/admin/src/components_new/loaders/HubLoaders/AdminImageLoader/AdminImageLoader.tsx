import { containerStyles } from '@/app/styles/ContainerStyles';
import { Reset, Upload } from '@carbon/icons-react';
import { Button } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

/**
 * This is a loader component for the admin image. It is used to show a loading state for the admin image on the Traning Hub Page.
 * @returns
 */
export const AdminImageLoader = () => {
  return (
    <div
      className={cx(
        hstack({
          minW: 'fit-content',
          p: '3',
          pr: '10',
          justifyContent: 'center',
          alignItems: 'center',
          animationName: 'pulse',
          animationDuration: '2s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out'
        }),
        containerStyles
      )}
    >
      <div className={hstack()}>
        <div
          className={css({
            w: '150px',
            h: '150px',
            bgColor: 'page.bg.100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        ></div>
        <div className={vstack({ alignItems: 'flex-start' })}>
          <Button palette="action" shape="rounded" usage="outlined" disabled>
            Change Image
            <Upload />
          </Button>
          <p className={css({ fontSize: 'sm', mt: '2.5' })}>
            Accepted file types: JPEG, PNG, and GIF
          </p>
          <p className={css({ fontSize: 'sm' })}>
            Recommended size: 570 x 685px
          </p>
          <Button
            className={css({ mt: '2.5' })}
            palette="action"
            shape="rounded"
            usage="ghost"
            type="button"
            disabled
          >
            Reset to Default Image
            <Reset />
          </Button>
        </div>
      </div>
    </div>
  );
};
