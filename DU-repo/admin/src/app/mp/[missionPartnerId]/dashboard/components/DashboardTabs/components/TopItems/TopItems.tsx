'use client';

import Link from 'next/link';
import { ArrowRight } from '@cerberus/icons';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { type ReactNode, Fragment } from 'react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { NullHover } from '../../../NullHover';
import { formatNumber } from '@/utils/format-number';
import type {
  TopItemsLinkProps,
  TopItemsProps,
  TopItemsTextProps
} from './topItems.types'; // TODO, remove most of these and use GQL Types
import { containerStyles } from '@/app/styles/ContainerStyles';
import { Text } from '@cerberus/react';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { useGetTopCourses } from '@/api/training-plan/useGetTopCourses';
import { useGetTopPlans } from '@/api/training-plan/useGetTopPlans';

// TODO: THESE COMPONENTS ARE A MESS AND TRYING TO DO TOO MANY THINGS.  CREATE COURSE_TOP_ITEMS AND PLAN_TOP_ITEMS COMPONENTS
const TopItemsLink = ({ href, title }: TopItemsLinkProps) => {
  return (
    <Link href={href} title={title}>
      <div
        className={hstack({
          w: '18rem',
          justifyContent: 'space-between'
        })}
      >
        <p
          className={css({
            textStyle: 'body-sm',
            fontWeight: '400',
            color: 'action.navigation.initial'
          })}
        >
          {title}
        </p>
        <ArrowRight
          className={css({
            color: 'action.navigation.initial'
          })}
        />
      </div>
    </Link>
  );
};

const TopItemsText = ({ title }: TopItemsTextProps) => {
  return (
    <div>
      <p
        className={css({
          textStyle: 'body-sm',
          fontWeight: '400',
          color: 'action.navigation.initial',
          maxW: '17rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        })}
      >
        {title}
      </p>
    </div>
  );
};

const TopItems = ({ missionPartnerId, topItemsCategory }: TopItemsProps) => {
  const linkList: ReactNode[] = [];

  const TOP_ITEMS_SIZE = 5;
  const { missionPartnerError, missionPartner } =
    useFindMissionPartnerById(missionPartnerId);

  useGraphqlErrorHandler(missionPartnerError);

  const { getTopPlansData } = useGetTopPlans({
    missionPartnerId,
    limit: TOP_ITEMS_SIZE
  });

  const { topCoursesMetrics } = useGetTopCourses({
    missionPartnerId,
    limit: TOP_ITEMS_SIZE
  });
  const topItemsArray =
    topItemsCategory === 'Plans' ? getTopPlansData : topCoursesMetrics;
  const nullState = !topItemsArray || topItemsArray?.length === 0;

  if (topItemsCategory === 'Plans' && topItemsArray) {
    for (const element of topItemsArray as unknown as {
      planType: string;
      planSourceId: string;
      title: string;
      count: number;
      // TODO: FIX TYPE after CODEGEN works
    }[]) {
      linkList.push(
        <Fragment key={element.planSourceId}>
          <div
            className={vstack({
              gap: '1',
              alignItems: 'flex-start'
            })}
          >
            <TopItemsLink
              key={element.title}
              href={getRouteUrl(
                routeGenerators.PlanMetricsPlanWithParametersUniqueMetrics({
                  missionPartnerId,
                  missionPartnerName: missionPartner?.name,
                  planType: element.planType,
                  planSourceId: element.planSourceId,
                  title: element.title
                })
              )}
              title={element.title}
            />
            <p
              className={css({
                fontSize: 'sm',
                color: 'page.text.100'
              })}
            >
              {`${formatNumber(element.count)} ${
                element.count === 1 ? 'Learner' : 'Learners'
              }`}
            </p>
          </div>
        </Fragment>
      );
    }
  }

  if (topItemsCategory === 'Courses' && topItemsArray) {
    for (const element of topItemsArray as unknown as {
      id: string;
      title: string;
      count: number;
      // TODO: FIX TYPE following CODEGEN
    }[]) {
      linkList.push(
        <Fragment key={element.id}>
          <div
            className={vstack({
              gap: '1',
              alignItems: 'flex-start'
            })}
          >
            <TopItemsText title={element.title} key={element.title} />
            <div
              className={css({
                fontSize: 'sm',
                color: 'page.text.100'
              })}
            >
              {`${formatNumber(element.count)} ${
                element.count === 1 ? 'Learner' : 'Learners'
              }`}
            </div>
          </div>
        </Fragment>
      );
    }
  }

  const viewAllLinkPathname =
    topItemsCategory === 'Plans'
      ? getRouteUrl(routeGenerators.PlanMetrics({ missionPartnerId }))
      : getRouteUrl(routeGenerators.CourseMetrics({ missionPartnerId }));

  return (
    <NullHover
      enabled={nullState}
      width="21rem"
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
          <Text
            className={css({ textAlign: 'center' })}
            data-placement="top"
            animationDuration="slow"
            animationDelay="400ms"
            animationFillMode="forwards"
            animationStyle="slide-fade-in"
            opacity="0"
          >
            Once your learners start training, their most popular curriculum
            items will appear here.
          </Text>
        </div>
      }
    >
      <div
        className={cx(
          vstack({
            w: '21rem',
            p: '6',
            alignItems: 'flex-start',
            gap: '4'
          }),
          containerStyles
        )}
      >
        <div className={hstack({ justifyContent: 'space-between', w: 'full' })}>
          <span className={css({ textStyle: 'label-sm' })}>Over All Time</span>
          <Link
            href={{
              pathname: viewAllLinkPathname
            }}
            title="View All link"
            legacyBehavior
          >
            <span
              className={css({
                textStyle: 'link',
                fontSize: 'xs',
                color: 'action.navigation.initial',
                _hover: {
                  cursor: 'pointer'
                }
              })}
            >
              View All
            </span>
          </Link>
        </div>
        <p className={css({ textStyle: 'body-sm', fontWeight: '600' })}>
          Top assigned {topItemsCategory?.toLowerCase()}
        </p>
        <div
          className={vstack({
            gap: '4',
            alignItems: 'flex-start'
          })}
        >
          {linkList}
        </div>
      </div>
    </NullHover>
  );
};

export default TopItems;
