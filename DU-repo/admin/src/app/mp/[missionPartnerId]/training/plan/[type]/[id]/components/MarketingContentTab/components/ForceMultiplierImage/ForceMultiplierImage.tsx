import { Upload } from '@cerberus/icons';
import AffiliateLogo from '@/components_new/images/AffiliateLogo';
import {
  Modal,
  Spinner,
  trapFocus,
  useModal,
  Button,
  Portal
} from '@cerberus/react';
import { ResetImageModal } from '@/components_new/modals/ResetImageModal';
import { css } from '@cerberus/styled-system/css';
import { AwsImage } from '@/components_new/images/AwsImage';
import { hstack } from '@cerberus/styled-system/patterns';
import { UploadAndAdjustImageModal } from '@/components_new/modals/UploadAndAdjustImageModal';

interface AdminImageProps {
  loading: boolean;
  disabled?: boolean;
  affiliateId?: string;
  fmImageUrlFormatted: string;
  fmImage: string;
  handleSelectImage: (image: File) => void;
}

export const ForceMultiplierImage = ({
  loading,
  disabled,
  affiliateId,
  fmImageUrlFormatted,
  fmImage,
  handleSelectImage
}: AdminImageProps) => {
  const defaultImage = '/admin/images/default-image.png';

  const uploadImageModal = useModal();
  const handleKeyDownOnUploadImageModal = trapFocus(uploadImageModal.modalRef);

  return (
    <div className={css({ bgColor: 'page.surface.100', p: '3', flex: '0' })}>
      <div className={hstack()}>
        {!fmImage && affiliateId ? (
          <AffiliateLogo
            affiliateId={affiliateId}
            height="9.375rem"
            width="9.375rem"
            padding="1rem"
          />
        ) : (
          <AwsImage
            w="150px"
            h="150px"
            alt={fmImage ? 'Custom Image' : 'Default Image'}
            src={fmImage ? fmImageUrlFormatted : defaultImage}
          />
        )}
        <div style={{ flexDirection: 'column' }}>
          <Button
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={uploadImageModal.show}
            type="button"
            disabled={disabled}
          >
            {loading ? (
              <>
                Uploading <Spinner size="1em" />
              </>
            ) : (
              'Change Image'
            )}
            <Upload />
          </Button>
          <p className={css({ fontSize: 'sm', mt: '2.5' })}>
            Accepted file types: JPEG, PNG, and GIF Recommended size: 570 x
            685px
          </p>

          {fmImage && (
            <ResetImageModal
              disabled={disabled}
              handleSelectImage={handleSelectImage}
            />
          )}
        </div>

        <Portal>
          <Modal
            onKeyDown={handleKeyDownOnUploadImageModal}
            ref={uploadImageModal.modalRef}
          >
            <UploadAndAdjustImageModal
              onClose={uploadImageModal.close}
              onSelect={handleSelectImage}
            />
          </Modal>
        </Portal>
      </div>
    </div>
  );
};
