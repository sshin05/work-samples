import { archiveMarketplaceVendor } from '@digital-u/services/marketplace/vendors/archive-marketplace-vendor';
import { createMarketplaceVendor } from '@digital-u/services/marketplace/vendors/create-marketplace-vendor';
import { deleteMarketplaceVendor } from '@digital-u/services/marketplace/vendors/delete-marketplace-vendor';
import { findMarketplaceVendors } from '@digital-u/services/marketplace/vendors/find-marketplace-vendors';
import { getMarketplaceVendor } from '@digital-u/services/marketplace/vendors/get-marketplace-vendor';
import { updateMarketplaceVendor } from '@digital-u/services/marketplace/vendors/update-marketplace-vendor';
import { getParams } from '../../utils';
import {
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'find-marketplace-vendors':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await findMarketplaceVendors(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-vendor':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await getMarketplaceVendor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}

// Mutations
export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'create-marketplace-vendor':
      try {
        await checkAuthenticatedAdmin();
        const data = await createMarketplaceVendor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'archive-marketplace-vendor':
      try {
        await checkAuthenticatedAdmin();
        const data = await archiveMarketplaceVendor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'delete-marketplace-vendor':
      try {
        await checkAuthenticatedAdmin();
        const data = await deleteMarketplaceVendor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-vendor':
      try {
        await checkAuthenticatedAdmin();
        const data = await updateMarketplaceVendor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
