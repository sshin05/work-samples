import { Add } from '@carbon/icons-react';
import { Button, useModal } from '@cerberus/react';
import { CohortUploadLibraryItemModal } from './components/CohortUploadLibraryItemModal';
import { CreateCohortContext } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import { useContext, useEffect, useState } from 'react';
import { flex } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

const MAX_LIBRARY_ITEMS = 10;

export const CohortUploadLibraryItem = () => {
  const { createCohortState } = useContext(CreateCohortContext);
  const UploadModal = useModal();

  const [canAddItems, setCanAddItems] = useState<boolean>(true);

  useEffect(() => {
    if (createCohortState?.libraryItems?.length < MAX_LIBRARY_ITEMS) {
      setCanAddItems(true);
    }
  }, [createCohortState.libraryItems]);

  return (
    <>
      {canAddItems ? (
        <Button
          className={css({ w: '40%' })}
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={() => {
            if (createCohortState?.libraryItems?.length === MAX_LIBRARY_ITEMS) {
              setCanAddItems(false);
            } else {
              UploadModal.show();
            }
          }}
        >
          Add library resources <Add />
        </Button>
      ) : (
        <div
          className={flex({
            color: 'danger.text.initial',
            gap: '2',
            alignItems: 'center',
            textStyle: 'label-sm'
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 1.5C6.225 1.5 1.5 6.225 1.5 12C1.5 17.775 6.225 22.5 12 22.5C17.775 22.5 22.5 17.775 22.5 12C22.5 6.225 17.775 1.5 12 1.5ZM11.175 6H12.825V14.25H11.175V6ZM12 18.75C11.4 18.75 10.875 18.225 10.875 17.625C10.875 17.025 11.4 16.5 12 16.5C12.6 16.5 13.125 17.025 13.125 17.625C13.125 18.225 12.6 18.75 12 18.75Z"
              fill="#D31D27"
            />
          </svg>
          You have already uploaded the maximum number of files. Remove one or
          more files before uploading additional files.
        </div>
      )}
      <CohortUploadLibraryItemModal
        close={UploadModal.close}
        show={UploadModal.show}
        isOpen={UploadModal.isOpen}
        modalRef={UploadModal.modalRef}
      />
    </>
  );
};
