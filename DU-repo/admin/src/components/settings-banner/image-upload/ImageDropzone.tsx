import { Flex, Text, colors, spacing, typography } from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

interface ImageDropzoneType {
  dropError: boolean;
  acceptedImage: File | string;
  setAcceptedImage: React.Dispatch<React.SetStateAction<string | File>>;
  setDropError: React.Dispatch<React.SetStateAction<boolean>>;
  submitImage: (string) => void;
}

const imageLoad = (image: HTMLImageElement) =>
  new Promise(resolve => image.addEventListener('load', resolve));

const StyledUploadBox = styled.div<{
  dropError?: boolean;
  dialogueOpen?: boolean;
}>`
  display: flex;
  background-color: LightGray;
  outline: 1px dashed
    ${props => (props.dropError ? `${colors.red[600]}` : `${colors.gray[400]}`)};
  outline-offset: -1px;
  height: 10rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: ${props => (props.dialogueOpen ? 'wait' : 'pointer')};
`;

const StyledRemoveImageButton = styled.button`
  color: ${colors.teal[600]};
  font-weight: ${typography.weights.bold};
  text-decoration: underline;
`;

const StyledText = styled(Text)`
  display: inline;
  color: ${colors.teal[600]};
  font-weight: ${typography.weights.medium};
  text-decoration: underline;
`;

const ImageDropzone = ({
  dropError,
  setDropError,
  acceptedImage,
  setAcceptedImage,
  submitImage
}: ImageDropzoneType) => {
  const [dialogueOpen, setDialogueOpen] = useState(false);

  const removeImage = () => {
    setAcceptedImage('');
    submitImage('');
  };

  const imageSizeValidate = async acceptedFiles => {
    const image = new Image();
    image.src = URL.createObjectURL(acceptedFiles[0]);
    await imageLoad(image);
    if (image.width <= 180 && image.height <= 100)
      return setAcceptedImage(acceptedFiles[0]);
    setDropError(true);
  };

  return (
    <Dropzone
      multiple={false}
      accept={{
        'image/png': [],
        'image/jpeg': [],
        'image/gif': []
      }}
      onFileDialogOpen={() => setDialogueOpen(true)}
      onFileDialogCancel={() => setDialogueOpen(false)}
      disabled={acceptedImage !== '' || dialogueOpen}
      onDrop={() => {
        setDropError(false);
        setDialogueOpen(false);
      }}
      onDropAccepted={acceptedFiles => imageSizeValidate(acceptedFiles)}
      onDropRejected={() => setDropError(true)}
    >
      {({ getRootProps, isDragActive }) => (
        <StyledUploadBox
          dropError={dropError}
          dialogueOpen={dialogueOpen}
          id="image-upload"
          style={{
            backgroundColor: `${isDragActive && 'transparent'}`
          }}
          {...getRootProps()}
        >
          {acceptedImage ? (
            <Flex alignItems="center" gap={spacing[1]}>
              <Text fontWeight="bold">${(acceptedImage as File).name}</Text>
              <Text>added</Text>
              <StyledRemoveImageButton onClick={removeImage}>
                Remove
              </StyledRemoveImageButton>
            </Flex>
          ) : (
            <>
              <Text>Drag and drop your logo here,</Text>
              <Text>
                or <StyledText>select a file</StyledText> to upload
              </Text>
            </>
          )}
        </StyledUploadBox>
      )}
    </Dropzone>
  );
};

export default ImageDropzone;
