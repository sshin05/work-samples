import { useEffect, useState } from 'react';
import { css, cx } from '@cerberus/styled-system/css';
import type { AwsImageProps } from './AwsImageProps';

/**
 * AwsImage Component
 *
 * Next/Image <Image/>s are not recommended for AWS images because performance is degraded.
 * Use This component instead!
 */
export const AwsImage = ({
  src,
  alt,
  isCircularImage,
  loading = false,
  w = '32px',
  h = '32px',
  bg = 'page.bg.100',
  className
}: AwsImageProps) => {
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    if (src?.length > 0) {
      setImageError(false);
    }
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError || !src || loading) {
    const widthSansPx = w.replace('px', '');
    const heightSansPx = h.replace('px', '');

    // this is used for both the spinner and for the fallback svg;  aria-busy={loading}
    return (
      <div
        aria-busy={loading}
        className={css({
          borderRadius: loading && isCircularImage ? 'full' : 'none'
        })}
      >
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ minWidth: '32px' }}
          width={widthSansPx}
          height={heightSansPx}
          viewBox={`0 0 ${widthSansPx} ${heightSansPx}`}
          fill="none"
        >
          {isCircularImage && (
            <circle
              cx="16"
              cy="16"
              r="16"
              className={css({ fill: 'page.bg.100' })}
            />
          )}
          {!isCircularImage && (
            <rect cx="16" cy="16" className={css({ fill: 'page.bg.100' })} />
          )}
        </svg>
      </div>
    );
  }

  return (
    <img
      className={cx(
        css({
          w,
          h,
          bg,
          objectFit: 'cover',
          borderRadius: isCircularImage ? 'full' : 'none'
        }),
        className
      )}
      src={src}
      alt={alt}
      onError={handleImageError}
    />
  );
};
