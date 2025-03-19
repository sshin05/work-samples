import { iconSizes } from '../../VendorIconGroup.types';
import { type VendorIconProps } from './iconTypes';
import { css } from '@cerberus/styled-system/css';

export const HackEDU = ({ variant = 'dark', size = 's' }: VendorIconProps) => {
  const fill = variant === 'light' ? 'white' : 'purple';
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="hack-edu-logo"
      role="img"
    >
      <title id="hack-edu-logo">The HackEDU Logo</title>
      <path
        data-fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM13.8182 6.54545V3.39394H6.18182V6.54545H13.8182ZM6.18182 8.36364H13.5758V11.5152H6.18182V8.36364ZM13.8182 16.4848V13.3333H6.18182V16.4848H13.8182Z"
        className={css({
          '&[data-fill="white"]': {
            fill: 'white'
          },
          '&[data-fill="purple"]': {
            fill: '#302451'
          }
        })}
      />
    </svg>
  );
};
