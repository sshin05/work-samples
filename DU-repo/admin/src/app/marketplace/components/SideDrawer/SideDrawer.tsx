'use client';

import { type CarbonIconType, Close } from '@cerberus/icons';
import { IconButton } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import { useCallback, useEffect, useState } from 'react';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';

type SideDrawerProps = {
  children: React.ReactNode;
  HeaderIcon: CarbonIconType;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onCloseIconClick: () => void;
  onExited?: () => void;
};

/**
 *
 * Exports several composable components to support a consistent side drawer experience across marketplace pages
 *
 *  Example usage:
    ```
    <SideDrawer
      title="Cart"
      HeaderIcon={ShoppingCart}
      onCloseIconClick={handleClose}
      onExited={handleExited}
      isOpen={isExpanded}
    >
        <SideDrawerBody>
          <div>Custom SideDrawer Body Content</div>
        <SideDrawerBody>

        <SideDrawerFooter>
            <button onClick={customHandlerForDrawer}>Submit</button>
        </SideDrawerFooter>
    </SideDrawer>
    ```
 *
 *
 */
export const SideDrawer = ({
  children,
  HeaderIcon,
  title,
  subtitle,
  onCloseIconClick,
  onExited,
  isOpen
}: SideDrawerProps) => {
  const {
    marketplaceOpenSideDrawerTitle,
    onSideDrawerOpen,
    onSideDrawerClose
  } = useMarketplace();

  const handleAnimationEnd = useCallback(() => {
    if (!isOpen && onExited) {
      onSideDrawerClose(title);
      onExited();
    }
  }, [isOpen, onExited, onSideDrawerClose, title]);

  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
      onSideDrawerOpen(title);
    }
  }, [isOpen, onSideDrawerOpen, title]);

  useEffect(() => {
    if (
      marketplaceOpenSideDrawerTitle &&
      marketplaceOpenSideDrawerTitle !== title
    ) {
      onCloseIconClick();
    }
  }, [marketplaceOpenSideDrawerTitle]);

  if (!hasBeenOpened) return null;

  return (
    <div
      data-testid="Side Drawer Container" // eslint-disable-line local-rules/no-test-ids
      onClick={e => e.stopPropagation()}
      key={isOpen ? 'side-drawer-open' : 'side-drawer-close'}
      onAnimationEnd={handleAnimationEnd}
      className={flex({
        animationName: 'slideFromRightFull',
        animationDuration: '250ms',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'both',
        animationDirection: isOpen ? 'normal' : 'reverse',
        direction: 'column',
        position: 'fixed',
        right: '0',
        top: '80px',
        w: '616px',
        h: '80%',
        bg: 'acheron.neutral.100',
        borderLeft: '2px solid var(--border-page-200, #6A6764)',
        borderTopLeftRadius: 'lg',
        borderBottomLeftRadius: 'lg',
        boxShadow:
          '0px 4px 24px 8px var(--cerberus-colors-cerberus-neutral-100)',
        cursor: 'default',
        zIndex: '1500'
      })}
    >
      <div
        className={flex({
          alignItems: 'end',
          justifyContent: 'space-between',
          mb: '6',
          pt: '9',
          px: '8'
        })}
      >
        <div className={hstack({ w: '456px', gap: '4' })}>
          <HeaderIcon size={32} />
          <h2 className={css({ textStyle: 'display-sm' })}>{title}</h2>
        </div>
        <IconButton
          ariaLabel="Close"
          size="lg"
          palette="action"
          usage="ghost"
          onClick={onCloseIconClick}
          className={css({
            alignSelf: 'start',
            ml: 'auto',
            cursor: 'pointer'
          })}
        >
          <Close size={24} />
        </IconButton>
      </div>
      {subtitle && (
        <h3 className={css({ px: '8', textStyle: 'h5', mb: '6' })}>
          {subtitle}
        </h3>
      )}

      {children}
    </div>
  );
};
