import React, { useCallback, useState } from 'react';
import { Button } from '@cerberus/react';
import { useDropzone } from 'react-dropzone';
import {
  downloadTemplateStyles,
  selectFileStyles,
  errorTextStyles
} from '../../Styles';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

interface Props {
  handleOnClose: () => void;
  onAddMultipleUsers: (file: File) => void;
  setShowTabs: (showTabs: boolean) => void;
  itemType?: string;
  action?: string;
}

const MAX_RECORDS = 500;

export const AddMultipleUsers = ({
  handleOnClose,
  onAddMultipleUsers,
  setShowTabs,
  itemType = 'learners',
  action = 'upload'
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const csvData = reader.result as string;
        const records = csvData.split('\n').length - 1; // -1 to account for header row

        if (selectedFile && !selectedFile.name.endsWith('.csv')) {
          setError('Please select only a .CSV file.');
        } else if (records > MAX_RECORDS) {
          setError(
            `Please upload no more than ${MAX_RECORDS} ${itemType} at a time`
          );
        } else {
          setFile(selectedFile);
          setError(null);
        }
      });

      try {
        reader.readAsText(selectedFile);
      } catch {
        setError('Please select only a .CSV file.');
      }
    },
    [itemType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': [] }
  });

  const renderDropzone = () => {
    if (file) {
      return (
        <div
          className={hstack({
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4'
          })}
        >
          <p>
            <b>{file.name}</b> added
          </p>
          <Button
            palette="action"
            shape="rounded"
            usage="ghost"
            onClick={() => {
              setFile(null);
            }}
          >
            Remove
          </Button>
        </div>
      );
    }

    return (
      <div
        className={hstack({
          justifyContent: 'center',
          alignItems: 'center',
          w: 'full',
          h: 'full'
        })}
        {...getRootProps()}
      >
        <input role="file-input" {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p
            className={css({
              textAlign: 'center'
            })}
          >
            Drag and drop your completed .csv file here,
            <br /> or <span className={selectFileStyles}>select a file</span> to
            upload
          </p>
        )}
      </div>
    );
  };

  const determineBorderColor = error => {
    if (error) {
      return 'danger.text.initial';
    }
    return 'page.text.300';
  };

  return (
    <div
      className={vstack({
        gap: '4',
        alignItems: 'left'
      })}
    >
      <p>
        <a
          href="/admin/upload-template/userUploadTemplate"
          className={downloadTemplateStyles}
          download="User Upload Template"
        >
          Download a .csv template
        </a>{' '}
        to {action} <b>up to 500 {itemType}</b> at once.
      </p>
      <div
        className={css({
          p: '10',
          borderWidth: '1px',
          borderStyle: 'dashed',
          borderColor: determineBorderColor(error),
          bgColor: 'page.bg.100',
          h: '109px',
          w: 'full'
        })}
      >
        {renderDropzone()}
      </div>
      {error && <p className={errorTextStyles}>{error}</p>}
      <div className={hstack({ gap: '4' })}>
        <Button
          disabled={!file || Boolean(error)}
          palette="action"
          shape="rounded"
          usage="filled"
          onClick={() => {
            onAddMultipleUsers(file);
            handleOnClose();
          }}
        >
          Continue
        </Button>
        <Button
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={() => {
            setShowTabs(true);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
