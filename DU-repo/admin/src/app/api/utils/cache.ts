'use client';

const cacheDuration = 600 * 1000; // 10 minutes

import crypto from 'crypto';

function hashValuesSHA1(...args: string[]) {
  return crypto.createHash('sha1').update(args.join()).digest('hex');
}

interface CacheRef {
  route: string;
  optionsHash: string;
  noCache: boolean;
  forceFetch: boolean;
}

const cacheData = {};
const pendingData = {};

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const clearCacheRoute = (route: string) => {
  if (cacheData[route]) {
    delete cacheData[route];
  }
};

const clearCache = (cacheRef: CacheRef) => {
  if (
    cacheData[cacheRef.route] &&
    cacheData[cacheRef.route][cacheRef.optionsHash]
  ) {
    delete cacheData[cacheRef.route][cacheRef.optionsHash];
  }
};

const cleanCache = (cacheRef: CacheRef) => {
  if (cacheRef.forceFetch) {
    clearCache(cacheRef);
  }

  const now = Date.now();
  Object.keys(cacheData).forEach(route => {
    Object.keys(cacheData[route]).forEach(optionsHash => {
      if (now - cacheData[route][optionsHash].at > cacheDuration) {
        delete cacheData[route][optionsHash];
      }
    });
  });
};

const getCache = (cacheRef: CacheRef) => {
  const { route, optionsHash } = cacheRef;
  if (cacheData?.[route]?.[optionsHash]) {
    //console.log('<<<< Cached data (' + route + ' ' + optionsHash + ')');
    return cacheData[route][optionsHash].value;
  } else {
    return null;
  }
};

// tslint:disable-next-line: no-any
const saveCache = (cacheRef: CacheRef, data: any) => {
  const { route, optionsHash } = cacheRef;
  if (!cacheData[route]) cacheData[route] = {};
  //console.log('Caching data (' + route + ' ' + optionsHash + ') +_+_+');
  cacheData[route][optionsHash] = { value: data, at: Date.now() };
};

// tslint:disable-next-line: no-any
const doGET = async (name: string, cacheRef: CacheRef, options: any) => {
  let rval = null;
  const { route, optionsHash } = cacheRef;
  const urlOptions = btoa(JSON.stringify(options));
  //console.log('<========== Calling REST function! ==========>');
  const fetchPromise = async () => {
    if (process.env.JEST_WORKER_ID) {
      // this is a temporary start of cache "mock mode"
      await delay(1);
      return {
        key: 'value',
        key2: 'value2',
        key3: 'value3'
      };
    }

    const res = await fetch(route + `?name=${name}&options=${urlOptions}`, {
      method: 'GET'
    });
    return await res.json();
  };

  pendingData[route][optionsHash].promise = fetchPromise();
  rval = await pendingData[route][optionsHash].promise;

  // make sure the pending object is still valid
  if (pendingData[route]?.[optionsHash]) {
    pendingData[route][optionsHash].promise = null;
    pendingData[route][optionsHash].waiting--;
    //console.log('Setting promise to null and decrementing waiting', rval);
    if (pendingData[route][optionsHash].waiting <= 0) {
      //console.log('Removing pending object tracker');
      delete pendingData[route][optionsHash];
    } else {
      //console.log('Setting data to be returned by other duplicate requests',rval);
      pendingData[route][optionsHash].data = rval;
    }
  }

  return rval;
};

// tslint:disable-next-line: no-any
const doPOST = async (name: string, cacheRef: CacheRef, options: any) => {
  const { route } = cacheRef;

  if (process.env.JEST_WORKER_ID) {
    // this is a temporary start of cache "mock mode"
    await delay(1);
    return {
      keyA: 'valueA',
      keyB: 'valueB',
      keyC: 'valueC'
    };
  }

  const res = await fetch(route + `?name=${name}`, {
    method: 'POST',
    body: JSON.stringify(options)
  });
  return await res.json();
};

// tslint:disable-next-line: no-any
export const cache = async (func, options) => {
  let rval = null; // this will never be null, but it makes typescript happy
  const functionMeta = func(options);

  const cacheRef: CacheRef = {
    route: functionMeta.route,
    optionsHash:
      functionMeta.name + ':' + hashValuesSHA1(JSON.stringify(options)),
    noCache: options?.noCache || false, // does not use or store cache
    forceFetch: options?.forceFetch || false // clears cache ahead of time
  };

  delete options?.forceFetch;
  delete options?.noCache;

  // clean out old cache and/or the current cache if forceFetch is set
  cleanCache(cacheRef);

  // first check to see if we have a cache hit
  rval = getCache(cacheRef);
  if (rval) return rval;

  // if no cache, check to see if there is a pending request for this data already
  const { route, optionsHash } = cacheRef;
  if (pendingData[route]?.[optionsHash]) {
    // if there is a pending request, wait for it
    pendingData[route][optionsHash].waiting++;
    //console.log('Pending already exists: ', pendingData[route]?.[optionsHash]);
    //console.log(`${pendingData[route][optionsHash].waiting} calls for ${route} ${optionsHash}`);
    if (pendingData[route][optionsHash].promise) {
      //console.log('Waiting on pending promise');
      await pendingData[route][optionsHash].promise;

      rval = pendingData[route][optionsHash]?.data;
      pendingData[route][optionsHash].waiting--;
      // console.log(
      //   `Will decrement waiting ${pendingData[route][optionsHash].waiting} and return copy of data for ${route} ${optionsHash}`,
      //   rval
      // );

      //console.log(`One less (${pendingData[cacheKey][optionsHash].waiting}) duplicate waiting for ${cacheKey} ${optionsHash}`);
      if (pendingData[route][optionsHash].waiting === 0) {
        //console.log(`Removing pending object tracker for ${cacheKey} ${optionsHash}`);
        delete pendingData[route][optionsHash];
      }
    }
  } else {
    // if there is no pending request, create one
    if (!pendingData[route]) pendingData[route] = {};
    pendingData[route][optionsHash] = {
      promise: null,
      waiting: 1,
      data: null
    };
    //console.log('Creating pending object tracker for', route, optionsHash);
  }
  if (rval) return rval;

  // if there is no cache or pending request, make the request
  const { method, name } = functionMeta;
  if (method === 'GET') {
    rval = await doGET(name, cacheRef, options);

    if (!cacheRef.noCache) {
      saveCache(cacheRef, rval);
    }
  } else {
    rval = await doPOST(name, cacheRef, options);

    clearCacheRoute(cacheRef.route);

    // delete any additional routes returned by the function
    if (functionMeta?.invalidatesRoutes) {
      functionMeta.invalidatesRoutes.forEach((route: string) => {
        //console.log('Invalidating cache for', cacheKey);
        clearCacheRoute(route);
      });
    }
  }
  if (rval) return rval;

  // this should never happen, but if it does, return an error
  rval = { data: null, error: 'No data returned from cache' };
  return rval;
};
