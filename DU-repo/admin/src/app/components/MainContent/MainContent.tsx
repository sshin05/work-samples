import { css } from '@cerberus/styled-system/css';
import { usePathname } from 'next/navigation';
import { isShoppingCartPage } from '../utils/isShoppingCartPage';
import { SVGToCanvas } from './SVGToCanvas';

type MainContentProps = {
  children: React.ReactNode;
  applySidebarContentStyling?: boolean;
};

// todo: better name that implies it's a root-level app router container
const MainContent = ({
  applySidebarContentStyling,
  children
}: MainContentProps) => {
  const pathname = usePathname();
  const isShoppingCartRoute = isShoppingCartPage(pathname);
  const fullHeightStyle = isShoppingCartRoute ? css({ h: 'full' }) : undefined;

  return (
    <main
      className={css({
        w: 'full',
        ...(applySidebarContentStyling && {
          p: '16'
        })
      })}
    >
      <SVGToCanvas />
      <div id="app-root" className={fullHeightStyle}>
        {children}
      </div>
    </main>
  );
};

export default MainContent;
