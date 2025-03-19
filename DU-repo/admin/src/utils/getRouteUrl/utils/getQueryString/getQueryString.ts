import type { QueryArgs } from '../../getRouteUrl.types';

const formatSearchParams = (searchParams: URLSearchParams): string => {
  const searchParamString = searchParams.toString();

  if (searchParamString.length === 0) {
    return '';
  }

  return `?${searchParamString}`;
};

/**
 * Creates a query string from an object of parameters.
 *
 */
export const getQueryString = (parameters: QueryArgs): string => {
  const searchParams = new URLSearchParams();

  Object.entries(parameters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => {
        searchParams.append(key, item);
      });
    } else {
      searchParams.append(key, value);
    }
  });

  return formatSearchParams(searchParams);
};
