import React from 'react';
import { css } from '@cerberus/styled-system/css';

interface AffiliateLogoProps {
  affiliateId: string;
  width?: string;
  height?: string;
  padding?: string | number;
}

export const AffiliateLogo = ({
  affiliateId,
  width = '100px',
  height = '100px',
  padding = 0
}: AffiliateLogoProps) => {
  if (!affiliateId) return <div style={{ width, height }} />;

  const logoMap = {
    army: '/admin/images/affiliates/army.png',
    dod: '/admin/images/affiliates/dod.png',
    'air-force': '/admin/images/affiliates/air-force.png',
    'space-force': '/admin/images/affiliates/space-force.png',
    'coast-guard': '/admin/images/digitalu-logo.svg'
  };

  const logoUrl = logoMap[affiliateId] || '/admin/images/digitalu-logo.svg';

  return (
    <img
      className={css({
        w: width,
        h: height,
        p: padding
      })}
      src={logoUrl}
      alt={`${affiliateId} logo`}
      style={{
        width,
        height,
        padding
      }}
    />
  );
};
