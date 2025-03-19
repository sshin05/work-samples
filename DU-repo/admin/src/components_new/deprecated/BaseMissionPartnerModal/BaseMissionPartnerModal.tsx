import React from 'react';
import { UniversalModal } from '@digital-u/digital-ui';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const BaseMissionPartnerModal = ({ title, onClose, children }) => {
  return (
    <div className={css({ mb: '6' })}>
      <UniversalModal
        title={title}
        handleOnClose={onClose}
        showModal
        showCloseButton
        showTopHeader
        containerStyle={{ overflow: 'visible' }}
      >
        <div className={vstack()}>{children}</div>
      </UniversalModal>
    </div>
  );
};
