import { MP_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | ${MP_PAGE_LABEL}`,
    default: MP_PAGE_LABEL
  }
};

const MMPLayout = props => {
  // Dashboard page does not have pageHeader here, due to it being the parent page
  return props.children;
};

export default MMPLayout;
