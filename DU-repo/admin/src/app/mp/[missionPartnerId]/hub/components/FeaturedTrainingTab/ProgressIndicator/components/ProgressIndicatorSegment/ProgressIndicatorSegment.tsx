import { Tooltip } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { type ProgressIndicatorSegmentProps } from './ProgressIndicatorSegment.types';

export const ProgressIndicatorSegment = ({
  label,
  value,
  width,
  color,
  isFirst,
  isLast
}: ProgressIndicatorSegmentProps) => (
  <Tooltip position="top" content={`${label}: ${value}`}>
    <div
      aria-label={`${label}: ${value}`}
      className={hstack({
        h: 5,
        borderTopLeftRadius: isFirst ? '4rem' : 0,
        borderBottomLeftRadius: isFirst ? '4rem' : 0,
        borderTopRightRadius: isLast ? '4rem' : 0,
        borderBottomRightRadius: isLast ? '4rem' : 0
      })}
      style={{
        width,
        backgroundColor: color
      }}
    />
  </Tooltip>
);
