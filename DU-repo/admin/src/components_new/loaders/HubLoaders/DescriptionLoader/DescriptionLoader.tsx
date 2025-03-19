'use client';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { TextArea } from '@/components_new/form';
import { Copy } from '@carbon/icons-react';
import { AccessCodeField } from '@/app/mp/[missionPartnerId]/hub/components/UpdateDescriptionAndAccessCode/components/AccessCodeField';
import { Button } from '@cerberus/react';

/**
 * This is a loader component for the UpdateDescriptionAndAccessCode. It is used to show a loading state for the UpdateDescriptionAndAccessCode component on the Traning Hub Page.
 * @returns
 */
export const DescriptionLoader = () => {
  return (
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
          <TextArea
            name="description"
            label="Description"
            required
            rows={8}
            maxLength={300}
            inputLength={0}
            helpText="Text on this page shows on student portal landing page"
            className={css({ w: '25.6rem' })}
            disabled
          />
          <Copy
            className={css({
              ml: '-2.5rem',
              mt: '9',
              zIndex: 1,
              cursor: 'pointer'
            })}
          />
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
            <AccessCodeField
              accessCode={null}
              helpText="Copy this code and send it to learners to give access to the training hub"
              notify={null}
            />
            <Button
              className={css({ pos: 'relative', right: '1rem' })}
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
  );
};
