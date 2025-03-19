type AffiliateKeys =
  | 'army'
  | 'dod'
  | 'air-force'
  | 'space-force'
  | 'coast-guard';

export const missionPartnerLogoMap: Record<AffiliateKeys | 'default', string> =
  {
    army: '/admin/images/affiliates/army.png',
    dod: '/admin/images/affiliates/dod.png',
    'air-force': '/admin/images/affiliates/air-force.png',
    'space-force': '/admin/images/affiliates/space-force.png',
    'coast-guard': '/admin/images/digitalu-logo.svg',
    default: '/admin/images/digitalu-logo.svg'
  };
