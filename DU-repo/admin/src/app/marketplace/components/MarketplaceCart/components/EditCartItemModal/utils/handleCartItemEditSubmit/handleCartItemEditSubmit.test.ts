import type { CartItemData } from '../../../../MarketplaceCart.types';
import { handleCartItemEditSubmit } from './handleCartItemEditSubmit';
import type { ProductCustomizationModalSubmitArguments } from '@/app/marketplace/components/ProductCustomizationModal/ProductCustomizationModal.types';
import { updateCartItemCohortCustomizations } from '../updateCartItemCohortCustomizations';

jest.mock('../updateCartItemCohortCustomizations');

describe('handleCartItemEditSubmit', () => {
  const mockCustomizationValues = [];
  const mockCartItem = {
    cohortCustomizations: [
      {
        definitionId: 'customization-0',
        value: 'initial-value'
      },
      {
        definitionId: 'customization-1',
        value: 'initial-value'
      }
    ]
  } as CartItemData;

  it('submits the cart item update with the new customizations', async () => {
    const updateMarketplaceOrderItem = jest.fn();
    const onClose = jest.fn();

    const mockNewCartItem = {
      newCartItem: 'true'
    };

    (updateCartItemCohortCustomizations as jest.Mock).mockReturnValue(
      mockNewCartItem
    );

    const afterUpdateSpy = jest.fn();
    const handler = handleCartItemEditSubmit({
      cartItem: mockCartItem,
      updateMarketplaceOrderItem,
      afterUpdate: afterUpdateSpy,
      onClose,
      missionPartnerId: '123'
    });

    await handler({
      customizationValues: mockCustomizationValues
    } as ProductCustomizationModalSubmitArguments);

    expect(updateMarketplaceOrderItem).toHaveBeenCalledWith({
      ...mockNewCartItem,
      missionPartnerId: '123'
    });
    expect(afterUpdateSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalled();
  });
});
