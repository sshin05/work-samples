import {
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { findUsers } from '@digital-u/services/user/find-users';
import { createUser } from '@digital-u/services/user/create-user';
import { getParams } from '../utils';

export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  try {
    // Change this to a switch statement when adding more routes
    if (name === 'create-user') {
      await checkAuthenticatedAdmin();
      const data = await createUser(options);
      return Response.json({ data });
    } else {
      throw new Error('Unknown route: ' + name);
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  try {
    switch (name) {
      case 'find-users': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.filter?.missionPartnerId
        );
        const data = await findUsers(options);
        return Response.json({ data });
      }
      case 'find-users-by-search-text': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await findUsers({
          filter: {
            search: options?.search,
            missionPartnerId: options?.missionPartnerId
          }
        });
        return Response.json({ data });
      }
      default:
        throw new Error('Unknown route: ' + name);
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
