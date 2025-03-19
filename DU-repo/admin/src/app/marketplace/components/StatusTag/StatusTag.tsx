import { Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { orderStatusMap } from '@/app/marketplace/utils/orderStatus';

enum GRADIENTS {
  'READY_FOR_PAYMENT' = 'green',
  'PAID' = 'amphiaraus-light',
  'PROCESSING' = 'asphodel-light',
  'COMPLETED' = 'charon-light'
}

enum PALETTES {
  'CANCELED' = 'danger'
}

type StatusProps = {
  status:
    | 'READY_FOR_PAYMENT'
    | 'PAID'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'CANCELED'
    | string;
};

export const StatusTag = ({ status }: StatusProps) => {
  return (
    <Tag
      gradient={GRADIENTS[status]}
      palette={PALETTES[status]}
      shape="square"
      className={css({ ml: 'auto' })}
      usage="outlined"
    >
      {orderStatusMap[status]}
    </Tag>
  );
};
