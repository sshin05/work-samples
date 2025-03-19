export const DEFAULT_DU_LOGO_PATH = '/admin/images/digitalu-logo.svg';
export const PROGRAM_LINK_BORDER_RADIUS = '4px';

export type AffiliateId =
  | 'army'
  | 'dod'
  | 'air-force'
  | 'space-force'
  | 'coast-guard';

export const missionPartnerLogoMap = (affiliateID: AffiliateId) => {
  switch (affiliateID) {
    case 'army':
      return '/admin/images/affiliates/army.png';
    case 'dod':
      return '/admin/images/affiliates/dod.png';
    case 'air-force':
      return '/admin/images/affiliates/air-force.png';
    case 'space-force':
      return '/admin/images/affiliates/space-force.png';
    case 'coast-guard':
      return DEFAULT_DU_LOGO_PATH;
    default:
      return DEFAULT_DU_LOGO_PATH;
  }
};
