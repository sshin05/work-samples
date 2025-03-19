import { MISSION_PARTNER_ID_PATTERN } from '@/app/constants/missionPartnerIdConstants';

const regex = new RegExp(`^/mp/(${MISSION_PARTNER_ID_PATTERN})(?:/([^/]*))?`);

export const getRouteBackground = (route: string) => {
  const routesWithBackground = new Set([
    'badges',
    'cohorts',
    'gradebook',
    'hub',
    'learners',
    'lic',
    'reporting-admin',
    'settings',
    'training',
    'trial-expired'
  ]);

  if (route.endsWith('curriculum-catalog')) return '';
  if (route.includes('/marketplace')) return '';

  if (route === '/mp') return 'mission-partners';
  if (route === '/trial-expired') return 'trial-expired';

  const match = route.match(regex);
  if (!match) return 'dashboard';

  const basePath = match.at(-1);
  if (basePath === 'learner') return 'learners';
  if (basePath === 'portal-manager') return 'settings';

  return routesWithBackground.has(basePath) ? basePath : 'dashboard';
};
