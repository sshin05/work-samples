import {
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { findMarketplaceTokenTransactions } from '@digital-u/services/marketplace/token-transactions/find-marketplace-token-transactions';
import { getMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/get-marketplace-token-transaction';
import { sumMarketplaceTokenTransactions } from '@digital-u/services/marketplace/token-transactions/sum-marketplace-token-transactions';
import { createMarketplaceTokenTransaction } from '@digital-u/services/marketplace/token-transactions/create-marketplace-token-transaction';
import { getParams } from '../../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'find-marketplace-token-transactions':
      try {
        const missionPartnerId = options?.filter?.missionPartnerId;
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          missionPartnerId
        );

        const data = await findMarketplaceTokenTransactions(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-token-transaction':
      try {
        const missionPartnerId = options?.missionPartnerId;
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          missionPartnerId
        );

        const data = await getMarketplaceTokenTransaction(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'sum-marketplace-token-transactions':
      try {
        const missionPartnerId = options?.missionPartnerId;
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          missionPartnerId
        );

        const data = await sumMarketplaceTokenTransactions(options);
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

  // Change this to a switch statement when adding more routes
  if (name === 'create-marketplace-token-transaction') {
    try {
      const missionPartnerId = options?.missionPartnerId;

      const session =
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          missionPartnerId
        );

      // only DU admins can credit tokens
      if (options?.type === 'credit') {
        await checkAuthenticatedAdmin();
      }

      const modifyingUserId = session.user.id;

      const data = await createMarketplaceTokenTransaction({
        ...options,
        modifyingUserId
      });

      return Response.json({ data });
    } catch (e) {
      return Response.json({ error: e.message });
    }
  }

  return Response.json({ error: 'Unknown route: ' + name });
}
