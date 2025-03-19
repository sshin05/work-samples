import type { processStatus } from '@cerberus/react';

/**
 *
 * Maps upload status to visual display.
 *
 * Partial workaround, unable to access Cerberus' `processStatus` enum, ie `processStatus.TODO`
 * ```
 * "Cannot access ambient const enums when 'isolatedModules' is enabled."
 * ```
 */
export const getUploadStatus = ({
  isUploading,
  didError,
  didUpload
}: {
  isUploading: boolean;
  didError: boolean;
  didUpload: boolean;
}): processStatus => {
  if (didError) {
    return 'error' as processStatus;
  }

  if (isUploading) {
    return 'processing' as processStatus;
  }

  if (didUpload) {
    return 'done' as processStatus;
  }

  return 'todo' as processStatus;
};
