import { Menu, MenuContent, MenuTrigger } from '@cerberus/react';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { useRouteParams } from '@/hooks/useRouteParams';
import { BaseSkeleton } from '@/components_new/loaders';
import { MpSideNavLinks } from '../MpSideNavLinks/MpSideNavLinks';
import { AwsImage } from '@/components_new/images/AwsImage';
import { TrialIcon } from '../TrialIcon';
import { useFindUserRoles } from '@/api/role';

import {
  triggerButtonStyles,
  triggerButtonContentStyles,
  triggerButtonTextStyles,
  menuContentStyles,
  missionPartnerTextStyles
} from './mpSideNavButtonMenu.styles';
import {
  type AffiliateId,
  missionPartnerLogoMap
} from '@/app/mp/components/ProgramLink/programLinkConsts';
import { getUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import { useSession } from 'next-auth/react';
import type { DuSession } from '@/types/DuSession';

export const MpSideNavButtonMenu = () => {
  const { data: session } = useSession();
  const { isDuAdmin, isSfAdmin, isAfAdmin } = getUserRoles(
    session as DuSession
  );
  const isAdmin = isDuAdmin || isSfAdmin || isAfAdmin;
  const { userRolesData } = useFindUserRoles();
  const { missionPartnerId } = useRouteParams();
  const { missionPartnerLoading, missionPartner } =
    useFindMissionPartnerById(missionPartnerId);

  const logo =
    missionPartner?.logoUrl ||
    missionPartnerLogoMap(missionPartner?.affiliateId as AffiliateId);

  return (
    <div className={triggerButtonStyles}>
      <Menu>
        <MenuTrigger disabled={userRolesData?.length < 2 && !isAdmin}>
          <div className={triggerButtonContentStyles}>
            <AwsImage
              src={logo}
              alt={missionPartner?.name ? missionPartner.name : 'Default Logo'}
              loading={missionPartnerLoading}
              isCircularImage
            />
            <div className={triggerButtonTextStyles}>
              <div className={missionPartnerTextStyles}>
                {missionPartnerLoading && (
                  <BaseSkeleton width={140} height={16} />
                )}
                {!missionPartnerLoading && missionPartner?.name}
                {!missionPartnerLoading && !missionPartner?.name && (
                  <>Mission Partner</>
                )}
              </div>
              {!missionPartnerLoading && missionPartner?.trialEnabled && (
                <TrialIcon />
              )}
            </div>
          </div>
        </MenuTrigger>
        <MenuContent className={menuContentStyles}>
          <MpSideNavLinks isAdmin={isAdmin} />
        </MenuContent>
      </Menu>
    </div>
  );
};
