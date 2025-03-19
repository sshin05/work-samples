import { iconSizes } from '../../VendorIconGroup.types';
import { type VendorIconProps } from './iconTypes';
import { css } from '@cerberus/styled-system/css';

interface MITHorizonProps {
  size?: VendorIconProps['size'] | 'du-create-modal-narrow';
  variant?: VendorIconProps['variant'];
}

export const MITHorizon = ({
  size = 'm',
  variant = 'dark'
}: MITHorizonProps) => {
  const fill = variant === 'light' ? 'white' : 'purple';
  return (
    <svg
      width={size === 'du-create-modal-narrow' ? '31px' : iconSizes[size]}
      height={size === 'du-create-modal-narrow' ? '31px' : iconSizes[size]}
      viewBox="0 0 160.585 80.859"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-labelledby="mit-horizon-logo"
      role="img"
    >
      <title id="mit-horizon-logo">The MIT Horizon Logo</title>
      <path
        data-fill={fill}
        d="m140.987,37.409c-1.208-2.431-2.561-4.787-4.054-7.054l-45.517,26.301,26.269-45.549c-2.251-1.521-4.596-2.896-7.022-4.118l-26.301,45.58V0h-8.139v52.571L49.921,6.99c-2.431,1.208-4.787,2.561-7.054,4.054l26.301,45.549L23.652,30.355c-1.492,2.267-2.846,4.623-4.054,7.054l37.345,21.577H0v10.182h62.625c5.663-.012,10.782,3.371,12.991,8.586,1.089,2.583,4.066,3.793,6.649,2.704,1.219-.514,2.189-1.484,2.704-2.704,2.209-5.215,7.328-8.598,12.991-8.586h62.625v-10.182h-56.944l37.345-21.577Z"
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
