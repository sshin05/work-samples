import { Button, Flex, Text, colors, spacing } from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import { BaseSkeleton } from '@/components_new/loaders';
import { Launch } from '@carbon/icons-react';
import ImagePreviewer from './BannerImagePreviewer';

interface BannerCardType {
  title?: string;
  description?: string;
  href?: string;
  image?: string | File;
  buttonText?: string;
  loading?: boolean;
}

const BANNER_BACKGROUND_URL = '/admin/images/du-branding/bg-texture-a1.png';

const StyledOuterContainer = styled.div`
  border-radius: ${spacing[2]};
  border: 1px solid ${colors.galaxy[200]};
  background: ${colors.purple[200]};
  background-image: url(${BANNER_BACKGROUND_URL});
  background-position: left 135% top 25%;
  background-repeat: no-repeat;
  background-size: 50%;
  box-shadow: 1px 4px 8px 0px rgba(0, 0, 0, 0.2);
  padding: ${spacing[10]};
`;

const StyledTextContainer = styled(Flex)`
  padding: ${spacing[0]} ${spacing[6]};
`;

const ImageWrapper = styled.div`
  height: 100px;
  width: 180px;
`;

const BannerCard = ({
  title,
  description,
  href,
  image,
  buttonText,
  loading
}: BannerCardType) => {
  if (loading)
    return (
      <StyledOuterContainer>
        <Flex direction="row" gap={spacing[24]} alignItems="center">
          <BaseSkeleton width={180} height={100} />
          <StyledTextContainer direction="column" flex="1" gap={spacing[2]}>
            <BaseSkeleton width="80%" />
            <BaseSkeleton width="80%" />
          </StyledTextContainer>
          <BaseSkeleton width={150} height={50} />
        </Flex>
      </StyledOuterContainer>
    );
  return (
    <StyledOuterContainer>
      <Flex direction="row" gap={spacing[24]} alignItems="center">
        <ImageWrapper>
          <ImagePreviewer image={image} title={title} />
        </ImageWrapper>
        <StyledTextContainer direction="column" flex="1" gap={spacing[2]}>
          <Text size="h3" fontWeight="semiBold">
            {title || 'Card Title'}
          </Text>
          <Text size="compact">{description || 'Body Copy'}</Text>
        </StyledTextContainer>
        <Button
          kind="secondary"
          rightIcon={<Launch />}
          href={href}
          target="_blank"
        >
          {buttonText || 'Button Copy'}
        </Button>
      </Flex>
    </StyledOuterContainer>
  );
};

export default BannerCard;
