import React, { type FC } from 'react';
import { Image } from '@digital-u/digital-ui';

interface AffiliateLogoProps {
  affiliateId: string;
  width?: string;
  height?: string;
  padding?: string | number;
}

const AffiliateLogo: FC<AffiliateLogoProps> = ({
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
    <Image
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

export default AffiliateLogo;
