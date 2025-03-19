'use client';

import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { useChartColors } from '@/lib/chartjs';
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Doughnut } from 'react-chartjs-2';
import { NullHover } from '../../../NullHover';
import { doughnutStyles, doughtnutLinkText } from './learnerDoughnut.styles';
import { findLabel } from './utils/findLabel';
import { formatNumber } from '@/utils/format-number';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { InformationFilled, ArrowUpRight } from '@cerberus/icons';
import {
  Tooltip as CerberusTooltip,
  Text,
  useConfirmModal,
  useNotificationCenter
} from '@cerberus/react';
import {
  useFindMissionPartnerById,
  useSendReminderToNonOnboarded
} from '@/api/mission-partner';
import {
  useCountActiveUsersByMissionPartnerId,
  useCountOnboardedUsersByMissionPartnerId,
  useCountUsersByMissionPartnerId
} from '@/api/users';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useCallback, useEffect, useRef } from 'react';
import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';
import { formatNumberWithSuffix } from '@/app/mp/[missionPartnerId]/utils/formatNumberWithSuffix';

interface LearnerDoughnutProps {
  missionPartnerId: string;
}

ChartJS.register(ArcElement, Tooltip);

const LearnerDoughnut = ({ missionPartnerId }: LearnerDoughnutProps) => {
  const { notify } = useNotificationCenter();
  const onboardEmailSent = useRef(false);

  const { missionPartnerError, missionPartner, missionPartnerLoading } =
    useFindMissionPartnerById(missionPartnerId);
  useGraphqlErrorHandler(missionPartnerError);

  const {
    sendReminderToNonOnboarded,
    sendReminderToNonOnboardedData,
    sendReminderToNonOnboardedLoading,
    sendReminderToNonOnboardedError
  } = useSendReminderToNonOnboarded();

  const { countAllUsers } = useCountUsersByMissionPartnerId(missionPartnerId);

  const { countOnboardedUsers } =
    useCountOnboardedUsersByMissionPartnerId(missionPartnerId);
  const { countActiveUsers } =
    useCountActiveUsersByMissionPartnerId(missionPartnerId);

  const router = useRouter();
  const chartColors = useChartColors();

  const nullState = countAllUsers === 0;

  const numberActiveLearnersAdjusted =
    countActiveUsers > countOnboardedUsers
      ? countOnboardedUsers
      : countActiveUsers;
  const percentageActiveLearners = formatAsPercentage(
    numberActiveLearnersAdjusted / (countAllUsers || 1)
  );

  const onboardedLearners =
    (countOnboardedUsers ?? 0) - (numberActiveLearnersAdjusted ?? 0);
  const notOnboardedLearners =
    (countAllUsers ?? 0) - (countOnboardedUsers ?? 0);

  const doughnutData = {
    datasets: [
      {
        data: [
          numberActiveLearnersAdjusted ?? 0,
          onboardedLearners ?? 0,
          nullState ? 1 : (notOnboardedLearners ?? 0)
        ],
        backgroundColor: [
          chartColors.sequential300,
          chartColors.sequential400,
          chartColors.sequential200
        ],
        borderWidth: 0
      }
    ]
  };

  const handleSendOnboardReminder = useCallback(() => {
    sendReminderToNonOnboarded({ variables: { missionPartnerId } });

    if (onboardEmailSent.current === true) {
      notify({
        palette: 'warning',
        heading: 'Reminder Already Sent',
        description: `You've already sent an email to non-onboarded learners to onboard.`
      });
    } else {
      notify({
        palette: 'info',
        heading: 'Sending emails',
        description: `Sending a reminder email to non-onboarded learners to onboard.`
      });
    }
  }, [sendReminderToNonOnboarded, missionPartnerId, notify, onboardEmailSent]);

  const showSendReminderResults = (numberEmailsSent, numberEmailsNotSent) => {
    if (numberEmailsSent > 0) {
      onboardEmailSent.current = true;
      notify({
        palette: 'success',
        heading: 'Success',
        description: `A reminder email has been sent to ${numberEmailsSent} learners.`
      });
    }

    if (numberEmailsNotSent > 0) {
      onboardEmailSent.current = true;
      notify({
        palette: 'danger',
        heading: 'Error',
        description: `Could not send an email to ${numberEmailsNotSent} learners.`
      });
    }
  };

  const showSendReminderError = () =>
    notify({
      palette: 'danger',
      heading: 'Error',
      description: `There was an Error trying to send the reminder`
    });

  // Find better way to do this
  useEffect(() => {
    if (sendReminderToNonOnboardedLoading) return;

    if (sendReminderToNonOnboardedError) {
      showSendReminderError();
      return;
    }

    if (!sendReminderToNonOnboardedData) return;

    const { successfulEmailsSent, emailsNotSent } =
      sendReminderToNonOnboardedData;

    showSendReminderResults(successfulEmailsSent.length, emailsNotSent.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sendReminderToNonOnboardedData,
    sendReminderToNonOnboardedError,
    sendReminderToNonOnboardedLoading
  ]);

  const sendReminderModal = useConfirmModal();
  const showSendReminderModal = useCallback(async () => {
    const consent = await sendReminderModal.show({
      heading: 'Confirm reminder',

      description: (
        <>
          <p>
            Are you sure you want to send an onboarding reminder email to{' '}
            {countAllUsers - countOnboardedUsers || 0} learners?
          </p>
          <Link
            href={{
              pathname: getRouteUrl(
                routeGenerators.MissionPartnerLearners({
                  missionPartnerId
                })
              ),
              query: { onboardingComplete: 'false' }
            }}
            legacyBehavior
          >
            <a className={css({ whiteSpace: 'nowrap' })} target="_blank">
              <div className={hstack()}>
                <p
                  className={css({
                    color: 'dataViz.diverging.900',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  })}
                >
                  View list
                </p>
                <ArrowUpRight
                  className={css({ color: 'dataViz.diverging.900' })}
                />
              </div>
            </a>
          </Link>
        </>
      ),
      actionText: 'Confirm and send',
      cancelText: 'Cancel'
    });

    if (consent) {
      handleSendOnboardReminder();
    }
  }, [
    countAllUsers,
    countOnboardedUsers,
    handleSendOnboardReminder,
    sendReminderModal,
    missionPartnerId
  ]);

  return (
    <>
      {!missionPartnerLoading && !missionPartner ? (
        <p>No Mission Partner found with this ID</p>
      ) : (
        <NullHover
          enabled={nullState}
          width="40%"
          onClick={async () => {
            router.push(
              getRouteUrl(
                routeGenerators.MissionPartnerLearners({
                  missionPartnerId
                }),
                { initialAddLearner: true }
              )
            );
            return true;
          }}
          element={
            <div
              className={vstack({
                alignItems: 'center',
                textStyle: 'body-md',
                color: 'page.text.inverse',
                letterSpacing: '0.32px',
                gap: 0
              })}
            >
              <div className={hstack({ gap: 1 })}>
                <Text
                  className={css({
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  })}
                  data-placement="top"
                  animationDuration="slow"
                  animationDelay="400ms"
                  animationFillMode="forwards"
                  animationStyle="slide-fade-in"
                  opacity="0"
                >
                  Add Learners
                </Text>
                <Text
                  data-placement="top"
                  animationDuration="slow"
                  animationDelay="400ms"
                  animationFillMode="forwards"
                  animationStyle="slide-fade-in"
                  opacity="0"
                >
                  to view their
                </Text>
              </div>
              <Text
                data-placement="top"
                animationDuration="slow"
                animationDelay="400ms"
                animationFillMode="forwards"
                animationStyle="slide-fade-in"
                opacity="0"
              >
                onboarding status and activity
              </Text>
            </div>
          }
        >
          <div
            className={cx(
              vstack({
                w: 'full',
                h: '23.125rem',
                gap: '8',
                alignItems: 'center',
                justifyContent: 'center',
                p: '8',
                pb: '3.125rem'
              }),
              containerStyles
            )}
          >
            <div
              className={vstack({ alignItems: 'center', w: 'full', gap: '5' })}
            >
              <div className={hstack()}>
                <p className={css({ display: 'inline', fontSize: '2.375rem' })}>
                  {formatNumber(countAllUsers)}
                </p>
                <h1>Learners</h1>
                <Link
                  className={doughtnutLinkText}
                  passHref
                  href={getRouteUrl(
                    routeGenerators.MissionPartnerLearners({
                      missionPartnerId
                    })
                  )}
                  legacyBehavior
                >
                  <p className={doughtnutLinkText}>View</p>
                </Link>
              </div>

              <div
                className={hstack({
                  gap: '3.5',
                  alignItems: 'start',
                  justifyContent: 'center'
                })}
              >
                <div
                  className={vstack({
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2',
                    borderRight:
                      '1px solid var(--cerberus-colors-page-border-200)',
                    pr: '3.5'
                  })}
                >
                  <div className={hstack({})}>
                    <div
                      className={css({
                        fontSize: '1.5rem',
                        fontWeight: '500'
                      })}
                    >
                      {formatNumber(countOnboardedUsers)}
                    </div>
                    <p className={css({ fontSize: '14px' })}>
                      {`Onboarded (${formatAsPercentage(
                        countOnboardedUsers / (countAllUsers || 1)
                      )})`}
                    </p>
                  </div>
                  {countOnboardedUsers !== countAllUsers ? (
                    <a
                      className={css({
                        cursor: 'pointer',
                        textAlign: 'center'
                      })}
                      onClick={showSendReminderModal}
                    >
                      <p
                        className={css({
                          textStyle: 'label-sm',
                          color: 'action.navigation.initial',
                          textDecoration: 'underline'
                        })}
                      >
                        Send Reminder
                      </p>
                    </a>
                  ) : (
                    <p
                      className={css({
                        textStyle: 'label-sm',
                        textAlign: 'center',
                        textDecoration: 'underline'
                      })}
                    >
                      Send Reminder
                    </p>
                  )}
                </div>

                <div className={hstack({})}>
                  <div
                    className={css({
                      display: 'inline',
                      fontSize: '1.5rem',
                      fontWeight: '500'
                    })}
                  >
                    {formatNumber(numberActiveLearnersAdjusted)}
                  </div>
                  <div
                    className={css({ display: 'inline', whiteSpace: 'nowrap' })}
                  >
                    {`Active (${percentageActiveLearners})`}
                  </div>
                  <CerberusTooltip
                    position="top"
                    content="Active users in the last 90 days."
                  >
                    <span aria-label="onboardedAndActiveTooltip" data-tooltip>
                      <InformationFilled size={16} />
                    </span>
                  </CerberusTooltip>
                </div>
              </div>
            </div>

            <div
              className={hstack({
                w: 'full',
                alignItems: 'baseline'
              })}
            >
              {nullState || (
                <div className={css({ textStyle: 'body-md' })}>0</div>
              )}
              <Doughnut
                className={doughnutStyles}
                data={doughnutData}
                options={{
                  plugins: {
                    tooltip: {
                      enabled: !nullState,
                      displayColors: false,
                      bodyFont: {
                        weight: 'normal',
                        family: 'sans-serif'
                      },
                      backgroundColor: chartColors.page_surface_inverse,
                      callbacks: {
                        label: context =>
                          findLabel(
                            context.dataIndex,
                            countAllUsers,
                            numberActiveLearnersAdjusted,
                            onboardedLearners,
                            notOnboardedLearners
                          )
                      }
                    }
                  },
                  parsing: false,
                  normalized: true,
                  rotation: -90,
                  circumference: 180,
                  cutout: '65%',
                  maintainAspectRatio: true,
                  responsive: true
                }}
              ></Doughnut>
              {nullState || (
                <div className={css({ textStyle: 'body-md' })}>
                  {formatNumberWithSuffix(countAllUsers, 3)}
                </div>
              )}
            </div>
          </div>
        </NullHover>
      )}
    </>
  );
};

export default LearnerDoughnut;
