'use client';
import { css } from '@cerberus/styled-system/css';
import { type processStatus , FileUploader, FileStatus } from '@cerberus/react';
import { useState } from 'react';
import axios from 'axios';

type MiniUploaderProps = {
  heading: string;
  accept: string;
  fileUploadApiPath: string;
  onUploaded?: (sourceLocation: string) => void | null;
  additionalFormData?: Record<string, string> | null;
};

export const MiniUploader = ({
  heading,
  accept,
  fileUploadApiPath,
  onUploaded,
  additionalFormData
}: MiniUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<processStatus>('todo' as processStatus);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      handleSubmit(event.target.files[0]);
    }
  };

  const handleSubmit = async file => {
    if (!file) return;
    setStatus('todo' as processStatus);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    if (additionalFormData) {
      Object.keys(additionalFormData).forEach(key => {
        formData.append(key, additionalFormData[key]);
      });
    }

    try {
      setStatus('processing' as processStatus);
      setError(null);
      const response = await axios.post(fileUploadApiPath, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted < 100 ? percentCompleted : 99); // Prevent progress bar from reaching 100% before the upload is complete on the backend.
        }
      });
      setUploadProgress(100);
      setStatus('done' as processStatus);
      if (onUploaded) {
        onUploaded(response.data?.savedFile?.sourceLocation);
      }
    } catch (error) {
      setStatus('error' as processStatus);
      setError(error?.response?.data?.message || error.message);
      console.error('Error uploading file:', error);
    }
  };

  const handleStatusClick = (_action, event) => {
    event.preventDefault();
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <FileUploader
        disabled={false}
        accept={accept}
        heading={heading}
        name="add_uuid"
        onChange={handleChange}
        multiple={false}
      />
      <FileStatus
        id="file-status"
        file={file?.name}
        now={uploadProgress}
        onClick={handleStatusClick}
        status={status}
        className={css({
          '& button': {
            display: 'none'
          },
          maxW: '576px'
        })}
      />
      {error && (
        <div
          className={css({
            color: 'danger.bg.initial',
            m: '2'
          })}
        >
          {error}
        </div>
      )}
    </div>
  );
};
