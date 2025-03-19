import { usePathname } from 'next/navigation';
import {
  APP_VERSION_PATH_PREFIX,
  MP_SLUG,
  SYS_ADMIN_SLUG
} from '@/utils/getRouteUrl/routeConstants';
import { MpSideNavButtonMenu } from '../MpSideNavButtonMenu';

const MP_ROUTE_STARTER = `${APP_VERSION_PATH_PREFIX}/${MP_SLUG}`;
const SYS_ADMIN_ROUTE_STARTER = `${APP_VERSION_PATH_PREFIX}/${SYS_ADMIN_SLUG}`;

export const SideNavQuickLinks = () => {
  const pathname = usePathname();

  if (pathname?.startsWith(MP_ROUTE_STARTER)) {
    return <MpSideNavButtonMenu />;
  }

  if (pathname?.startsWith(SYS_ADMIN_ROUTE_STARTER)) {
    return;
  }

  return <MpSideNavButtonMenu />;
};
