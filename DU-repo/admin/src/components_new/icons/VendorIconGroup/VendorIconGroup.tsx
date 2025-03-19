import React, { type JSX } from 'react';
import {
  CloudAcademy,
  Coursera,
  DataCamp,
  Dataiku,
  DefaultIcon,
  HackEDU,
  JupyterNotebook,
  Pluralsight,
  Udacity,
  Udemy,
  Workera
} from './VendorIcon/icons';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import {
  type imageSizes,
  type FontWeight,
  type TextVariant,
  type VendorOptions
} from './VendorIconGroup.types';

export interface VendorIconGroupTypes {
  size?: imageSizes;
  fontWeight?: FontWeight;
  variant?: TextVariant;
  vendors?: VendorOptions[];
  [key: string]: unknown;
}

export const VendorIconGroup = ({
  size = 's',
  variant = 'dark',
  vendors = [],
  ...props
}: VendorIconGroupTypes) => {
  const vendorIcons: Record<VendorOptions, JSX.Element> = {
    'Cloud Academy': <CloudAcademy size={size} variant={variant} />,
    Coursera: <Coursera size={size} variant={variant} />,
    DataCamp: <DataCamp size={size} variant={variant} />,
    Dataiku: <Dataiku size={size} variant={variant} />,
    HackEDU: <HackEDU size={size} variant={variant} />,
    'Jupyter Notebook': <JupyterNotebook size={size} variant={variant} />,
    Pluralsight: <Pluralsight size={size} variant={variant} />,
    Udacity: <Udacity size={size} variant={variant} />,
    Udemy: <Udemy size={size} variant={variant} />,
    Workera: <Workera size={size} variant={variant} />
  };

  const renderIcon = (vendor: VendorOptions) => {
    const icon = vendorIcons[vendor];
    if (icon)
      return (
        <div
          className={hstack({
            flexFlow: '0 1 auto'
          })}
        >
          {icon}
        </div>
      );

    return (
      <div
        className={hstack({
          flexFlow: '0 1 auto'
        })}
      >
        <DefaultIcon size={size} />
      </div>
    );
  };

  return (
    <div
      className={hstack({
        gap: 8
      })}
      {...props}
    >
      {vendors?.length > 0 &&
        vendors.map((vendor, index) => (
          <React.Fragment key={`${vendor}-${index}`}>
            {renderIcon(vendor)}
            {vendors.length === 1 && (
              <p
                className={css({
                  textStyle: 'body-sm'
                })}
              >
                {vendor}
              </p>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
