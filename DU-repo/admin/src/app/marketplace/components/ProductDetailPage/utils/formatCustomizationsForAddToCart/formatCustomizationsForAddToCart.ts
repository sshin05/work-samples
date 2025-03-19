import type { FormattedCustomizations } from '../../../ProductCustomizationModal/utils/formatFormInputDataForSave/formatFormInputDataForSave.types';

/**
 * Unlike updating a cart item, sqlAddProductToCart doesn't support empty string or null values for customizations
 * that haven't been set. Filter optional customizations before save
 */
export const formatCustomizationsForAddToCart = (
  customizationValues: FormattedCustomizations
): FormattedCustomizations => {
  return customizationValues.filter(({ value }) => value !== '');
};
