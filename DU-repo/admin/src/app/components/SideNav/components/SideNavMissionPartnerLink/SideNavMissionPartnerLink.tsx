import { css } from '@cerberus/styled-system/css';
import Link from 'next/link';
import type { ReactNode } from 'react';

type SideNavMissionPartnerLinkProps = {
  children: ReactNode;
  href: string;
};

export const SideNavMissionPartnerLink = ({
  children,
  href
}: SideNavMissionPartnerLinkProps) => {
  return (
    <Link
      className={css({
        color: 'action.navigation.initial',
        cursor: 'pointer',
        textStyle: 'link',
        fontSize: '13px',
        _hover: {
          color: 'action.navigation.hover'
        }
      })}
      href={href}
    >
      {children}
    </Link>
  );
};
