'use client';
import React, { useState } from 'react';
import {
  Text,
  Flex,
  Button,
  spacing,
  typography,
  useToast,
  Breadcrumbs
} from '@digital-u/digital-ui';
import { StyledFlex } from './sysSettingsBanner.styles';
import { useForm } from 'react-hook-form';
import { useUpdateBanner, useDeleteBanner, useContent } from '@/api/content';
import BannerCard from '../../../../components/settings-banner/banner-card/BannerCard';
import { BaseSkeleton } from '@/components_new/loaders';
import BannerForm from '../../../../components/settings-banner/BannerForm';
import { BannerPreview } from './components/BannerPreview';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { ConfirmModal } from '@cerberus/react';

const breadcrumbs = [
  {
    text: 'Manage Settings',
    href: `/admin/${getRouteUrl(routeGenerators.SysSettings())}`
  },
  { text: 'Banner', href: '#' }
];

const BannerEditor = () => {
  const {
    watch,
    control,
    setValue,
    formState: { isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
      buttonText: '',
      buttonLink: '',
      logo: ''
    }
  });
  const allFields = watch();
  const { content, contentError, contentLoading, refetchContent } =
    useContent('banner');
  const { updateBanner, updateBannerLoading } = useUpdateBanner();
  const { deleteBanner, deleteBannerLoading } = useDeleteBanner();
  const [, setToast] = useToast();
  const [edit, setEdit] = useState(false);
  const contentIsEmpty = Object.keys(content).length === 0;

  const handleResetForm = async () => {
    try {
      await refetchContent();
    } catch {
      setToast({
        kind: 'error',
        title: 'Failed to fetch Banner content',
        subtitle: `${contentError}`
      });
      return;
    }
    setEdit(false);
  };

  const handlePublish = async () => {
    let safeURL = allFields.buttonLink;
    const isSecure = allFields.buttonLink.slice(0, 8).match(/^https:\/\//i);
    if (!isSecure) {
      safeURL = `https://${allFields.buttonLink.replace(/^http:\/\//i, '')}`;
      setValue('buttonLink', safeURL);
    }
    try {
      await updateBanner(
        allFields.title,
        allFields.body,
        allFields.buttonText,
        safeURL,
        allFields.logo
      );
    } catch {
      setToast({
        kind: 'error',
        title: 'Failed to update Banner',
        subtitle: `Please ensure all fields are filled out properly`
      });
      return;
    }
    try {
      await refetchContent();
      setToast({
        kind: 'success',
        title: 'Success',
        subtitle: `Your banner is now visible to all DU learners.`
      });
    } catch {
      setToast({
        kind: 'error',
        title: 'Failed to refetch Banner content',
        subtitle: `${contentError}`
      });
      return;
    }
    setEdit(false);
  };

  const handleRemoveBanner = async () => {
    try {
      await deleteBanner();
      setToast({
        kind: 'success',
        title: 'Success',
        subtitle: `Your banner has been successfully removed.`
      });
    } catch {
      setToast({
        kind: 'error',
        title: 'Failed to remove Banner',
        subtitle:
          'Ensure that a banner is currently published or contact support for assistance'
      });
      return;
    }
    handleResetForm();
  };

  const handleEdit = async () => {
    setValue('title', content.title);
    setValue('body', content.body);
    setValue('buttonText', content.buttonText);
    setValue('buttonLink', content.buttonLink);
    setValue('logo', content.logo);
    setEdit(true);
  };

  return (
    <MainContentVStack>
      <Breadcrumbs paths={breadcrumbs} />
      <PageHeader>Banner</PageHeader>
      {contentLoading ? (
        <BaseSkeleton height={500} />
      ) : (
        <StyledFlex>
          {contentIsEmpty || edit ? (
            <>
              <Flex direction="column" gap={spacing[4]}>
                <Text style={{ fontFamily: typography.fontFamily.ibm }}>
                  The marketing banner below will appear on all learners&apos;
                  Command Centers, and is best used for important advertisements
                  of which the whole community needs to be aware.
                </Text>
                <BannerCard
                  title={allFields.title}
                  description={allFields.body}
                  href={allFields.buttonLink}
                  image={allFields.logo}
                  buttonText={allFields.buttonText}
                  loading={false}
                />
              </Flex>
              <BannerForm
                control={control}
                allFields={allFields}
                setValue={setValue}
              />
              <Flex gap={spacing[4]}>
                <ConfirmModal>
                  <ConfirmActionModal
                    heading="Publish Banner"
                    description="Are you sure you want to publish this banner to all Digital University users?"
                    actionText="Publish"
                    cancelText="Cancel"
                    handleSubmit={handlePublish}
                    buttonContent="Publish"
                    disabled={!isValid || isSubmitting || updateBannerLoading}
                  />
                </ConfirmModal>
                {!contentIsEmpty && (
                  <Button
                    kind="pill-secondary"
                    onClick={() => handleResetForm()}
                  >
                    Cancel
                  </Button>
                )}
              </Flex>
            </>
          ) : (
            <BannerPreview
              content={content}
              contentLoading={contentLoading}
              handleRemoveBanner={handleRemoveBanner}
              deleteBannerLoading={deleteBannerLoading}
              handleEdit={handleEdit}
            />
          )}
        </StyledFlex>
      )}
    </MainContentVStack>
  );
};

export default BannerEditor;
