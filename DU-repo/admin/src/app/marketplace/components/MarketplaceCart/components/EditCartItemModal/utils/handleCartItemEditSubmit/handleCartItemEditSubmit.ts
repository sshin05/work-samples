import type { ProductCustomizationModalSubmitArguments } from '@/app/marketplace/components/ProductCustomizationModal/ProductCustomizationModal.types';
import { updateCartItemCohortCustomizations } from '../updateCartItemCohortCustomizations';
import type {
  CartItemData,
  UpdateAndCreateCartItem
} from '../../../../MarketplaceCart.types';

type HandleCartItemEditSubmit = {
  cartItem: CartItemData;
  updateMarketplaceOrderItem: (
    cartItem: UpdateAndCreateCartItem
    // Promise of object
  ) => Promise<Record<string, unknown>>;
  afterUpdate: () => Promise<void>;
  onClose: () => void;
  missionPartnerId: string;
};

export const handleCartItemEditSubmit = ({
  cartItem,
  updateMarketplaceOrderItem,
  afterUpdate,
  onClose,
  missionPartnerId
}: HandleCartItemEditSubmit): (({
  customizationValues
}: ProductCustomizationModalSubmitArguments) => Promise<void>) => {
  return async ({
    customizationValues
  }: ProductCustomizationModalSubmitArguments) => {
    const newCartItem = updateCartItemCohortCustomizations({
      cartItem,
      customizationValues
    });

    try {
      await updateMarketplaceOrderItem({ ...newCartItem, missionPartnerId });
      await afterUpdate();
    } finally {
      onClose();
    }
  };
};
