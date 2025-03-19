import { useForm, Controller } from 'react-hook-form';
import { hstack } from '@cerberus/styled-system/patterns';
import {
  Button,
  Field,
  FieldMessage,
  Label,
  Select,
  Option,
  Input,
  Show,
  Spinner,
  Accordion,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemIndicator,
  AccordionItem
} from '@cerberus/react';
import { SideDrawerFooter } from '@/app/marketplace/components/SideDrawer';
import { CurrencyDollar } from '@cerberus/icons';
import { DynamicFormFields } from './DynamicFormFields/DynamicFormFields';
import type { OrderItemCustomizationFormProps } from '../OrderItemCustomizationForm.types';
import { useEffect } from 'react';
import { css } from '@cerberus/styled-system/css';
import { OrderNoteCard } from '@/app/marketplace/components/OrderDetailPage/components/OrderNoteCard/OrderNoteCard';

export const OrderItemCustomizationForm = ({
  orderItem,
  customizationFields,
  orderItemCohortCustomizations,
  onClose,
  onSubmit,
  submitText
}: OrderItemCustomizationFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    getValues
  } = useForm();

  useEffect(() => {
    reset();
  }, [customizationFields, orderItemCohortCustomizations, orderItem, reset]);

  const isRefunded = orderItem?.status === 'REFUNDED';

  const isPaid = orderItem?.status === 'PAID';

  const isInContracting = orderItem?.status === 'IN_CONTRACTING';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={css({
          mb: '8'
        })}
      >
        <Controller
          name="orderItemStatus"
          control={control}
          defaultValue={orderItem?.status}
          render={({ field: { ref, ...field }, fieldState }) => (
            <Field {...fieldState}>
              <Label htmlFor="orderItemStatus">Status</Label>
              <Select
                id="orderItemStatus"
                aria-describedby="help:orderItemStatus"
                {...field}
              >
                <Option
                  value="PROCESSING"
                  disabled={isRefunded || isPaid || isInContracting}
                >
                  Pending
                </Option>
                <Option
                  value="READY_FOR_PAYMENT"
                  disabled={isRefunded || isPaid || isInContracting}
                >
                  Ready for Payment
                </Option>
                <Option value="IN_CONTRACTING" disabled>
                  In Contracting
                </Option>
                <Option value="PAID" disabled>
                  Paid
                </Option>
                <Option value="CANCELLED" disabled={isRefunded || isPaid}>
                  Cancelled
                </Option>
                <Option value="REFUNDED" disabled={!isPaid}>
                  Refunded
                </Option>
              </Select>
              <FieldMessage id="help:orderItemStatus">
                Some statuses will not be available based on the current status
                of the item.
              </FieldMessage>
            </Field>
          )}
        />
      </div>
      <div
        className={css({
          mb: '8'
        })}
      >
        <Controller
          name="orderItemPrice"
          control={control}
          rules={{
            validate: priceValue => {
              const orderItemStatus = getValues('orderItemStatus');
              const errorMessage =
                'Price is required to mark item as "Ready for Payment"';

              if (orderItemStatus === 'READY_FOR_PAYMENT') {
                return Boolean(priceValue) || errorMessage;
              }

              return true;
            }
          }}
          defaultValue={orderItem?.price || ''}
          render={({ field: { ref, ...field }, fieldState }) => {
            const hasError = Boolean(fieldState.error?.message);

            return (
              <Field
                {...fieldState}
                invalid={hasError}
                disabled={isRefunded || isPaid}
              >
                <Label htmlFor="orderItemPrice">Price</Label>
                <Input
                  id="orderItemPrice"
                  type="number"
                  min="0.00"
                  step="0.01"
                  startIcon={<CurrencyDollar />}
                  {...field}
                />
                <Show when={hasError}>
                  <FieldMessage id="help:orderItemPrice">
                    {fieldState.error?.message}
                  </FieldMessage>
                </Show>
              </Field>
            );
          }}
        />
      </div>
      <DynamicFormFields
        customizationFields={customizationFields}
        cartItemCohortCustomizations={orderItemCohortCustomizations}
        formControl={control}
      />

      <Accordion>
        <AccordionItem value="Item History">
          <AccordionItemTrigger
            size="sm"
            className={css({
              gap: 'md',
              justifyContent: 'flex-start'
            })}
          >
            <AccordionItemIndicator size="sm" />
            Item History
          </AccordionItemTrigger>

          <AccordionItemContent
            className={css({
              '&.animation-ended': {
                height: 'auto !important'
              }
            })}
            onAnimationEnd={event => {
              (event.target as HTMLElement).classList.add('animation-ended');
            }}
            onAnimationStart={event => {
              (event.target as HTMLElement).classList.remove('animation-ended');
            }}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              })}
            >
              {orderItem?.marketplaceNotes.map(note => (
                <OrderNoteCard key={note.id} note={note} />
              ))}
            </div>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>

      <SideDrawerFooter>
        <div className={hstack()}>
          <Button
            disabled={isSubmitting}
            palette="action"
            usage="filled"
            type="submit"
          >
            {isSubmitting && <Spinner size="1em" />}
            {submitText}
          </Button>
          <Button
            usage="outlined"
            onClick={onClose}
            type="button"
            aria-busy={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </SideDrawerFooter>
    </form>
  );
};
