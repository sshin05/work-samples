import type { Control, FieldValues } from 'react-hook-form';
import type {
  CartItem,
  CartItemMarketplaceProduct
} from '../../../../ProductCustomizationModal.types';
import type { GetMarketplaceProductType } from '@digital-u/services/marketplace/products/get-marketplace-product';

export type DynamicFormFieldProps = {
  customizationFields:
    | GetMarketplaceProductType['customizations']
    | CartItemMarketplaceProduct['productCustomizations'];
  cartItemCohortCustomizations: CartItem['cohortCustomizations'];
  formControl: Control<FieldValues, any>;

  /**
   * For date fields, specifying the minimumDate allows for past date ranges to be disabled for selection.
   * To enable only the current and future dates, pass the current date as a string:
   *
   * @example
   * '2025-01-06' // January 6th
   */
  minimumDate?: string;
};
