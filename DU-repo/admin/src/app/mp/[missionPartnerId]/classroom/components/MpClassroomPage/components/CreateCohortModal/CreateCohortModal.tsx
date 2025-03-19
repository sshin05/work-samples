import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { Add, CopyFile } from '@cerberus/icons';
import { Button, useCTAModal, useNotificationCenter } from '@cerberus/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface CreateCohortModalProps {
  missionPartnerId: string;
}

export const CreateCohortModal = ({
  missionPartnerId
}: CreateCohortModalProps) => {
  const router = useRouter();
  const { show } = useCTAModal();
  const { notify } = useNotificationCenter();

  const handleCreateCohort = useCallback(() => {
    show({
      heading: 'Create a new cohort or copy an existing one?',
      description:
        'Start from scratch, or use an existing cohort as a template.',
      actions: [
        {
          text: 'Create new cohort',
          onClick: () =>
            router.push(
              getRouteUrl(routeGenerators.CreateCohort({ missionPartnerId }))
            )
        },
        {
          text: 'Copy existing cohort',
          onClick: () =>
            notify({ palette: 'info', heading: 'Feature coming soon' })
        }
      ],
      icon: <CopyFile size={24} />
    });
  }, [show, router, missionPartnerId, notify]);

  return (
    <Button
      palette="action"
      shape="rounded"
      usage="filled"
      onClick={handleCreateCohort}
    >
      Create Cohort <Add size={16} />
    </Button>
  );
};
