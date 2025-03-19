import React from 'react';
import { sum as lodashSum, filter as lodashFilter } from 'lodash';
import { Tooltip } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { useChartColors } from '@/lib/chartjs';

const createSegments = (active, inactive, available, chartColors) => [
  { label: 'Active', value: active, color: chartColors.sequential300 },
  { label: 'Inactive', value: inactive, color: chartColors.sequential200 },
  { label: 'Available', value: available, color: chartColors.sequential100 }
];

export const LicensesIndicator = ({
  containerWidth,
  active,
  inactive,
  available
}) => {
  // if the sum happens to be 0, use 1 instead to prevent division by zero
  const sum =
    lodashSum(
      lodashFilter([active, inactive, available], value => value > 0)
    ) || 1;
  const chartColors = useChartColors();
  const segments = createSegments(
    active,
    inactive,
    available,
    chartColors
  ).filter(seg => seg.value > 0);

  return (
    <div
      className={hstack({
        gap: 0,
        w: containerWidth || 'full',
        h: 9,
        borderRadius: 1,
        overflow: 'hidden',
        boxSizing: 'border-box'
      })}
      aria-label={`Progress: Active ${active}, Inactive ${inactive}, Available ${available}`}
    >
      {segments.map((segment, index) => {
        const percentValue = (segment.value / sum) * 100;
        const showValueLabel = percentValue > 2;
        const percentLabel =
          segment.value > 0 && percentValue < 1
            ? `<1%`
            : percentValue > 99 && percentValue !== 100
              ? `>99%`
              : `${Math.trunc(percentValue)}%`;

        return (
          <Tooltip
            key={index}
            position="top"
            content={`${segment.label}: ${segment.value} (${percentLabel})`}
            asChild
          >
            <div
              key={index}
              className={hstack({
                gap: 0,
                h: 'full',
                alignItems: 'center',
                justifyContent: 'flex-start'
              })}
              role={`segment-${segment.label.toLowerCase()}`}
              style={{
                width: `${percentValue}%`,
                minWidth: '0.5rem',
                backgroundColor: segment.color
              }}
            >
              <div
                className={css({
                  color: segment.label === 'Available' ? 'black' : 'white',
                  pl: '2',
                  cursor: 'initial'
                })}
              >
                {showValueLabel && (
                  <span
                    className={css({
                      textStyle: 'label-md',
                      fontFamily: 'var(--font-recursive)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })}
                  >
                    {segment.value} ({percentLabel})
                  </span>
                )}
              </div>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
