import { getMarketplaceCart } from '@digital-u/services/marketplace/carts/get-marketplace-cart';
import { submitCart } from '@digital-u/services/marketplace/carts/submit-cart';
import { addProductToCart } from '@digital-u/services/marketplace/carts/add-product-to-cart';
import { removeItemFromCart } from '@digital-u/services/marketplace/carts/remove-item-from-cart';
import { makePaymentWithMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/make-payment-with-marketplace-token-transaction';
import { makePaymentWithContracting } from '@digital-u/services/marketplace/orders/make-payment-with-contracting';
import { getMarketplaceOrder } from '@digital-u/services/marketplace/orders/get-marketplace-order';
import {
  checkAuthenticatedAdminOrAuthorizedPortalManager,
  checkAuthenticatedAdmin,
  checkAuthenticatedUser
} from '@/app/api/utils/role-authentication';
import { getParams } from '../../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  // Change this to a switch statement when adding more routes
  if (name === 'get-marketplace-cart') {
    try {
      const session = await checkAuthenticatedUser();
      // Format the options to ensure correct permissions.
      const newOptions = options.marketplaceCartId
        ? { ...options, userId: undefined, missionPartnerId: undefined }
        : {
            ...options,
            userId: session.user.id as string,
            marketplaceCartId: undefined
          };

      if (options.missionPartnerId) {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options.missionPartnerId
        );
      } else {
        await checkAuthenticatedAdmin();
      }

      const data = await getMarketplaceCart(newOptions);
      return Response.json({ data });
    } catch (e) {
      return Response.json({ error: e.message });
    }
  }

  return Response.json({ error: 'Unknown route: ' + name });
}

// Mutations
export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'submit-cart':
      try {
        const session = await checkAuthenticatedUser();
        // Format the options to ensure correct permissions.
        const newOptions = options.marketplaceCartId
          ? { ...options, userId: undefined, missionPartnerId: undefined }
          : {
              ...options,
              userId: session.user.id as string,
              marketplaceCartId: undefined
            };

        if (options.missionPartnerId) {
          await checkAuthenticatedAdminOrAuthorizedPortalManager(
            options.missionPartnerId
          );
        } else {
          await checkAuthenticatedAdmin();
        }

        const data = await submitCart(newOptions);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'add-product-to-cart':
      try {
        const session = await checkAuthenticatedUser();

        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options.missionPartnerId
        );

        const data = await addProductToCart({
          ...options,
          userId: session.user.id as string
        });

        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'remove-item-from-cart':
      try {
        const session = await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await removeItemFromCart({
          ...options,
          userId: session.user.id as string
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'make-payment-with-marketplace-token-transaction':
      try {
        const order = await getMarketplaceOrder({
          referenceId: options.orderReferenceId
        });
        const session = await checkAuthenticatedAdminOrAuthorizedPortalManager(
          order.missionPartnerId
        );
        const data = await makePaymentWithMarketplaceTokenTransaction({
          ...options,
          modifyingUserId: session.user.id as string
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'make-payment-with-contracting':
      try {
        const order = await getMarketplaceOrder({
          referenceId: options.orderReferenceId
        });
        const session = await checkAuthenticatedAdminOrAuthorizedPortalManager(
          order.missionPartnerId
        );
        const data = await makePaymentWithContracting({
          ...options,
          modifyingUserId: session.user.id as string
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
