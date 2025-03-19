'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { InlineNotification } from '@digital-u/digital-ui';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import {
  Button,
  Tabs,
  TabPanel,
  Tab,
  useNotificationCenter,
  TabsList
} from '@cerberus/react';
import { ArrowLeft } from '@carbon/icons-react';
import { useForm } from 'react-hook-form';
import {
  useFindAllMissionPartnersMinDetails,
  useFindMissionPartnerMinDetails
} from '@/api/mission-partner';
import {
  useCreateNewForceMultiplierVersion,
  useFindLatestForceMultiplierByIdAdmin,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { useTrainingPlanPage } from '../../../../../../../components/manage-mission-partners/custom-training/useTrainingPlanPage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import {
  handleCreateNewVersionForceMultiplier,
  handlePublishForceMultiplier,
  updateForceMultiplierHandler
} from '../../../../../../../components/pages/manage-mission-partner/custom-training-plan/manage-mission-partner-custom-plan-page-utils';
import validateForceMultiplier from '@/utils/validate-force-multiplier';
import { PlanDetailsForm } from './components/PlanDetailsForm/PlanDetailsForm';
import { LibraryItemsTab } from './components/LibraryItemsTab';
import { ForceMultiplierHeader } from './components/PlanDetailsForm/ForceMultiplierHeader';
import type { Url } from 'next/dist/shared/lib/router/router';
import { ForceMultiplierForm } from './components/MarketingContentTab/ForceMultiplierForm';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { BaseSkeleton } from '@/components_new/loaders';
import { useRouteParams } from '@/hooks/useRouteParams';
import { CurriculumTab } from './components/CurriculumTab/CurriculumTab';
import { tabsFullWidth } from '@/components_new/table/styles/tableWidthStyles';

const ACCEPTED_TYPES = new Set(['fm', 'lp', 'skill']);
const SUPPORTED_MODULE_MISSION_PARTNER_NAMES = new Set([
  'Advana',
  'DU Labs',
  'Camp Cosmic',
  'Digital University'
]);

