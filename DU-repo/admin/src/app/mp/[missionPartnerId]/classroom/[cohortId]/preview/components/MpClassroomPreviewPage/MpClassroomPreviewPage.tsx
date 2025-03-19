'use client';
import { sqlGetCohort } from '@/app/api/cohorts';
import { useSQLQuery } from '@/app/api';
import ImageFetcher from '@/app/marketplace/components/ImageFetcher/ImageFetcher';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Calendar, Information, Location, UserFilled } from '@cerberus/icons';
import { Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import type { CohortLibraryItem } from '../../../cohort.types';
import { formatCohortDate } from '../../../components/ClassroomDetails/utils/formatCohortDate/formatCohortDate';
import { MpClassroomPreviewBackground } from '../MpClassroomPreviewBackground/MpClassroomPreviewBackground';
import { InfoBlock } from './components/InfoBlock/InfoBlock';
import { LibraryList } from './components/LibraryList/LibraryList';

type TableData = CohortLibraryItem | (CohortLibraryItem & { date: string });
const mockLibraryItems: TableData[] = [
  {
    id: '1',
    url: 'https://example.com/file1.pdf',
    name: 'Introduction to Programming',
    type: 'File',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '2',
    url: 'https://example.com/video1.mp4',
    name: 'JavaScript Basics',
    type: 'Video',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '3',
    url: 'https://example.com/audio1.mp3',
    name: 'CSS Styling Guide',
    type: 'Audio',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '4',
    url: 'https://example.com/resource-link',
    name: 'Frontend Development Resources',
    type: 'Link',
    date: '2024-12-16T12:34:56Z'
  },
  {
    id: '5',
    url: 'https://example.com/video2.mp4',
    name: 'Advanced React Patterns',
    type: 'Video',
    date: '2024-12-16T12:34:56Z'
  }
];

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

function getStartTag(input: Date | string) {
  const meetingStartDate = typeof input === 'string' ? new Date(input) : input;

  if (
    !(meetingStartDate instanceof Date) ||
    isNaN(meetingStartDate.getTime())
  ) {
    return '';
  }

  const startDate = new Date(meetingStartDate);

  const startTime = startDate.getTime();

  if (isNaN(startTime)) {
    console.error('Invalid date provided to getStartTag');
    return null;
  }

  const daysUntilStart = Math.ceil(
    (startTime - Date.now()) / MILLISECONDS_IN_A_DAY
  );

  if (daysUntilStart <= 0) {
    return null;
  }

  return (
    <Tag
      shape="square"
      gradient="amphiaraus-light"
      className={css({ alignSelf: 'flex-start' })}
    >
      Starts in{' '}
      <span className={css({ fontWeight: 'bold' })}>{daysUntilStart} days</span>
    </Tag>
  );
}

export const MpClassroomPreviewPage = () => {
  const { cohortId } = useRouteParams();

  const { data: cohort, loading: cohortLoading } = useSQLQuery(sqlGetCohort, {
    options: {
      id: cohortId
    }
  });

  if (cohortLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainContentVStack>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          w: 'full',
          bg: 'red'
        })}
      >
        <header
          className={css({
            display: 'flex',
            w: 'full',
            alignItems: 'center',
            px: '16',
            py: '6',
            bgColor: 'page.surface.initial',
            color: 'cerberus.neutral.100',
            textStyle: 'heading-sm',
            zIndex: '1'
          })}
        >
          <p aria-busy={cohortLoading}>This is a preview of {cohort?.name}</p>
        </header>

        <main
          aria-busy={cohortLoading}
          className={css({
            display: 'flex',
            flex: '1',
            w: 'full',
            px: '8',
            py: '7',
            mx: 'auto',
            flexDirection: 'column',
            gap: '4',
            maxW: '8xl'
          })}
        >
          <div className={css({ zIndex: 'base' })}>
            <MpClassroomPreviewBackground />
          </div>
          <div className={css({ zIndex: 'decorator' })}>
            <div className={flex({ gap: '96px' })}>
              <div
                className={flex({
                  direction: 'column',
                  gap: '4',
                  alignItems: 'flex-start'
                })}
              >
                <div className={flex({ w: 'full', gap: '96px' })}>
                  <div
                    className={flex({
                      direction: 'column',
                      gap: '4',
                      flex: '5'
                    })}
                  >
                    {getStartTag(cohort?.meetingStartDate)}
                    <h1
                      className={css({
                        textStyle: 'display-lg',
                        color: 'white',
                        textTransform: 'uppercase',
                        lineClamp: '2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      })}
                    >
                      {cohort?.name}
                    </h1>
                    <p className={css({ color: 'cerberus.brand.5' })}>
                      {cohort?.description}
                    </p>
                    <div
                      className={flex({
                        width: 'full',
                        direction: 'column',
                        mt: '10',
                        gap: '8'
                      })}
                    >
                      <h2
                        className={css({
                          textStyle: 'heading-lg',
                          color: 'cerberus.neutral.20'
                        })}
                      >
                        Reporting Instructions
                      </h2>

                      <InfoBlock
                        heading="Environment"
                        content={
                          cohort?.environment === 'InPerson'
                            ? 'In Person'
                            : cohort?.environment
                        }
                        Icon={UserFilled}
                      />

                      <div className={flex({ gap: '8' })}>
                        {cohort?.meetingStartDate && (
                          <InfoBlock
                            heading="Dates"
                            content={
                              <>
                                <time
                                  dateTime={cohort?.meetingStartDate?.toString()}
                                >
                                  {formatCohortDate(cohort?.meetingStartDate)}
                                </time>
                                {cohort?.meetingEndDate && (
                                  <>
                                    <span> - </span>
                                    <time
                                      dateTime={cohort?.meetingEndDate?.toString()}
                                    >
                                      {formatCohortDate(cohort?.meetingEndDate)}
                                    </time>
                                  </>
                                )}
                              </>
                            }
                            Icon={Calendar}
                          />
                        )}

                        {cohort?.location && (
                          <>
                            <div
                              className={css({
                                w: '1px',
                                h: 'full',
                                bgColor: 'cerberus.neutral.10'
                              })}
                            ></div>

                            <InfoBlock
                              heading="Address"
                              content={cohort.location}
                              Icon={Location}
                            />
                          </>
                        )}
                      </div>

                      {cohort?.meetingDetails && (
                        <InfoBlock
                          heading="Additional Information"
                          Icon={Information}
                          content={
                            <div>
                              {cohort.meetingDetails
                                .split('\n')
                                .map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span>
                                ))}
                            </div>
                          }
                        />
                      )}

                      {cohort?.adminEmail && (
                        <div
                          className={flex({
                            justifyContent: 'center',
                            py: '2',
                            px: '3',
                            mt: '8',
                            borderRadius: 'lg',
                            border: '1px solid',
                            borderColor: 'cerberus.brand.10',
                            bgColor: 'cerberus.neutral.60',
                            letterSpacing: '0.3px',
                            color: 'cerberus.neutral.white'
                          })}
                        >
                          <span>
                            Questions about this training? Contact{' '}
                            <a
                              href={`mailto:${cohort.adminEmail}`}
                              className={css({
                                color: 'cerberus.teal.60',
                                textDecoration: 'underline',
                                lineHeight: '150%'
                              })}
                            >
                              {cohort.adminEmail}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={css({ flex: '4' })}>
                    <div
                      className={css({
                        w: 'fit-content',
                        ml: 'auto',
                        mr: '104px'
                      })}
                    >
                      <ImageFetcher
                        src={cohort?.missionPartner?.logoUrl}
                        fallbackSrc="/admin/images/sotx-space-force-logo.png"
                        alt=""
                        width={206}
                        height={224}
                      />
                    </div>
                    {cohort?.libraryItems && (
                      <div className={css({ mt: '146px' })}>
                        {/* <LibraryList libraryItems={cohort.libraryItems} /> */}
                        <LibraryList libraryItems={mockLibraryItems} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: '7',
            px: '16',
            textAlign: 'center',
            bgColor: 'cerberus.neutral.100',
            color: 'cerberus.brand.5',
            zIndex: '1',
            textStyle: 'heading-xs'
          })}
        >
          <div className={flex({ gap: '6' })}>
            <span>Digital University © {new Date().getFullYear()}</span>
            <span className={css({})}>|</span>
            <span>Product of the United States Air Force</span>
          </div>
          <p className={css({ color: 'cerberus.teal.60', cursor: 'pointer' })}>
            Terms of Use
          </p>
        </footer>
      </div>
    </MainContentVStack>
  );
};
