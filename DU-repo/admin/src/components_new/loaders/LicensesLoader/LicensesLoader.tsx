import { containerStyles } from '@/app/styles/ContainerStyles';
import { Spinner } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

/**
 * This is the loader component for the Licenses. It is used to show a loading state for Licenses on the Licenses page.
 * @returns
 */
export const LicensesLoader = () => {
  return (
    <div
      className={cx(
        vstack({
          h: '13.375rem',
          mb: 8,
          mt: 4,
          alignItems: 'flex-start',
          padding: 'xl',
          borderRadius: 'sm'
        }),
        containerStyles
      )}
    >
      <div
        className={hstack({
          mb: 6,
          justifyContent: 'space-between'
        })}
      >
        <Spinner
          size="2rem"
          className={css({
            position: 'absolute',
            top: '30%',
            left: '55%'
          })}
        />
      </div>
    </div>
  );
};
