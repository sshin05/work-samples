import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const {
  API_URL,
  KEYCLOAK_URL,
  JHUB_URL,
  MATOMO_TRUSTED_HOST,
  FAKE_AUTH,
  NODE_ENV
} = process.env;

// (basePath = '/admin' in next.config)
const BASE_PATH = '/admin';

const isFakeAuth = NODE_ENV === 'development' && FAKE_AUTH;

// ~~~~~~~~~~~~~~~~~~~~ 1. HELPER: CONTENT SECURITY POLICY ~~~~~~~~~~~~~~~~~~~~
const generateNonce = () => Math.random().toString(36).substring(2, 12);

const buildContentSecurityPolicy = _nonce => {
  const keycloakHost = new URL(KEYCLOAK_URL).host;
  const apiHost = new URL(API_URL).host;
  const jHubHost = new URL(JHUB_URL).host;

  const baseUri = `'self'`;
  const childSrc = `*.google.com ${keycloakHost}`;
  const connectSrc = `'self' ${apiHost} ${MATOMO_TRUSTED_HOST} ${keycloakHost}`;
  const defaultSrc = `'self'`;
  const fontSrc = `'self' *.gstatic.com`;
  const formAction = `'self'`;
  const frameAncestors = `${keycloakHost}`;
  const frameSrc = `'self' *.google.com ${keycloakHost} ${jHubHost} *.youtube.com *.gov *.mil *.edu *.vimeo.com view.officeapps.live.com`;
  const imgSrc = `'self' *.gstatic.com digitalu-assets.s3-us-gov-west-1.amazonaws.com blob: data:`;
  const objectSrc = `'none'`;
  // Need to remove 'unsafe-inline' & 'unsafe-eval' for stronger security
  // TODO: a real nonce, use `'nonce-${_nonce}'`.
  const scriptSrc = `'self' 'unsafe-inline' 'unsafe-eval' *`;
  const styleSrc = `'self' 'unsafe-inline' fonts.googleapis.com`;

  return [
    `base-uri ${baseUri};`,
    `child-src ${childSrc};`,
    `connect-src ${connectSrc};`,
    `default-src ${defaultSrc};`,
    `font-src ${fontSrc};`,
    `form-action ${formAction};`,
    `frame-ancestors ${frameAncestors};`,
    `frame-src ${frameSrc};`,
    `img-src ${imgSrc};`,
    `object-src ${objectSrc};`,
    `script-src ${scriptSrc};`,
    `style-src ${styleSrc};`
  ].join('');
};

// ~~~~~~~~~~~~~~~~~~~~ 2. HELPER: FETCH USER ROLES ~~~~~~~~~~~~~~~~~~~~
async function getUserRoles(accessToken) {
  // console.log('--- getUserRoles() => calling API with accessToken');
  if (isFakeAuth) {
    return {
      roles: [],
      mostRecentMpId: null
    };
  }

  const query = `
    query GetUser {
      getUser {
        roles {
          missionPartnerId
          name
        },
        recentMissionPartners {
          missionPartnerId
        }
      }
    }
  `;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ query })
  });

  const { data: { getUser: user } = {} } = await response.json();
  const mostRecentMpId =
    user?.recentMissionPartners?.length > 0
      ? user?.recentMissionPartners?.[0]?.missionPartnerId
      : null;
  return { roles: user?.roles ?? [], mostRecentMpId };
}

// ~~~~~~~~~~~~~~~~~~~~ 3. HELPER: FETCH USER MIN DETAILS ~~~~~~~~~~~~~~~~~~~~
const getMissionPartnerMinDetails = async (accessToken, id) => {
  const query = `
    query FindMissionPartnerMinDetails($id: ID!) {
      findMissionPartnerMinDetails(id: $id) {
        id
        name
        slug
        description
        affiliateId
        logoUrl
        accessCode
        customTrainingEnabled
        trialEnabled
        trialStartDate
        trialEndDate
        isMarketplaceEnabled
      }
    }
  `;

  const variables = { id };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ query, variables })
  });

  const {
    data: { findMissionPartnerMinDetails }
  } = await response.json();

  return findMissionPartnerMinDetails ?? null;
};

