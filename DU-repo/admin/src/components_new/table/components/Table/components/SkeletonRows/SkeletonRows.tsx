import { Tr, Td } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { styledLoading } from '../../../../styles/react-table.styles';

export const SkeletonRows = ({ skeletonRows, tableColumns }) => {
  return (
    <>
      {[...Array(skeletonRows)].map((_, index) => (
        <Tr key={index}>
          {tableColumns.map((_, index) => (
            <Td className={css({ height: 12 })} key={index}>
              <div aria-busy="true" className={styledLoading} />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};
