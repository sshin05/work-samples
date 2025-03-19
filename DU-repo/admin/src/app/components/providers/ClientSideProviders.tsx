'use client';
import { ErrorBoundary } from 'react-error-boundary';
import { SessionProvider } from 'next-auth/react';
import ApolloProvider from './ApolloProvider';
import { ConfirmModal, NotificationCenter } from '@cerberus/react';
import ErrorFallback from '@/error-fallback';
import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import { MatomoPageTracker } from '../MatomoPageTracker/MatomoPageTracker';
import { ToastProvider } from '@digital-u/digital-ui';

type ContextProvidersProps = {
  children: React.ReactNode;
  matomoKeys: {
    siteId: string;
    trustedHost: string;
    url: string;
  };
};

const ContextProviders = ({ children, matomoKeys }: ContextProvidersProps) => {
  let matomoInstance = null;

  if (matomoKeys.url) {
    try {
      matomoInstance = createInstance({
        urlBase: matomoKeys?.url,
        siteId: matomoKeys?.siteId ? parseInt(matomoKeys?.siteId, 10) : 0,
        disabled: false
      });
    } catch (e) {
      console.error(`Failed to create Matomo instance: ${e}`);
    }
  } else {
    console.error(`Matomo URL not provided. Cannot create Matomo instance.`);
  }

  if (!matomoInstance) {
    console.error(`Failed to create a Matomo instance`);
  }

  return (
    <SessionProvider basePath="/admin/api/auth">
      {/* @ts-expect-error not sure why this context-provider doesn't have types which allow children */}
      <MatomoProvider value={matomoInstance}>
        <ApolloProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MatomoPageTracker>
              <ToastProvider>
                <ConfirmModal>
                  <NotificationCenter>{children}</NotificationCenter>
                </ConfirmModal>
              </ToastProvider>
            </MatomoPageTracker>
          </ErrorBoundary>
        </ApolloProvider>
      </MatomoProvider>
    </SessionProvider>
  );
};

export default ContextProviders;
