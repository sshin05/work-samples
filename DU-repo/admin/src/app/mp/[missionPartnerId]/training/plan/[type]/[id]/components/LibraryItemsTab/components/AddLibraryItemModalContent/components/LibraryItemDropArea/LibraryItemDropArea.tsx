import { useMemo, useState } from 'react';
import { Button } from '@cerberus/react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { onDropFile } from '@/utils/onDropLibraryItemFile';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

export const LibraryItemDropArea = ({
  control,
  setHasFile,
  setHasFileRejections,
  hasFileRejections,
  setValue,
  isSubmitting,
  loading,
  activeUploadTab
}) => {
  const [file, setFile] = useState(null);
  const audioExtensions = useMemo(() => ['.mp3', '.oog', '.wav'], []);

  const onDropAccepted = (acceptedFiles = []) => {
    const { hasFile, file, value } = onDropFile(acceptedFiles, audioExtensions);

    if (hasFile) {
      setHasFile(hasFile);
      setFile(file);
      setHasFileRejections(false);
      setValue('type', value);
      setValue('file', file);
    }
  };

  const onDropRejected = () => {
    setHasFile(false);
    setFile(null);
    setHasFileRejections(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    noClick: file ? true : false,
    accept: {
      'image/png': [],
      'image/gif': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/webp': [],
      'text/csv': [],
      'application/pdf': [],
      'application/vnd.ms-powerpoint': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
      'application/vnd.ms-excel': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'video/mp4': [],
      'audio/mpeg': [],
      'audio/ogg': [],
      'audio/wav': []
    },
    maxSize: 2147483648,
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className={vstack()}>
      <Controller
        name="file"
        control={control}
        rules={{
          validate: value => {
            if (activeUploadTab === 0 && !value) {
              return 'A file is required';
            }
            return true;
          }
        }}
        render={({ fieldState: { error } }) => (
          <div
            className={vstack({
              w: 'full',
              h: 'full',
              minH: '24',
              borderWidth: '1px',
              borderStyle: 'dashed',
              borderColor: error ? 'danger.text.initial' : 'page.text.300',
              bgColor: 'page.border.initial',
              justifyContent: 'center'
            })}
          >
            <div
              className={hstack({
                w: 'full',
                h: 'full',
                justifyContent: 'center'
              })}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (!file && !isDragActive) || hasFileRejections ? (
                <p className={css({ textAlign: 'center' })}>
                  Drag and drop a file here,
                  <br /> or{' '}
                  <span
                    className={css({
                      textDecoration: 'underline',
                      color: 'dataViz.qualitative.600',
                      cursor: 'pointer'
                    })}
                  >
                    select a file
                  </span>{' '}
                  to upload
                </p>
              ) : loading && file ? (
                <p className={css({ textAlign: 'center' })}>
                  Uploading {file.name}
                </p>
              ) : (
                <div
                  className={hstack({
                    alignItems: 'center',
                    justifyContent: 'center',
                    pl: '4'
                  })}
                >
                  <p>
                    <b>{file.name}</b> added
                  </p>
                  <Button
                    palette="action"
                    usage="ghost"
                    shape="rounded"
                    onClick={() => {
                      setFile(null);
                      setHasFile(false);
                    }}
                    disabled={isSubmitting || loading}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      />
      <p className={css({ textStyle: 'label-sm' })}>
        Accepted types: PDF, PNG, GIF, JPEG, PPT, PPTX, DOC, DOCX, XLS, XLSX,
        CSV, JPG, WEBP, MP4, MP3, OOG, WAV files under 2 GB size.
      </p>
    </div>
  );
};
