import { NextResponse as NextServerResponse } from 'next/server';
import { FileStorageInterface } from './FileStorageInterface';
import { addFile } from '@digital-u/services/files/add-file';

export const uploadFile = async (
  file: File,
  maxFileSizeMb: number,
  s3Path: string,
  s3FileName?: string
) => {
  if (!file) {
    return new NextServerResponse(
      JSON.stringify({ message: 'No file uploaded' }),
      { status: 400 }
    );
  }

  const fileStore = new FileStorageInterface({
    MAX_FILE_SIZE_MB: maxFileSizeMb
  });

  try {
    const temporaryFilePath = await fileStore.createTemporaryFile(file);

    const savedFile = await addFile({
      type: 'Document',
      source: temporaryFilePath as string,
      destination: `${s3Path}${s3FileName || file.name}`
    });

    return new NextServerResponse(
      JSON.stringify({
        message: 'File uploaded successfully',
        savedFile: savedFile
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving file:', error);
    let message = 'Error uploading file';

    if (error.message.includes('file exceeds the max file')) {
      message = `File exceeds the max file size of ${maxFileSizeMb}MB`;
    }
    return new NextServerResponse(
      JSON.stringify({
        message
      }),
      { status: 500 }
    );
  } finally {
    fileStore.cleanup();
  }
};
