import { NextResponse as NextServerResponse } from 'next/server';
import { FileStorageInterface } from '../../utils/FileStorageInterface';
import type { LibraryItemType } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { addLibraryItem } from '@digital-u/services/cohort/add-library-item';

const MAX_FILE_SIZE_MB = 2000;

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const type = formData.get('type') as LibraryItemType;
  const displayName = formData.get('displayName') as string;
  const cohortId = formData.get('cohortId') as string;

  if (!file) {
    return new NextServerResponse(
      JSON.stringify({ message: 'No file uploaded' }),
      { status: 400 }
    );
  }

  const fileStore = new FileStorageInterface({
    MAX_FILE_SIZE_MB
  });

  try {
    const temporaryFilePath = await fileStore.createTemporaryFile(file);

    const newLibraryItem = {
      source: temporaryFilePath as string,
      type: type, // File = Document; File is a legacy term.
      name: displayName
    };
    const savedItem = await addLibraryItem({
      cohortId: cohortId,
      ...newLibraryItem
    });

    return new NextServerResponse(
      JSON.stringify({
        message: 'File uploaded successfully',
        savedItem
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving file:', error);
    const message = error.message.includes('file exceeds the max file')
      ? `File exceeds the max file size of ${MAX_FILE_SIZE_MB}MB`
      : 'Error uploading file';

    return new NextServerResponse(
      JSON.stringify({
        message
      }),
      { status: 500 }
    );
  } finally {
    fileStore.cleanup();
  }
}
