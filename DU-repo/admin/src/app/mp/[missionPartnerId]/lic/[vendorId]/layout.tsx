import { MP_ROOT_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | Manage Licenses | ${MP_ROOT_PAGE_LABEL}`,
    default: 'Manage Licenses'
  }
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default Layout;
