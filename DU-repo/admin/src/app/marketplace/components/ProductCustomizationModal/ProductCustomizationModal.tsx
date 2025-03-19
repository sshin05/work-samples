import {
  Modal,
  ModalHeader,
  ModalHeading,
  useModal,
  trapFocus
} from '@cerberus/react';
import { useCallback, useEffect, useMemo } from 'react';
import { CustomizationForm } from './components/CustomizationForm/components/CustomizationForm';
import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { formatFormInputsForSave } from './utils/formatFormInputDataForSave/formatFormInputDataForSave';
import type {
  CartItemMarketplaceProduct,
  ProductCustomizationModalProps
} from './ProductCustomizationModal.types';
import type { GetMarketplaceProductType } from '@digital-u/services/marketplace/products/get-marketplace-product';

export const ProductCustomizationModal = ({
  visible,
  onClose,
  title,
  submitText,
  marketplaceProduct,
  cartItemCohortCustomizations,
  onSubmit,
  onCartItemRemoval
}: ProductCustomizationModalProps) => {
  const { missionPartnerId } = useRouteParams();
  const { modalRef, show: showModal, close: closeModal } = useModal();

  const editModalHandleKeyDown = trapFocus(modalRef);

  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const customizations = useMemo(
    () =>
      (marketplaceProduct as GetMarketplaceProductType)?.customizations ||
      (marketplaceProduct as CartItemMarketplaceProduct)?.productCustomizations,
    [marketplaceProduct]
  );

  const handleSave = useCallback(
    async formData => {
      const formattedData = formatFormInputsForSave(formData, customizations);

      await onSubmit({
        customizationValues: formattedData,
        marketplaceProductId: marketplaceProduct.id,
        missionPartnerId
      });

      onClose();
    },
    [marketplaceProduct]
  );

  return (
    <Modal onKeyDown={editModalHandleKeyDown} ref={modalRef}>
      <ModalHeader>
        <ModalHeading className={css({ mb: '5' })}>{title}</ModalHeading>
        <h5
          className={css({
            textStyle: 'h5',
            color: 'page.text.initial'
          })}
        >
          {marketplaceProduct?.title}
        </h5>
      </ModalHeader>

      <CustomizationForm
        customizationFields={customizations || []}
        cartItemCohortCustomizations={cartItemCohortCustomizations}
        onClose={onClose}
        onSubmit={handleSave}
        onCartItemRemoval={onCartItemRemoval}
        submitText={submitText}
      />
    </Modal>
  );
};
