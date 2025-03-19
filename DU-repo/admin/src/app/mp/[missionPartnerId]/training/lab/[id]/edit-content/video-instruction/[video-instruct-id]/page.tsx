'use client';
import { useEffect, useRef, useState } from 'react';
import { Upload } from '@carbon/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BevelCard,
  Button,
  colors,
  FileInput,
  Flex,
  Text,
  useToast,
  Video,
  TextInput,
  spacing
} from '@digital-u/digital-ui';
import {
  useUpdateLab,
  useFindLabById,
  useUploadVideoInstruction
} from '@/api/lab';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { useRouteParams } from '@/hooks/useRouteParams';

const ACCEPTED_FILE_EXTENSIONS = ['mp4'];

const VideoInstructions = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const encodedCallbackPath = searchParams.get('callbackPath');
  const callbackPath = decodeURIComponent(encodedCallbackPath);

  const { id: labId, 'video-instruct-id': instructionId } = useRouteParams();

  const { uploadVideoInstruction, uploadVideoInstructionLoading } =
    useUploadVideoInstruction();
  const { findLabById, findLabByIdError, findLabByIdLoading, fetchLabById } =
    useFindLabById(labId);
  const { updateLab, updateLabLoading } = useUpdateLab();

  const [, setToast] = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [source, setSource] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedImageHash, setUploadedImageHash] = useState(''); // To prevent browser cache on video

  const videoInstruction = findLabById?.instructions?.find(
    item => item.id === instructionId
  );

  const onChangeTitle = event => setTitle(event.target.value);

  const handleSelectVideo = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUnsetFile = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }

    setFile(null);
  };

  const handleFileOnChange = event => {
    const file = event.target.files[0];

    if (file) {
      // Doing a generic check on extensions here before it reaches the back end
      // to alert user of incorrect file
      const extension = file.name.split('.').pop();

      if (!ACCEPTED_FILE_EXTENSIONS.includes(extension)) {
        return setToast({
          title: 'Error',
          subtitle: `Accepted file types include: ${ACCEPTED_FILE_EXTENSIONS.join(
            ', '
          )}`,
          kind: 'error'
        });
      }

      setFile(file);
    }
  };

  const handleSave = async () => {
    const promiseChain = [];
    const newInstructionId = crypto.randomUUID();

    if (title !== videoInstruction?.title) {
      const instructions = findLabById.instructions.map(item => {
        if (item.id === instructionId) {
          return {
            ...item,
            title,
            videoUrl: item.videoUrl ?? undefined,
            videoFilename: item.videoFilename ?? undefined
          };
        }

        return item;
      });

      const {
        missionPartner: _missionPartner,
        __typename,
        ...labWithoutMissionPartner
      } = findLabById;

      if (instructionId === 'new') {
        instructions.push({
          id: newInstructionId,
          title,
          type: 'Video Lesson'
        });
      }

      promiseChain.push(
        updateLab({
          ...labWithoutMissionPartner,
          description: findLabById.description || '',
          launchConfig: {
            type: findLabById.launchConfig.type ?? 'jupyter',
            path: findLabById.launchConfig.path ?? 'path to jupyter'
          },
          instructions
        })
      );
    }

    if (file) {
      if (instructionId === 'new') {
        promiseChain.push(
          uploadVideoInstruction(labId, newInstructionId, file)
        );
      } else {
        promiseChain.push(uploadVideoInstruction(labId, instructionId, file));
      }
    }

    return Promise.all(promiseChain)
      .then(() => {
        if (file) {
          handleUnsetFile();
          setUploadedImageHash(crypto.randomUUID());
        }

        return fetchLabById(findLabById?.id);
      })
      .then(() =>
        setToast({
          kind: 'success',
          title: 'Lab updated successfully',
          subtitle: `The lab has been updated successfully`
        })
      )
      .then(
        () =>
          instructionId === 'new' &&
          router.push(
            `/mp/${findLabById.missionPartnerId}/training/lab/${labId}/edit-content/video-instruction/${newInstructionId}?callbackPath=${callbackPath}`
          )
      )
      .catch(() =>
        setToast({
          kind: 'error',
          title: 'Error',
          subtitle: 'An error occured updating the lab. Please try again.'
        })
      );
  };

  useEffect(() => {
    if (videoInstruction?.title) {
      setTitle(videoInstruction.title);
    }

    if (videoInstruction?.videoUrl) {
      setSource(videoInstruction.videoUrl);
    }
  }, [videoInstruction]);

  if (findLabByIdError || findLabByIdLoading) return null;

  return (
    <MainContentVStack>
      <Flex direction="column" gap={spacing[6]} padding={spacing[8]}>
        <Button kind="text" size="sm" onClick={() => router.push(callbackPath)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>
        <Text size="h2" fontWeight="bold">
          Edit Video Instruction
        </Text>
        <BevelCard>
          <Flex direction="column" gap="1rem">
            <div style={{ textAlign: 'left' }}>
              <Text>Title</Text>
              <TextInput
                id="title"
                label=""
                onChange={onChangeTitle}
                value={title}
                hideLabel
                style={{
                  width: '50%',
                  minWidth: '300px',
                  background: `${colors.galaxy[0]}`
                }}
              />
            </div>

            <div>
              <Text>Video</Text>
              <Flex
                direction="column"
                gap="1.5rem"
                alignItems="center"
                justifyContent="center"
                style={{
                  background: `${colors.galaxy[0]}`,
                  height: '400px',
                  padding: '200px'
                }}
              >
                <Flex
                  style={{
                    width: '500px',
                    height: 'auto',
                    maxWidth: '100vw'
                  }}
                >
                  {source && (
                    <Video
                      source={source}
                      key={uploadedImageHash}
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                </Flex>
                {uploadVideoInstructionLoading && (
                  <div>
                    <InlineLoading description="Uploading Video" />
                  </div>
                )}
                {!uploadVideoInstructionLoading && (
                  <>
                    {file && (
                      <p>Save your changes in order to preview your video</p>
                    )}
                    <Flex justifyContent="center">
                      <Button
                        kind="text"
                        onClick={handleSelectVideo}
                        rightIcon={<Upload />}
                      >
                        {source ? 'Replace Video' : 'Upload Video'}
                      </Button>
                    </Flex>
                  </>
                )}
              </Flex>
              <br />
              <Button
                kind="pill-secondary"
                onClick={handleSave}
                disabled={
                  uploadVideoInstructionLoading ||
                  updateLabLoading ||
                  (!file && !videoInstruction?.videoUrl) ||
                  !title ||
                  (title === videoInstruction?.title && !file)
                }
              >
                Save
              </Button>
            </div>
          </Flex>
        </BevelCard>
        <FileInput
          name="videoFile"
          accept="video/mp4"
          onChange={handleFileOnChange}
          ref={inputRef}
          style={{ display: 'none' }}
        />
      </Flex>
    </MainContentVStack>
  );
};

export default VideoInstructions;
