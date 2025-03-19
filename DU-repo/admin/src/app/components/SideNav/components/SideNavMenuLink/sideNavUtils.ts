import { normalizePathname } from '@/app/components/utils/normalizePathname';
import { MISSION_PARTNER_ID_PATTERN } from '@/app/constants/missionPartnerIdConstants';
import {
  MP_SLUG,
  SYS_ADMIN_SLUG,
  MARKETPLACE_SLUG
} from '@/utils/getRouteUrl/routeConstants';

const getIsMarketplacePath = (normalizedPathname: string) =>
  normalizedPathname.startsWith(`/${MARKETPLACE_SLUG}`);
const getIsMpPath = (normalizedPathname: string) =>
  normalizedPathname.startsWith(`/${MP_SLUG}`);
const getIsSysPath = (normalizedPathname: string) =>
  normalizedPathname.startsWith(`/${SYS_ADMIN_SLUG}`);

const getPatternForPath = (normalizedPathname: string): RegExp => {
  const mpPagePattern = new RegExp(
    `^/(?!${MARKETPLACE_SLUG}/)${MP_SLUG}/(${MISSION_PARTNER_ID_PATTERN})(?:/([^/]*))?`
  );
  const sysPagePattern = new RegExp(`^/${SYS_ADMIN_SLUG}(?:/([^/]*))?`);

  if (getIsMpPath(normalizedPathname)) {
    return mpPagePattern;
  }
  return sysPagePattern;
};

const getDefaultPath = (normalizedPathname: string): string => {
  if (getIsMpPath(normalizedPathname)) {
    return 'dashboard';
  }

  if (getIsSysPath(normalizedPathname)) {
    return 'overview';
  }

  return undefined;
};

export const isSelectedLink = (
  pathname: string = '',
  href: string = ''
): boolean => {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);

  const pattern = getPatternForPath(normalizedPathname);
  const defaultPath = getDefaultPath(normalizedPathname);

  const pathMatch = normalizedPathname.match(pattern);
  const subpath = (pathMatch && pathMatch.at(-1)) ?? defaultPath;

  const hrefMatch = normalizedHref.match(pattern);
  const linkSubpath = (hrefMatch && hrefMatch.at(-1)) ?? defaultPath;

  if (getIsMarketplacePath(normalizedHref)) {
    return false; // Links that navigate to the marketplace should not be considered selected. The marketplace layout does not contain a side nav.
  }

  return linkSubpath === sharedSubpathFor(subpath);
};

const sharedSubpathFor = (subpath: string): string => {
  switch (subpath) {
    case 'curriculum-catalog':
      return 'training';
    case 'learner':
      return 'learners';
    case 'portal-manager':
      return 'settings';
    case 'plan-metrics':
    case 'course-metrics':
      return 'dashboard';
    default:
      return subpath;
  }
};
