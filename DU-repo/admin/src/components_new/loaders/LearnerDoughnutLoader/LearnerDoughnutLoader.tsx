import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { formatNumber } from '@/utils/format-number';
import { InformationFilled } from '@carbon/icons-react';
import { Spinner, Tooltip as CerberusTooltip } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

export const LearnerDoughnutLoader = () => {
  return (
    <div
      className={cx(
        vstack({
          w: '27.199rem',
          h: '23.125rem',
          p: '8',
          position: 'relative'
        }),
        containerStyles
      )}
    >
      <div
        className={vstack({
          alignItems: 'center',
          w: 'full',
          h: 'full',
          gap: '5'
        })}
      >
        <div className={hstack()}>
          <p className={css({ display: 'inline', fontSize: '2.375rem' })}>0</p>
          <h1>Learners</h1>
          <p
            className={css({
              textDecoration: 'underline',
              display: 'inline'
            })}
          >
            View
          </p>
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
              borderRight: '1px solid var(--cerberus-colors-page-border-200)',
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
                0
              </div>
              <p className={css({ fontSize: '14px' })}>
                {`Onboarded (${formatAsPercentage(0)})`}
              </p>
            </div>
            <a className={css({ textAlign: 'center' })}>
              <p
                className={css({
                  textStyle: 'label-sm',
                  textDecoration: 'underline'
                })}
              >
                Send Reminder
              </p>
            </a>
          </div>
          <div className={hstack({})}>
            <div
              className={css({
                display: 'inline',
                fontSize: '1.5rem',
                fontWeight: '500'
              })}
            >
              {formatNumber(0)}
            </div>
            <div className={css({ display: 'inline', whiteSpace: 'nowrap' })}>
              Active (0%)
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
        <Spinner
          size="2rem"
          className={css({
            position: 'absolute',
            top: '45%',
            left: '45%'
          })}
        />
      </div>
    </div>
  );
};
