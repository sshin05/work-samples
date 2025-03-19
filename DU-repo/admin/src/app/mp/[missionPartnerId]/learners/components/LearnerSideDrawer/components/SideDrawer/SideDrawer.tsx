'use client';
import { useCallback, useEffect, useState } from 'react';
import { type CarbonIconType, Close } from '@cerberus/icons';
import { Avatar, IconButton } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';

type SideDrawerProps = {
  children: React.ReactNode;
  HeaderIcon?: CarbonIconType;
  name: string;
  email: string;
  subtitle?: string;
  isOpen: boolean;
  onCloseIconClick: () => void;
  onExited?: () => void;
  isLoading: boolean;
};

export const SideDrawer = ({
  children,
  name,
  email,
  onCloseIconClick,
  onExited,
  isOpen,
  isLoading
}: SideDrawerProps) => {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const handleAnimationEnd = useCallback(() => {
    if (!isOpen && onExited) {
      onExited();
    }
  }, [isOpen, onExited]);

  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
    }
  }, [isOpen]);

  if (!hasBeenOpened) return null;

  return (
    <>
      {/* backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseIconClick}
          className={css({
            position: 'fixed',
            top: 0,
            left: 0,
            w: 'full',
            h: 'full',
            backdropFilter: `blur(6px)`,
            bg: 'page.backdrop.initial',
            zIndex: '1400' // ensure this is less than the Side Drawer Container's zIndex
          })}
        />
      )}
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
          top: '0',
          w: '616px',
          h: 'full',
          bg: 'page.surface.100',
          boxShadow: `0px 2px var(--md, 16px) 0px var(--drop-shadow-sm, rgba(22, 1, 38, 0.15))`,
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
          {!isLoading ? (
            <div className={hstack()}>
              <Avatar ariaLabel="" src="" />
              <div className="">
                <h4 className={css({ textStyle: 'h4' })}>{name}</h4>
                <a
                  href={`mailto:${email}`}
                  className={css({ color: 'action.navigation.initial' })}
                >
                  <span>{email}</span>
                </a>
              </div>
            </div>
          ) : (
            <div aria-busy>Loading</div>
          )}
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
        {children}
      </div>
    </>
  );
};
