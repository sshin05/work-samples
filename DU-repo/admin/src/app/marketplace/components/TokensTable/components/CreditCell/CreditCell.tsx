import { InformationFilled } from '@cerberus/icons';
import { Show, Tooltip } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import type { TokenTransactionRecords } from '../../TokensTable.types';
import { formatTransactionDate } from '../TransactionColumns/TokensTableColumns';
import { isValidDate } from '@/app/marketplace/utils/isValidDate';

const isExpiringSoon = (transaction: TokenTransactionRecords[number]) => {
  const expiry = new Date(transaction.expirationDate);

  if (!isValidDate(expiry)) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const ninetyDaysFromToday = new Date();
  ninetyDaysFromToday.setDate(today.getDate() + 90);

  return expiry >= today && expiry <= ninetyDaysFromToday;
};

export const getTooltipText = (
  transaction: TokenTransactionRecords[number],
  formattedTransactionAmount: string
) => {
  return `${formattedTransactionAmount} will expire on ${formatTransactionDate(transaction.expirationDate)}`;
};

export const CreditCell = ({
  transaction
}: {
  transaction: TokenTransactionRecords[number];
}) => {
  const formattedTransactionAmount = transaction.amount.toLocaleString();
  return (
    <>
      {formattedTransactionAmount}
      <Show when={isExpiringSoon(transaction)}>
        <span className={css({ ml: 2 })}>
          <Tooltip
            position="right"
            content={getTooltipText(transaction, formattedTransactionAmount)}
          >
            <span aria-label="Expiration notice" data-tooltip>
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
