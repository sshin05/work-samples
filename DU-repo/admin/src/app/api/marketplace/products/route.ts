import {
  checkAuthenticatedUser,
  checkAuthenticatedAdmin,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { archiveMarketplaceProduct } from '@digital-u/services/marketplace/products/archive-marketplace-product';
import { createMarketplaceProduct } from '@digital-u/services/marketplace/products/create-marketplace-product';
import { createMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/create-marketplace-product-customization-definition';
import { deleteMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/delete-marketplace-product-customization-definition';
import { findMarketplaceCategories } from '@digital-u/services/marketplace/categories/find-marketplace-categories';
import { findMarketplaceProductCustomizationDefinitions } from '@digital-u/services/marketplace/products/find-marketplace-product-customization-definitions';
import { findMarketplaceProducts } from '@digital-u/services/marketplace/products/find-marketplace-products';
import { getMarketplaceProduct } from '@digital-u/services/marketplace/products/get-marketplace-product';
import { getMarketplaceCategory } from '@digital-u/services/marketplace/categories/get-marketplace-category';
import { getMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/get-marketplace-product-customization-definition';
import { updateMarketplaceProduct } from '@digital-u/services/marketplace/products/update-marketplace-product';
import { updateMarketplaceProductCustomizationDefinition } from '@digital-u/services/marketplace/products/update-marketplace-product-customization-definition';

import { getParams } from '../../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'find-marketplace-categories':
      try {
        await checkAuthenticatedUser();
        const data = await findMarketplaceCategories();
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'find-marketplace-product-customization-definitions':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data =
          await findMarketplaceProductCustomizationDefinitions(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'find-marketplace-products':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await findMarketplaceProducts(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-product':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data = await getMarketplaceProduct(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-category':
      try {
        await checkAuthenticatedUser();
        const data = await getMarketplaceCategory(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-marketplace-product-customization-definition':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager(
          options?.missionPartnerId
        );
        const data =
          await getMarketplaceProductCustomizationDefinition(options);
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
    case 'archive-marketplace-product':
      try {
        await checkAuthenticatedAdmin();
        const data = await archiveMarketplaceProduct(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'create-marketplace-product':
      try {
        await checkAuthenticatedAdmin();
        const data = await createMarketplaceProduct(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'create-marketplace-product-customization-definition':
      try {
        await checkAuthenticatedAdmin();
        const data =
          await createMarketplaceProductCustomizationDefinition(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'delete-marketplace-product-customization-definition':
      try {
        await checkAuthenticatedAdmin();
        const data =
          await deleteMarketplaceProductCustomizationDefinition(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-product':
      try {
        await checkAuthenticatedAdmin();
        const data = await updateMarketplaceProduct(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-marketplace-product-customization-definition':
      try {
        await checkAuthenticatedAdmin();
        const data =
          await updateMarketplaceProductCustomizationDefinition(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
