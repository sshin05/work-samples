import { css } from '@cerberus/styled-system/css';
import { SideDrawerFooter } from '../../../SideDrawer';
import { Button } from '@cerberus/react';

type EmptyCartViewProps = {
  onCloseButtonClick: () => void;
};
export const EmptyCartView = ({ onCloseButtonClick }: EmptyCartViewProps) => {
  return (
    <>
      <div
        className={css({
          textAlign: 'center',
          mt: '44'
        })}
      >
        <h5 className={css({ mb: '4', textStyle: 'h5' })}>Cart is empty.</h5>
        <p>Once you add items to your order, you will see them here.</p>
      </div>

      <SideDrawerFooter>
        <Button onClick={onCloseButtonClick}>Close Cart</Button>
      </SideDrawerFooter>
    </>
  );
};
