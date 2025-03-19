import { useParams } from 'next/navigation';

/** A hook to call useParams from next/navigation and coerce the params to strings.
 * If the param is an array, it will return the first element.*/
export const useRouteParams = (): Record<string, string> => {
  const params = useParams();
  const formattedParams: Record<string, string> = {};

  Object.keys(params || {}).forEach(key => {
    const value = params[key];
    if (Array.isArray(value) && value.length > 0) {
      formattedParams[key] = String(value[0]);
    } else {
      formattedParams[key] = String(value);
    }
  });

  return formattedParams;
};
