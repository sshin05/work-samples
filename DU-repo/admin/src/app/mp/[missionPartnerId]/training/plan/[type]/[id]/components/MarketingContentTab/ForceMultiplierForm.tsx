import { useCallback, useEffect, useState } from 'react';
import { useNotificationCenter } from '@cerberus/react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { ForceMultiplierImage } from './components/ForceMultiplierImage';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUpdateForceMultiplier,
  useUpdateForceMultiplierContent,
  useUploadForceMultiplierImage
} from '@/api/force-multipliers';
import {
  handleSelectImage,
  handleUploadImage,
  handleUpdatePlanDetails
} from '@/components/pages/manage-mission-partner/custom-training-plan/manage-mission-partner-custom-plan-page-utils';
import { AboutSection } from './AboutSection';

export const ForceMultiplierForm = ({
  marketingControl,
  handleMarketingSubmit,
  forceMultiplierById,
  missionPartnerName,
  disabled,
  isSubmitting,
  isMarketingSubmitting,
  errors
}) => {
  const { notify } = useNotificationCenter();

  const { uploadForceMultiplierImage, uploadForceMultiplierImageLoading } =
    useUploadForceMultiplierImage();
  const { fetchForceMultiplierById } = useFindLatestForceMultiplierByIdAdmin();
  const { updateForceMultiplier } = useUpdateForceMultiplier();
  const { updateForceMultiplierContent } = useUpdateForceMultiplierContent();

  const [fmImage, setFmImage] = useState(
    forceMultiplierById?.content?.about?.image
  );

  useEffect(() => {
    setFmImage(forceMultiplierById?.content?.about?.image);
  }, [forceMultiplierById]);

  const fmImageUrlFormatted = `${fmImage}`;

  const handleSelectImageClick = useCallback(
    image =>
      handleSelectImage(
        image,
        image =>
          handleUploadImage(
            image,
            uploadForceMultiplierImage,
            forceMultiplierById.id
          ),
        setFmImage,
        forceMultiplierById,
        notify,
        fetchForceMultiplierById
      ),
    [
      setFmImage,
      forceMultiplierById,
      notify,
      fetchForceMultiplierById,
      uploadForceMultiplierImage
    ]
  );

  const handleUpdateMarketingContent = useCallback(
    async data => {
      return handleUpdatePlanDetails(
        data,
        forceMultiplierById,
        updateForceMultiplier,
        updateForceMultiplierContent,
        fetchForceMultiplierById,
        notify
      );
    },
    [
      notify,
      updateForceMultiplier,
      fetchForceMultiplierById,
      updateForceMultiplierContent,
      forceMultiplierById
    ]
  );

  return (
    <form onSubmit={handleMarketingSubmit(handleUpdateMarketingContent)}>
      <div
        className={hstack({
          gap: 4,
          alignItems: 'flex-start',
          w: 'full'
        })}
      >
        <AboutSection
          forceMultiplierTitle={forceMultiplierById?.title}
          missionPartnerName={missionPartnerName}
          marketingControl={marketingControl}
          disabled={disabled}
          isMarketingSubmitting={isMarketingSubmitting}
          isSubmitting={isSubmitting}
        />

        <div
          className={vstack({
            gap: 2,
            alignItems: 'flex-start',
            w: '50%',
            borderRadius: '2rem'
          })}
        >
          <p className={css({ textStyle: 'label-sm' })}>About Section Image</p>

          <ForceMultiplierImage
            loading={uploadForceMultiplierImageLoading}
            fmImageUrlFormatted={fmImageUrlFormatted}
            fmImage={fmImage ?? forceMultiplierById?.content?.about?.image}
            handleSelectImage={handleSelectImageClick}
            disabled={disabled}
          />

          {errors.image && (
            <p
              className={css({
                textStyle: 'body-md',
                color: 'danger.text.initial'
              })}
            >
              {errors.image?.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
