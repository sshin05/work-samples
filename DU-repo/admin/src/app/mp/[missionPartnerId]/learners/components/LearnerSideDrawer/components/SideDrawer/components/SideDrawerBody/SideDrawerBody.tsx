import { css } from '@cerberus/styled-system/css';

type SideDrawerBodyProps = {
  children: React.ReactNode;
  drawerHasFooter?: boolean;
};

export const SideDrawerBody = ({
  children,
  drawerHasFooter
}: SideDrawerBodyProps) => (
  <div
    className={css({
      px: '8',
      overflow: 'auto',
      pb: drawerHasFooter ? '208px' : '2rem'
    })}
  >
    {children}
  </div>
);
