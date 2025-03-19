'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { Spinner, useModal, useNotificationCenter } from '@cerberus/react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { backButtonStyles } from '@/app/styles/BackButtonStyles';
import { useGetKsat } from '@/api/dcwf/ksat/useGetKsat';
import { HStack, VStack } from 'styled-system/jsx';
import {
  contentTitle,
  contentType,
  contentSubtitle,
  detailsContainer
} from '../../../components/DcwfPage/components/DcwfTabs/dcwf.styles';
import { KsatTabs } from '../KsatTabs/KsatTabs';
import { DcwfActionMenu } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfActionMenu';
import { EditKsatModal } from '../EditKsatModal';

interface KsatDetailsPageProps {
  ksatId: string;
}

export const KsatDetailsPage = ({ ksatId }: KsatDetailsPageProps) => {
  const { ksat, ksatLoading } = useGetKsat({ getKsatId: ksatId });
  const { notify } = useNotificationCenter();
  const editKsatModal = useModal();

  const onEdit = useMemo(
    () => () => {
      editKsatModal.show();
    },
    [editKsatModal]
  );

  const onDelete = useMemo(
    () => (_id: string) => {
      notify({
        palette: 'info',
        heading: 'Not Yet Implemented',
        description: 'Delete functionality coming soon'
      });
    },
    [notify]
  );

  return (
    <>
      <MainContentVStack>
        <Link
          className={backButtonStyles}
          href={getRouteUrl(
            routeGenerators.Dcwf({
              tab: '1'
            })
          )}
        >
          {'<'} Back
        </Link>
        <VStack className={detailsContainer} alignItems="flex-start" gap={4}>
          <HStack gap={4}>
            <div className={contentType}>
              KSAT{' '}
              {!ksatLoading && (
                <span className={contentTitle}>| {ksat?.code}</span>
              )}
            </div>
            {!ksatLoading && (
              <DcwfActionMenu
                onEdit={onEdit}
                onDelete={() => onDelete(ksatId)}
                actionId={ksatId}
              />
            )}
          </HStack>
          <div className={contentSubtitle}>
            {ksatLoading ? <Spinner size="2rem" /> : ksat?.description}
          </div>
          <KsatTabs ksatId={ksatId} />
        </VStack>
      </MainContentVStack>

      <EditKsatModal modal={editKsatModal} ksat={ksat} />
    </>
  );
};
