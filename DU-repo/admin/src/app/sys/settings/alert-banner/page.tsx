'use client';
import { useState } from 'react';
import { Breadcrumbs, useToast } from '@digital-u/digital-ui';
import { useForm } from 'react-hook-form';
import {
  useContent,
  useUpdateAlertBanner,
  useRemoveAlertBanner
} from '@/api/content';
import AlertEditor from './components/AlertEditor/AlertEditor';
import { BaseSkeleton } from '@/components_new/loaders';
import AlertPreview from './components/AlertPreview/AlertPreview';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';

const EMPTY_LINK_INNER = '<p></p>\n';

const breadcrumbs = [
  {
    text: 'Manage Settings',
    href: `/admin/${getRouteUrl(routeGenerators.SysSettings())}`
  },
  { text: 'Alert', href: '#' }
];

const AlertBanner = () => {
  const {
    watch,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, isValid }
  } = useForm({
    defaultValues: {
      title: '',
      canClose: true,
      content: EMPTY_LINK_INNER
    }
  });
  const [, setToast] = useToast();
  const [edit, setEdit] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    content: alertBannerContent,
    contentLoading,
    refetchContent
  } = useContent('alert-banner');

  const { updateAlertBanner } = useUpdateAlertBanner();

  const { removeAlertBanner } = useRemoveAlertBanner();

  const allFields = watch();

  const handlePublishAlert = async () => {
    setLoading(true);
    const { title, content, canClose } = allFields;

    try {
      await updateAlertBanner(title, content, canClose);
    } catch {
      setToast({
        title: 'Error',
        subtitle: 'There was an error updating the Global Banner',
        variant: 'light',
        kind: 'error'
      });

      return setLoading(false);
    }
    setToast({
      title: 'Success',
      subtitle: 'Your alert is now visible to all DU learners.',
      variant: 'light',
      kind: 'success'
    });
    reset();
    await handleEditChange(false);
  };

  const handleRemoveAlert = async () => {
    setLoading(true);
    try {
      await removeAlertBanner();
    } catch {
      setToast({
        title: 'Error',
        subtitle: 'There was an error refetching the Alert Banner',
        variant: 'light',
        kind: 'error'
      });

      return setLoading(false);
    }
    setToast({
      title: 'Success',
      subtitle: 'The Alert Banner is no longer visible to DU learners',
      variant: 'light',
      kind: 'success'
    });
    reset();
    await handleEditChange(false, true);
  };

  const handleEditChange = async (value, removing = false) => {
    setLoading(true);
    try {
      await refetchContent();
      if (!removing) {
        setValue('title', alertBannerContent?.title ?? '');
        setValue('content', alertBannerContent?.content ?? EMPTY_LINK_INNER);
        setValue('canClose', alertBannerContent?.isDismissable ?? false);
      }
    } catch {
      setToast({
        title: 'Error',
        subtitle: 'There was an error refetching the Global Banner',
        variant: 'light',
        kind: 'error'
      });
    }

    setEdit(value);
    setButtonIsLoading(false);
    setLoading(false);
  };

  return (
    <MainContentVStack>
      <Breadcrumbs paths={breadcrumbs} />
      <PageHeader>Alert</PageHeader>
      {contentLoading ? (
        <BaseSkeleton height={513} />
      ) : alertBannerContent?.content && !edit ? (
        <AlertPreview
          alertBannerContent={alertBannerContent}
          handleEditChange={handleEditChange}
          handleRemoveAlert={handleRemoveAlert}
          setButtonIsLoading={setButtonIsLoading}
          buttonIsLoading={buttonIsLoading}
          loading={loading}
        />
      ) : (
        <AlertEditor
          allFields={allFields}
          control={control}
          edit={edit}
          handleEditChange={handleEditChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isValid={isValid}
          loading={loading}
          handlePublishAlert={handlePublishAlert}
          buttonIsLoading={buttonIsLoading}
          setButtonIsLoading={setButtonIsLoading}
        />
      )}
    </MainContentVStack>
  );
};

export default AlertBanner;
