import { Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

enum GRADIENTS {
  'TRAINING' = 'amphiaraus-light',
  'RESOURCE' = 'charon-dark'
}

enum PRODUCT_TYPE_DISPLAY_TEXT {
  'TRAINING' = 'Training',
  'RESOURCE' = 'Resource'
}

type ProductTagProps = {
  productType: 'TRAINING' | 'RESOURCE';
};

export const ProductTypeTag = ({ productType }: ProductTagProps) => {
  return (
    <Tag
      gradient={GRADIENTS[productType]}
      shape="square"
      className={css({ ml: 'auto' })}
    >
      {PRODUCT_TYPE_DISPLAY_TEXT[productType]}
    </Tag>
  );
};
