import { SquareFill } from '@cerberus/icons';
import { hstack } from '@cerberus/styled-system/patterns';
import type { ReactElement } from 'react';

export const LegendItem = ({
  label,
  color
}: {
  label: string | ReactElement<any>;
  color: string;
}) => {
  return (
    <div className={hstack()}>
      <SquareFill color={color} />
      {label}
    </div>
  );
};
