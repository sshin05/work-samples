import { useMemo } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useGetSession } from '@/hooks/useGetSession';

const LOG_EVENTS = false;

/**
 * useMatomoTrackEvent is a function that builds out commonly used props for matomo
 *
 * @example
 * const matomoTrackEvent = useMatomoTrackEvent();
 * <Button onClick={() => matomoTrackEvent('Browse', 'Individual Course Started', 'example name')}
 */
export const useMatomoTrackEvent = () => {
  const { trackEvent } = useMatomo();
  const { user } = useGetSession();

  const matomoTrackEvent = useMemo(() => {
    return (category: string, action: string, name: string) => {
      if (LOG_EVENTS) {
        console.log(
          `Track Event:\nCategory: ${category}\nAction: ${action}\nName: ${name}\nUser: ${user?.id}`
        );
      }
      try {
        trackEvent({
          category,
          action,
          name,
          // userId: user?.id,
          customDimensions: [
            { id: 3, value: user?.id },
            { id: 4, value: 'test=true' } // Remove this line after verifying Matomo is tracking SOT-X.
          ] // See portal `useMatomoTrackEvent.js`.
        });
      } catch (error) {
        console.error(
          'Error occurred while tracking for Matomo Event: ',
          error
        );
      }
    };
  }, [trackEvent, user]);

  return matomoTrackEvent;
};
