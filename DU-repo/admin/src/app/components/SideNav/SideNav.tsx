import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { SideNavPrimarySection } from './components/SideNavPrimarySection';
import { SideNavUserMenu } from './components/SideNavUserMenu/SideNavUserMenu';
import { SideNavQuickLinks } from './components/SideNavQuickLinks';
import { usePathname } from 'next/navigation';
import { HIDE_SIDENAV_PATHS } from '@/utils/getRouteUrl/routeConstants';

export const SideNav = () => {
  const SIDE_NAV_WIDTH = '14rem';
  const pathname = usePathname();
  const isSidebarHidden = HIDE_SIDENAV_PATHS.includes(pathname);

  if (isSidebarHidden) {
    return null;
  }

  // The sidebar is fixed to the left of the screen. It needs the additional div to fill the space due to the fixed positioning.
  return (
    <>
      <div
        className={vstack({
          w: SIDE_NAV_WIDTH,
          position: 'fixed',
          h: '100vh',
          p: '4',
          bgColor: 'page.surface.100',
          boxShadow: '-2px 0px 16px 0px rgba(0, 0, 0, 0.05)',
          flexShrink: 0,
          zIndex: 'overlay'
        })}
      >
        <SideNavQuickLinks />

        <SideNavPrimarySection />

        <SideNavUserMenu />
      </div>
      <div
        className={css({
          minW: SIDE_NAV_WIDTH
        })}
      ></div>
    </>
  );
};
