import React from 'react';
import { Divider as BaseDivider } from 'theme-ui';

type DividerProps = {
  type?: string;
  sx?: Record<string, unknown>;
};

const Divider = ({ type = '', ...props }: DividerProps) => {
  return <BaseDivider variant={`styles.hr.${type}`} {...props} />;
};

export default Divider;
