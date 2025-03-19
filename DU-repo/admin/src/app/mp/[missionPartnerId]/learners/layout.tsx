import {
  MP_LEARNERS_PAGE_LABEL,
  MP_ROOT_PAGE_LABEL
} from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | ${MP_LEARNERS_PAGE_LABEL} | ${MP_ROOT_PAGE_LABEL}`,
    default: MP_LEARNERS_PAGE_LABEL
  }
};

const LearnersLayout = props => {
  // we are not using the MainContentVStack component here because we want to fetch data at the page level
  return props.children;
};

export default LearnersLayout;
