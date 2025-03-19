'use client';
import React from 'react';
import { MpLearnerPage } from '../../../mp/[missionPartnerId]/learner/[user]/components/MpLearnerPage';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';

const UserDetailsPage = () => {
  // TODO: remove if you're working with this page; double check all implementations of <MpLearnerPage />
  const { user: _userId } = useRouteParams();

  /*
  const breadcrumbs = [
    {
      text: 'Manage Users',
      href: getRouteUrl('ManageUsers')
    },
    {
      text: 'User',
      href: getRouteUrl(routeGenerators.ManageUser({ userId }))
    }
  ];
  */

  return (
    <MainContentVStack>
      <MpLearnerPage
      // breadcrumbs={breadcrumbs}
      />
    </MainContentVStack>
  );
};

export default UserDetailsPage;
