import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useChartColors } from '@/lib/chartjs';
import { LegendItem } from '../LegendItem';

export const LegendContainer = () => {
  const chartColors = useChartColors();

  return (
    <div className={hstack({ gap: 10 })} role="legend-container">
      <LegendItem
        label={
          <span>
            Assigned &amp;{' '}
            <span className={css({ fontWeight: 'bold' })}>active</span> (in last
            4 weeks)
          </span>
        }
        color={chartColors.sequential300}
      />
      <LegendItem
        label={
          <span>
            Assigned &amp;{' '}
            <span className={css({ fontWeight: 'bold' })}>inactive</span> (in
            last 4 weeks)
          </span>
        }
        color={chartColors.sequential200}
      />
      <LegendItem label="Available" color={chartColors.sequential100} />
    </div>
  );
};
