'use client';
import { css } from '@cerberus/styled-system/css';
import { SideNav } from './SideNav';
import MainContent from './MainContent';
import { useRouteBasedTheming } from '@/hooks/useRouteBasedTheming/useRouteBasedTheming';
import { useGetSidebarEligibility } from '@/hooks/useGetSidebarEligibility/useGetSidebarEligibility';

const appContentWrapper = css({
  display: 'flex',
  minH: '100vh',
  width: '100%'
});

const GlobalLayout = ({ children }) => {
  useRouteBasedTheming();
  const { shouldHideSidebar } = useGetSidebarEligibility();

  return (
    <div className={appContentWrapper}>
      {!shouldHideSidebar && <SideNav />}
      <MainContent applySidebarContentStyling={!shouldHideSidebar}>
        {children}
      </MainContent>
    </div>
  );
};

export default GlobalLayout;
