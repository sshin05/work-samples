import {
  checkAuthenticatedAdminOrAuthorizedPortalManager,
  checkAuthenticatedAdmin
} from '@/app/api/utils/role-authentication';
import { getMissionPartner } from '@digital-u/services/mission-partner/get-mission-partner';
import { updateMissionPartner } from '@digital-u/services/mission-partner/update-mission-partner';
import { getParams } from '../utils';

export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  try {
    switch (name) {
      case 'get-mission-partner': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.filter?.missionPartnerId
        );
        const data = await getMissionPartner(options);
        return Response.json({ data });
      }
      case 'get-mission-partner-by-id': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await getMissionPartner({
          id: options?.id
        });
        return Response.json({ data });
      }
      case 'get-mission-partner-by-slug': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await getMissionPartner({
          slug: options?.slug
        });
        return Response.json({ data });
      }
      case 'get-mission-partner-by-name': {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await getMissionPartner({
          name: options?.name
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

export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  try {
    // Change this to a switch statement when adding more routes
    if (name === 'update-is-marketplace-enabled') {
      await checkAuthenticatedAdmin();
      const { id, isMarketplaceEnabled } = options;

      const missionPartner = await getMissionPartner({ id });

      missionPartner.isMarketplaceEnabled = isMarketplaceEnabled;

      const data = await updateMissionPartner(missionPartner);
      return Response.json({ data });
    } else {
      throw new Error('Unknown route: ' + name);
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
