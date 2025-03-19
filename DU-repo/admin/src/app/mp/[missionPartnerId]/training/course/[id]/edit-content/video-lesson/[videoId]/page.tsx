'use client';
import {
  BevelCard,
  Button,
  colors,
  FileInput,
  Flex,
  InlineNotification,
  Text,
  Video,
  TextInput,
  spacing
} from '@digital-u/digital-ui';
import {
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { Upload } from '@carbon/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  useFindHostedCourseItem,
  useUpdateHostedCourseItem,
  useUploadHostedVideo
} from '@/api/hosted-course';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { useRouteParams } from '@/hooks/useRouteParams';
import { hstack } from '@cerberus/styled-system/patterns';

const HostedVideoPage = () => {
  const router = useRouter();
  const { notify } = useNotificationCenter();
  const {
    missionPartnerId,
    id: courseId,
    videoId: lessonId
  } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');
  const [error, setError] = useState('');

  const { uploadHostedVideo, uploadHostedVideoLoading } =
    useUploadHostedVideo();
  const { fetchHostedCourseItem, hostedCourseItemData, hostedCourseItemError } =
    useFindHostedCourseItem(courseId, lessonId);

  const { updateHostedCourseItem } = useUpdateHostedCourseItem();

  interface VideoLesson {
    title: string;
    id: string;
    videoUrl?: string;
  }

  const [videoLesson, setVideoLesson] = useState<VideoLesson>(
    {} as VideoLesson
  );
  const [title, setTitle] = useState('Loading...');
  const [source, setSource] = useState(null);
  const [file, setFile] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<number | undefined>(undefined);

  const onChangeTitle = event => setTitle(event.target.value);

  const handleSelectVideo = () => inputRef.current && inputRef.current?.click();

  const handleUnsetFile = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }

    setFile(null);
  };

  const handleFileOnChange = event => {
    const file = event.target.files[0];

    if (file) {
      setFile(file);
    }
  };

  const handleSave = async () => {
    if (!file || !title) {
      if (!file && !title) {
        setError('* Video and title are required.');
      } else {
        setError(`* ${!file ? 'Video' : 'Title'} is required.`);
      }
      return;
    }

    setError('');
    try {
      let showSuccess = false;

      if (title !== videoLesson.title) {
        const item = { ...hostedCourseItemData.item, title };
        await updateHostedCourseItem({
          id: courseId,
          missionPartnerId,
          item
        });
        await fetchHostedCourseItem(courseId, videoLesson.id);

        showSuccess = true;
      }

      if (file) {
        await uploadHostedVideo(
          {
            id: courseId,
            videoLessonId: videoLesson.id,
            file
          },
          missionPartnerId
        );

        handleUnsetFile();

        await fetchHostedCourseItem(courseId, videoLesson.id);

        // We change the videoRef.current value to force a rerender of the video component when the video is updated.
        videoRef.current = Date.now();
        showSuccess = true;
      }

      if (showSuccess) {
        notify({
          heading: 'Success',
          description: 'Lesson updated',
          palette: 'success'
        });
      }
    } catch (error) {
      notify({
        heading: 'Error',
        description: error.message,
        palette: 'danger'
      });
    }
  };

  useEffect(() => {
    if (
      hostedCourseItemData?.item &&
      hostedCourseItemData?.item?.id === lessonId
    ) {
      setVideoLesson(hostedCourseItemData.item);
    }
  }, [hostedCourseItemData, lessonId]);

  useEffect(() => {
    if (videoLesson.title) {
      setTitle(videoLesson.title);
    }

    if (videoLesson.videoUrl) {
      setSource(videoLesson.videoUrl);
    }
  }, [videoLesson]);

  useEffect(() => {
    if (hostedCourseItemError) {
      setShowErrorModal(true);
    }
  }, [hostedCourseItemError]);

  return (
    <MainContentVStack>
      {showErrorModal && (
        <Flex justifyContent="center">
          <InlineNotification
            kind="error"
            heading="Error"
            subheading="There was a problem loading the hosted course."
            variant="dark"
            onClose={() => {
              setShowErrorModal(false);
              router.push(callbackPath);
            }}
          />
        </Flex>
      )}
      {!showErrorModal && (
        <Flex
          direction="column"
          gap={spacing[6]}
          padding={spacing[8]}
          style={{ width: '100%' }}
        >
          <Button
            kind="text"
            size="sm"
            onClick={() => router.push(callbackPath)}
          >
            <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
              &lt; BACK
            </Text>
          </Button>
          <Text size="h2" fontWeight="bold">
            Edit Video Lesson
          </Text>
          <BevelCard>
            <Flex direction="column" gap="1rem">
              <div style={{ textAlign: 'left' }}>
                <Text>Title</Text>
                <TextInput
                  id="title"
                  onChange={onChangeTitle}
                  value={title}
                  label=""
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
                    height: '500px',
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
                        source={uploadHostedVideoLoading ? null : source}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '350px',
                          margin: 'auto'
                        }}
                        ref={videoRef}
                      />
                    )}
                  </Flex>
                  {uploadHostedVideoLoading ? (
                    <div>
                      <InlineLoading description="Uploading Video" />
                    </div>
                  ) : (
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
                {error && (
                  <Text style={{ color: colors.red[800], margin: spacing[2] }}>
                    {error}
                  </Text>
                )}
                <div
                  className={hstack({
                    alignItems: 'flex-start',
                    w: 'full'
                  })}
                >
                  <CerberusButton
                    palette="action"
                    shape="rounded"
                    onClick={handleSave}
                  >
                    Save
                  </CerberusButton>
                </div>
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
      )}
    </MainContentVStack>
  );
};

export default HostedVideoPage;
