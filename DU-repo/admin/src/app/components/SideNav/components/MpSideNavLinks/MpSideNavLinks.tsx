import { MenuItem } from '@cerberus/react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import MissionPartnerFeatLink from '../MissionPartnerFeatLink';
import { SideNavMissionPartnerLink } from '../SideNavMissionPartnerLink';
import { css } from '@cerberus/styled-system/css';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';
import { useGetUserRecentMissionPartners } from '@/api/user/useGetUserRecentMissionPartners';
import { vstack } from 'styled-system/patterns';
import { useFindUserRoles } from '@/api/role';

export const MpSideNavLinks = ({ isAdmin }) => {
  const { missionPartnersMinDetails } = useFindAllMissionPartnersMinDetails();
  const { recentMissionPartners } = useGetUserRecentMissionPartners();
  const mostRecentMissionPartners = recentMissionPartners?.slice(1, 4);
  const { userRolesData } = useFindUserRoles();
  const isManagerOfMultipleMps = isAdmin || userRolesData?.length > 1;
  const isRolesGreaterThanRecentMps =
    userRolesData?.length > 1 &&
    userRolesData?.length >= mostRecentMissionPartners?.length;

  return (
    <div className={vstack({ w: 'full', gap: '2', alignItems: 'start' })}>
      <p
        className={css({
          color: 'page.text.200',
          pb: '0 !important',
          textStyle: 'label-sm'
        })}
      >
        Other Mission Partners
      </p>
      {isManagerOfMultipleMps &&
        mostRecentMissionPartners?.map(partner => (
          <MenuItem
            value={partner.missionPartnerId}
            key={partner.missionPartnerId}
            className={css({ p: 0 })}
          >
            <MissionPartnerFeatLink
              missionPartnerId={partner.missionPartnerId}
              key={partner.missionPartnerId}
            />
          </MenuItem>
        ))}
      {isAdmin || isRolesGreaterThanRecentMps ? (
        <MenuItem value="view-all" className={css({ p: '0', m: '0' })}>
          <SideNavMissionPartnerLink
            href={getRouteUrl(routeGenerators.MPSearch())}
          >
            View All ({missionPartnersMinDetails?.length})
          </SideNavMissionPartnerLink>
        </MenuItem>
      ) : null}
    </div>
  );
};
