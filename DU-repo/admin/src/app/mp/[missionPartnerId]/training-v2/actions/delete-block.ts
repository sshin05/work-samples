'use server';

import { checkAuthenticatedAdminOrAuthorizedPortalManager } from '@/app/api/utils/role-authentication';
import { deleteBlock as _deleteBlock } from '@digital-u/services/block/delete-block';
import { revalidatePath } from 'next/cache';

export const deleteBlock = async ({
  missionPartnerId,
  id
}: {
  missionPartnerId: string;
  id: string;
}) => {
  await checkAuthenticatedAdminOrAuthorizedPortalManager(missionPartnerId);

  await _deleteBlock({
    id
  });

  revalidatePath('/mp/[missionPartnerId]/training-v2/view/[...ids]', 'page');
};
