import { useEffect } from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalHeading,
  trapFocus,
  useModal
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useRouteParams } from '@/hooks/useRouteParams';
import Link from 'next/link';
import { Close } from '@cerberus/icons';
import {
  CANCEL_BUTTON_TEXT,
  CLOSE_ICON_LABEL
} from './CartSubmissionConfirmationModal.constants';

type ConfirmationModalProps = {
  orderReferenceId: string;
  onClose: () => void;
};

/** Renders when an orderReferenceId value is provided */
export const CartSubmissionConfirmationModal = ({
  orderReferenceId,
  onClose
}: ConfirmationModalProps) => {
  const { missionPartnerId } = useRouteParams();
  const { modalRef, show: showModal, close: closeModal } = useModal();

  const editModalHandleKeyDown = trapFocus(modalRef);

  useEffect(() => {
    if (orderReferenceId) {
      showModal();
    } else {
      closeModal();
    }
  }, [orderReferenceId, showModal, closeModal, onClose]);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  const ordersUrl = getRouteUrl(
    routeGenerators.MarketplaceOrders({
      missionPartnerId
    })
  );

  const orderUrl = getRouteUrl(
    routeGenerators.MarketplaceOrder({
      missionPartnerId,
      orderId: orderReferenceId
    })
  );

  const categoryListPageUrl = getRouteUrl(
    routeGenerators.Marketplace({
      missionPartnerId
    })
  );

  return (
    <Modal
      onKeyDown={editModalHandleKeyDown}
      ref={modalRef}
      className={css({ w: '595px ' })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          w: '100%',
          alignItems: 'center',
          mb: 8,
          cursor: 'auto'
        })}
      >
        <ModalHeading>Your request has been sent</ModalHeading>
        <IconButton
          ariaLabel={CLOSE_ICON_LABEL}
          size="lg"
          palette="action"
          usage="ghost"
          onClick={handleClose}
          className={css({
            alignSelf: 'start',
            ml: 'auto',
            cursor: 'pointer'
          })}
        >
          <Close size={24} />
        </IconButton>
      </div>
      <div
        className={css({
          whiteSpace: 'normal',
          fontWeight: '400',
          mb: 0,
          color: 'page.text.initial'
        })}
      >
        <p>
          Your order{' '}
          <Link href={orderUrl} className={css({ color: 'action.text.200' })}>
            #{orderReferenceId}
          </Link>{' '}
          has been submitted. You will be notified when it is ready for
          purchase.
        </p>
        <p className={css({ mt: 4 })}>
          Questions about your request? Contact sot-x@omnifederal.com
        </p>
      </div>

      <div
        className={css({
          mt: '8',
          mb: '0'
        })}
      >
        <Link href={ordersUrl} className={css({ mr: '4' })}>
          <Button>Go to Orders</Button>
        </Link>
        <Link href={categoryListPageUrl}>
          <Button usage="outlined" onClick={handleClose} type="button">
            {CANCEL_BUTTON_TEXT}
          </Button>
        </Link>
      </div>
    </Modal>
  );
};
