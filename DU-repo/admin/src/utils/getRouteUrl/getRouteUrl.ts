import { APP_VERSION_PATH_PREFIX } from './routeConstants';
import type { QueryArgs } from './getRouteUrl.types';
import { getQueryString } from './utils';

/**
 *
 * - Prepends route with latest version, ie `/v3/
 * - Appends route with query paramters, if provided
 *
 * Use inconjunction with `routeGenerators` to inject url parameters into the url
 *
 * For example:
 *
 * ```ts
 * getRouteUrl(
 *   routeGenerators.Cohort({ missionPartnerId, corhortId }),
 *   queryParameters
 * )
 */
export const getRouteUrl = (url: string, queryArgs?: QueryArgs): string => {
  let queryString = '';

  if (queryArgs) {
    queryString = getQueryString(queryArgs);
  }

  return `${APP_VERSION_PATH_PREFIX}${url}${queryString}`;
};
