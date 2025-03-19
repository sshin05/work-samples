import { hstack } from '@cerberus/styled-system/patterns';
import { UserActionMenu } from './components/UserActionMenu';

export const SideNavUserMenu = () => {
  return (
    <div
      className={hstack({
        mt: 'auto',
        gap: '4',
        maxWidth: '12rem',
        alignItems: 'center',
        pos: 'relative',
        bottom: '8',
        bgColor: 'page.surface.100'
      })}
    >
      <img
        src="/admin/images/du-logo-mark.svg"
        alt="Digital University Admin Logo"
      />
      <UserActionMenu />
    </div>
  );
};
