import { useEffect } from 'react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

export const useTrainingPlanPage = ({
  forceMultiplierById,
  forceMultiplierByIdError,
  forceMultiplierByIdLoading,
  missionPartnerMinDetails,
  missionPartnerMinDetailsLoading,
  fmMissionPartner,
  isAcceptedType,
  missionPartnerId,
  router,
  type,
  reset,
  setShowErrorModal,
  callbackPath
}) => {
  useEffect(() => {
    if (type === 'fm' && forceMultiplierById && !forceMultiplierByIdLoading) {
      const { title, content, conditions, missionPartnerId, unsequenced } =
        forceMultiplierById;

      reset({
        title,
        summary: content.summary,
        visibility:
          conditions?.all?.length > 0 ? conditions.all[0].value : 'Everyone',
        // react-hook-form ties the switch display and validation to the unsequenced field
        // but it needs to display as sequenced in the UI
        unsequenced: !unsequenced,
        missionPartnerId,
        description: content?.description?.join('\n') ?? '',
        aboutTitle:
          content?.about?.title ?? `About ${forceMultiplierById?.title}`,
        aboutDescription:
          content?.about?.description?.join('\n') ??
          `This plan is provided by ${fmMissionPartner?.name}.`
      });
    }
  }, [
    forceMultiplierById,
    setShowErrorModal,
    forceMultiplierByIdLoading,
    fmMissionPartner,
    reset,
    type
  ]);

  const routeToCallbackPath = () => {
    router.push(
      callbackPath ??
        getRouteUrl(routeGenerators.CustomTraining({ missionPartnerId }))
    );
  };

  // If FM doesn't exist
  useEffect(() => {
    if (type === 'fm' && !forceMultiplierById && !forceMultiplierByIdLoading) {
      routeToCallbackPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    forceMultiplierById,
    forceMultiplierByIdLoading,
    missionPartnerId,
    type,
    router,
    callbackPath
  ]);

  // If not accepted type
  useEffect(() => {
    if (!isAcceptedType) {
      routeToCallbackPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAcceptedType, missionPartnerId, router, callbackPath]);

  useEffect(() => {
    if (forceMultiplierByIdError) {
      setShowErrorModal(true);
    }
  }, [forceMultiplierByIdError, setShowErrorModal]);

  useEffect(() => {
    if (!missionPartnerMinDetails && !missionPartnerMinDetailsLoading) {
      router.push(getRouteUrl('MissionPartners'));
    }
  }, [missionPartnerMinDetails, missionPartnerMinDetailsLoading, router]);
};
