import { Image, Text, colors } from '@digital-u/digital-ui';
import styled from '@emotion/styled';

interface ImagePreviewerType {
  image: string | File;
  title: string;
}

const ImagePlaceholder = styled.div`
  display: flex;
  height: 100px;
  width: 180px;
  background: ${colors.white};
  outline: 1px solid Black;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  height: 100px;
  width: 180px;
`;

const ImagePreviewer = ({ image, title }: ImagePreviewerType) =>
  image ? (
    <StyledImage
      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
      alt={`${title || 'your'} image`}
    />
  ) : (
    <ImagePlaceholder>
      <Text size="h4" fontWeight="bold">
        Logo Image
      </Text>
    </ImagePlaceholder>
  );

export default ImagePreviewer;
