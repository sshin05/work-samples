import type { FormattedCustomizations } from '@/app/marketplace/components/ProductCustomizationModal/utils/formatFormInputDataForSave/formatFormInputDataForSave.types';
import type {
  CartItemData,
  RequiredCreateCustomizationViaUpdateParams,
  UpdateAndCreateCartItem
} from '../../../../MarketplaceCart.types';

const createCustomization = ({
  productCustomizations,
  customizationId,
  cohortId,
  value
}: {
  productCustomizations: CartItemData['marketplaceProduct']['productCustomizations'];
  customizationId: string;
  value: string;
  cohortId: string;
}): RequiredCreateCustomizationViaUpdateParams | null => {
  const productCustomization = productCustomizations.find(
    customization => customization.id === customizationId
  );

  if (productCustomization && value) {
    return {
      definitionId: customizationId,
      name: productCustomization.name,
      type: productCustomization.fieldType,
      cohortId,
      value
    };
  }

  return null;
};

type updateCartItemCohortCustomizationsArgs = {
  cartItem: CartItemData;
  customizationValues: FormattedCustomizations;
};

/** Joins the customization values onto an existing order item's cohortCustomizations */
export const updateCartItemCohortCustomizations = ({
  cartItem,
  customizationValues
}: updateCartItemCohortCustomizationsArgs): UpdateAndCreateCartItem => {
  const { cohortId } = cartItem.cohortCustomizations.find(item =>
    Boolean(item.cohortId)
  );

  const newCohortCustomizations = customizationValues
    .map(({ value, definitionId }) => {
      const customization = cartItem.cohortCustomizations.find(
        customization => customization.definitionId === definitionId
      );

      if (customization) {
        return {
          ...customization,
          value: value === '' ? null : value
        };
      } else {
        return createCustomization({
          productCustomizations:
            cartItem.marketplaceProduct?.productCustomizations,
          customizationId: definitionId,
          cohortId,
          value
        });
      }
    }, [])
    .filter(Boolean);

  return {
    ...cartItem,
    cohortCustomizations: newCohortCustomizations
  };
};
