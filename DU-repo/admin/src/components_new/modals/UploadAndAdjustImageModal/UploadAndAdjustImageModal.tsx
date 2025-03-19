import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  sliderStyles,
  hiddenInputButtonStyles
} from './uploadAndAdjustImageModal.styles';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { FileInput } from '@/components_new/form/FileInput';
import type { UploadAndAdjustImageModalProps } from './uploadAndAdjustImageModal.types';
import { dataURLtoFile } from './utils/dataURLtoFile';
import { verifyFile } from './utils/verifyFile';
import { StandardModalHeader } from '../StandardModalHeader';

const IMAGE_SETTINGS = {
  avatar: {
    width: 150,
    height: 150,
    border: 1,
    borderRadius: 100,
    initialRotation: 0,
    initialScale: 1
  },
  max_size: 151,
  min_size: 100,
  rotation: {
    step: 1,
    min: 0,
    max: 360
  },
  scale: {
    step: 0.1,
    min: 0.8,
    max: 5
  }
};

export const UploadAndAdjustImageModal = ({
  onClose,
  onSelect,
  imageSize = 151
}: UploadAndAdjustImageModalProps) => {
  const [picFile, setPicFile] = useState(null);
  const editedImage = useRef<AvatarEditor>(null);
  const [remadeImage, setRemadeImage] = useState(null);
  const [avatarScale, setAvatarScale] = useState(
    IMAGE_SETTINGS.avatar.initialScale
  );
  const [avatarRotation, setAvatarRotation] = useState(
    IMAGE_SETTINGS.avatar.initialRotation
  );

  const [errorDisplay, setErrorDisplay] = useState('');

  const handleChangeImage = () => {
    if (editedImage.current) {
      const canvas = editedImage.current.getImage().toDataURL();
      const newFile = dataURLtoFile(canvas, picFile?.file?.name);
      const canvasParts = canvas.split(',');
      const picType = canvasParts[0].split(':')[1].split(';');
      const newPicFile = {
        // @ts-expect-error - TODO: Get verification on this from FE
        mimeType: picType[0].file?.type,
        base64: canvasParts[1],
        file: newFile
      };
      setRemadeImage(newPicFile);
    }
  };

  const onFileOpenClick = () => {
    const input = document.querySelector(
      '#upload-profile-img-dialog'
    ) as HTMLInputElement;
    input.click();
  };

  const onChange = async (event: { target: { files: File } }) => {
    const file = event.target.files[0];

    await verifyFile(file, imageSize)
      .then(verified => {
        setPicFile(verified);
      })
      .catch(e => {
        setErrorDisplay(e.message);
      });
  };

  const onSelectClick = () => {
    if (!remadeImage) {
      onSelect(picFile.file);
    } else {
      onSelect(remadeImage.file);
    }

    onClose();
  };

  const onClearClick = () => {
    setAvatarRotation(IMAGE_SETTINGS.avatar.initialRotation);
    setAvatarScale(IMAGE_SETTINGS.avatar.initialScale);
    editedImage.current = null;
    setPicFile(null);
  };

  return (
    <>
      <StandardModalHeader title="Upload Image" onClose={onClose} />

      {errorDisplay && <p>{errorDisplay}</p>}

      {picFile ? (
        <div
          className={vstack({
            w: 'full',
            alignItems: 'flex-start',
            gap: ' 8',
            pr: '4'
          })}
        >
          <div
            className={hstack({
              justifyContent: 'space-between',
              gap: '7',
              w: 'full'
            })}
          >
            <div>
              <AvatarEditor
                ref={editedImage}
                width={IMAGE_SETTINGS.avatar.width}
                height={IMAGE_SETTINGS.avatar.height}
                image={picFile.file}
                border={IMAGE_SETTINGS.avatar.border}
                scale={avatarScale}
                rotate={avatarRotation}
                borderRadius={IMAGE_SETTINGS.avatar.borderRadius}
                onImageChange={handleChangeImage}
              />
            </div>
            <div className={sliderStyles}>
              <p>Zoom</p>
              <Slider
                onChange={(value: number) => setAvatarScale(value)}
                step={IMAGE_SETTINGS.scale.step}
                min={IMAGE_SETTINGS.scale.min}
                max={IMAGE_SETTINGS.scale.max}
              />

              <p>Rotation</p>
              <Slider
                onChange={(value: number) => setAvatarRotation(value)}
                step={IMAGE_SETTINGS.rotation.step}
                min={IMAGE_SETTINGS.rotation.min}
                max={IMAGE_SETTINGS.rotation.max}
              />
            </div>
          </div>
          <div className={hstack({ gap: '4' })}>
            <Button
              palette="action"
              usage="filled"
              shape="rounded"
              type="button"
              onClick={onSelectClick}
            >
              SAVE
            </Button>
            <Button
              palette="action"
              usage="outlined"
              shape="rounded"
              type="button"
              onClick={onClearClick}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={vstack({ alignItems: 'flex-start', gap: '8', mt: '6' })}
        >
          <p>
            {`Please use a JPEG, GIF, or PNG of at least ${imageSize}px x ${imageSize}px.`}
          </p>

          <Button
            palette="action"
            usage="filled"
            shape="rounded"
            type="button"
            aria-label="upload-input-button"
            onClick={onFileOpenClick}
          >
            SELECT A PHOTO
          </Button>

          {errorDisplay && <p>{errorDisplay}</p>}

          <FileInput
            className={hiddenInputButtonStyles}
            aria-label="file-input"
            id="upload-profile-img-dialog"
            name="profile-image"
            accept="image/gif,image/jpeg,image/png"
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};
