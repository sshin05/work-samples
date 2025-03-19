import {
  Modal,
  ModalHeader,
  ModalHeading,
  useModal,
  trapFocus,
  IconButton
} from '@cerberus/react';
import { Close } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { useEffect, useState } from 'react';
import { hstack } from '@cerberus/styled-system/patterns';

import type { User } from './components/AddExistingUserForm/components/UserSearchInput/UserSearchInput.types';
import { CreateUserForm } from './components/CreateUserForm/CreateUserForm';
import { AddExistingUserForm } from './components/AddExistingUserForm/AddExistingUserForm';
import { ADD_TITLE, CREATE_TITLE } from './AddLearnerModal.constants';
import type { CohortMemberData } from '../../[cohortId]/cohort.types';

type AddLearnerModalProps = {
  cohortId: string;
  displayModal: boolean;
  onClose: () => void;
  onSuccess: (cohortMember: CohortMemberData) => void;
  onError: () => void;
};

export const AddLearnerModal = ({
  cohortId,
  displayModal,
  onClose,
  onSuccess,
  onError
}: AddLearnerModalProps) => {
  const { modalRef, show: showModal, close: closeModal } = useModal();
  const editModalHandleKeyDown = trapFocus(modalRef);

  const [showCreateNewUserInputs, setShowCreateNewUserInputs] =
    useState<boolean>(false);
  const [userInputSearchValue, setUserInputSearchValue] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (displayModal) {
      showModal();
    } else {
      closeModal();
      setUserInputSearchValue(null);
      setShowCreateNewUserInputs(false);
    }
  }, [closeModal, displayModal, showModal]);

  const handleUserCreateState = () => {
    setShowCreateNewUserInputs(true);
  };

  // Maintain user input in parent to pre-populate "create new user" form
  // with user's previously entered email input. Avoid forcing the user to
  // re-enter the email input when selecting "create a new learner" button
  const handleExistingUserSelect = (user: User | null) => {
    setUserInputSearchValue(user?.email || null);
  };

  const modalTitle = showCreateNewUserInputs ? CREATE_TITLE : ADD_TITLE;

  return (
    <Modal
      onKeyDown={editModalHandleKeyDown}
      ref={modalRef}
      className={css({ overflow: 'visible' })}
    >
      <ModalHeader>
        <ModalHeading className={hstack({ mb: '2', w: 'full' })}>
          {modalTitle}
          <IconButton
            ariaLabel="Close"
            size="lg"
            palette="action"
            usage="ghost"
            onClick={onClose}
            className={css({
              alignSelf: 'start',
              ml: 'auto',
              cursor: 'pointer'
            })}
          >
            <Close size={24} />
          </IconButton>
        </ModalHeading>
      </ModalHeader>

      {!showCreateNewUserInputs && (
        <AddExistingUserForm
          cohortId={cohortId}
          userInputSearchValue={userInputSearchValue}
          onClose={onClose}
          onSuccess={onSuccess}
          onError={onError}
          onSelectExistingUser={handleExistingUserSelect}
          onCreateNewUserSelected={handleUserCreateState}
          onAddExistingUserFormInputChange={(searchValue: string) => {
            setUserInputSearchValue(searchValue);
          }}
        />
      )}

      {showCreateNewUserInputs && (
        <CreateUserForm
          cohortId={cohortId}
          userInputSearchValue={userInputSearchValue}
          onClose={onClose}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
    </Modal>
  );
};
