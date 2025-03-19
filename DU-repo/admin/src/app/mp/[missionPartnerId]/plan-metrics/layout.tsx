import type { Metadata } from 'next';
import { MP_ROOT_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | Plans | ${MP_ROOT_PAGE_LABEL}`,
    default: 'Plans'
  }
};

const PlanMetricsLayout = props => {
  return props.children;
};

export default PlanMetricsLayout;
