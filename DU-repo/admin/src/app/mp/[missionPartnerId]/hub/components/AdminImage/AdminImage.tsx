import { UploadAndAdjustImageModal } from '@/components_new/modals/UploadAndAdjustImageModal';
import {
  useNotificationCenter,
  Button,
  Modal,
  useModal,
  trapFocus,
  Spinner
} from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Upload } from '@cerberus/icons';
import AffiliateLogo from '@/components_new/images/AffiliateLogo';
import { useUploadMissionPartnerLogo } from '@/api/mission-partner';
import { css, cx } from '@cerberus/styled-system/css';
import { ResetImageModal } from '@/components_new/modals/ResetImageModal';
import { AwsImage } from '@/components_new/images/AwsImage';
import { containerStyles } from '@/app/styles/ContainerStyles';

interface MissionPartnerProps {
  id: string;
  logoUrl?: string;
  affiliateId?: string;
}

interface AdminImageProps {
  missionPartner: MissionPartnerProps;
  refetchMissionPartner: () => void;
}

const AdminImage = ({
  missionPartner,
  refetchMissionPartner
}: AdminImageProps) => {
  const defaultImage = '/admin/images/default-image.png';
  const { uploadMissionPartnerLogo, uploadMissionPartnerLogoLoading } =
    useUploadMissionPartnerLogo();
  const { notify } = useNotificationCenter();

  const uploadImageModal = useModal();
  const handleKeyDownOnUploadImageModal = trapFocus(uploadImageModal.modalRef);

  const isLoading = uploadMissionPartnerLogoLoading;

  const handleSelectImage = async file => {
    try {
      await handleUploadImage(file);
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Updated mission partner logo.'
      });
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error updating mission partner logo.'
      });
    } finally {
      refetchMissionPartner();
    }
  };

  const handleUploadImage = async file => {
    try {
      const response = await uploadMissionPartnerLogo(file, missionPartner.id);
      return `${response.data?.uploadMissionPartnerLogo.url}`;
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error updating mission partner logo.'
      });
      return '';
    }
  };

  return (
    <div
      className={cx(
        hstack({
          minW: 'fit-content',
          p: '3',
          pr: '10',
          justifyContent: 'center',
          alignItems: 'center'
        }),
        containerStyles
      )}
    >
      <div className={hstack()}>
        {!missionPartner?.logoUrl && missionPartner?.affiliateId ? (
          <AffiliateLogo
            affiliateId={missionPartner?.affiliateId}
            height="9.375rem"
            width="9.375rem"
            padding="1rem"
          />
        ) : (
          <AwsImage
            w="150px"
            h="150px"
            alt={missionPartner?.logoUrl ? 'Custom Image' : 'Default Image'}
            src={
              missionPartner?.logoUrl ? missionPartner.logoUrl : defaultImage
            }
          />
        )}
        <div className={vstack({ alignItems: 'flex-start' })}>
          <Button
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={uploadImageModal.show}
          >
            {isLoading ? (
              <>
                Uploading <Spinner size="1em" />
              </>
            ) : (
              'Change Image'
            )}
            <Upload />
          </Button>
          <p className={css({ fontSize: 'sm', mt: '2.5' })}>
            Accepted file types: JPEG, PNG, and GIF
          </p>
          <p className={css({ fontSize: 'sm' })}>
            Recommended size: 570 x 685px
          </p>

          {missionPartner?.logoUrl && (
            <ResetImageModal handleSelectImage={handleSelectImage} />
          )}
        </div>

        <Modal
          onKeyDown={handleKeyDownOnUploadImageModal}
          ref={uploadImageModal.modalRef}
        >
          {uploadImageModal.isOpen && (
            <UploadAndAdjustImageModal
              onClose={uploadImageModal.close}
              onSelect={handleSelectImage}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminImage;
