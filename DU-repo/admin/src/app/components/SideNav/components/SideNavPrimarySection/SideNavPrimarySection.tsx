import { useParams, usePathname } from 'next/navigation';
import { Menu, Show } from '@cerberus/react';
import { vstack } from '@cerberus/styled-system/patterns';
import { SideNavMpPrimaryLinks } from '../SideNavMpPrimaryLinks';
import { SideNavSysPrimaryLinks } from '../SideNavSysPrimaryLinks';
import { SYS_ADMIN_SLUG } from '@/utils/getRouteUrl/routeConstants';

export const SideNavPrimarySection = () => {
  const { missionPartnerId } = useParams();
  const pathname = usePathname();

  return (
    <div className={vstack({ w: 'full', flex: 1, overflowY: 'auto' })}>
      <Menu>
        {/* Other custom menus will go here too */}
        <Show when={Boolean(missionPartnerId)}>
          <SideNavMpPrimaryLinks />
        </Show>

        <Show when={pathname?.startsWith(`/${SYS_ADMIN_SLUG}`)}>
          <SideNavSysPrimaryLinks />
        </Show>
      </Menu>
    </div>
  );
};
