import os from 'os';
import path from 'path';
import fs, { type PathLike } from 'fs';
import { randomUUID } from 'crypto';

type FileStorageInterfaceOptions = { MAX_FILE_SIZE_MB?: number };

/**
 * Returns unique file path to server's temporary directory to avoid conflicts between concurrent file uploads
 * */
const generateTemporaryFilePath = (): string => {
  const tempDir = os.tmpdir();
  const tempFileName = randomUUID();
  return path.join(tempDir, tempFileName);
};

/**
 * Next.js Router Handler Utility class to handle temporarily writing a file upload to disk before persisting on cloud provider (S3)
 *
 * Maintains reference to file in temporary directory, allowing for cleanup after the cloud file upload completes
 *
 * **Note:** This utility is not designed to work within the constraints of the Next Edge runtime
 *
 * @example
 * ```
 * const fileStore = new FileStorageInterface({ MAX_FILE_SIZE_MB: 10 });
 *
 * try {
 *   const temporaryFilePath = await fileStore.createTemporaryFile(file as File)
 *   await uploadFileToS3({ filepath: temporaryFilePath })
 * } finally {
 *   fileStore.cleanup()
 * }
 * ```
 */
export class FileStorageInterface {
  MAX_FILE_SIZE_MB: number = 0;
  filePath: string;

  constructor(options?: FileStorageInterfaceOptions) {
    const { MAX_FILE_SIZE_MB } = options || {};

    this.filePath = null;
    this.MAX_FILE_SIZE_MB = MAX_FILE_SIZE_MB ?? this.MAX_FILE_SIZE_MB;
  }

  /**
   * Method to validate file aligns with constraints
   * Currently used to limit file upload size, extended as needed
   */
  _validateFile(file: File): void {
    const fileSizeBytes = file.size;
    const fileSizeMb = fileSizeBytes / (1024 * 1024);

    if (fileSizeMb > this.MAX_FILE_SIZE_MB) {
      throw new Error('Error: file exceeds the max file');
    }
  }

  /**
   * Returns file path that consumers can use to upload the file to S3, other cloud providers, or further async processing
   *
   * Note: This approach may be more memory intensive than piping the readable stream into a writeable.
   * This simpler approach avoids additional complexity, but may cause high resource utilization when
   * uploading large files. Recommend amending the approach to chunk the request.body readable stream
   * directly into a write stream - this should release memory as the stream is written
   * */
  async createTemporaryFile(file: File): Promise<PathLike | null> {
    this.filePath = generateTemporaryFilePath() + path.extname(file.name); // Append file extension to temporary file path because striping the extension causes issues for S3 upload.

    try {
      this._validateFile(file);

      const fileArrayBuffer = await file.arrayBuffer();
      const contentBuffer = Buffer.from(fileArrayBuffer);

      await fs.promises.writeFile(this.filePath, contentBuffer);

      return this.filePath;
    } catch (error) {
      throw new Error(error);
    }
  }

  async cleanup(): Promise<void> {
    try {
      if (!this.filePath) {
        return;
      }

      if (!fs.existsSync(this.filePath)) {
        return;
      }

      await fs.promises.unlink(this.filePath);
    } catch (error) {
      throw new Error(error);
    }
  }
}
