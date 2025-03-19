import { renderV3, screen } from '@@/test-utils';
import type { ApolloError } from '@apollo/client';
import { ErrorHandler } from './ErrorHandler';
import {
  ERROR_HEADING_400,
  ERROR_HEADING_403,
  ERROR_HEADING_502,
  ERROR_HEADING_503,
  ERROR_HEADING_504
} from './constants';

jest.mock('../../buttons/RefreshPageButton', () => ({
  RefreshPageButton: () => <button>Refresh Page</button>
}));

describe('ErrorHandler', () => {
  it('renders children when there is no error', () => {
    renderV3(
      <ErrorHandler errorDetails={null}>
        <div>Child Component</div>
      </ErrorHandler>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders 400 error message', () => {
    const errorDetails = {
      networkError: { statusCode: 400 }
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    const badRequestMessage = 'Please double check your input and try again';

    expect(screen.getByText(ERROR_HEADING_400)).toBeInTheDocument();
    expect(screen.getByText(ERROR_HEADING_400).tagName).toBe('H2');
    expect(screen.getByText(badRequestMessage)).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('renders 403 error message', () => {
    const errorDetails = {
      networkError: { statusCode: 403 }
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    expect(screen.getByText(ERROR_HEADING_403)).toBeInTheDocument();
    expect(screen.getByText(ERROR_HEADING_403).tagName).toBe('H2');
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('renders 502 error message', () => {
    const errorDetails = {
      networkError: { statusCode: 502 }
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    expect(screen.getByText(ERROR_HEADING_502)).toBeInTheDocument();
    expect(
      screen.getByText('In the meantime, here is what you can do:')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page after 30 seconds')
    ).toBeInTheDocument();
    expect(screen.getByText('Try again in 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('renders 503 error message', () => {
    const errorDetails = {
      networkError: { statusCode: 503 }
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    expect(screen.getByText(ERROR_HEADING_503)).toBeInTheDocument();
    expect(
      screen.getByText('In the meantime, here is what you can do:')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page after 30 seconds')
    ).toBeInTheDocument();
    expect(screen.getByText('Try again in 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('renders 504 error message', () => {
    const errorDetails = {
      networkError: { statusCode: 504 }
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    expect(screen.getByText(ERROR_HEADING_504)).toBeInTheDocument();
    expect(
      screen.getByText('In the meantime, here is what you can do:')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Refresh the page after 30 seconds')
    ).toBeInTheDocument();
    expect(screen.getByText('Try again in 30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('renders default error message for other errors', () => {
    const errorDetails = {
      message: 'Some other error'
    } as ApolloError;

    renderV3(
      <ErrorHandler errorDetails={errorDetails}>
        <div>Child Component</div>
      </ErrorHandler>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Some other error')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });
});
