import { Controller } from 'react-hook-form';
import ImageUploadModal from './image-upload/ImageUploadModal';
import { useState } from 'react';
import {
  Button,
  Flex,
  Text,
  colors,
  spacing,
  typography,
  TextInput
} from '@digital-u/digital-ui';
import styled from '@emotion/styled';
import ImagePreviewer from './banner-card/BannerImagePreviewer';
import { Upload } from '@carbon/icons-react';

const StyledLabelFlex = styled(Flex)`
  justify-content: space-between;
  margin: ${spacing[0]} ${spacing[0.5]} ${spacing[0.5]};
`;

const StyledTextAreaLabel = styled(Flex)`
  justify-content: space-between;
  margin: ${spacing[0]} ${spacing[0.5]} -${spacing[6]};
`;

const StyledTextArea = styled.textarea`
  background-color: #f3f2f4;
  border: 2px solid transparent;
  border-bottom: 1px solid ${colors.gray[400]};
  padding: ${spacing[2]} ${spacing[4]};
  font-size: ${typography.sizes[3.5]};
  min-height: 58px;
  resize: none;
  &:focus-visible {
    outline: 0;
    border: 2px solid ${colors.purple[600]};
    margin-bottom: -1px;
  }
`;

const BannerForm = ({ control, allFields, setValue }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const validateSecureLink = value => {
    const isSecure = value.slice(0, 8).match(/^https:\/\//i);
    if (!isSecure) {
      const safeURL = `https://${value.replace(/^http:\/\//i, '')}`;
      setValue('buttonLink', safeURL);
    }
  };

  return (
    <form>
      <Flex direction="column" gap={spacing[8]} style={{ width: '60%' }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="title"
          render={({ field: { ref, ...rest } }) => (
            <TextInput
              {...rest}
              id="title"
              label={
                <StyledLabelFlex>
                  <Text size="label">Card Title*</Text>
                  <Text size="label">{`${allFields.title.length}/50`}</Text>
                </StyledLabelFlex>
              }
              maxLength={50}
            />
          )}
        />

        <StyledTextAreaLabel>
          <Text size="label">Body Copy*</Text>
          <Text size="label">{`${allFields.body.length}/100`}</Text>
        </StyledTextAreaLabel>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="body"
          render={({ field: { ref, ...rest } }) => (
            <StyledTextArea {...rest} id="body" maxLength={100} />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="buttonText"
          render={({ field: { ref, ...rest } }) => (
            <TextInput
              {...rest}
              id="buttonText"
              label={
                <StyledLabelFlex>
                  <Text size="label">Button Copy*</Text>
                  <Text size="label">{`${allFields.buttonText.length}/15`}</Text>
                </StyledLabelFlex>
              }
              maxLength={15}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="buttonLink"
          render={({ field: { ref, ...rest } }) => (
            <TextInput
              {...rest}
              id="buttonLink"
              label={<Text size="label">Button Link*</Text>}
              onBlur={() => validateSecureLink(rest.value)}
            />
          )}
        />
        <Flex direction="column" gap={spacing[3]}>
          <Text size="label">Logo*</Text>
          <Flex gap={spacing[5]}>
            <ImagePreviewer title={allFields.title} image={allFields.logo} />
            <Flex direction="column">
              <Button
                kind="pill-secondary"
                onClick={() => setShowImageUpload(true)}
                style={{
                  fontFamily: typography.fontFamily.ibm,
                  margin: spacing[2]
                }}
              >
                Change Logo <Upload />
              </Button>
              <Text style={{ fontFamily: typography.fontFamily.ibm }}>
                Accepted file types: JPEG, PNG, and GIF
              </Text>
              <Text style={{ fontFamily: typography.fontFamily.ibm }}>
                Maximum size: 180px &times; 100px
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Controller
        control={control}
        name="logo"
        rules={{
          required: true
        }}
        render={({ field: { value } }) => (
          <>
            {showImageUpload && (
              <ImageUploadModal
                formImage={value}
                onClose={() => setShowImageUpload(false)}
                submitImage={acceptedFiles =>
                  setValue('logo', acceptedFiles, {
                    shouldValidate: true
                  })
                }
              />
            )}
          </>
        )}
      />
    </form>
  );
};

export default BannerForm;
