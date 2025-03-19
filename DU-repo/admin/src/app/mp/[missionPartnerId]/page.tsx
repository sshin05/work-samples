import type { PageProps } from '@/app/types';
import { redirect } from 'next/navigation';

const MpRootDashboardPage = async (props: PageProps) => {
  const missionPartnerId = (await props.params).missionPartnerId;

  redirect(`/mp/${missionPartnerId}/dashboard`);
};

export default MpRootDashboardPage;
