'use server';

import { routeGenerators } from '@/utils/getRouteUrl';
import { getBlock } from '@digital-u/services/block/get-block';
import { updateBlock } from '@digital-u/services/block/update-block';
import { revalidatePath } from 'next/cache';

export type FormValues = {
  id: string;
  title: string;
  description: string;
};

export async function updateBlockTitleAndDescriptionAction(
  currentState: { message: string; error: string },
  formData: FormData
) {
  try {
    const id = formData.get('id') as string;

    const block = await getBlock({ id });

    await updateBlock({
      id: block.id,
      type: block.type,
      title: formData.get('title') as string,
      description: formData.get('description') as string
    });

    revalidatePath(
      routeGenerators.CurriculumView({
        missionPartnerId: block.missionPartnerId
      })
    );

    return {
      message: 'Block updated successfully',
      error: null
    };
  } catch (error) {
    return {
      message: 'Failed to update block',
      error: error.message
    };
  }
}
