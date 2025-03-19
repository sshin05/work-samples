import { Button } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';

export const LibraryItemFormButtons = ({
  activeUploadTab,
  addFileButtonDisabled,
  addLinkButtonDisabled,
  isSubmitting,
  loading,
  close,
  setActiveUploadTab,
  setValue
}) => {
  return (
    <div
      className={hstack({ gap: '4', w: 'full', justifyContent: 'flex-start' })}
    >
      {activeUploadTab === 0 && (
        <Button
          palette="action"
          usage="filled"
          shape="rounded"
          type="submit"
          disabled={addFileButtonDisabled || isSubmitting}
          onClick={() => setValue('url', undefined)}
        >
          Add a file
        </Button>
      )}
      {activeUploadTab === 1 && (
        <Button
          palette="action"
          usage="filled"
          shape="rounded"
          type="submit"
          disabled={addLinkButtonDisabled || isSubmitting}
          onClick={() => {
            setValue('file', undefined);
            setValue('type', 'Link');
          }}
        >
          Add a link
        </Button>
      )}
      <Button
        palette="action"
        usage="outlined"
        shape="rounded"
        onClick={() => {
          close();
          setActiveUploadTab(0);
        }}
        disabled={loading || isSubmitting}
      >
        Cancel
      </Button>
    </div>
  );
};
