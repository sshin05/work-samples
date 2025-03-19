import type { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';
import type { UpdateMarketplaceOrderItemOptions } from '@/app/api/marketplace/order-items';

export type CartItemData = Awaited<
  ReturnType<typeof sqlGetMarketplaceCart>
>['_serviceData']['marketplaceOrderItems'][number];

/**
 * sqlUpdateMarketplaceOrderItem expects updates to customizations AND new customizations in the same cohortCustomizations list.
 * This is the required object structure to CREATE optional customizations via sqlUpdateMarketplaceOrderItem
 * */
export type RequiredCreateCustomizationViaUpdateParams = {
  definitionId: string;
  name: string;
  type: CartItemData['marketplaceProduct']['productCustomizations'][number]['fieldType'];
  value: string | number | boolean | null;
  cohortId: string;
};

export type UpdateAndCreateCohortCustomizations = {
  cohortCustomizations: (
    | CartItemData['cohortCustomizations'][number]
    | RequiredCreateCustomizationViaUpdateParams
  )[];
};

/**
 * sqlUpdateMarketplaceOrderItem expects updates to customizations AND new customizations in the same cohortCustomizations list.
 * This type represents a CartItemData with a mix of existing new cohortCustomization objects (`UpdateAndCreateCohortCustomizations`)
 * */
export type UpdateAndCreateCartItem = UpdateMarketplaceOrderItemOptions;
