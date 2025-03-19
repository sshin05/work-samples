import { css } from '@cerberus/styled-system/css';
import { OrderItemCard } from '../OrderItemCard/OrderItemCard';
import { OrderSummaryCard } from '../OrderSummaryCard/OrderSummaryCard';
import { OrderPaymentMethodCard } from '../OrderPaymentMethodCard/OrderPaymentMethodCard';
//import { AccordionWrapper } from '@/app/marketplace/components/AccordionWrapper/AccordionWrapper';
import {
  Show,
  Button,
  Field,
  Label,
  Textarea,
  useConfirmModal,
  Spinner,
  Accordion,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemIndicator,
  AccordionItem,
  AccordionItemGroup
} from '@cerberus/react';
import { OrderNoteCard } from '../OrderNoteCard/OrderNoteCard';
import { sqlCreateMarketplaceNote } from '@/app/api/marketplace/notes';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import { useForm, Controller } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { OrderItemEditDrawer } from '@/app/marketplace/components/OrderItemEditDrawer/OrderItemEditDrawer';
import {
  sqlGetMarketplaceOrderItem,
  sqlUpdateMarketplaceOrderItem
} from '@/app/api/marketplace/order-items';
import {
  type sqlGetMarketplaceOrder,
  sqlFinalizeContracing
} from '@/app/api/marketplace/orders';
import { generateRom } from '@/app/marketplace/utils/generatePdf/generateRom';
import { generateSoo } from '@/app/marketplace/utils/generatePdf/generateSoo';
import { generateSow } from '@/app/marketplace/utils/generatePdf/generateSow';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

type OrderDetailPageBodyProps = {
  order?: ReturnType<typeof sqlGetMarketplaceOrder>['_serviceData'];
  loading?: boolean;
  tokenBalance?: number;
  refectchOrder: () => void;
};

