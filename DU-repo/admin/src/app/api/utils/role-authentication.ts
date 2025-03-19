import { getServerSession } from 'next-auth/next';
import { findRoles } from '@digital-u/services/role/find-roles';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';

// export const ROLE_ADMIN = 'admin';
// export const ROLE_PORTAL_MANAGER = 'PORTAL_MANAGER';
// export const ROLE_PORTAL_VIEWER = 'PORTAL_VIEWER';

export const UNAUTHENTICATED_ROLE = 'An authenticated role is required.';
export const ROLE_CHECK_EXCEPTION =
  'Role authentication could not be confirmed.';
export const SESSION_USER_ID_NOT_FOUND = 'Could not verify session user id.';
export const SESSION_MISSION_PARTEER_ID_NOT_FOUND =
  'Could not verify session mission partner id.';

export async function checkRoleAccess(
  role: string,
  missionPartnerId: string = null
) {
  const session = await getServerSession(authOptions);
  if (!session.user.id) {
    throw new Error(SESSION_USER_ID_NOT_FOUND);
  }

  if (session.user.roles.includes(role)) {
    return session; // found the role
  }

  const filter = { userId: session.user.id };
  if (missionPartnerId) {
    filter['missionPartnerId'] = missionPartnerId;
  } else {
    throw new Error(SESSION_MISSION_PARTEER_ID_NOT_FOUND);
  }
  const roles = await findRoles({ filter: filter });

  const hasRole = roles.records.some(roleRecord => {
    return roleRecord.type === role;
  });

  if (hasRole) {
    return session; // found the role
  }

  throw new Error(UNAUTHENTICATED_ROLE);
}

export async function checkAuthenticatedUser() {
  const session = await getServerSession(authOptions);
  if (!session.user.id) {
    throw new Error(SESSION_USER_ID_NOT_FOUND);
  }
  return session;
}

export async function checkAuthenticatedAdmin() {
  return await checkRoleAccess('admin');
}

export async function checkAuthenticatedAdminOrAuthorizedPortalManager(
  missionPartnerId: string | null = null
) {
  try {
    return await checkRoleAccess('admin');
  } catch (_error) {
    return await checkRoleAccess('PORTAL_MANAGER', missionPartnerId);
  }
}
