import { type ReactElement } from 'react';
import type { ApolloError } from '@apollo/client';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';
import { RefreshPageButton } from '../../buttons/RefreshPageButton';
import {
  ERROR_HEADING_400,
  ERROR_HEADING_403,
  ERROR_HEADING_502,
  ERROR_HEADING_503,
  ERROR_HEADING_504
} from './constants';

export const ErrorHandler = ({
  children,
  errorDetails
}: {
  children: React.ReactNode;
  errorDetails: ApolloError;
}) => {
  if (!errorDetails) {
    return children;
  }

  const { networkError } = errorDetails;
  const statusCode =
    networkError && 'statusCode' in networkError
      ? networkError.statusCode
      : null;

  const errorHeadings: Record<number, string> = {
    400: ERROR_HEADING_400,
    403: ERROR_HEADING_403,
    502: ERROR_HEADING_502,
    503: ERROR_HEADING_503,
    504: ERROR_HEADING_504
  };

  const errorMessageContent = (
    <>
      <span>In the meantime, here is what you can do:</span>
      <ul className={css({ listStyle: 'initial', pl: 8, mt: 2 })}>
        <li>Refresh the page after 30 seconds</li>
        <li>Try again in 30 minutes</li>
      </ul>
    </>
  );

  const badRequestContent = (
    <>
      <span>Please double check your input and try again</span>
    </>
  );

  const errorMessages: Record<number, string | ReactElement<any>> = {
    400: badRequestContent,
    403: <></>,
    502: errorMessageContent,
    503: errorMessageContent,
    504: errorMessageContent
  };

  const errorHeading = statusCode && errorHeadings[statusCode];
  const errorMessage = statusCode && errorMessages[statusCode];

  if (errorMessage) {
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
            background: `linear-gradient(225deg, #9F66D3 0%, #4C0091 100%)`,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          })}
        >
          {errorHeading}
        </h2>
        <div className={css({ mb: '10', textAlign: 'left' })}>
          {errorMessage}
        </div>
        <RefreshPageButton />
      </div>
    );
  }

  // default error handling for other errors
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
      <h2 className={css({ textStyle: 'body-md' })}>Something went wrong</h2>
      <p>{errorDetails.message}</p>
      <RefreshPageButton />
    </div>
  );
};
