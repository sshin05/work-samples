import type { CarbonIconType } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';

type CardContainerProps = {
  title: string;
  description: string;
  Icon?: CarbonIconType;
  onClick?: () => void;
};

export const CardContainer = ({
  title,
  description,
  Icon,
  onClick
}: CardContainerProps) => {
  return (
    <div
      className={css({
        borderRadius: 'md',
        backgroundColor: 'page.surface.100',
        p: 6,
        alignItems: 'center',
        textAlign: 'center',
        h: '100%',
        cursor: 'pointer'
      })}
      onClick={onClick}
    >
      <div
        className={flex({
          alignItems: 'center',
          borderRadius: '50%',
          backgroundColor: 'page.surface.initial',
          h: 10,
          w: 10,
          m: '0 auto',
          mb: 3,
          flexShrink: 0
        })}
      >
        <Icon
          className={css({ m: 'auto', h: 6, w: 6, color: 'action.text.200' })}
        />
      </div>
      <h2
        className={css({
          textStyle: 'heading-xs',
          mb: 2,
          color: 'action.text.200'
        })}
      >
        {title}
      </h2>
      <div className={css({ textStyle: 'body-sm' })}>{description}</div>
    </div>
  );
};
