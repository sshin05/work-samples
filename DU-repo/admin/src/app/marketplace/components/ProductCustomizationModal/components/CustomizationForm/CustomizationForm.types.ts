import type {
  CartItem,
  CartItemMarketplaceProduct
} from '../../ProductCustomizationModal.types';
import type { GetMarketplaceProductType } from '@digital-u/services/marketplace/products/get-marketplace-product';

export type CustomizationFormProps = {
  customizationFields:
    | GetMarketplaceProductType['customizations']
    | CartItemMarketplaceProduct['productCustomizations'];
  cartItemCohortCustomizations: CartItem['cohortCustomizations'];
  onClose: () => void;
  onSubmit: (data: any) => void;
  onCartItemRemoval?: () => void;
  submitText: string;
};
