'use client';

import {
  Field,
  Label,
  Radio,
  Button,
  useConfirmModal,
  Spinner
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useSQLMutation } from '@/app/api';
import {
  sqlMakePaymentWithMarketplaceTokenTransaction,
  sqlMakePaymentWithContracting
} from '@/app/api/marketplace/carts';
import { useCallback, type JSX } from 'react';

export function OrderPaymentMethodCard({
  tokenBalance,
  refectchOrder,
  order
}): JSX.Element {
  const {
    mutation: makePaymentWithTokens,
    loading: loadingMakePaymentWithTokens
  } = useSQLMutation(sqlMakePaymentWithMarketplaceTokenTransaction, {
    callback: refectchOrder
  });

  const {
    mutation: makePaymentWithContracting,
    loading: loadingMakePaymentWithContracting
  } = useSQLMutation(sqlMakePaymentWithContracting, {
    callback: refectchOrder
  });

  const confirmModal = useConfirmModal();

  const handleSubmitOrder = useCallback(
    async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const paymentMethod = formData.get('payment-method');
      switch (paymentMethod) {
        case 'tokens':
          const paymentIsConfirmed = await confirmModal.show({
            heading: 'Pay with training tokens',
            description: `You are about to submit your transaction. Your token balance after this transaction will be ${tokenBalance - order?.totalTokens} tokens. Do you want to proceed?`,
            actionText: 'Submit Payment',
            cancelText: 'Cancel'
          });
          if (paymentIsConfirmed) {
            makePaymentWithTokens({ orderReferenceId: order.referenceId });
          }
          break;
        case 'creditCard':
          console.log('Credit Card');
          break;
        case 'contracting':
          const contractingIsConfirmed = await confirmModal.show({
            heading: 'Start contracting process',
            description:
              "You've selected the Contracting Option. Please verify that your order details are correct. After you click 'Proceed', the information will be sent to your Resource Manager to finalize the contracting package for this purchase.",
            actionText: 'Proceed',
            cancelText: 'Cancel'
          });
          if (contractingIsConfirmed) {
            makePaymentWithContracting({ orderReferenceId: order.referenceId });
          }
          break;
      }
    },
    [
      confirmModal,
      makePaymentWithTokens,
      makePaymentWithContracting,
      order,
      tokenBalance
    ]
  );

  return !order?.totalTokens || tokenBalance == undefined ? null : (
    <div>
      <form onSubmit={handleSubmitOrder}>
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            bg: 'page.surface.200',
            mt: '1.5rem',
            mb: '1rem',
            px: '6',
            py: '6',
            border: '1px solid #000',
            alignSelf: 'stretch',
            gap: '2.5rem'
          })}
        >
          <h4
            className={css({
              textStyle: 'h4',
              color: 'page.text.300'
            })}
          >
            Payment Method
          </h4>
          <div>
            <fieldset name="paymentMethod" role="radiogroup">
              <Field disabled={tokenBalance < order.totalTokens}>
                <Radio
                  id="tokens"
                  name="payment-method"
                  value="tokens"
                  defaultChecked={tokenBalance >= order.totalTokens}
                >
                  <Label htmlFor="tokens">
                    {`Training Tokens (You have ${tokenBalance} tokens)`}
                  </Label>
                </Radio>
              </Field>
              {/* <Field>
                <Radio
                  id="creditCard"
                  name="payment-method"
                  value="creditCard"
                  defaultChecked={tokenBalance < order?.totalTokens}
                >
                  <Label htmlFor="creditCard">Credit Card</Label>
                </Radio>
              </Field> */}

              <Field>
                <Radio
                  id="contracting"
                  name="payment-method"
                  value="contracting"
                >
                  <Label htmlFor="contracting">Contracting</Label>
                </Radio>
              </Field>
            </fieldset>
          </div>
        </div>
        <div className={css({ textAlign: 'right' })}>
          <Button
            type="submit"
            disabled={
              loadingMakePaymentWithTokens || loadingMakePaymentWithContracting
            }
          >
            {(loadingMakePaymentWithTokens ||
              loadingMakePaymentWithContracting) && <Spinner size="1em" />}
            Submit Order
          </Button>
        </div>
      </form>
    </div>
  );
}
