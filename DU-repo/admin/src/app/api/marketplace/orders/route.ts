import {
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { getMarketplaceOrder } from '@digital-u/services/marketplace/orders/get-marketplace-order';
import { finalizeContracting } from '@digital-u/services/marketplace/orders/finalize-contracting';
import { findMarketplaceOrders } from '@digital-u/services/marketplace/orders/find-marketplace-orders';
import { getParams } from '../../utils';

export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'find-marketplace-orders':
      try {
        const missionPartnerId = options?.filter?.missionPartnerId;
        if (missionPartnerId) {
          await checkAuthenticatedAdminOrAuthorizedPortalManager(
            missionPartnerId
          );
        } else {
          await checkAuthenticatedAdmin();
        }

        const data = await findMarketplaceOrders(options);

        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-order':
      try {
        const data = await getMarketplaceOrder(options);
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          data.missionPartnerId
        );

        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}

export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  if (name === 'finalize-contracting') {
    try {
      const session = await checkAuthenticatedAdmin();

      const data = await finalizeContracting({
        ...options,
        modifyingUserId: session.user.id
      });

      return Response.json({ data });
    } catch (e) {
      return Response.json({ error: e.message });
    }
  } else {
    return Response.json({ error: 'Unknown route: ' + name });
  }
}
