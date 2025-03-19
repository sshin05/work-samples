import { iconSizes } from '../../VendorIconGroup.types';
import { type VendorIconProps } from './iconTypes';
import { css } from '@cerberus/styled-system/css';

export const Dataiku = ({ variant = 'dark', size = 's' }: VendorIconProps) => {
  const fill = variant === 'light' ? 'white' : 'purple';
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="dataiku-logo"
      role="img"
    >
      <title id="dataiku-logo">Dataiku Logo</title>
      <path
        data-fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.47883 0 0 4.47428 0 10C0 15.5212 4.47883 20 10 20C15.5212 20 20 15.5212 20 10C20 4.47428 15.5212 0 10 0ZM15.635 13.1907H10.6782V12.3942H15.6304V13.1907H15.635ZM14.8475 5.59399C14.8475 5.59399 14.4879 6.11743 14.6746 7.35548C15.025 9.68138 13.8052 11.7478 11.6386 11.7478H10.041V12.3851C10.041 12.3851 9.07601 12.3851 8.76195 12.3851C8.44788 12.3851 7.81975 12.335 7.53755 12.6081C4.69276 15.33 4.09195 16.1129 3.89167 16.2221C3.76423 16.2904 3.73236 16.1402 3.73236 16.1402L11.9618 5.99454C11.9618 4.16477 13.9599 3.67774 14.7565 5.03414L15.817 4.66545L14.8475 5.59399Z"
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
