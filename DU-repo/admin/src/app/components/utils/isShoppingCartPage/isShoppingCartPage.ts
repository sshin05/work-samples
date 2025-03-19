import { MISSION_PARTNER_ID_PATTERN } from '@/app/constants/missionPartnerIdConstants';
import { normalizePathname } from '../normalizePathname/normalizePathname';

export const isShoppingCartPage = (pathname: string): boolean => {
  const shoppingCartPagePattern = new RegExp(
    `^/mp/${MISSION_PARTNER_ID_PATTERN}/curriculum-catalog?$`
  );

  return shoppingCartPagePattern.test(normalizePathname(pathname));
};
