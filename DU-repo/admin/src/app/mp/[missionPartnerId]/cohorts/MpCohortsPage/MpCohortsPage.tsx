'use client';
import dynamic from 'next/dynamic';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { buildColumns } from '../components/CohortsTab/cohortsTabHelper';

const columns = buildColumns([]);

const CohortsTab = dynamic(
  () => import('../components/CohortsTab/CohortsTab'),
  {
    ssr: false,
    loading: () => <TableLoader buttonContent="Cohort" columns={columns} />
  }
);

interface MpCohortsPageProps {
  missionPartnerId: string;
}
export const MpCohortsPage = (props: MpCohortsPageProps) => {
  return (
    <>
      <CohortsTab missionPartnerId={props.missionPartnerId} />
    </>
  );
};
