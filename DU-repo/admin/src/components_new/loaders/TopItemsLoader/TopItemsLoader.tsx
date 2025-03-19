import { containerStyles } from '@/app/styles/ContainerStyles';
import { Spinner } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';
import { hstack } from 'styled-system/patterns';

export const TopItemsLoader = () => {
  return (
    <div
      className={cx(
        vstack({
          w: '21rem',
          p: '6',
          alignItems: 'flex-start',
          position: 'relative',
          gap: '4'
        }),
        containerStyles
      )}
    >
      <div className={hstack({ justifyContent: 'space-between', w: 'full' })}>
        <span className={css({ textStyle: 'label-sm' })}>Over All Time</span>

        <span
          className={css({
            textStyle: 'link',
            fontSize: 'xs'
          })}
        >
          View All
        </span>
      </div>
      <p className={css({ textStyle: 'body-sm', fontWeight: '600' })}>
        Top assigned plans
      </p>
      <Spinner
        size="2rem"
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%'
        })}
      />
    </div>
  );
};
