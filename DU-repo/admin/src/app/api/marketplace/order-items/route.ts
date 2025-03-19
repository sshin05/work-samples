import {
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { findMarketplaceOrderItems } from '@digital-u/services/marketplace/order-items/find-marketplace-order-items';
import { getMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/get-marketplace-order-item';
import { deleteMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/delete-marketplace-order-item';
import { updateMarketplaceOrderItem } from '@digital-u/services/marketplace/order-items/update-marketplace-order-item';
import { updateMarketplaceOrderItemStatus } from '@digital-u/services/marketplace/order-items/update-marketplace-order-item-status';
import { getParams } from '../../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'find-marketplace-order-items':
      try {
        const missionPartnerId = options?.filter?.missionPartnerId;
        if (missionPartnerId) {
          await checkAuthenticatedAdminOrAuthorizedPortalManager(
            missionPartnerId
          );
        } else {
          await checkAuthenticatedAdmin();
        }

        const data = await findMarketplaceOrderItems(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-order-item':
      try {
        const data = await getMarketplaceOrderItem(options);
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          data.missionPartner.id
        );

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
    case 'delete-marketplace-order-item':
      try {
        const orderItem = await getMarketplaceOrderItem({ id: options.id });
        // If the order item not in a cart, then only admins can delete it.
        if (
          orderItem?.marketplaceCart ||
          orderItem?.missionPartner?.id === options?.missionPartnerId
        ) {
          await checkAuthenticatedAdminOrAuthorizedPortalManager(
            options?.missionPartnerId
          );
        } else {
          await checkAuthenticatedAdmin();
        }
        const data = await deleteMarketplaceOrderItem(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-order-item':
      try {
        const orderItem = await getMarketplaceOrderItem({ id: options.id });
        let session;
        const newOptions = options;
        console.log('options', options);
        console.log('orderItem', orderItem);
        if (
          orderItem?.marketplaceCart?.missionPartnerId ===
          options?.missionPartnerId
        ) {
          // If the order item is in a cart, then only admins or authorized portal managers can update it.
          session = await checkAuthenticatedAdminOrAuthorizedPortalManager(
            options?.missionPartnerId
          );
          delete newOptions.status; // Portal managers can't update the status.
        } else {
          // Admins can update any order item.
          session = await checkAuthenticatedAdmin();
        }
        newOptions.userId = session.user.id;

        const data = await updateMarketplaceOrderItem(newOptions);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-order-item-status':
      try {
        const session = await checkAuthenticatedAdmin();
        const data = await updateMarketplaceOrderItemStatus({
          ...options,
          userId: session.user.id
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
