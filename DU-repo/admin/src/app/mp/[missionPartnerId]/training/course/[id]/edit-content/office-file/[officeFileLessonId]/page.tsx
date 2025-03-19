'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  colors,
  FileInput,
  Flex,
  Text,
  spacing,
  DocViewer
} from '@digital-u/digital-ui';
import {
  useNotificationCenter,
  Button as CerberusButton
} from '@cerberus/react';
import { Edit, Upload } from '@carbon/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import {
  useUploadOfficeFile,
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { TextInput } from '@/components_new/form';
import { hstack } from 'styled-system/patterns';

const ACCEPTED_FILE_EXTENSIONS = ['docx', 'doc', 'pptx', 'ppt', 'xlsx', 'xls'];

const EditOfficeFilePage = () => {
  const router = useRouter();
  const { notify } = useNotificationCenter();
  const {
    id: courseId,
    officeFileLessonId,
    missionPartnerId
  } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset
  } = useForm();

  // Queries
  const { hostedCourseItemData, fetchHostedCourseItem } =
    useFindHostedCourseItem(courseId, officeFileLessonId);

  // Derived State
  const [file, setFile] = useState(null);

  const officeFileLesson = hostedCourseItemData?.item;

  const isFileUploaded = officeFileLesson?.fileUrl || file;

  const isPublished = hostedCourseItemData?.status === 'Published';
  // Mutations
  const { updateHostedCourseItem } = useUpdateHostedCourseItem();
  const { uploadOfficeFile, uploadOfficeFileLoading } = useUploadOfficeFile();

  const handleSelectFile = () => inputRef.current && inputRef.current?.click();

  const handleFileOnChange = event => {
    const file = event.target.files[0];

    if (file) {
      // Doing a generic check on extensions here before it reaches the back end
      // to alert user of incorrect file
      const extension = file.name.split('.').pop();

      if (!ACCEPTED_FILE_EXTENSIONS.includes(extension)) {
        return notify({
          palette: 'danger',
          description: `Accepted file types include: ${ACCEPTED_FILE_EXTENSIONS.join(
            ', '
          )}`,
          heading: 'Error'
        });
      }

      setFile(file);
      setValue('file', file, { shouldDirty: true });
    }
  };

  const handleSaveFile = async data => {
    // Verify that a file has been uploaded, either now
    // or in the past
    if (!file && !officeFileLesson?.fileUrl) {
      return notify({
        palette: 'danger',
        description: 'You must select a file to upload.',
        heading: 'Error'
      });
    }
    return updateHostedCourseItem({
      id: courseId,
      missionPartnerId,
      item: {
        ...hostedCourseItemData.item,
        ...data
      }
    })
      .then(async () => {
        if (file) {
          return await uploadOfficeFile({
            id: courseId,
            officeFileLessonId,
            file
          });
        }

        return Promise.resolve(); // Ensure this returns a consistent type
      })
      .then(() => {
        setFile(null);

        return fetchHostedCourseItem(courseId, officeFileLessonId);
      })
      .then(() => {
        notify({
          palette: 'success',
          description: 'Office file updated successfully',
          heading: 'Success'
        });
        reset();
      })
      .catch(() =>
        notify({
          palette: 'danger',
          description: 'Office file failed to update',
          heading: 'Error'
        })
      );
  };

  useEffect(() => {
    if (officeFileLesson?.title) {
      setValue('title', officeFileLesson.title);
    }
  }, [officeFileLesson, setValue]);

  return (
    <MainContentVStack>
      <Flex direction="column" gap={spacing[6]} padding={spacing[8]}>
        <Button kind="text" size="sm" onClick={() => router.push(callbackPath)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>
      </Flex>
      <Flex direction="column" gap={spacing[4]} style={{ width: '100%' }}>
        <Text size="h3" variant="dark" fontWeight="semiBold">
          Details
        </Text>
        <form onSubmit={handleSubmit(handleSaveFile)}>
          <Flex
            style={{
              background: 'white',
              borderRadius: '4px',
              padding: spacing[4]
            }}
            direction="column"
            gap={spacing[4]}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'A title is required.'
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Flex
                  gap={spacing[2]}
                  direction="column"
                  style={{ maxWidth: '40% ' }}
                >
                  <TextInput
                    {...field}
                    label="Title"
                    errorMessage={error?.message}
                    required
                  />
                </Flex>
              )}
            />
            <Flex direction="column">
              <Text>File</Text>
              <Flex
                style={{
                  background: `${colors.galaxy[0]}`,
                  height: '500px'
                }}
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                {officeFileLesson?.fileUrl && !uploadOfficeFileLoading && (
                  <DocViewer
                    title={officeFileLesson?.title}
                    uri={officeFileLesson?.fileUrl}
                  />
                )}
                <FileInput
                  name="file"
                  accept=".docx,.doc,.pptx,.ppt,.xlsx,.xls"
                  ref={inputRef}
                  onChange={handleFileOnChange}
                  style={{ display: 'none' }}
                />
                <Button
                  kind="text"
                  onClick={handleSelectFile}
                  loading={uploadOfficeFileLoading}
                  rightIcon={isFileUploaded ? <Edit /> : <Upload />}
                  style={{
                    margin: officeFileLesson?.fileName ? spacing[4] : undefined
                  }}
                  disabled={isPublished}
                >
                  {isFileUploaded
                    ? (file?.name ?? officeFileLesson?.fileName)
                    : 'Upload Office File'}
                </Button>
              </Flex>
              {file && (
                <Text size="label">
                  Save your changes in order to preview your file
                </Text>
              )}
            </Flex>
            <div
              className={hstack({
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              <CerberusButton
                palette="action"
                shape="rounded"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </CerberusButton>
            </div>
          </Flex>
        </form>
      </Flex>
    </MainContentVStack>
  );
};

export default EditOfficeFilePage;
