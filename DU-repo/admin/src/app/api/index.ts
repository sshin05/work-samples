'use client';

// eslint-disable @typescript-eslint/no-explicit-any

import { useState, useEffect, useCallback, useRef } from 'react';
import { cache } from '@/app/api/utils/cache';

export type SQLServiceResult<T, O> = {
  loading?: boolean;
  data?: T | null;
  error?: string | null;
  cacheAs?: string;
  invalidateCaches?: string[];
  query?: (options?: O) => Promise<SQLPromiseResult<T, O>> | null;
  mutation?: (options: O) => Promise<SQLPromiseResult<T, O>> | null;
};
export type SQLQueryResult<T, O> = Omit<SQLServiceResult<T, O>, 'mutation'>;
export type SQLMutationResult<T, O> = Omit<SQLServiceResult<T, O>, 'query'>;
export type SQLPromiseResult<T, O> = Omit<
  SQLServiceResult<T, O>,
  'query' | 'mutation' | 'loading'
>;

export type SQLServiceArguments<T extends (options: any) => any> =
  Parameters<T>[0];

type RecursivelyConvertDatesToStrings<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? RecursivelyConvertDatesToStrings<U>[]
    : T extends object
      ? { [K in keyof T]: RecursivelyConvertDatesToStrings<T[K]> }
      : T;

export type SQLServiceReturnType<T extends (...args: any) => any> =
  RecursivelyConvertDatesToStrings<Awaited<ReturnType<T>>>;

export type SQLServiceHookOptions<O> = {
  callback?: () => void;
  clearData?: boolean; // nulls data in state before making sql call
  lazyLoad?: boolean; // does not make the sql call until the query or mutation function is called
  noCache?: boolean; // will not attempt to cache
  forceFetch?: boolean; // will clear the cache before making the sql call
  options?: O;
};

export type SQLRESTBaseOptions<T extends (args: any) => any> = {
  method: string;
  route: string;
  name: string;
  invalidatesRoutes?: string[];
  _serviceOptions?: SQLServiceArguments<T>; // Unused property to allow typescript to infer the options type for the server
  _serviceData?: SQLServiceReturnType<T>; // Unused property to allow typescript to infer the return type from the server
};

export type SQLRESTOptions<
  T extends (args: any) => any,
  O = SQLServiceArguments<T>,
  R = SQLServiceReturnType<T>
> = Omit<SQLRESTBaseOptions<T>, '_serviceOptions' | '_serviceData'> & {
  _serviceOptions?: O;
  _serviceData?: R;
};

type SQLRESTReturn<T, O> = {
  method: string;
  route: string;
  name: string;
  invalidatesRoutes?: string[];
  _serviceOptions?: O; // Unused property to allow typescript to infer the options type for the server
  _serviceData?: T; // Unused property to allow typescript to infer the return type from the server
};

function useSQLService<T, O>(
  func: (options: O) => SQLRESTReturn<T, O>,
  hookOptions?: SQLServiceHookOptions<O>
): SQLServiceResult<T, O> {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [funcOptions, setFuncOptions] = useState<SQLServiceHookOptions<O>>(
    hookOptions?.options || {}
  );
  const fetchQueue = useRef(Promise.resolve());

  const fetchData = useCallback(async _funcOptions => {
    if (hookOptions?.clearData) setData(null);
    setLoading(true);
    setError(null);
    const rval: SQLServiceResult<T, O> = {
      data: null,
      loading: true,
      error: null
    };
    try {
      const result = (await cache(func, {
        noCache: hookOptions?.noCache,
        forceFetch: hookOptions?.forceFetch,
        ..._funcOptions
      })) as SQLPromiseResult<T, O>;
      setData(result?.data);
      rval.data = result?.data;
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
      rval.error = err.message;
    } finally {
      setLoading(false);
      rval.loading = false;
    }
    if (hookOptions?.callback) hookOptions.callback();
    return rval;
  }, []);

  useEffect(() => {
    if (!hookOptions?.lazyLoad) {
      fetchData(funcOptions ?? {});
    }
  }, []);

  const fetch = (funcOptions?: SQLServiceHookOptions<O>) => {
    setFuncOptions(funcOptions);
    return new Promise<SQLPromiseResult<T, O>>((resolve, rejects) => {
      // These two functions used to be neatly nested but SonarQube doesn't allow functions to be nested more than 4 layers deep.
      const resultResolver = result => {
        if (result.error) rejects(new Error(result.error));
        else resolve(result);
      };

      const functionFinally = () => {
        fetchData(funcOptions).then(resultResolver);
      };

      fetchQueue.current = fetchQueue.current.finally(functionFinally);
    });
  };

  return { data, loading, error, mutation: fetch, query: fetch };
}

/**
 * Custom hook to handle SQL service calls.
 *
 * @param {function(O): RESTOptions<T, O>} func - The SQL service function to be called.
 * @param {SQLServiceHookOptions} [hookOptions] - Additional options for the hook.
 * @param {function} [hookOptions.callback] - A callback function to be called after the SQL service function resolves.
 * @param {boolean} [hookOptions.clearData] - A flag to clear the data before making the SQL service call.
 * @param {boolean} [hookOptions.lazyLoad] - If set to true (defaults to false for queries), does not make the SQL service call until the query or mutation function is called.
 * @param {boolean} [hookOptions.noCache] - Will not attempt to cache if set to true (default for quries is false)
 * @param {boolean} [hookOptions.forceFetch] - Will clear the cache and make the SQL service call.
 *
 * @returns {SQLServiceResult<T, O>} The result of the SQL service call, including loading state, data, error, and mutation functions.
 */
export function useSQLQuery<T, O>(
  func: (options?: O) => SQLRESTReturn<T, O>,
  hookOptions?: SQLServiceHookOptions<O>
): SQLQueryResult<T, O> {
  return useSQLService(func, hookOptions);
}

/**
 * Custom hook to handle SQL service calls.
 *
 * @param {function(O): RESTOptions<T, O>} func - A function that returns the NEXTJS Route API to be called.
 * @param {SQLServiceHookOptions} [hookOptions] - Additional options for the hook.
 * @param {function} [hookOptions.callback] - A callback function to be called after the SQL service function resolves.
 * @param {boolean} [hookOptions.clearData] - A flag to clear the data before making the SQL service call.
 * @param {boolean} [hookOptions.lazyLoad] - If set to true (default for mutations), does not make the SQL service call until the query or mutation function is called.
 * @param {boolean} [hookOptions.noCache] - Will not attempt to cache if set to true (default for mutations is true)
 * @param {boolean} [hookOptions.forceFetch] - Will clear the cache and make the SQL service call.
 *
 * @returns {SQLServiceResult<T, O>} The result of the SQL service call, including loading state, data, error, and mutation functions.
 */
export function useSQLMutation<T, O>(
  func: (options: O) => SQLRESTReturn<T, O>,
  hookOptions?: SQLServiceHookOptions<O>
): SQLMutationResult<T, O> {
  return useSQLService(func, { lazyLoad: true, noCache: true, ...hookOptions });
}
