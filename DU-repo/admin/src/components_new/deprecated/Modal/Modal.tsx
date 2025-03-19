import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../../../components/Box';
import { Heading } from '../Heading';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import type { ModalProps } from './Modal.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const Modal = ({ title, children, onClose, sx }: ModalProps) => {
  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden';
    return () => {
      document.querySelector('body').style.overflow = 'auto';
    };
  }, []);

  const handleOverlayClick = (event: { currentTarget: any; target: any }) => {
    // this is all related to a bug in the create vendor modal where there was no way to close the modal
    if (event.currentTarget === event.target) {
      onClose();
    }

    return event;
  };

  return createPortal(
    <Box
      id="old-modal-div-wrapper"
      aria-modal="true"
      sx={{
        display: 'inline',
        position: 'fixed',
        backgroundColor: ['white', 'black60', 'black60'],
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        p: ['62px 0 0', 0, 0],
        zIndex: '9600',
        overflow: ['auto', 'unset', 'unset']
      }}
      onClick={handleOverlayClick}
    >
      <Box
        sx={{
          position: ['unset', 'absolute', 'absolute'],
          top: ['unset', '50%', '50%'],
          left: ['unset', '50%', '50%'],
          transform: [
            'unset',
            'translate(-50%, -50%)',
            'translate(-50%, -50%)'
          ],
          pt: ['unset', 'm', 'm'],
          pb: ['unset', 'm', 'm'],
          backgroundColor: ['unset', 'white', 'white'],
          minWidth: ['unset', '250px', '250px'],
          maxHeight: '80vh',
          ...sx
        }}
      >
        <Heading
          as="h3"
          context="light"
          sx={{
            fontWeight: 'semiBold'
          }}
        >
          {title}
        </Heading>
        <Flex
          sx={{
            display: ['none !important', 'flex !important', 'flex !important'],
            justifyContent: ['unset', 'space-between', 'space-between'],
            alignItems: ['unset', 'center', 'center'],
            pl: ['unset', 'm', 'm'],
            pr: ['unset', 'm', 'm']
          }}
        >
          <Icon
            role="button"
            name="close"
            onClick={onClose}
            size="m"
            sx={{
              cursor: 'pointer'
            }}
          />
        </Flex>
        <Box
          sx={{
            flex: ['1 1 auto', 'unset', 'unset']
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>,
    document.querySelector('#app-root')
  );
};
