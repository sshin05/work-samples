import { InformationFilled } from '@cerberus/icons';
import { Show, Tooltip } from '@cerberus/react';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import type { TokenTransactionRecords } from '../../TokensTable.types';

const isManualAdjustment = (transaction: TokenTransactionRecords[number]) =>
  transaction.source === 'MANUAL ADJUSTMENT';

export const TransactionCell = ({
  transaction
}: {
  transaction: TokenTransactionRecords[number];
}) => {
  return (
    <>
      <span>Order: </span>

      <Link
        href={`orders/${transaction.orderNumber}`}
        className={css({
          color: 'action.text.100'
        })}
      >
        {transaction.orderNumber}
      </Link>

      <Show when={isManualAdjustment(transaction)}>
        <span className={css({ ml: 2 })}>
          <Tooltip position="right" content={transaction.note}>
            <span aria-label="Manual adjustment note" data-tooltip>
              <InformationFilled
                size={16}
                className={css({
                  position: 'relative',
                  top: '2px'
                })}
              />
            </span>
          </Tooltip>
        </span>
      </Show>
    </>
  );
};
