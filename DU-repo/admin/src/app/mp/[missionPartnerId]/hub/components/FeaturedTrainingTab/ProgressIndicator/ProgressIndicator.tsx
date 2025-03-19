'use client';
import React from 'react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { useChartColors } from '@/lib/chartjs';
import { toPixelWidth, getNonZeroSegments, getLabelToKeyMap } from './utils';
import { ProgressIndicatorSegment } from './components/ProgressIndicatorSegment';
import { type ProgressIndicatorProps } from './ProgressIndicator.types';

export const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const {
    assigned = 0,
    inProgress = 0,
    stopped = 0,
    completed = 0,
    containerWidth
  } = props;
  const chartColors = useChartColors();
  const sum = assigned + inProgress + stopped + completed;
  const progressBarWidths = {
    assigned: toPixelWidth(assigned, sum, containerWidth),
    inProgress: toPixelWidth(inProgress, sum, containerWidth),
    stopped: toPixelWidth(stopped, sum, containerWidth),
    completed: toPixelWidth(completed, sum, containerWidth)
  };
  const nonZeroSegments = getNonZeroSegments(
    assigned,
    inProgress,
    stopped,
    completed,
    chartColors
  );
  const firstSegment = nonZeroSegments[0]?.label;
  const lastSegment = nonZeroSegments[nonZeroSegments.length - 1]?.label;
  const labelToKeyMap = getLabelToKeyMap();

  return (
    <div
      className={css({
        h: 4,
        w: 'full'
      })}
      aria-label={`Progress: Assigned ${assigned}, In Progress ${inProgress}, Stopped ${stopped}, Completed ${completed}`}
    >
      <div
        className={hstack({
          gap: 'xs',
          h: 'full',
          justifyContent: 'flex-start',
          w: 'full'
        })}
      >
        {nonZeroSegments.map(segment => {
          const isFirst = segment.label === firstSegment;
          const isLast = segment.label === lastSegment;

          return (
            <ProgressIndicatorSegment
              key={segment.label}
              label={segment.label}
              value={segment.value}
              width={progressBarWidths[labelToKeyMap[segment.label]]}
              color={segment.color}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        })}
      </div>
    </div>
  );
};
