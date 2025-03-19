'use client';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { MpLearnerPage } from '../../learner/[user]/components/MpLearnerPage';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { useRouteParams } from '@/hooks/useRouteParams';

const PortalManagerUserPage = () => {
  // TODO: probably delete all these properties; you'll have to look at all the implementations of <MpLearnerPage />
  const { missionPartnerId, _user } = useRouteParams();

  const { missionPartnerMinDetailsError } =
    useFindMissionPartnerMinDetails(missionPartnerId);

  useGraphqlErrorHandler(missionPartnerMinDetailsError);

  /*
  const breadcrumbs = [
    {
      text: missionPartnerMinDetails?.name ?? <BaseSkeleton width={70} />,
      href: getRouteUrl(
        routeGenerators.MissionPartner({
          missionPartnerId
        })
      )
    },
    {
      text: 'Portal Manager'
    }
  ];
  */

  return <MpLearnerPage />;
};

export default PortalManagerUserPage;
