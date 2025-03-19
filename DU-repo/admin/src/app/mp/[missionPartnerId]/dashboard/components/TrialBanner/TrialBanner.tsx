'use client';

import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { useRouteParams } from '@/hooks/useRouteParams';
import {
  Admonition,
  AdmonitionDescription,
  AdmonitionHeading,
  useNotificationCenter
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useMemo } from 'react';
import { DU_CUSTOMER_SUPPORT_EMAIL } from '@/app/constants/customerSupportConstant';
import { calculateDaysLeft } from '../utils/calculateDaysLeft';

const TrialBanner = () => {
  const { missionPartnerId } = useRouteParams();
  const { missionPartnerMinDetails } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  const { notify } = useNotificationCenter();

  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText('ryan.critchfield@omnifederal.com')
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Email copied to clipboard.'
        });
      });
  };

  const { isTrialBannerVisible, daysLeftOnTrial } = useMemo(() => {
    const suppliedDate = missionPartnerMinDetails?.trialEndDate;
    const isTrialBannerVisible = missionPartnerMinDetails?.trialEnabled;
    const daysLeftOnTrial = suppliedDate ? calculateDaysLeft(suppliedDate) : 0;

    return { isTrialBannerVisible, daysLeftOnTrial };
  }, [missionPartnerMinDetails]);

  if (!isTrialBannerVisible) {
    return null;
  }

  return (
    <Admonition
      palette="warning"
      usage="filled"
      className={css({ mt: -12, mb: 6 })}
    >
      <AdmonitionHeading>
        You have {daysLeftOnTrial} days remaining on your Digital University
        trial
      </AdmonitionHeading>
      <AdmonitionDescription>
        Contact your{' '}
        <a
          href={DU_CUSTOMER_SUPPORT_EMAIL}
          onClick={e => {
            e.preventDefault();
            copyEmailToClipboard();
          }}
        >
          DU Customer Success Manager
        </a>{' '}
        for continuous access.
      </AdmonitionDescription>
    </Admonition>
  );
};

export default TrialBanner;
