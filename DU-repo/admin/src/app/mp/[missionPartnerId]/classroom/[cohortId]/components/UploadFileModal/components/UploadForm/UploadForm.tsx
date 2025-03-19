import { css } from '@cerberus/styled-system/css';
import { type processStatus, FileStatus, FileUploader } from '@cerberus/react';
import { WarningAltFilled } from '@cerberus/icons';
import { useMemo } from 'react';
import { getUploadStatus } from './utils/getUploadStatus';

type UploadFormProps = {
  uploadStatus?: processStatus;
  isUploading: boolean;
  didError: boolean;
  didUpload: boolean;
  attachedFile: any;
  onAttachFile: (file) => void;
  displayRequiredError?: boolean;
};

const ERROR_TEXT = 'A file is required to continue';

export const UploadForm = ({
  isUploading,
  didError,
  didUpload,
  attachedFile,
  onAttachFile,
  displayRequiredError
}: UploadFormProps) => {
  const uploadStatus = useMemo(
    () => getUploadStatus({ isUploading, didError, didUpload }),
    [isUploading, didError, didUpload]
  );

  const handleFileUploadStatusClose = () => {
    const canDetachFile = uploadStatus === 'todo' || uploadStatus === 'error';

    if (canDetachFile) {
      onAttachFile(null);
    }
  };

  const handleFileUploadChange = e => {
    const [file] = e.target.files;

    onAttachFile(file);
  };

  return (
    <>
      <div className={css({ position: 'relative' })}>
        <FileUploader
          className={css({
            w: '100%',
            mb: '4'
          })}
          disabled={Boolean(attachedFile)}
          accept=".csv"
          heading="Upload Files"
          name={attachedFile?.name || ''}
          onChange={handleFileUploadChange}
        />
        {displayRequiredError && (
          <div
            className={css({
              color: 'danger.text.initial',
              display: 'flex',
              textStyle: 'body-sm',
              position: 'absolute',
              bottom: '16px',
              width: 'full'
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                w: 'full'
              })}
            >
              <WarningAltFilled className={css({ mr: '1' })} />
              {ERROR_TEXT}
            </div>
          </div>
        )}
      </div>

      {attachedFile && (
        <FileStatus
          id="file-upload-status"
          file={attachedFile?.name || ''}
          now={0}
          onClick={handleFileUploadStatusClose}
          status={uploadStatus}
          className={css({ mt: 4 })}
        />
      )}
    </>
  );
};
