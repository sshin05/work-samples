import type { CartItem } from '../../ProductCustomizationModal.types';

export type OrderItemCustomizationFormProps = {
  orderItem: any; // TODO: Define this type from the api
  customizationFields: any; // TODO: Define this type from the api
  orderItemCohortCustomizations: CartItem['cohortCustomizations'];
  onClose: () => void;
  onSubmit: (data: any) => void;
  onCartItemRemoval?: () => void;
  submitText: string;
};
