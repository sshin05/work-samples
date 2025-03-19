import { useMemo } from 'react';
import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import { useGetUserMissionPartnerTrialStatus } from '@/api/users';
import { Button, Text } from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { DU_CUSTOMER_SUPPORT_EMAIL } from '@/app/constants/customerSupportConstant';

export const TrialExpiredPage = () => {
  const { signOut } = useSignOut();
  const missionPartnerTrialStatus = useGetUserMissionPartnerTrialStatus();
  const suppliedDate =
    missionPartnerTrialStatus?.userMissionPartnerTrialStatus?.missionPartner
      ?.trialEndDate;

  const trialEndDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
        .format(new Date(suppliedDate))
        ?.replaceAll('/', ' ');
    } catch (_error) {
      return null;
    }
  }, [suppliedDate]);

  const formattedDate =
    suppliedDate && trialEndDate ? ` ended on ${trialEndDate}` : ` has ended`;

  return (
    <>
      <div
        className={hstack({ justifyContent: 'flex-start', gap: '1.125rem' })}
      >
        <img
          src="/admin/images/digitalu-logo.svg"
          className={css({ w: 12, mb: 7 })}
          alt="Digital University Logo"
        />
        <img
          src="/admin/images/DU-logo-lockup.svg"
          className={css({ mb: 7 })}
          alt="Digital University Text"
        />
      </div>
      <div className={vstack()}>
        <div
          className={hstack({
            justifyContent: 'center',
            pt: '20vh'
          })}
        >
          <div
            className={vstack({
              alignItems: 'flex-start',
              w: '40rem'
            })}
          >
            <div className={vstack({ gap: 4, alignSelf: 'stretch' })}>
              <PageHeader
                className={css({
                  textStyle: 'h2',
                  bg: `linear-gradient(225deg, #4C0091 0%, #9F66D3 100%)`,
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                })}
              >
                Your trial has ended.
              </PageHeader>

              <Text
                className={css({
                  color: 'page.text.initial',
                  fontSize: '1.12rem'
                })}
              >
                Your trial of Digital University {formattedDate}. Contact your
                DU Customer Support Manager for continuous access.
              </Text>
              <div className={hstack({ alignItems: 'flex-start' })}>
                <Text
                  className={css({
                    color: 'page.text.initial',
                    fontSize: '1.12rem',
                    display: 'flex'
                  })}
                >
                  Your DU Customer Support Manager:
                  <a
                    href={`mailto:${DU_CUSTOMER_SUPPORT_EMAIL}`}
                    className={css({
                      color: 'action.navigation.initial'
                    })}
                  >
                    &nbsp;{DU_CUSTOMER_SUPPORT_EMAIL}
                  </a>
                </Text>
              </div>
            </div>
            <div className={hstack({ alignSelf: 'center', mt: '2.5rem' })}>
              <Button
                palette="action"
                shape="rounded"
                usage="outlined"
                onClick={signOut}
                style={{ width: '21.375rem', height: '2.5rem' }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
