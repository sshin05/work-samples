import { Button, Flex, Text, spacing, typography } from '@digital-u/digital-ui';
import BannerCard from '@/components/settings-banner/banner-card/BannerCard';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { ConfirmModal } from '@cerberus/react';

export const BannerPreview = ({
  content,
  contentLoading,
  handleRemoveBanner,
  deleteBannerLoading,
  handleEdit
}) => {
  const contentIsEmpty = Object.keys(content).length === 0;
  return (
    <>
      {!contentIsEmpty && (
        <Text
          style={{
            fontSize: typography.sizes[3.5],
            fontFamily: typography.fontFamily.ibm
          }}
        >
          The following banner is live on the Command Center for all learners.
        </Text>
      )}
      <BannerCard
        title={content.title}
        description={content.body}
        href={content.buttonLink}
        image={content.logo}
        buttonText={content.buttonText}
        loading={contentLoading}
      />
      <Flex gap={spacing[4]}>
        <ConfirmModal>
          <ConfirmActionModal
            heading="Remove Banner"
            description="This banner will no longer be visible to Digital University Learners."
            actionText="Remove"
            cancelText="Cancel"
            handleSubmit={handleRemoveBanner}
            buttonContent="Remove"
            disabled={contentIsEmpty || deleteBannerLoading}
          />
        </ConfirmModal>
        <Button
          kind="pill-secondary"
          disabled={contentLoading}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Flex>
    </>
  );
};
