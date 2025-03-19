import { formatNotifyCount } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';

interface CustomNotifyBadgeProps {
  count: number | null;
}
export const CustomNotifyBadge = ({ count }: CustomNotifyBadgeProps) => {
  if (count < 1) return null;

  return (
    <div
      aria-label="View notifications"
      className={hstack({
        bg: 'action.bg.initial',
        color: 'action.text.initial !important',
        w: '1.25rem',
        h: '1.25rem',
        padding: [1, 1.5],
        borderRadius: '1.5rem',
        justifyContent: 'center',
        fontSize: '0.625rem',
        lineHeight: 1
      })}
    >
      {formatNotifyCount(count)}
    </div>
  );
};
