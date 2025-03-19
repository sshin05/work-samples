import { vstack } from '@cerberus/styled-system/patterns';
import {
  Dashboard,
  Education,
  GroupPresentation,
  Notebook,
  ProgressBarRound,
  Report,
  Settings,
  Trophy,
  UserAdmin,
  VirtualColumnKey,
  WatsonHealth3DCurveAutoVessels,
  WatsonHealth3DCurveManual
} from '@cerberus/icons';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests/useFindOpenForMissionPartner';
import { useFindOpenLicenseRequests } from '@/api/license-requests/useFindOpenLicenseRequests';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { useRouteParams } from '@/hooks/useRouteParams';
import { SideNavMenuLink } from '../SideNavMenuLink/SideNavMenuLink';
import { useFindSettingById } from '@/api/setting';

const ICON_SIZE = 20;

export const SideNavMpPrimaryLinks = () => {
  const { missionPartnerId } = useRouteParams();
  const mpId = Array.isArray(missionPartnerId)
    ? missionPartnerId[0]
    : missionPartnerId;

  const { missionPartner } = useFindMissionPartnerById(missionPartnerId);
  const { isDuAdmin } = useIsDuAdmin();
  const { setting: manageTrainingSetting } =
    useFindSettingById('manage-training');
  const { setting: curriculumSetting } = useFindSettingById('curriculum');

  const canGoToMarketplace = missionPartner?.isMarketplaceEnabled;
  const canGoToCustomTraining = isDuAdmin
    ? true
    : missionPartner?.customTrainingEnabled;

  const { findOpenForMissionPartnerData } = useFindOpenForMissionPartner(mpId);
  const learnersNotificationsCount = findOpenForMissionPartnerData?.length;

  const { requests } = useFindOpenLicenseRequests(mpId);
  const licensesNotificationsCount = requests?.total;

  return (
    <ul
      className={vstack({
        w: 'full',
        h: 'auto',
        alignItems: 'flex-start',
        gap: '2',
        mt: '6',
        mb: '10',
        flex: 1,
        overflowY: 'auto'
      })}
    >
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerDashboard({ missionPartnerId })
        )}
        label="Dashboard"
      >
        <Dashboard size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerLearners({
            missionPartnerId
          })
        )}
        label="Learners"
        notificationsCount={learnersNotificationsCount}
      >
        <Education size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerVendors({
            missionPartnerId
          })
        )}
        label="Licenses"
        notificationsCount={licensesNotificationsCount}
      >
        <VirtualColumnKey size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerTrainingHub({
            missionPartnerId
          })
        )}
        label="Training Hub"
      >
        <ProgressBarRound size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.Cohorts({
            missionPartnerId
          })
        )}
        label="Cohorts"
      >
        <GroupPresentation size={ICON_SIZE} />
      </SideNavMenuLink>
      {manageTrainingSetting?.enabled && (
        <SideNavMenuLink
          href={`/mp/${missionPartnerId}/classroom`}
          label="Manage Training"
        >
          <UserAdmin size={ICON_SIZE} />
        </SideNavMenuLink>
      )}
      {canGoToMarketplace && (
        <SideNavMenuLink
          href={getRouteUrl(
            routeGenerators.Marketplace({
              missionPartnerId
            })
          )}
          label="Buy Training"
          subLabel="on SOT-X"
        >
          <img alt="SOT-X Icon" src="/admin/images/sotx-icon.svg" />
        </SideNavMenuLink>
      )}
      {canGoToCustomTraining && (
        <SideNavMenuLink
          href={getRouteUrl(
            routeGenerators.CustomTraining({
              missionPartnerId
            })
          )}
          label="Custom Training"
        >
          <WatsonHealth3DCurveManual size={ICON_SIZE} />
        </SideNavMenuLink>
      )}
      {curriculumSetting?.enabled && isDuAdmin && (
        <SideNavMenuLink
          href={getRouteUrl(
            routeGenerators.Curriculum({
              missionPartnerId
            })
          )}
          label="Custom Training 2.0"
        >
          <WatsonHealth3DCurveAutoVessels size={ICON_SIZE} />
        </SideNavMenuLink>
      )}
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.GradeBook({
            missionPartnerId
          })
        )}
        label="Gradebook"
      >
        <Notebook size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerBadges({
            missionPartnerId
          })
        )}
        label="Badges"
      >
        <Trophy size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(routeGenerators.ReportingAdmin({ missionPartnerId }))}
        label="Reporting"
      >
        <Report size={ICON_SIZE} />
      </SideNavMenuLink>
      <SideNavMenuLink
        href={getRouteUrl(
          routeGenerators.MissionPartnerSettings({ missionPartnerId })
        )}
        label="Settings"
      >
        <Settings size={ICON_SIZE} />
      </SideNavMenuLink>
    </ul>
  );
};
