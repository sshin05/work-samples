'use server';

import type {
  BlockType,
  BlockTypeMetadata
} from '@digital-u/services/block/types';
import { redirect } from 'next/navigation';
import { createBlock as _createBlock } from '@digital-u/services/block/create-block';
import { checkAuthenticatedAdminOrAuthorizedPortalManager } from '@/app/api/utils/role-authentication';

export const createBlock = async ({
  missionPartnerId,
  type,
  name,
  isRoot = false
}: {
  missionPartnerId: string;
  type: BlockType;
  name: BlockTypeMetadata['name'];
  isRoot?: boolean;
}) => {
  await checkAuthenticatedAdminOrAuthorizedPortalManager(missionPartnerId);

  const createdBlock = await _createBlock(
    {
      missionPartnerId,
      type,
      title: `Untitled ${name}`
    },
    isRoot
  );

  redirect(
    `/mp/${missionPartnerId}/training-v2/view/${createdBlock.id}${
      isRoot ? '?editTitle=true' : ''
    }`
  );
};