// ~~~~~~~~~~~~~~~~~~~~ 4. HELPER: AUTHORIZATION CHECKS ~~~~~~~~~~~~~~~~~~~~
async function isAuthorized(pathname, roles, token) {
  // console.log( '--- isAuthorized() => pathname:', pathname, '| roles.length:', roles.length );

  const PORTAL_MANAGER_PATHS = [
    '/marketplace/mp',
    '/mp',
    '/report-center',
    '/manage-mission-partners',
    '/curriculum-catalog',
    '/trial-expired'
  ];

  // If an exact match is in PORTAL_MANAGER_PATHS => needs >= 1 role
  // (note: this is only for `/mp`; see next block for "sub-mp" paths)
  if (PORTAL_MANAGER_PATHS.includes(pathname) && roles.length > 0) {
    // console.log( '>>> isAuthorized() => matched PORTAL_MANAGER_PATHS + has roles => authorized' );
    return true;
  }

  // If path starts with `/mp/` (sub-mp-paths) => user must have that missionPartnerId
  if (pathname.startsWith('/mp/')) {
    const missionPartnerId = pathname.split('/')[2];
    if (roles.some(role => role.missionPartnerId === missionPartnerId)) {
      // console.log( '>>> isAuthorized() => found missionPartnerId in roles => authorized' );
      return true;
    }
  }

  // If path starts with `/mp/` (sub-mp-paths) => user must have that missionPartnerId
  if (pathname.startsWith('/marketplace/mp/')) {
    const missionPartnerId = pathname.split('/')[3];
    const mpMinDetails = await getMissionPartnerMinDetails(
      token.accessToken,
      missionPartnerId
    );
    if (
      mpMinDetails?.isMarketplaceEnabled &&
      roles.some(role => role.missionPartnerId === missionPartnerId)
    ) {
      // console.log( '>>> isAuthorized() => found missionPartnerId in roles => authorized' );
      return true;
    }
  }
  // console.log('>>> isAuthorized() => not authorized');
  return false;
}

// ~~~~~~~~~~~~~~~~~~~~ 5. HELPER: Redirect only called on admin root path ~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~ Also called when not admin and no roles I guess ~~~~~~~~~~~~~~~~~~~~
async function handleRedirectForRoles(roles, mostRecentMpId, baseUrl) {
  // console.log('--- handleRedirectForRoles => roles.length:', roles.length);

  // MULTIPLE roles => redirect to /admin/mp
  if (roles.length > 1) {
    // console.log('>>> handleRedirectForRoles => multiple roles => /mp');
    if (mostRecentMpId) {
      return NextResponse.redirect(
        new URL(`${BASE_PATH}/mp/${mostRecentMpId}`, baseUrl)
      );
    }
    return NextResponse.redirect(new URL(`${BASE_PATH}/mp`, baseUrl));
  }

  // SINGLE role => redirect to /admin/mp/{id}
  if (roles.length === 1) {
    // console.log('>>> handleRedirectForRoles => single role => /mp/{id}');
    if (mostRecentMpId) {
      return NextResponse.redirect(
        new URL(`${BASE_PATH}/mp/${mostRecentMpId}`, baseUrl)
      );
    }
    return NextResponse.redirect(
      new URL(`${BASE_PATH}/mp/${roles[0].missionPartnerId}`, baseUrl)
    );
  }

  // ZERO roles => redirect to /admin/access-denied
  // console.log('>>> handleRedirectForRoles => zero roles => /access-denied');
  return NextResponse.redirect(new URL(`${BASE_PATH}/access-denied`, baseUrl));
}

// ~~~~~~~~~~~~~~~~~~~~ MIDDLEWARE EXCLUDES (instead of matcher until the nonce issue is tackled) ~~~~~~~~~~~~~~~~~~~~
const excludeAuthPatterns = [
  '/favicon.ico',
  '/_next/',
  '/api/',
  '/images/',
  '/signin',
  '/access-denied',
  '/~@ibm/plex'
];

const MARKETPLACE_ROUTE_PARTIALS = [
  '/manage-marketplace-vendors',
  '/manage-marketplace-orders',
  '/marketplace'
];

const THEME_ACHERON_ROUTE_PARTIALS = [...MARKETPLACE_ROUTE_PARTIALS];

const doesRoutePartialMatch = (pathname, routePartial) => {
  try {
    const regex = new RegExp(routePartial, 'i');
    return regex.test(pathname);
  } catch {
    return false;
  }
};

export const THEMES = {
  ACHERON: {
    pandaTheme: 'acheron',
    colorMode: 'dark'
  },
  CERBERUS: {
    pandaTheme: 'cerberus',
    colorMode: 'light'
  }
};

