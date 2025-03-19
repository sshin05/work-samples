import { useCallback, useEffect, useMemo, useState } from 'react';
import { InlineNotification } from '@digital-u/digital-ui';
import { TextInput } from '@/components_new/form';
import { Controller, useForm } from 'react-hook-form';
import { autoFillType } from '@/components/pages/manage-mission-partner/custom-training-plan/manage-mission-partner-custom-plan-page-utils';
import { LibraryItemDropArea } from './components/LibraryItemDropArea';
import { LibraryItemFormFields } from './components/LibraryItemFormFields';
import { LibraryItemFormButtons } from './components/LibraryItemFormButtons';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUploadLibraryItem
} from '@/api/force-multipliers';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import {
  Tabs,
  TabPanel,
  Tab,
  useNotificationCenter,
  TabsList
} from '@cerberus/react';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

interface Props {
  forceMultiplierId: string;
  forceMultiplierVersion: string;
  missionPartnerId: string;
  setLibraryItems: (items: unknown) => void;
  disabled: boolean;
  loading: boolean;
  close: () => void;
}

export const AddLibraryItemModalContent = ({
  forceMultiplierId,
  forceMultiplierVersion,
  missionPartnerId,
  setLibraryItems,
  disabled,
  loading,
  close
}: Props) => {
  const [activeUploadTab, setActiveUploadTab] = useState(0);
  const [hasFile, setHasFile] = useState(false);
  const [hasFileRejections, setHasFileRejections] = useState(false);
  const [error, setError] = useState(null);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: { url: '', displayName: '', type: '', file: null }
  });
  const { notify } = useNotificationCenter();
  const {
    uploadLibraryItem,
    uploadLibraryItemLoading,
    uploadLibraryItemData,
    uploadLibraryItemError
  } = useUploadLibraryItem();
  const { fetchForceMultiplierById } = useFindLatestForceMultiplierByIdAdmin();
  const [typeWatcher, displayNameWatcher, urlWatcher] = watch([
    'type',
    'displayName',
    'url'
  ]);

  const addFileDisabled = useMemo(() => {
    return (
      !hasFile ||
      [typeWatcher, displayNameWatcher].some(item => !item || item === '') ||
      disabled ||
      hasFileRejections
    );
  }, [hasFile, typeWatcher, displayNameWatcher, hasFileRejections, disabled]);

  const addLinkDisabled = useMemo(() => {
    return (
      !urlWatcher ||
      [typeWatcher, displayNameWatcher].some(item => !item || item === '') ||
      disabled
    );
  }, [urlWatcher, typeWatcher, displayNameWatcher, disabled]);

  const handleLinkTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (autoFillType(e.target.value)) {
        setValue('type', 'Video');
      }
    },
    [setValue]
  );

  const handleUploadLibraryItem = async newItem => {
    const { file, type, displayName, url } = newItem;
    try {
      const uploadResult = await uploadLibraryItem({
        forceMultiplierId: forceMultiplierId,
        version: forceMultiplierVersion,
        file,
        type,
        name: displayName,
        linkUrl: url || undefined,
        missionPartnerId
      });

      if (uploadResult) {
        await fetchForceMultiplierById(forceMultiplierId);
        onClose();
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Item successfully added to the plan.'
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (
      !uploadLibraryItemLoading &&
      !uploadLibraryItemError &&
      uploadLibraryItemData?.libraryItems
    ) {
      setLibraryItems(uploadLibraryItemData.libraryItems);
    }
  }, [
    uploadLibraryItemData,
    uploadLibraryItemLoading,
    uploadLibraryItemError,
    setLibraryItems
  ]);

  const onClose = () => {
    reset();
    close();
  };

  return (
    <>
      <StandardModalHeader title="Add library item" onClose={onClose} />
      <form
        className={vstack({
          gap: '8',
          w: 'full',
          mt: '4',
          alignItems: 'flex-start'
        })}
        onSubmit={handleSubmit(handleUploadLibraryItem)}
      >
        <Tabs defaultValue="uploadFile">
          <TabsList>
            <Tab value="uploadFile" onClick={() => setActiveUploadTab(0)}>
              Upload a file
            </Tab>
            <Tab value="addLink" onClick={() => setActiveUploadTab(1)}>
              Add a link
            </Tab>
          </TabsList>
          {(error || hasFileRejections) && (
            <div className={css({ w: 'full', minW: 'full' })}>
              <InlineNotification
                kind="error"
                heading="Error"
                subheading={
                  error?.message ? error.message : 'Add an accepted file type'
                }
                variant="dark"
                onClose={() => {
                  setError(null);
                  setHasFileRejections(false);
                  setHasFile(false);
                }}
              />
            </div>
          )}
          <TabPanel value="uploadFile">
            <LibraryItemDropArea
              control={control}
              setHasFile={setHasFile}
              setHasFileRejections={setHasFileRejections}
              hasFileRejections={hasFileRejections}
              setValue={setValue}
              isSubmitting={isSubmitting}
              loading={loading || uploadLibraryItemLoading}
              activeUploadTab={activeUploadTab}
            />
          </TabPanel>
          <TabPanel value="addLink">
            <Controller
              name="url"
              control={control}
              rules={{
                validate: value =>
                  activeUploadTab === 1
                    ? !!value || 'The url is required'
                    : true
              }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  className={css({ w: '31rem' })}
                  label="URL"
                  errorMessage={error?.message}
                  disabled={disabled || loading}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    handleLinkTypeChange(event);
                  }}
                  required={activeUploadTab === 1}
                />
              )}
            />
            <p className={css({ textStyle: 'label-sm' })}>
              Example: www.sampleurl.com
            </p>
          </TabPanel>
        </Tabs>
        <div className={vstack({ gap: '8' })}>
          <LibraryItemFormFields
            control={control}
            disabled={disabled || isSubmitting}
            loading={loading}
            activeUploadTab={activeUploadTab}
          />
          <LibraryItemFormButtons
            activeUploadTab={activeUploadTab}
            addFileButtonDisabled={addFileDisabled}
            addLinkButtonDisabled={addLinkDisabled}
            isSubmitting={isSubmitting}
            loading={loading}
            close={onClose}
            setActiveUploadTab={setActiveUploadTab}
            setValue={setValue}
          />
        </div>
      </form>
    </>
  );
};
