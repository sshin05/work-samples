import { getMarketplaceNote } from '@digital-u/services/marketplace/notes/get-marketplace-note';
import { findMarketplaceNotes } from '@digital-u/services/marketplace/notes/find-marketplace-notes';
import { createMarketplaceNote } from '@digital-u/services/marketplace/notes/create-marketplace-note';
import { deleteMarketplaceNote } from '@digital-u/services/marketplace/notes/delete-marketplace-note';
import { updateMarketplaceNote } from '@digital-u/services/marketplace/notes/update-marketplace-note';
import { checkAuthenticatedAdmin } from '@/app/api/utils/role-authentication';
import { getParams } from '../../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'get-marketplace-note':
      try {
        await checkAuthenticatedAdmin();

        const data = await getMarketplaceNote(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'find-marketplace-notes':
      try {
        await checkAuthenticatedAdmin();

        const data = await findMarketplaceNotes(options);
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
    case 'create-marketplace-note':
      try {
        const session = await checkAuthenticatedAdmin();

        const data = await createMarketplaceNote({
          ...options,
          modifyingUserId: session.user.id
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'delete-marketplace-note':
      try {
        await checkAuthenticatedAdmin();

        const data = await deleteMarketplaceNote(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-note':
      try {
        const session = await checkAuthenticatedAdmin();

        const data = await updateMarketplaceNote({
          ...options,
          modifyingUserId: session.user.id
        });
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
