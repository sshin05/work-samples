import React from 'react';
import { Timer } from '@carbon/icons-react';
import { vstack } from '@cerberus/styled-system/patterns';
import { hstack } from 'styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { VendorIconGroup } from '@/components_new/icons/VendorIconGroup';
import type { VendorOptions } from '@/components_new/icons/VendorIconGroup/VendorIconGroup.types';

interface TrainingVendorRowProps {
  duration?: string;
  vendors?: VendorOptions[];
}

export const TrainingVendorRow = ({
  duration,
  vendors
}: TrainingVendorRowProps) => (
  <div
    className={vstack({
      w: 'auto',
      h: 'auto'
    })}
  >
    {duration && (
      <div
        className={hstack({
          gap: 2
        })}
      >
        <Timer height="20px" width="20px" />
        {/* todo, change variant to semiDark */}
        <p
          className={css({
            textStyle: 'body-sm'
          })}
        >
          {duration}
        </p>
      </div>
    )}
    {vendors && (
      <div
        className={hstack({
          gap: 2
        })}
      >
        {/* todo, change variant to semiDark */}
        <VendorIconGroup vendors={vendors} variant="dark" fontWeight="light" />
      </div>
    )}
  </div>
);
