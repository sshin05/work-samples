import { iconSizes } from '../../VendorIconGroup.types';
import { type VendorIconProps } from './iconTypes';
import { css } from '@cerberus/styled-system/css';

export const DataCamp = ({ variant = 'dark', size = 's' }: VendorIconProps) => {
  const fill = variant === 'light' ? 'white' : 'purple';
  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="data-camp-logo"
      role="img"
    >
      <title id="data-camp-logo">The Data Camp Logo</title>
      <path
        data-fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10.0766 10.4564V13.0744L14.2027 15.4231L13.1973 16L9.33216 13.7996C9.17832 13.7117 9.07943 13.5441 9.07943 13.3655V11.025L6.06588 12.7447C5.95372 12.8067 5.82696 12.8373 5.69888 12.8335C5.5708 12.8296 5.44612 12.7914 5.3379 12.7227C5.12638 12.5909 5.00001 12.3601 5.00001 12.1101V4.72323C4.99932 4.60076 5.03002 4.48016 5.08917 4.37292C5.14832 4.26568 5.23395 4.17538 5.3379 4.11063C5.44622 4.04228 5.57087 4.00419 5.69889 4.00033C5.82691 3.99646 5.95364 4.02696 6.06588 4.08865L9.82663 6.24786C9.98047 6.33577 10.0766 6.50334 10.0766 6.67915V9.30811L13.2028 7.52525L14.2082 8.09939L10.0766 10.4564ZM9.07943 9.87675V6.97034L5.9972 5.20122V11.6349L9.07943 9.87675Z"
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
