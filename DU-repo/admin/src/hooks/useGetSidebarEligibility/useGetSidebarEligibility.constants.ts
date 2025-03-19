import { MARKETPLACE_ROUTES } from '../useRouteBasedTheming/useRouteBasedTheming.constants';

const UUID_MATCH = `[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}`;

const WILDCARD_MATCH = '[^/]+';

/**
 * List of partial routes that shouldn't render the layout's sidebar.
 *
 *
 * Note: The values are converted to a RegExp in `useGetSidebarEligibility`. This
 * allows for fine-grained control of specific routes that include dynamic route params,
 * like UUIDs (see test cases for example).
 *
 */
export const INELIGIBLE_ROUTES_PARAMS = [
  ...MARKETPLACE_ROUTES,
  `/classroom/create`,
  `/classroom/${UUID_MATCH}/preview`,
  `/mp/${UUID_MATCH}/training-v2/create`,
  `/mp/${UUID_MATCH}/training-v2/view/${WILDCARD_MATCH}`
];
