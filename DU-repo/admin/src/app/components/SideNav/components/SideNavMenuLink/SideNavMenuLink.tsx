import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import { IconButton } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { CustomNotifyBadge } from '@/components_new/notifications/CustomNotifyBadge';
import { isSelectedLink } from './sideNavUtils';

type SideNavMenuLinkProps = {
  href: string;
  label: string;
  subLabel?: string;
  children: React.ReactNode;
  notificationsCount?: number;
};

const ACTION_HOVER_COLOR = 'action.navigation.hover';
const ACTION_BG = 'action.ghost.active';

export const SideNavMenuLink = ({
  href,
  label,
  subLabel,
  children,
  notificationsCount
}: SideNavMenuLinkProps) => {
  const pathname = usePathname() || '';
  const isActive = isSelectedLink(pathname, href);

  return (
    <li
      className={css({
        w: '12rem',
        alignItems: 'center',
        bgColor: isActive ? 'action.ghost.active' : 'transparent',
        borderRadius: '6',
        color: isActive ? 'action.text.200' : 'inherit',
        textStyle: 'body-sm',
        _hover: {
          bgColor: 'action.ghost.hover',
          '& *': {
            color: 'action.text.200'
          }
        }
      })}
    >
      <Link
        href={href}
        className={css({
          w: 'full',
          display: 'inline-block',
          color: 'action.text.inverse',
          py: '3',
          px: '4',
          borderRadius: 'inherit',
          bg: isActive ? ACTION_BG : '',
          _hover: {
            color: ACTION_HOVER_COLOR,
            bg: ACTION_BG
          }
        })}
      >
        <div className={hstack({ alignItems: 'center', gap: '2' })}>
          <IconButton
            className={css({
              padding: '0',
              w: 'unset',
              height: 'unset',
              color: 'action.text.inverse'
            })}
            ariaLabel={label}
          >
            {children}
          </IconButton>
          <div
            className={css({
              textStyle: 'body-sm',
              textWrap: 'nowrap',
              lineHeight: '125%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            })}
          >
            {label}
            {subLabel && (
              <div
                className={css({
                  color: 'page.text.100',
                  textStyle: 'body-sm',
                  lineHeight: '120%',
                  letterSpacing: '0.32px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                })}
              >
                {subLabel}
              </div>
            )}
          </div>
          {notificationsCount > 0 && (
            <div className={css({ ml: 'auto' })}>
              <CustomNotifyBadge count={notificationsCount} />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};
