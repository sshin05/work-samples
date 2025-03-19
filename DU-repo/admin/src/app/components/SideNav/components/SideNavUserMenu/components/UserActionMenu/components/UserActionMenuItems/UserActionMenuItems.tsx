import { Button, MenuItem, Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import {
  Education,
  Logout,
  Report,
  Settings,
  Store,
  UserAdmin
} from '@cerberus/icons';
import { vstack } from '@cerberus/styled-system/patterns';
import {
  useIsDuAdmin,
  useSignOut
} from '@/hooks/useCurrentSession/useCurrentSession';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { navLinkStyles } from './userActionMenuItems.styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SYS_ADMIN_SLUG } from '@/utils/getRouteUrl/routeConstants';

export const UserActionMenuItems = () => {
  const { signOut } = useSignOut();
  const { isDuAdmin } = useIsDuAdmin();
  const pathname = usePathname();

  const onSysAdmin = pathname.startsWith(`/${SYS_ADMIN_SLUG}`);

  return (
    <div
      className={vstack({
        alignItems: 'flex-start',
        justifyContent: 'center'
      })}
    >
      <div
        className={css({
          w: 'full',
          borderColor: 'page.border.100',
          borderBottom: '1px solid',
          textAlign: 'left'
        })}
      >
        <MenuItem value="report-center">
          <Link
            className={navLinkStyles}
            href={getRouteUrl(routeGenerators.ReportCenter())}
          >
            Report Center
            <Report size={16} color="initial" />
          </Link>
        </MenuItem>
      </div>
      {isDuAdmin && (
        <div
          className={css({
            w: 'full',
            borderColor: 'page.border.100',
            borderBottom: '1px solid',
            textAlign: 'left'
          })}
        >
          <MenuItem value="system-portal">
            <Show
              when={onSysAdmin}
              fallback={
                <Link
                  className={navLinkStyles}
                  href={getRouteUrl(routeGenerators.SysHome())}
                >
                  System Portal
                  <Settings size={16} color="initial" />
                </Link>
              }
            >
              <Link
                className={navLinkStyles}
                href={getRouteUrl(routeGenerators.AdminHome())}
              >
                Admin Portal
                <UserAdmin size={16} color="initial" />
              </Link>
            </Show>
          </MenuItem>
        </div>
      )}
      {isDuAdmin && (
        <div
          className={css({
            w: 'full',
            borderColor: 'page.border.100',
            borderBottom: '1px solid',
            textAlign: 'left'
          })}
        >
          <MenuItem value="vendor-portal">
            <Link
              className={navLinkStyles}
              href={getRouteUrl(routeGenerators.VendorHome())}
            >
              Vendor Portal
              <Store size={16} color="initial" />
            </Link>
          </MenuItem>
        </div>
      )}
      <div
        className={css({
          w: 'full',
          borderColor: 'page.border.100',
          borderBottom: '1px solid',
          textAlign: 'left',
          pos: 'relative',
          top: '-3px'
        })}
      >
        <MenuItem value="student-portal">
          <a
            className={navLinkStyles}
            href="#"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Student Portal
            <Education size={16} color="initial" />
          </a>
        </MenuItem>
      </div>
      <MenuItem value="logout">
        <Button
          usage="ghost"
          className={css({ w: 'full', p: 0, h: 0, mb: '2' })}
          onClick={signOut}
        >
          <div className={navLinkStyles}>
            Logout
            <Logout size={16} color="initial" />
          </div>
        </Button>
      </MenuItem>
    </div>
  );
};
