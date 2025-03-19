import { MP_ROOT_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | Custom Training | ${MP_ROOT_PAGE_LABEL}`,
    default: 'Custom Training'
  }
};

const CustomTrainingLayout = props => {
  return props.children;
};

export default CustomTrainingLayout;
