'use client';
import { Group } from './components/Group';
import { useRouteParams } from '@/hooks/useRouteParams';
import { css } from '@cerberus/styled-system/css';

const GroupPage = () => {
  const { groupId, missionPartnerId } = useRouteParams();

  return (
    <div className={css({ marginTop: '-8', w: 'full' })}>
      <Group groupId={groupId} missionPartnerId={missionPartnerId} tab="0" />
    </div>
  );
};

export default GroupPage;
