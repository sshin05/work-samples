import { type CarbonIconType, InformationSquare } from '@carbon/icons-react';
import { Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { useContext } from 'react';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';

type ContentSectionHeaderProps = {
  title: string;
  description: string;
  Icon?: CarbonIconType;
  isOptional?: boolean;
};

export const ContentSectionHeader = ({
  title,
  description,
  Icon,
  isOptional
}: ContentSectionHeaderProps) => {
  const { isLoadingCohort } = useContext(CreateCohortContext);

  return (
    <div
      aria-busy={isLoadingCohort}
      className={flex({
        bgColor: 'page.surface.100',
        border: '1px solid',
        borderColor: 'page.border.100',
        borderRadius: 'md',
        alignItems: 'center',
        p: 6
      })}
    >
      <div
        className={flex({
          alignItems: 'center',
          borderRadius: '50%',
          gradient: 'charon-light',
          h: 8,
          w: 8,
          mr: 8,
          flexShrink: 0
        })}
      >
        <Show
          when={Boolean(Icon)}
          fallback={<InformationSquare className={css({ m: 'auto' })} />}
        >
          {Boolean(Icon) && <Icon className={css({ m: 'auto' })} />}
        </Show>
      </div>
      <div className={flex({ justifyContent: 'space-between' })}>
        <div>
          <h2 className={css({ textStyle: 'heading-xs', mb: 2 })}>{title}</h2>

          <div className={css({ textStyle: 'body-sm' })}>{description}</div>
        </div>
        {isOptional && (
          <div
            className={css({
              textStyle: 'body-sm',
              color: 'page.text.100'
            })}
          >
            Optional
          </div>
        )}
      </div>
    </div>
  );
};
