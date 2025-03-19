'use client';
import { useSession } from 'next-auth/react';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { PortalManagersTab } from './components/PortalManagersTab';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { useRouteParams } from '@/hooks/useRouteParams';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { portalManagersTitleStyles } from './MpSettings.styles';
import { css } from '@cerberus/styled-system/css';
import { VStack } from 'styled-system/jsx';
import { MarketplaceSwitch } from './components/MarketplaceSwitch';
import { UpdateMissionPartnerDetails } from './components/UpdateMissionPartnerDetails';
import { MissionPartnerTrial } from './components/MissionPartnerTrial';
import { CustomTrainingSwitch } from './components/CustomTrainingSwitch';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

const MissionPartnerSettingsPage = () => {
  const { missionPartnerId } = useRouteParams();
  const { missionPartnerLoading, missionPartner, missionPartnerError } =
    useFindMissionPartnerById(missionPartnerId);
  useGraphqlErrorHandler(missionPartnerError);

  const { data: session } = useSession();
  const user = session?.user;
  const { isDuAdmin } = useIsDuAdmin();

  return (
    <MainContentVStack>
      <PageHeader>Manage Settings</PageHeader>
      {!missionPartnerLoading && (
        <>
          {isDuAdmin && (
            <VStack alignItems="flex-start" w="full" gap="6">
              <UpdateMissionPartnerDetails missionPartner={missionPartner} />
              {/* Mission Parnter Trial handles its own form */}
              <MissionPartnerTrial
                missionPartner={missionPartner}
                disabled={missionPartnerLoading}
              />
              <CustomTrainingSwitch
                missionPartner={missionPartner}
                canUserEdit={isDuAdmin}
              />
              <MarketplaceSwitch
                missionPartner={missionPartner}
                canUserEdit={isDuAdmin}
              />
            </VStack>
          )}
          <div className={css({ width: 'full' })}>
            <h1 className={portalManagersTitleStyles}>Portal Managers</h1>
            <PortalManagersTab
              missionPartner={missionPartner}
              loading={missionPartnerLoading}
              myUser={user}
            />
          </div>
        </>
      )}
    </MainContentVStack>
  );
};

export default MissionPartnerSettingsPage;
