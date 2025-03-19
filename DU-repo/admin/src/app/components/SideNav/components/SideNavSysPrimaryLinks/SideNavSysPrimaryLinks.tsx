import { vstack } from '@cerberus/styled-system/patterns';
import {
  Dashboard,
  Notebook,
  Password,
  Settings,
  WatsonHealth3DCurveManual,
  ContainerServices
} from '@cerberus/icons';
import { SideNavMenuLink } from '../SideNavMenuLink';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const ICON_SIZE = 20;

export const SideNavSysPrimaryLinks = () => {
  return (
    <ul
      className={vstack({
        w: 'full',
        h: 'auto',
        alignItems: 'flex-start',
        gap: '2',
        mt: '6',
        mb: '10',
        flex: 1,
        overflowY: 'auto'
      })}
    >
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysHome())}
        label="Overview"
      >
        <Dashboard size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysLicenses())}
        label="Licenses"
      >
        <Password size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysSettings())}
        label="Global Settings"
      >
        <Settings size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysServices())}
        label="Services"
      >
        <ContainerServices size={20} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysDCWF())}
        label="DCWF"
      >
        <Notebook size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.SysManualItems())}
        label="Manual Items"
      >
        <WatsonHealth3DCurveManual size={ICON_SIZE} />
      </SideNavMenuLink>
    </ul>
  );
};
