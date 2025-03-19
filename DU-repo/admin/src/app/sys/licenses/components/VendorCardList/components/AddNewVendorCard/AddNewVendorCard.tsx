import { Modal, trapFocus, useModal } from '@cerberus/react';
import { Add } from '@cerberus/icons';
import { CreateNewVendorModalContent } from './components/CreateNewVendorModalContent';
import { useCreateVendor } from '@/api/vendor';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

export const AddNewVendorCard = () => {
  const createNewVendorModal = useModal();
  const handleKeyDown = trapFocus(createNewVendorModal.modalRef);

  const { createVendor } = useCreateVendor();

  const handleCreateVendor = async (data: { vendor: string }) => {
    const { vendor: name } = data;

    return createVendor({
      name,
      isLicensed: true
    }).then(() => {
      createNewVendorModal.close();
    });
  };

  return (
    <>
      <div
        className={hstack({
          bg: 'page.bg.100',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '0.188rem',
          borderStyle: 'dashed',
          borderColor: 'page.text.300',
          borderRadius: '8',
          cursor: 'pointer',
          minHeight: '8rem',
          width: '100%',
          padding: '1rem',
          _hover: { borderColor: 'page.text.300', bg: 'page.bg.200' }
        })}
        onClick={createNewVendorModal.show}
      >
        <Add
          size="28"
          className={css({ bg: 'page.surface.100', borderRadius: '50%' })}
        />
        <p className={css({ textStyle: 'heading-md' })}>New Vendor</p>
      </div>
      <Modal onKeyDown={handleKeyDown} ref={createNewVendorModal.modalRef}>
        {createNewVendorModal.isOpen && (
          <CreateNewVendorModalContent
            onSubmit={handleCreateVendor}
            onClose={createNewVendorModal.close}
          />
        )}
      </Modal>
    </>
  );
};
