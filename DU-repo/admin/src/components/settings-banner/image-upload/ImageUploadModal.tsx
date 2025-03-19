import React, { useState } from 'react';
import {
  Button,
  Flex,
  Text,
  UniversalModal,
  colors,
  spacing
} from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import ImageDropzone from './ImageDropzone';

interface ImageUploadModalType {
  formImage?: File;
  onClose: () => void;
  submitImage: (string) => void;
}

const StyledModal = styled(UniversalModal)`
  border-radius: 5px;
  gap: ${spacing[4]};
`;

const ImageUploadModal = ({
  formImage,
  onClose,
  submitImage
}: ImageUploadModalType) => {
  const [dropError, setDropError] = useState(false);
  const [acceptedImage, setAcceptedImage] = useState(formImage || '');

  return (
    <StyledModal
      title="Upload your logo"
      showCloseButton
      showModal
      handleOnClose={onClose}
      closeOnClickOutside
      showTopHeader
    >
      <Flex direction="column" gap={spacing[4]}>
        <ImageDropzone
          dropError={dropError}
          setDropError={setDropError}
          acceptedImage={acceptedImage}
          setAcceptedImage={setAcceptedImage}
          submitImage={submitImage}
        />
        {dropError && (
          <>
            <Text style={{ color: colors.red[600] }}>
              Image must be in JPEG, PNG, or GIF format and must not{' '}
            </Text>
            <Text style={{ color: colors.red[600] }}>
              exceed 180px wide x 100px high
            </Text>
          </>
        )}
        <Flex gap={spacing[4]} style={{ padding: spacing[2] }}>
          <Button
            disabled={!acceptedImage}
            kind="pill-primary"
            onClick={() => {
              submitImage(acceptedImage);
              onClose();
            }}
          >
            Continue
          </Button>
          <Button kind="pill-secondary" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </StyledModal>
  );
};

export default ImageUploadModal;
