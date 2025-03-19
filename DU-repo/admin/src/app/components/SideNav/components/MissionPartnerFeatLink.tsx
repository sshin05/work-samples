import { hstack } from '@cerberus/styled-system/patterns';
import Link from 'next/link';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { AwsImage } from '@/components_new/images/AwsImage';
import {
  type AffiliateId,
  missionPartnerLogoMap
} from '@/app/mp/components/ProgramLink/programLinkConsts';
import { TrialIcon } from './TrialIcon';

type MissionPartnerFeatLinkProps = {
  missionPartnerId: string;
};

const MissionPartnerFeatLink = ({
  missionPartnerId
}: MissionPartnerFeatLinkProps) => {
  const { missionPartnerLoading, missionPartner } =
    useFindMissionPartnerById(missionPartnerId);

  const logo =
    missionPartner?.logoUrl ||
    missionPartnerLogoMap(missionPartner?.affiliateId as AffiliateId);

  return (
    <Link
      className={hstack({
        h: '10',
        w: '290px',
        color: 'action.navigation.initial',
        border: '1px solid',
        borderColor: 'page.border.100',
        display: 'flex !important',
        px: '4',
        py: '2',
        rounded: 'lg !important',
        textStyle: 'body-sm',
        textDecoration: 'none !important',
        transitionProperty: 'background-color,color',
        transitionDuration: '150ms',
        transitionTimingFunction: 'ease-in-out',
        _hover: {
          color: 'action.navigation.hover',
          bgColor: 'action.bg.100.hover'
        }
      })}
      href={getRouteUrl(routeGenerators.MissionPartner({ missionPartnerId }))}
    >
      <AwsImage
        src={logo}
        alt={missionPartner?.name ? missionPartner.name : 'Default Logo'}
        loading={missionPartnerLoading}
        isCircularImage
      />
      {missionPartner?.name.length < 22 && missionPartner?.name}
      {missionPartner?.name.length > 21 &&
        missionPartner?.name.slice(0, 22).concat('...')}
      {!missionPartnerLoading && missionPartner?.trialEnabled && <TrialIcon />}
    </Link>
  );
};

export default MissionPartnerFeatLink;
