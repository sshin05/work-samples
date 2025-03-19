'use client';

// REMOVE THIS FILE BEFORE PRODUCTION PUSH - FOR TESTING ONLY
// test file to be able to simulate spending tokens on orders

// ## PLACEHOLDER ##
// This is a placeholder for the Exchange Order page. It is a work in progress and will be updated in a future release.

import { container, hstack, vstack } from '@cerberus/styled-system/patterns';
import {
  Button,
  Field,
  FieldMessage,
  Label,
  Input,
  useModal
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { sqlCreateMarketplaceTokenTransaction } from '@/app/api/marketplace/token-transactions';
import { useSQLMutation } from '@/app/api';
import ManagePageHeader from '../../components/MangePageHeader/ManagePageHeader';
import { getRouteUrl } from '@/utils/getRouteUrl';

const SpendTokens = () => {
  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'Manage Marketplace',
      href: getRouteUrl('/marketplace/manage')
    },
    {
      text: 'Adjust Tokens'
    }
  ];

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const {
    modalRef: _editModalRef,
    show: _showEdit,
    close: _closeEdit
  } = useModal();
  // const editModalHandleKeyDown = trapFocus(editModalRef);

  const {
    loading: createMarketplaceTokenTransactionLoading,
    error: createMarketplaceTokenTransactionError,
    mutation: createMarketplaceTokenTransaction
  } = useSQLMutation(sqlCreateMarketplaceTokenTransaction);

  const handleSpend = useCallback(async transactionType => {
    // get value of amount from the form
    const mpid = (document.getElementById('mpid') as HTMLInputElement)?.value;
    const amount = (document.getElementById('amount') as HTMLInputElement)
      ?.value;
    const effectiveDate = (
      document.getElementById('effectiveDate') as HTMLInputElement
    )?.value;
    const reference = (document.getElementById('reference') as HTMLInputElement)
      ?.value;
    const orderNumber = (
      document.getElementById('orderNumber') as HTMLInputElement
    )?.value;
    const note = (document.getElementById('note') as HTMLInputElement)?.value;

    if (amount) {
      createMarketplaceTokenTransaction({
        amount: parseFloat(amount),
        effectiveDate: new Date(effectiveDate),
        missionPartnerId: mpid,
        type: transactionType,
        source: 'MANUAL ADJUSTMENT',
        sourceReference: reference,
        orderNumber: orderNumber,
        note: note
      });
    }
  }, []);

  return (
    <>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Adjust Tokens"
        subtitle="Deliver training at the speed of the mission."
        description="Manage Tokens"
      />
      <div className={vstack()}>
        <div
          className={container({
            mt: 16,
            bg: 'page.surface.200',
            px: '6',
            py: '8',
            borderRadius: 'sm'
          })}
        >
          <div className={hstack()}></div>
          <h3
            className={css({
              textStyle: 'h2',
              color: 'page.text.initial',
              mb: 2
            })}
          >
            Create Token Transaction
          </h3>

          <form onSubmit={handleSubmit(handleSpend)}>
            <Controller
              name="mpid"
              control={control}
              rules={{ required: 'Mission Partner ID' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="mpid">Mission Partner ID</Label>
                  <Input
                    describedBy="help:mpid"
                    id="mpid"
                    placeholder="Mission Partner ID"
                    type="string"
                    {...field}
                  />
                  <FieldMessage id="help:mpid">The MP ID</FieldMessage>
                </Field>
              )}
            />
            <Controller
              name="effectiveDate"
              control={control}
              rules={{ required: 'Effecitve Date Reauired' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    describedBy="help:effectiveDate"
                    id="effectiveDate"
                    placeholder="Effective Date"
                    type="date"
                    {...field}
                  />
                  <FieldMessage id="help:effectiveDate">
                    When the transaction becomes effective.
                  </FieldMessage>
                </Field>
              )}
            />
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'An amount is required.' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="amount">Token Amount</Label>
                  <Input
                    describedBy="help:amount"
                    id="amount"
                    placeholder="Token Amount"
                    type="number"
                    {...field}
                  />
                  <FieldMessage id="help:amount">Token Amount</FieldMessage>
                </Field>
              )}
            />
            <Controller
              name="reference"
              control={control}
              //rules={{ required: 'Payment reference.' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="reference">Payment Reference</Label>
                  <Input
                    describedBy="help:reference"
                    id="reference"
                    placeholder="Token reference"
                    type="string"
                    {...field}
                  />
                  <FieldMessage id="help:reference">
                    A reference to the payment type (ex. &quot;CC 1234&quot; or
                    &quot;Contracting #123XXZ&quot;).
                  </FieldMessage>
                </Field>
              )}
            />
            <Controller
              name="orderNumber"
              control={control}
              //rules={{ required: 'Order ID.' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="orderNumber">Order Id</Label>
                  <Input
                    describedBy="help:orderNumber"
                    id="orderNumber"
                    placeholder="Token orderNumber"
                    type="string"
                    {...field}
                  />
                  <FieldMessage id="help:orderNumber">
                    If directly related to an order, this is the order Id.
                  </FieldMessage>
                </Field>
              )}
            />
            <Controller
              name="note"
              control={control}
              //rules={{ required: 'Note' }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <Field {...fieldState}>
                  <Label htmlFor="note">Transaction Note</Label>
                  <Input
                    describedBy="help:note"
                    id="note"
                    placeholder="Note"
                    type="string"
                    {...field}
                  />
                  <FieldMessage id="help:note">
                    Any special note that goes with this transaction.
                  </FieldMessage>
                </Field>
              )}
            />
          </form>
          <div className={hstack({ mt: 4 })}>
            <Button
              disabled={isSubmitting}
              palette="action"
              usage="filled"
              type="submit"
              onClick={() => handleSpend('debit')}
              className={css({ w: '1/2' })}
            >
              {isSubmitting ? 'Updating...' : 'Debit'}
            </Button>
            <Button
              disabled={isSubmitting}
              palette="action"
              usage="filled"
              type="submit"
              onClick={() => handleSpend('credit')}
              className={css({ w: '1/2' })}
            >
              {isSubmitting ? 'Updating...' : 'Credit'}
            </Button>
          </div>
        </div>

        {createMarketplaceTokenTransactionLoading ? (
          <h6>processing</h6>
        ) : (
          <h6
            className={css({
              color: 'danger.text.100'
            })}
          >
            {createMarketplaceTokenTransactionError ?? ''}
          </h6>
        )}
      </div>
    </>
  );
};

export default SpendTokens;