function getPandaTheme(request) {
  try {
    const fullPath = request.nextUrl.href;
    const shouldApplyAcheronTheme = THEME_ACHERON_ROUTE_PARTIALS.some(
      routePartial => doesRoutePartialMatch(fullPath, routePartial)
    );

    if (shouldApplyAcheronTheme) {
      return THEMES.ACHERON;
    }

    return THEMES.CERBERUS;
  } catch {
    return THEMES.CERBERUS;
  }
}

/** Setting these cookies allows us to navigate between different Cerberus themes
 * without unexpected flashes on the previous theme's color on load.
 * Used when navigating to/from the SOCOM Marketplace */
const setPandaStylingCookies = (request, response) => {
  const { pandaTheme, colorMode } = getPandaTheme(request);

  response.cookies.set('pandaTheme', pandaTheme ?? '', {
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });

  response.cookies.set('pandaColorMode', colorMode ?? '', {
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  });
};

export async function middleware(request) {
  // console.log('--------------------------------');
  // console.log('[middleware] Start => nextUrl.pathname:', request.nextUrl.pathname);

  // 1) CSP setup
  const nonce = generateNonce();
  const cspHeader = buildContentSecurityPolicy(nonce)
    .replace(/\s{2,}/g, ' ')
    .trim();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const { pathname, origin } = request.nextUrl;

  // 2) Skip if excluded; return response (w/ cspHeader)
  const isExcluded = excludeAuthPatterns.some(pattern =>
    pathname.startsWith(pattern)
  );
  if (isExcluded) {
    // console.log('1) Excluded path => no auth checks =>', pathname);
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });
    response.headers.set('Content-Security-Policy', cspHeader);

    setPandaStylingCookies(request, response);

    return response;
  }

  // 3) Check for token - redirect to signin if no token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  if (!token) {
    // console.log('2) No token => redirect => /signin');
    return NextResponse.redirect(new URL(`${BASE_PATH}/signin`, origin));
  }
  // console.log('2) Found token => roles from token:', token.roles);

  // 5) Non-admin => fetch roles
  // console.log('4) Non-admin => fetching user roles...');
  const { roles, mostRecentMpId } = await getUserRoles(token.accessToken);
  // console.log('4) fetched roles =>', roles);

  // 4) Admin check --> redirect to `mp` on root route if admin; need to check if CSP is needed in this redirect.
  const isAdmin = token.roles?.includes('admin') || isFakeAuth;
  if (isAdmin) {
    // console.log('3) isAdmin => user can access everything');
    // Because basePath is '/admin', if the user visits '/admin' externally,
    // internally Next sees pathname = '/', so we check for '/'
    if (pathname === '/') {
      // console.log('3a) Landed on root => redirect /admin/mp (admin user)');
      if (mostRecentMpId) {
        return NextResponse.redirect(
          new URL(`${BASE_PATH}/mp/${mostRecentMpId}`, origin)
        );
      }
      return NextResponse.redirect(new URL(`${BASE_PATH}/mp`, origin));
    }
    // console.log('3b) Admin => NextResponse.next()');
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });
    response.headers.set('Content-Security-Policy', cspHeader);

    setPandaStylingCookies(request, response);

    return response;
  }

  // If user is on the root path => handle roles redirect
  if (pathname === '/') {
    // console.log('5) Root path => handleRedirectForRoles()');
    return handleRedirectForRoles(roles, mostRecentMpId, origin);
  }

  // 6) Else check authorization; portal-managers hit this
  const authorized = await isAuthorized(pathname, roles, token);
  if (authorized) {
    // If in a trial, check if it's expired, and redirect to trial-expired if it is
    if (pathname.startsWith('/mp/')) {
      const missionPartnerId = pathname.split('/')[2];
      const mpMinDetails = await getMissionPartnerMinDetails(
        token.accessToken,
        missionPartnerId
      );
      if (
        missionPartnerId === mpMinDetails?.id &&
        mpMinDetails?.trialEnabled === true &&
        mpMinDetails?.trialEndDate <= new Date().toISOString()
      ) {
        return NextResponse.redirect(
          new URL('/admin/trial-expired', request.url)
        );
      }
    }
    // console.log('6a) Authorized => NextResponse.next()');
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });
    response.headers.set('Content-Security-Policy', cspHeader);

    setPandaStylingCookies(request, response);

    return response;
  }

  // console.log('6b) Not authorized => handleRedirectForRoles()');
  return handleRedirectForRoles(roles, null, origin); // we could probably just redirect to `/access-denied` --> but handleRedirectForRoles does handle this as well
}

// ~~~~~~~~~~~~~~~~~~~~ MATCHER CONFIG ~~~~~~~~~~~~~~~~~~~~
export const config = {
  matcher: '/:path*'
};
