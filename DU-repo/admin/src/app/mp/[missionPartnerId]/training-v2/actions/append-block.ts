'use server';

import type {
  BlockType,
  BlockTypeMetadata
} from '@digital-u/services/block/types';
import { createBlock } from '@digital-u/services/block/create-block';
import { addChild } from '@digital-u/services/block/add-child';
import { checkAuthenticatedAdminOrAuthorizedPortalManager } from '@/app/api/utils/role-authentication';
import { redirect } from 'next/navigation';

/**
 * Used for creating and immediately appending a block to the end of a parent block.
 */
export const appendBlock = async ({
  missionPartnerId,
  type,
  name,
  path
}: {
  missionPartnerId: string;
  type: BlockType;
  name: BlockTypeMetadata['name'];
  path: [string, ...string[]];
}) => {
  await checkAuthenticatedAdminOrAuthorizedPortalManager(missionPartnerId);

  const createdBlock = await createBlock({
    missionPartnerId,
    title: `Untitled ${name}`,
    type: type
  });

  await addChild({
    id: createdBlock.id,
    missionPartnerId,
    path
  });

  redirect(
    `/mp/${missionPartnerId}/training-v2/view/${path.join('/')}/${createdBlock.id}`
  );
};

export const appendBlockFromSlashMenu = async ({
  item,
  path,
  missionPartnerId
}: {
  item: BlockTypeMetadata;
  path: [string, ...string[]];
  missionPartnerId: string;
}) => {
  if (item.referenceOnly) {
    console.log(
      'NOT IMPLEMENTED, a modal will need to be created to enable this'
    );
    return;
  }

  await appendBlock({
    missionPartnerId,
    type: item.id as BlockType,
    name: item.name,
    path
  });
};
