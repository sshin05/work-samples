import type { GetMarketplaceProductType } from '@digital-u/services/marketplace/products/get-marketplace-product';
import type { FormattedCustomizations } from './utils/formatFormInputDataForSave/formatFormInputDataForSave.types';
import type { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';

export type ProductCustomizationModalSubmitArguments = {
  customizationValues: FormattedCustomizations;
  marketplaceProductId: string;
  missionPartnerId: string;
};

export type CartItem = Awaited<
  ReturnType<typeof sqlGetMarketplaceCart>
>['_serviceData']['marketplaceOrderItems'][number];

export type CartItemMarketplaceProduct = CartItem['marketplaceProduct'];

export type ProductCustomizationModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  submitText: string;

  marketplaceProduct: GetMarketplaceProductType | CartItemMarketplaceProduct;

  /** Used to populate form with default values when editing the customizations for an existing order item */
  cartItemCohortCustomizations?: CartItem['cohortCustomizations'];

  /** Called to add a new item to the cart, or to edit an existing cart item*/
  onSubmit: (
    submitArguments: ProductCustomizationModalSubmitArguments
  ) => Promise<void>;

  /** Called when an item is removed from the cart */
  onCartItemRemoval?: () => void;
};
