'use client';
import { useEffect, useRef } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useGetSession } from '@/hooks/useGetSession';
import { usePathname } from 'next/navigation';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

export const MatomoPageTracker = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { trackPageView, pushInstruction } = useMatomo();
  const userSession = useGetSession();
  const pathname = usePathname();
  const previousPathnameRef = useRef('');
  const matomoTrackEvent = useMatomoTrackEvent();

  useEffect(() => {
    // pushInstruction and trackPageView seem to be poorly memoized.  adding if-block to prevent multiple trackPageView calls.
    if (
      previousPathnameRef.current !== pathname &&
      pushInstruction &&
      trackPageView &&
      typeof pushInstruction === 'function' &&
      typeof trackPageView === 'function'
    ) {
      try {
        previousPathnameRef.current = pathname;
        const pageView = {
          documentTitle: `${document?.title || 'Digital University'} [Admin]`,
          href: window.location.href
        };

        pushInstruction('setUserId', userSession?.user?.id);
        trackPageView(pageView);
        matomoTrackEvent('Navigation', 'View Page', window.location.href);
      } catch (_error) {
        previousPathnameRef.current = '';
      }
    }
  }, [userSession?.user?.id, pushInstruction, trackPageView, pathname]);

  return children;
};
