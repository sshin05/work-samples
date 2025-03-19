'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  colors,
  Flex,
  RichTextEditor,
  Text,
  BevelCard,
  spacing,
  InlineNotification,
  TextInput
} from '@digital-u/digital-ui';
import {
  useUploadHostedCourseImage,
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { BaseSkeleton } from '@/components_new/loaders';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';
import { useRouteParams } from '@/hooks/useRouteParams';
import {
  Button as CerberusButton,
  useNotificationCenter
} from '@cerberus/react';
import { ArrowLeft } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

const TextLessonPage = () => {
  const router = useRouter();

  const { notify } = useNotificationCenter();
  interface VideoLesson {
    title?: string;
    content?: string;
  }

  const [videoLesson, setVideoLesson] = useState<VideoLesson>({});
  const {
    missionPartnerId,
    id: hostedContentId,
    'text-lesson-id': lessonId
  } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');

  const [title, setTitle] = useState('Loading...');
  const [content, setContent] = useState('');
  const contentEmpty =
    content === '<p><br></p>' || content === '<p></p>' || !content || !title;
  const [saveBtnClicked, setSaveBtnClicked] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    fetchHostedCourseItem,
    hostedCourseItemData,
    hostedCourseItemError,
    hostedCourseItemLoading
  } = useFindHostedCourseItem(hostedContentId, lessonId);

  const { updateHostedCourseItem } = useUpdateHostedCourseItem();
  const { uploadHostedCourseImageLoading, uploadHostedCourseImage } =
    useUploadHostedCourseImage();

  const disabled =
    contentEmpty ||
    !!hostedCourseItemError ||
    (hostedCourseItemData?.item?.content === content &&
      hostedCourseItemData?.item?.title === title) ||
    uploadHostedCourseImageLoading ||
    hostedCourseItemLoading;

  const onChangeTitle = event => setTitle(event.target.value);

  const onChangeContent = newContent => {
    setContent(newContent);
  };

  const uploadImage = file =>
    new Promise(resolve => {
      uploadHostedCourseImage(file, missionPartnerId).then(response => {
        resolve(
          `/assets/hosted-course-content/${response.data?.uploadHostedCourseImage.url}`
        );
      });
    });

  const handleSave = async () => {
    setSaveBtnClicked(true);
    const item = {
      ...hostedCourseItemData.item,
      title,
      content
    };

    return updateHostedCourseItem({
      id: hostedContentId,
      missionPartnerId,
      item
    })
      .then(() => fetchHostedCourseItem(hostedContentId, lessonId))
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Course updated successfully',
          description: 'The course has been updated successfully'
        })
      )
      .then(() =>
        router.push(
          `${getRouteUrl(
            routeGenerators.CourseTextLesson({
              missionPartnerId,
              hostedCourseId: hostedContentId,
              textLessonId: lessonId
            })
          )}?callbackPath=${callbackPath}`
        )
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error updating the course.'
        })
      )
      .finally(() => setSaveBtnClicked(false));
  };

  useEffect(() => {
    if (hostedCourseItemData?.item) {
      setVideoLesson(hostedCourseItemData.item);
    }
  }, [hostedCourseItemData]);

  useEffect(() => {
    if (videoLesson.title) {
      setTitle(videoLesson.title);
    }
  }, [videoLesson]);

  useEffect(() => {
    if (hostedCourseItemData?.item) {
      setContent(hostedCourseItemData.item.content);
    }
  }, [hostedCourseItemData]);

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
          style={{
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%'
          }}
        >
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <CerberusButton
              palette="secondaryAction"
              usage="ghost"
              onClick={() => router.push(callbackPath)}
            >
              <ArrowLeft />
              <span
                className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}
              >
                Back
              </span>
            </CerberusButton>
          </div>
          <Text size="h2" fontWeight="bold">
            Edit Text Lesson
          </Text>
          <Text size="h4" fontWeight="bold">
            Details
          </Text>
          <BevelCard style={{ background: 'white' }}>
            <Flex direction="column" gap="1.5rem">
              <div style={{ textAlign: 'left' }}>
                <Text>Title</Text>
                <TextInput
                  id="title"
                  onChange={event => {
                    onChangeTitle(event);
                  }}
                  value={title}
                  label=""
                  hideLabel
                  style={{ width: '50%' }}
                  disabled={saveBtnClicked}
                />
              </div>
              <div>
                <Text>Lesson Content</Text>
                {saveBtnClicked || hostedCourseItemLoading ? (
                  <BaseSkeleton />
                ) : (
                  <RichTextEditor
                    key="1"
                    uploadImage={() => uploadImage}
                    onChange={onChangeContent}
                    value={hostedCourseItemData?.item?.content}
                    quillProps={{
                      style: {
                        margin: spacing[0],
                        minHeight: '50dvh',
                        height: spacing[8]
                      }
                    }}
                    style={{
                      background: colors.gray[0]
                    }}
                  />
                )}
              </div>
            </Flex>
            {disabled && (
              <Text style={{ color: colors.red[800], margin: spacing[2] }}>
                * Text lesson content or title is empty. Add a title or content
                before saving.
              </Text>
            )}
            {uploadHostedCourseImageLoading && (
              <InlineLoading
                description="Your image is uploading"
                status="active"
              />
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
                style={{ marginTop: '.5rem' }}
              >
                Save
              </CerberusButton>
            </div>
          </BevelCard>
        </Flex>
      )}
    </MainContentVStack>
  );
};

export default TextLessonPage;