const MissionPartnerPlanDetails = () => {
  const { missionPartnerId, id, type, callbackPath } = useRouteParams();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [editTitleLoading, setEditTitleLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState(false);

  const { notify } = useNotificationCenter();

  const { isDuAdmin } = useIsDuAdmin();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors }
  } = useForm();

  // Queries
  const { missionPartnersMinDetails } = useFindAllMissionPartnersMinDetails();
  const {
    fetchForceMultiplierById,
    forceMultiplierById,
    forceMultiplierByIdLoading,
    forceMultiplierByIdError
  } = useFindLatestForceMultiplierByIdAdmin(type === 'fm' ? id : null);
  const { updateForceMultiplier, updateForceMultiplierLoading } =
    useUpdateForceMultiplier();
  const { missionPartnerMinDetails, missionPartnerMinDetailsLoading } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  // Mutations
  const {
    createNewForceMultiplierVersion,
    createNewForceMultiplierVersionLoading
  } = useCreateNewForceMultiplierVersion();

  const disabled = removingItems || isSubmitting || editTitleLoading;

  // Derived
  const isAcceptedType = ACCEPTED_TYPES.has(type);

  // Advana is the only vendor who we support
  // using modularized FMs for the time being.
  const fmMissionPartner = missionPartnersMinDetails.find(
    mp => mp.id === forceMultiplierById?.missionPartnerId
  );

  const isModularizedForceMultiplier =
    forceMultiplierById?.modules?.length > 0 &&
    SUPPORTED_MODULE_MISSION_PARTNER_NAMES.has(missionPartnerMinDetails?.name);

  const supportsModules = SUPPORTED_MODULE_MISSION_PARTNER_NAMES.has(
    missionPartnerMinDetails?.name
  );

  const isFmPublished = forceMultiplierById?.status === 'Published';

  //Methods;

  useTrainingPlanPage({
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
  });

  const loading = useMemo(() => {
    return (
      forceMultiplierByIdLoading ||
      createNewForceMultiplierVersionLoading ||
      updateForceMultiplierLoading
    );
  }, [
    forceMultiplierByIdLoading,
    createNewForceMultiplierVersionLoading,
    updateForceMultiplierLoading
  ]);

  const customTrainingUrl =
    (callbackPath as Url) ??
    getRouteUrl(routeGenerators.CustomTraining({ missionPartnerId }));

  const handlePublishClick = useCallback(() => {
    handlePublishForceMultiplier(
      validateForceMultiplier,
      forceMultiplierById,
      notify,
      publishData =>
        updateForceMultiplierHandler(
          publishData,
          updateForceMultiplier,
          fetchForceMultiplierById,
          forceMultiplierById.id,
          notify
        )
    );
  }, [
    notify,
    updateForceMultiplier,
    fetchForceMultiplierById,
    forceMultiplierById
  ]);

  const handleClickNewVersion = useCallback(() => {
    handleCreateNewVersionForceMultiplier(
      createNewForceMultiplierVersion,
      forceMultiplierById.id,
      fetchForceMultiplierById,
      notify
    );
  }, [
    forceMultiplierById?.id,
    createNewForceMultiplierVersion,
    fetchForceMultiplierById,
    notify
  ]);

  const handleBackClick = useCallback(() => {
    setShowErrorModal(false);
    router.push(customTrainingUrl.toString());
  }, [customTrainingUrl, router]);

  useEffect(() => {
    if (forceMultiplierByIdError) {
      setShowErrorModal(true);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error retrieving the training plan.'
      });
    }
  }, [forceMultiplierByIdError, notify]);

  return (
    <MainContentVStack>
      {showErrorModal && (
        <div
          className={vstack({
            gap: 2,
            alignItems: 'center'
          })}
        >
          <InlineNotification
            kind="error"
            heading="Error"
            subheading="There was an error retrieving the training plan."
            lowContrast
            onClose={handleBackClick}
          />
        </div>
      )}
      {!showErrorModal && (
        <>
          {/* Title */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <Button
              palette="secondaryAction"
              usage="ghost"
              onClick={() =>
                router.push(
                  getRouteUrl(
                    routeGenerators.CustomTrainingWithParameters({
                      missionPartnerId,
                      tab: '1'
                    })
                  )
                )
              }
            >
              <ArrowLeft />
              <span
                className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}
              >
                Back
              </span>
            </Button>

            <div
              className={hstack({
                gap: '4',
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              <ForceMultiplierHeader
                forceMultiplierId={id}
                forceMultiplierByIdLoading={forceMultiplierByIdLoading}
                disabled={disabled}
              />
              <div
                className={hstack({
                  alignItems: 'flex-start',
                  justify: 'flex-end'
                })}
              >
                {!isFmPublished && (
                  <Button
                    palette="action"
                    usage="filled"
                    shape="rounded"
                    disabled={isFmPublished || disabled}
                    onClick={handlePublishClick}
                  >
                    Publish
                  </Button>
                )}
                {isFmPublished && (
                  <Button
                    palette="action"
                    usage="filled"
                    shape="rounded"
                    onClick={handleClickNewVersion}
                  >
                    New Version
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* Details */}
          <div
            className={vstack({
              gap: 4,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <p
              className={css({
                textStyle: 'heading-lg'
              })}
            >
              Details
            </p>

            {forceMultiplierByIdLoading ? (
              <BaseSkeleton baseColor={undefined} highlightColor={undefined} />
            ) : (
              <PlanDetailsForm
                forceMultiplierById={forceMultiplierById}
                missionPartnerMinDetails={missionPartnerMinDetails}
                isModularizedForceMultiplier={isModularizedForceMultiplier}
                supportsModules={supportsModules}
                isDuAdmin={isDuAdmin}
                disabled={disabled}
                loading={loading}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
                control={control}
                isDirty={isDirty}
              />
            )}
            {/* <ForceMultiplierTabs /> */}
            <div className={tabsFullWidth}>
              <Tabs defaultValue="curriculum">
                <TabsList>
                  <Tab value="curriculum">Curriculum</Tab>
                  <Tab value="libraryitems">Library Items</Tab>
                  <Tab value="marketingcontent">Marketing Content</Tab>
                </TabsList>
                <TabPanel value="curriculum" className={css({ w: 'full' })}>
                  <CurriculumTab
                    forceMultiplierById={forceMultiplierById}
                    forceMultiplierByIdLoading={forceMultiplierByIdLoading}
                    isModularizedForceMultiplier={isModularizedForceMultiplier}
                    isFmPublished={isFmPublished}
                    disabled={disabled}
                    setEditTitleLoading={setEditTitleLoading}
                    setRemovingItems={setRemovingItems}
                  />
                </TabPanel>
                <TabPanel value="libraryitems" className={css({ w: 'full' })}>
                  <LibraryItemsTab
                    forceMultiplierById={forceMultiplierById}
                    disabled={disabled}
                    isSubmitting={isSubmitting}
                    loading={loading}
                    isFmPublished={isFmPublished}
                    forceMultiplierByIdLoading={forceMultiplierByIdLoading}
                    setRemovingItems={setRemovingItems}
                  />
                </TabPanel>
                <TabPanel
                  value="marketingcontent"
                  className={css({ w: 'full' })}
                >
                  <ForceMultiplierForm
                    marketingControl={control}
                    handleMarketingSubmit={handleSubmit}
                    forceMultiplierById={forceMultiplierById}
                    missionPartnerName={fmMissionPartner?.name}
                    disabled={disabled}
                    isSubmitting={isSubmitting}
                    isMarketingSubmitting={isSubmitting}
                    errors={errors}
                  />
                </TabPanel>
              </Tabs>

              {/* TODO: When we support this, here is the logic for remove button
              {forceMultiplierById?.version === '1' && !isFmPublished && (
                <Button kind="text" style={{ color: colors.red[800] }}>
                  Delete Plan <TrashCan />
                </Button>
              )} */}
            </div>
          </div>
        </>
      )}
    </MainContentVStack>
  );
};

export default MissionPartnerPlanDetails;
