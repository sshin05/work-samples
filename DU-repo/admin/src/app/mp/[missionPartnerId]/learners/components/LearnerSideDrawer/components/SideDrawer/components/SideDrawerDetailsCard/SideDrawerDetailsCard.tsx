import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Location } from '@cerberus/icons';
import { formatDetailValue } from '../../utils/formatDetailValue';
import { Tooltip } from '@cerberus/react';

export const SideDrawerDetailsCard = ({ label, value }) => {
  const cardContainer = vstack({ alignItems: 'flex-start', gap: 0 });
  const cardLabel = css({ textStyle: 'label-sm' });
  const cardContent = css({
    textStyle: 'body-md',
    fontWeight: 600,
    maxW: '6rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  });

  const formattedValue = formatDetailValue(label, value);
  const formattedValueWithTooltip =
    formattedValue === '--' ? (
      <span className={cardContent}>{formattedValue}</span>
    ) : (
      <Tooltip position="top" content={formattedValue} asChild>
        <span className={cardContent}>{formattedValue}</span>
      </Tooltip>
    );

  if (label === 'Duty Station') {
    return (
      <div className={cardContainer}>
        <span className={cardLabel}>Duty Station</span>
        <div className={hstack({ gap: 1 })}>
          <Location size={16} />
          {formattedValueWithTooltip}
        </div>
      </div>
    );
  }

  return (
    <div className={cardContainer}>
      <span className={css({ textStyle: 'label-sm' })}>{label}</span>
      {formattedValueWithTooltip}
    </div>
  );
};
