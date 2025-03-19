import React, { type JSX } from 'react';
import { circle } from '@cerberus/styled-system/patterns';
import { Document, Video, VolumeUp, Link } from '@cerberus/icons';

type ItemType = 'File' | 'Video' | 'Audio' | 'Link';

type IconCircleProps = {
  type: ItemType;
  size?: 'normal' | 'large';
};

/**
 * Renders an icon inside a styled circle based on the item type.
 *
 * @param {IconCircleProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <IconCircle type="Video" width="4rem" height="4rem" />
 * ```
 */
export const LibraryItemIcon = ({
  type,
  size = 'normal'
}: IconCircleProps): JSX.Element => {
  const iconSize = size === 'normal' ? 12 : 24;

  const renderIcon = () => {
    switch (type) {
      case 'File':
        return <Document size={iconSize} />;
      case 'Video':
        return <Video size={iconSize} />;
      case 'Audio':
        return <VolumeUp size={iconSize} />;
      case 'Link':
        return <Link size={iconSize} />;
      default:
        return <Document size={24} />;
    }
  };

  return (
    <div
      className={circle({
        w: size === 'normal' ? '1.6rem' : '3rem',
        h: size === 'normal' ? '1.6rem' : '3rem',
        p: 1,
        background: 'linear-gradient(207deg, #E6F3FB 16.67%, #9ACFEE 100%)'
      })}
    >
      {renderIcon()}
    </div>
  );
};
