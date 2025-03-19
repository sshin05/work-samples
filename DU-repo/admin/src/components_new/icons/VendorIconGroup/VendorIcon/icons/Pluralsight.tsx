import { iconSizes } from '../../VendorIconGroup.types';
import { type VendorIconProps } from './iconTypes';
import { css } from '@cerberus/styled-system/css';

export const Pluralsight = ({
  variant = 'dark',
  size = 's'
}: VendorIconProps) => {
  const fill = variant === 'light' ? 'white' : 'purple';
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="pluralsight-logo"
      role="img"
    >
      <title id="pluralsight-logo">The Pluralsight Logo</title>
      <path
        data-fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM2.32825 7.1875C3.85825 2.96875 8.56 0.77425 12.79 2.31625H12.8133C17.0538 3.85825 19.249 8.56 17.7062 12.8125C16.1658 17.0425 11.44 19.2362 7.19875 17.695C2.96875 16.1545 0.775 11.4618 2.32825 7.1875ZM1 10C1 14.95 5.05 19 10 19C14.95 19 19 14.95 19 10C19 5.05 14.95 1 10 1C5.05 1 1 5.05 1 10ZM7.6945 7.43765V5.35375L15.76 10L7.6945 14.647V12.5618L5.83675 13.633V6.36625L7.6945 7.43765ZM7.6945 8.32944L6.625 7.71625V12.2957L7.6945 11.6793V8.32944ZM8.48125 11.2259V8.78051L10.6082 10L8.48125 11.2259ZM8.48125 12.1082L12.1375 10L8.48125 7.89138V6.6805L14.2188 10L8.48125 13.3195V12.1082Z"
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
