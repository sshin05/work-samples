'use client';
import {
  Button,
  colors,
  Flex,
  RichTextEditor,
  Text,
  useToast,
  spacing,
  DuiTextInput
} from '@digital-u/digital-ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { useFindLabById, useUpdateLab } from '@/api/lab';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';

const StyledErrorText = styled(Text)`
  color: ${colors.red[800]};
`;

const EditDescriptionBlockPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const encodedCallbackPath = searchParams.get('callbackPath');
  const callbackPath = decodeURIComponent(encodedCallbackPath);

  const { id: labId, 'description-id': descriptionId } = useRouteParams();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    register,
    setValue,
    clearErrors,
    setError
  } = useForm();

  const [, setToast] = useToast();

  const { findLabById, findLabByIdLoading, findLabByIdError, fetchLabById } =
    useFindLabById(labId);
  const { updateLab } = useUpdateLab();

  const descriptionBlock = findLabById?.content?.find(
    block => block.id === descriptionId
  );

  const handleUpdateQuill = content => {
    setValue('description', content, { shouldDirty: true }); // So we can just pull it through the `data` var in the save method
    clearErrors('description');
  };

  const handleSave = async data => {
    const { title, description } = data;

    let errors = false;

    if (!title) {
      setError('title', {
        type: 'required',
        message: 'Title is required'
      });
      errors = true;
    }

    if (!description || description === '<p><br></p>') {
      setError('description', {
        type: 'required',
        message: 'Description is required'
      });
      errors = true;
    }

    if (errors) return;

    const newDescriptionId = crypto.randomUUID();

    const newLabContent =
      findLabById?.content?.map(block => {
        if (block.id === descriptionId) {
          return {
            ...block,
            title,
            description
          };
        }

        return block;
      }) ?? [];

    if (descriptionId === 'new') {
      // Our description block does not exist, we need to add it to the findLabyById
      newLabContent.push({
        id: newDescriptionId,
        title,
        description
      });
    }

    const {
      missionPartner: _missionPartner,
      __typename,
      ...findLabByIdWithoutMissionPartner
    } = findLabById;

    // launchConfig for POC
    return updateLab({
      ...findLabByIdWithoutMissionPartner,
      description: findLabById.description || '',
      launchConfig: {
        type: findLabById.launchConfig.type ?? 'jupyter',
        path: findLabById.launchConfig.path ?? 'path to jupyter'
      },
      content: newLabContent
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
          descriptionId === 'new' &&
          router.push(
            `/mp/missionPartnerId}/training/lab/${labId}/edit-description/${newDescriptionId}?callbackPath=${callbackPath}`
          )
      );
  };

  useEffect(() => {
    if (findLabById) {
      reset({
        title: descriptionBlock?.title ?? '',
        description: descriptionBlock?.description ?? ''
      });
    }
  }, [findLabById, descriptionBlock, reset]);

  if (findLabByIdLoading || findLabByIdError) return null;

  return (
    <MainContentVStack>
      {/* Title */}
      <Flex direction="column" gap={spacing[4]}>
        <Button kind="text" size="sm" onClick={() => router.push(callbackPath)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>

        <Text size="h2" variant="dark" fontWeight="bold">
          Edit Description Block
        </Text>
      </Flex>

      {/* Details */}
      <Flex direction="column" gap={spacing[4]}>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text size="h3" variant="dark" fontWeight="semiBold">
            Details
          </Text>
          <Text size="label">*Required</Text>
        </Flex>
        <Flex
          style={{
            background: 'white',
            borderRadius: '4px',
            padding: spacing[4]
          }}
          direction="column"
          gap={spacing[4]}
        >
          <form onSubmit={handleSubmit(handleSave)}>
            <Flex direction="column" gap="1.5rem">
              <div>
                <DuiTextInput
                  id="title"
                  name="title"
                  labelText="Title*"
                  placeholder="Title"
                  register={register}
                  defaultValue=""
                />
                {errors?.title && (
                  <StyledErrorText>
                    {errors?.title?.message?.toString()}
                  </StyledErrorText>
                )}
              </div>
              <div>
                <Text size="label" style={{ marginBottom: spacing[2] }}>
                  Content*
                </Text>
                <RichTextEditor
                  value={descriptionBlock?.description ?? ''}
                  onChange={handleUpdateQuill}
                  quillProps={{
                    style: {
                      margin: 0,
                      minHeight: '50vh',
                      height: '2rem'
                    }
                  }}
                  style={{
                    background: colors.gray[0]
                  }}
                />
                {errors?.description && (
                  <StyledErrorText>
                    {errors?.description?.message.toString()}
                  </StyledErrorText>
                )}
              </div>
            </Flex>
            <br />
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              kind="pill-secondary"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Flex>
      </Flex>
    </MainContentVStack>
  );
};

export default EditDescriptionBlockPage;
