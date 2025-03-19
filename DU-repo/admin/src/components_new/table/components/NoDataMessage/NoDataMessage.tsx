import React from 'react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Button, Spinner } from '@cerberus/react';
import { ArrowRight } from '@cerberus/icons';
import type { NoDataMessageProps } from './NoDataMessageProps';

export const NoDataMessage = ({
  buttonText,
  cta,
  message,
  spinner
}: NoDataMessageProps) => (
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
      <Button usage="ghost" onClick={cta}>
        <>{buttonText}</>
        <ArrowRight />
      </Button>
    )}
  </div>
);
