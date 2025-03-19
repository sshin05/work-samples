import { containerStyles } from '@/app/styles/ContainerStyles';
import { Spinner } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { BadgeSkeleton } from './BadgeSkeleton';

/**
 *
 * This is the layout for the badges section. It is used to show a loading state for the badges section.
 */
export const BadgesSectionLoader = () => {
  return (
    <div
      className={css({
        w: 'full',
        mb: '3rem',
        animationName: 'pulse',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out'
      })}
    >
      <div className={hstack({ mb: 4 })}>
        <Spinner size="1rem" />
        <h5 className={css({ textStyle: 'h5' })}>Badges</h5>
      </div>
      <div
        className={hstack({
          w: 'full',
          gap: 4,
          flexWrap: 'wrap',
          alignItems: 'stretch',
          boxSizing: 'border-box'
        })}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cx(
              vstack({
                p: 4,
                flex: {
                  base: '1 1 100%',
                  lg: '1 1 calc(50% - 12px)'
                },
                flexWrap: {
                  base: 'nowrap',
                  lg: 'wrap'
                },
                borderRadius: 2,
                minWidth: {
                  base: 'auto',
                  lg: 0
                },
                maxWidth: {
                  base: '100%',
                  lg: 'calc(50% - 12px)'
                },
                boxSizing: 'border-box',
                justifyContent: 'space-between'
              }),
              containerStyles
            )}
          >
            <div
              className={hstack({
                w: '100%',
                minWidth: 0,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignContent: 'center',
                gap: 2
              })}
            >
              <div
                className={hstack({
                  flex: {
                    base: 'auto',
                    xl: 1
                  },
                  minWidth: 0,
                  alignItems: 'center',
                  gap: 4
                })}
              >
                <span>
                  <BadgeSkeleton />
                </span>

                <div
                  className={css({
                    w: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  })}
                >
                  <h6
                    className={css({
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      bgColor: 'page.bg.100',
                      w: '187px',
                      h: '22px',
                      borderRadius: 'sm'
                    })}
                  ></h6>
                  <div
                    className={hstack({
                      pt: '2.5',
                      textStyle: 'body-sm',
                      gap: 1,
                      flexWrap: 'wrap'
                    })}
                  >
                    <div
                      className={css({
                        mr: 1,
                        bgColor: 'page.bg.100',
                        w: '64px',
                        h: '16px',
                        borderRadius: 'sm'
                      })}
                    ></div>
                    <div
                      className={css({
                        bgColor: 'page.bg.100',
                        w: '64px',
                        h: '16px',
                        borderRadius: 'sm'
                      })}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                className={css({
                  justifyContent: 'center',
                  ml: 'auto'
                })}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
