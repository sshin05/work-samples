import { MP_ROOT_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | Reporting | ${MP_ROOT_PAGE_LABEL}`,
    default: 'Reporting'
  }
};

const ReportingAdminLayout = props => {
  return props.children;
};

export default ReportingAdminLayout;
