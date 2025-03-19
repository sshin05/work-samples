import { useEffect, useState } from 'react';
import { hstack, vstack, animateIn } from '@cerberus/styled-system/patterns';
import { Button, Show, Spinner } from '@cerberus/react';
import { ArrowRight } from '@cerberus/icons';
import type { NoDataAnimateInProps } from './NoDataAnimateInProps';

/**
 * This component is used to display a no data state inside select tables that will animate in the contents.
 *
 * @remarks
 *
 * Used in the Licenses table.
 */

export const NoDataAnimateIn = ({
  buttonText,
  cta,
  message,
  spinner,
  delay = '400ms'
}: NoDataAnimateInProps) => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={vstack({
        gap: '8',
        alignItems: 'center',
        paddingX: 4
      })}
    >
      {spinner ? (
        <div className={hstack({})}>
          <Spinner size="2rem" />
          <p>{message}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}

      {buttonText && (
        <Show when={animate}>
          <Button
            usage="ghost"
            onClick={cta}
            className={animateIn({
              delay: delay,
              p: '4'
            })}
          >
            <>{buttonText}</>
            <ArrowRight />
          </Button>
        </Show>
      )}
    </div>
  );
};
