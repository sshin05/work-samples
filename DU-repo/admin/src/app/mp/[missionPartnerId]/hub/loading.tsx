import { PageHeader } from '@/components_new/typography/PageHeader';
import { css } from '@cerberus/styled-system/css';
import { Box } from '@cerberus/styled-system/jsx';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { AdminImageLoader } from '@/components_new/loaders/HubLoaders/AdminImageLoader/AdminImageLoader';
import { Button, Spinner } from '@cerberus/react';
import { cx } from 'styled-system/css';
import { containerStyles } from '@/app/styles/ContainerStyles';

const HubLoading = () => {
  return (
    <Box w="full">
      <div className={vstack({ gap: 2, alignItems: 'flex-start' })}>
        <PageHeader>Training Hub</PageHeader>
        <p>
          Your training hub is used by members of your organization to join your
          program, find its featured training items and explore cohorts. Add a
          description and at least one featured training item in the fields
          below to enable this page for learners.
        </p>
      </div>
      <div className={vstack({ gap: 8, alignItems: 'flex-start' })}>
        <h2
          className={css({
            textStyle: 'heading-md',
            pt: 16
          })}
        >
          Training Details
        </h2>
        <div
          className={hstack({
            w: 'full',
            h: 'full',
            gap: 8,
            alignItems: 'stretch'
          })}
        >
          <div
            className={cx(
              css({
                minW: 'fit-content',
                maxW: '50%',
                flex: '1',
                animationName: 'pulse',
                animationDuration: '2s',
                animationIterationCount: 'infinite'
              }),
              containerStyles
            )}
          >
            <form
              className={vstack({
                maxW: 'full',
                h: 'full',
                gap: '6',
                alignItems: 'flex-start',
                p: '6'
              })}
            >
              <div
                className={hstack({
                  alignItems: 'flex-start'
                })}
              >
                <div
                  className={css({
                    w: '25.6rem',
                    h: '7.125rem',
                    mt: '1.8rem',
                    mb: '1.801rem',
                    p: '.5rem',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'action.border.100',
                    borderRadius: 'sm',
                    bgColor: 'page.surface.100'
                  })}
                ></div>
              </div>
              <div
                className={vstack({
                  gap: '0',
                  alignItems: 'flex-start'
                })}
              >
                <div
                  className={hstack({
                    h: 'full',
                    gap: '1',
                    alignItems: 'center'
                  })}
                >
                  <div
                    className={hstack({
                      gap: '1',
                      cursor: 'pointer',
                      alignItems: 'flex-start',
                      maxW: '27rem',
                      mt: '1.75rem',
                      mb: '2.05rem'
                    })}
                  >
                    <div
                      className={css({
                        w: '25.6rem',
                        h: '2.5rem',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'action.border.100',
                        borderRadius: 'sm',
                        bgColor: 'page.surface.100'
                      })}
                    ></div>
                  </div>
                  <Button
                    className={css({
                      pos: 'relative',
                      right: '1rem',
                      ml: '1.5rem'
                    })}
                    type="button"
                    palette="action"
                    shape="rounded"
                    usage="ghost"
                    disabled
                  >
                    Update Code
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                palette="action"
                shape="rounded"
                usage="outlined"
                disabled
              >
                Save
              </Button>
            </form>
          </div>
          <AdminImageLoader />
        </div>
        <h2
          className={css({
            textStyle: 'heading-md',
            pt: 8
          })}
        >
          Featured training
        </h2>
      </div>
      <Box display="flex" justifyContent="center" mt="4">
        <Spinner size="2rem" />
      </Box>
    </Box>
  );
};

export default HubLoading;
