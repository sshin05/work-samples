import type { addFile } from '@digital-u/services/files/add-file';
import { FileStorageInterface } from '@/app/api/utils/FileStorageInterface';
import type { SQLServiceArguments } from '@/app/api';

export const runtime = 'nodejs';

// This will not work. Just getting rid of type errors - Knight
type AddLibraryItem = SQLServiceArguments<typeof addFile>;
type AddLibraryItemFileParams = {
  file: File;
  cohortId: string;
  type: AddLibraryItem['type'];
  name: string;
};

const parsePostRequestFormFields = async (
  request: Request
): Promise<AddLibraryItemFileParams> => {
  const formData = await request.formData();

  const file = formData.get('file') as File;
  const cohortId = formData.get('cohortId') as string;
  const type = formData.get('uploadType') as AddLibraryItem['type'];
  const name = formData.get('uploadDisplayName') as string;

  return {
    file,
    cohortId,
    type,
    name
  };
};

/**
 * Handler write a file to a temporary location on disk
 * The file is later uploaded to S3 by the addLibraryItem service
 *
 * Future versions should consider directly uploading the library item to S3,
 * and then associating the uploaded resource's id with the cohort's library item
 */
export async function POST(request: Request, _response: Response) {
  const fileStore = new FileStorageInterface({ MAX_FILE_SIZE_MB: 10 });

  try {
    const { file, cohortId, type, name } =
      await parsePostRequestFormFields(request);

    const temporaryFilePath = await fileStore.createTemporaryFile(file);

    // addLibraryItem handles file upload to S3 from file temporarily stored on disk
    const data = { temporaryFilePath, cohortId, type, name };

    // Commented out to avoid errors for now. - Knight
    // await addLibraryItem({
    //   file: temporaryFilePath,
    //   cohortId,
    //   type,
    //   name
    // });

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: error.message });
  } finally {
    fileStore.cleanup();
  }
}
