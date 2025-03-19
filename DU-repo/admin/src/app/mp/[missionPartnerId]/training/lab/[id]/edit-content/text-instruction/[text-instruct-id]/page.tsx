'use client';
import {
  Button,
  colors,
  Flex,
  RichTextEditor,
  Text,
  BevelCard,
  TextInput,
  useToast
} from '@digital-u/digital-ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  useUpdateLab,
  useFindLabById,
  useUploadTextInstructionImage
} from '@/api/lab';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';

const TextInstructionPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const encodedCallbackPath = searchParams.get('callbackPath');
  const callbackPath = decodeURIComponent(encodedCallbackPath);

  const { id: labId, 'text-instruct-id': instructionId } = useRouteParams();

  const [, setToast] = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { findLabById, findLabByIdError, findLabByIdLoading, fetchLabById } =
    useFindLabById(labId);
  const { updateLab, updateLabLoading } = useUpdateLab();
  const { uploadTextInstructionImage } = useUploadTextInstructionImage();

  const onChangeTitle = event => setTitle(event.target.value);

  const onChangeContent = newContent => setContent(newContent);

  const handleSave = async () => {
    const instructions =
      findLabById?.instructions.map(item => {
        if (item.id === instructionId) {
          return {
            ...item,
            title,
            content
          };
        }

        return item;
      }) ?? [];

    const newDescriptionId = crypto.randomUUID();

    if (instructionId === 'new') {
      instructions.push({
        id: newDescriptionId,
        title,
        content,
        type: 'Text Lesson'
      });
    }

    const {
      missionPartner: _missionPartner,
      __typename,
      ...labWithoutMissionPartner
    } = findLabById;

    return updateLab({
      ...labWithoutMissionPartner,
      description: findLabById.description || '',
      launchConfig: {
        type: findLabById.launchConfig.type ?? 'jupyter',
        path: findLabById.launchConfig.path ?? 'path to jupyter'
      },
      instructions
    })
      .then(() => fetchLabById(findLabById?.id))
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
            `/mp/${findLabById.missionPartnerId}/training/lab/${labId}/edit-content/text-instruction/${newDescriptionId}?callbackPath=${callbackPath}`
          )
      );
  };

  const handleUploadImage = async (labId, file) => {
    const response = await uploadTextInstructionImage(labId, file);
    return `/assets/lab-content/${labId}/${response.data?.uploadTextInstructionImage.url}`;
  };

  const uploadImage = useCallback(() => {
    return file => handleUploadImage(labId, file);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleUploadImage is o.k. to leave out in this case.
  }, [labId]);

  const textInstruction = findLabById?.instructions?.find(
    item => item.id === instructionId
  );

  useEffect(() => {
    if (textInstruction?.title) {
      setTitle(textInstruction.title);
    }

    if (textInstruction?.content) {
      setContent(textInstruction.content);
    }
  }, [textInstruction]);

  if (findLabByIdError || findLabByIdLoading) return null;

  return (
    <MainContentVStack>
      <Flex
        style={{
          flexDirection: 'column',
          padding: '2rem',
          gap: '1.5rem'
        }}
      >
        <Button
          type="button"
          kind="text"
          size="sm"
          onClick={() => router.push(callbackPath)}
        >
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>
        <Text size="h2" fontWeight="bold">
          Edit Text Instruction
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
                onChange={onChangeTitle}
                value={title}
                label=""
                hideLabel
                style={{ width: '50%' }}
              />
            </div>
            <div>
              <Text>Instruction Content</Text>
              <RichTextEditor
                key="1"
                uploadImage={uploadImage}
                onChange={onChangeContent}
                value={textInstruction?.content ?? ''}
                quillProps={{
                  style: { margin: 0, minHeight: '50vh', height: '2rem' }
                }}
                style={{
                  background: colors.gray[0]
                }}
              />
            </div>
          </Flex>
          <br />
          <Button
            disabled={
              content === '' ||
              title === '' ||
              content === '<p><br></p>' ||
              content === '<p></p>'
            }
            kind="pill-secondary"
            onClick={handleSave}
            loading={updateLabLoading}
          >
            Save
          </Button>
        </BevelCard>
      </Flex>
    </MainContentVStack>
  );
};

export default TextInstructionPage;