export const OrderDetailPageBody = ({
  order,
  loading,
  tokenBalance,
  refectchOrder
}: OrderDetailPageBodyProps) => {
  const { isDuAdmin } = useIsDuAdmin();
  const [showAddNote, setShowAddNote] = useState(false);
  const matomoTrackEvent = useMatomoTrackEvent();

  const { control, handleSubmit, setValue } = useForm();

  const confirmModal = useConfirmModal();

  const { loading: noteLoading, mutation: createNote } = useSQLMutation(
    sqlCreateMarketplaceNote,
    {
      callback: refectchOrder
    }
  );

  const { mutation: finalizeContracting, loading: loadingFinalizeContracting } =
    useSQLMutation(sqlFinalizeContracing, {
      callback: refectchOrder
    });

  const handleAddNote = async data => {
    try {
      await createNote({
        ...data,
        referenceId: order.id
      });
      setShowAddNote(false);
      setValue('note', '');
    } catch (e) {
      console.error(e);
    }
  };

  const handleFinalizeContracting = async () => {
    try {
      const finalizeIsConfirmed = await confirmModal.show({
        heading: 'Finalize Contracting',
        description: `You are about to finalize the contracting phase of this order. This can not be undone. Do you want to proceed?`,
        actionText: 'Finalize Contracting',
        cancelText: 'Cancel'
      });
      if (finalizeIsConfirmed) {
        await finalizeContracting({
          orderReferenceId: order.referenceId
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statusGroups = {
    READY_FOR_PAYMENT: {
      text: 'Ready for Payment Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'READY_FOR_PAYMENT'
      )
    },
    PROCESSING: {
      text: 'Pending Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'PROCESSING'
      )
    },
    IN_CONTRACTING: {
      text: 'In Contracting Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'IN_CONTRACTING'
      )
    },
    PAID: {
      text: 'Paid Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'PAID'
      )
    },
    CANCELLED: {
      text: 'Cancelled Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'CANCELLED'
      )
    },
    REFUNDED: {
      text: 'Refunded Items',
      items: order?.marketplaceOrderItems.filter(
        orderItem => orderItem.status === 'REFUNDED'
      )
    }
  };

  const {
    data: orderItemData,
    loading: orderItemLoading,
    query: fetchOrderItem
  } = useSQLQuery(sqlGetMarketplaceOrderItem, {
    lazyLoad: true,
    forceFetch: true
  });
  const { mutation: updateOrderItem, error: updateOrderItemError } =
    useSQLMutation(sqlUpdateMarketplaceOrderItem);

  const [drawerIsExpanded, setDrawerIsExpanded] = useState(false);
  const handleCloseDrawer = () => {
    setDrawerIsExpanded(false);
    refectchOrder();
  };
  const handleOnExit = () => setDrawerIsExpanded(false);

  const handleOrderItemClick = orderItem => {
    fetchOrderItem({ id: orderItem.id });
    setDrawerIsExpanded(true);
  };

  const handleOrderItemEditSubmit = async formData => {
    await updateOrderItem(formData);
    handleCloseDrawer();
    if (updateOrderItemError) {
      console.error(updateOrderItemError);
    }
  };

  const handleGenerateRom = useCallback(() => {
    matomoTrackEvent('Order', 'Download ROM', `Order Id: ${order.referenceId}`);
    generateRom(order);
  }, [order]);

  const handleGenerateSow = useCallback(() => {
    matomoTrackEvent('Order', 'Download SOW', `Order Id: ${order.referenceId}`);
    generateSow(order);
  }, [order]);

  const handleGenerateSoo = useCallback(() => {
    matomoTrackEvent('Order', 'Download SOO', `Order Id: ${order.referenceId}`);
    generateSoo(order);
  }, [order]);

  const handleEmailOrderOwner = useCallback(() => {
    window.open(
      `mailto:${order?.owner?.email}?subject=Order ${order?.referenceId}`
    );
  }, [order]);

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '4.5rem'
        })}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div
            className={css({
              display: 'flex',
              flexDir: 'column',
              flexGrow: 1,
              mb: '6'
            })}
          >
            {Object.keys(statusGroups).map(status =>
              statusGroups[status]?.items?.length ? (
                <div key={status} className={css({ mb: '2rem' })}>
                  <Accordion defaultValue={[status]}>
                    <AccordionItem value={status}>
                      <AccordionItemTrigger
                        size="sm"
                        className={css({
                          gap: 'md',
                          justifyContent: 'flex-start'
                        })}
                      >
                        <AccordionItemIndicator size="sm" />
                        {`${statusGroups[status].text} (${statusGroups[status].items.length})`}
                      </AccordionItemTrigger>
                      <AccordionItemContent
                        className={css({
                          '&.animation-ended': {
                            height: 'auto !important'
                          }
                        })}
                        onAnimationEnd={event => {
                          (event.target as HTMLElement).classList.add(
                            'animation-ended'
                          );
                        }}
                        onAnimationStart={event => {
                          (event.target as HTMLElement).classList.remove(
                            'animation-ended'
                          );
                        }}
                      >
                        <div
                          className={css({
                            display: 'flex',
                            flexDir: 'column',
                            gap: '6',
                            flexGrow: 1
                          })}
                        >
                          {statusGroups[status].items.map(orderItem => (
                            <OrderItemCard
                              orderItem={orderItem}
                              key={orderItem.id}
                              onEdit={handleOrderItemClick}
                            />
                          ))}
                        </div>
                      </AccordionItemContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : null
            )}
            <Accordion defaultValue={['Activity']}>
              <AccordionItemGroup
                heading="Activity"
                indicatorPosition="start"
                size="sm"
                value="Activity"
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6
                  })}
                >
                  <Show when={!showAddNote && isDuAdmin}>
                    <Button
                      className={css({
                        mt: '.25rem',
                        width: 'fit-content'
                      })}
                      onClick={() => {
                        setShowAddNote(!showAddNote);
                      }}
                    >
                      Add Note
                    </Button>
                  </Show>
                  <Show when={showAddNote}>
                    <form onSubmit={handleSubmit(handleAddNote)}>
                      <Controller
                        name="note"
                        control={control}
                        defaultValue=""
                        render={({ field: { ref, ...field }, fieldState }) => (
                          <Field {...fieldState}>
                            <Label htmlFor="note">Add Note</Label>
                            <Textarea
                              id="note"
                              {...field}
                              disabled={noteLoading}
                            />
                          </Field>
                        )}
                      />
                      <div
                        className={css({
                          mt: '1rem',
                          display: 'flex',
                          gap: '1rem',
                          mb: '1rem'
                        })}
                      >
                        <Button
                          className={css({ mt: '.25rem', width: '6rem' })}
                          type="submit"
                          disabled={noteLoading}
                        >
                          {' '}
                          Save{' '}
                        </Button>
                        <Button
                          className={css({ mt: '.25rem', width: '6rem' })}
                          usage="outlined"
                          onClick={() => {
                            setShowAddNote(!showAddNote);
                          }}
                        >
                          {' '}
                          Cancel{' '}
                        </Button>
                      </div>
                    </form>
                  </Show>
                  {order?.marketplaceNotes
                    ?.toSorted((a, b) => {
                      return (
                        new Date(b._updatedAt).getTime() -
                        new Date(a._updatedAt).getTime()
                      );
                    })
                    .map(note => <OrderNoteCard note={note} key={note.id} />)}
                </div>
              </AccordionItemGroup>
            </Accordion>
          </div>
        )}
        <div>
          <OrderSummaryCard order={order} />
          <Show
            when={
              statusGroups.READY_FOR_PAYMENT?.items?.length > 0 &&
              statusGroups.PROCESSING?.items?.length == 0
            }
          >
            <OrderPaymentMethodCard
              tokenBalance={tokenBalance}
              refectchOrder={refectchOrder}
              order={order}
            />
          </Show>
          <Show when={isDuAdmin && !loading}>
            <div className={css({ float: 'right' })}>
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  marginTop: '1rem'
                })}
              >
                <Show when={order?.status === 'IN_CONTRACTING'}>
                  <Button
                    usage="outlined"
                    onClick={handleFinalizeContracting}
                    disabled={loadingFinalizeContracting}
                  >
                    {loadingFinalizeContracting && <Spinner size="1em" />}
                    Finalize Contracting
                  </Button>
                </Show>
                <Button usage="outlined" onClick={handleGenerateRom}>
                  Download ROM
                </Button>
                <Button usage="outlined" onClick={handleGenerateSoo}>
                  Download SOO
                </Button>
                <Button usage="outlined" onClick={handleGenerateSow}>
                  Download SOW
                </Button>
                <Button usage="outlined" onClick={handleEmailOrderOwner}>
                  Email Order Owner
                </Button>
              </div>
            </div>
          </Show>
        </div>
      </div>
      <OrderItemEditDrawer
        handleCloseDrawer={handleCloseDrawer}
        drawerIsExpanded={drawerIsExpanded}
        handleOnExit={handleOnExit}
        onSubmit={handleOrderItemEditSubmit}
        missionPartnerId={null}
        orderItem={orderItemData}
        loading={orderItemLoading}
      />
    </div>
  );
};
