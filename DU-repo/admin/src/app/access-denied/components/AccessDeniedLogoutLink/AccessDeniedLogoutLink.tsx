'use client';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

export const AccessDeniedLogoutLink = () => {
  const { signOut } = useSignOut();

  return (
    <div
      onClick={signOut}
      className={css({
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      })}
    >
      <Link href={getRouteUrl(routeGenerators.AdminHome())}>Log Out</Link>
    </div>
  );
};
