import { useState, useMemo } from 'react';
import { Tabs, Tab, TabPanel, Button, TabsList } from '@cerberus/react';
import { AddSingleUser } from './components/AddSingleUser';
import { AddMultipleUsers } from './components/AddMultipleUsers';
import { validateEmail } from '@/utils/string/validateEmail';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import Image from 'next/image';
import type { Props, User } from './ImportUsersModal.types';
import { css } from '@cerberus/styled-system/css';

export const ImportUsersModal = ({
  error = null,
  userNotFoundText = undefined,
  onClose = () => null,
  onAddMultipleUsers,
  onAddSingleUser,
  loading = false
}: Props) => {
  const [handleNewUser, setHandleNewUser] = useState(true);
  const [activeView, setActiveView] = useState(0);
  const [singleLearner, setSingleLearner] = useState<User>({});
  const [showTabs, setShowTabs] = useState(true); // true when showing tabs, false when showing file upload

  // Disable button if requirements are not met
  const disabled = useMemo(() => {
    if (activeView === 1) {
      const { email, firstName, lastName } = singleLearner;
      const isValid =
        validateEmail(email) && firstName?.length > 1 && lastName?.length > 1;

      return !isValid;
    }
  }, [activeView, singleLearner]);

  const switchView = id => {
    setActiveView(id);
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div>
      {
        // If showTabs is true, show tabs. If false, show file upload
        showTabs ? (
          <Tabs defaultValue="multipleLearners">
            <TabsList>
              <Tab value="multipleLearners" onClick={() => switchView(0)}>
                Multiple Learners
              </Tab>
              <Tab value="singleLearner" onClick={() => switchView(1)}>
                Single Learner
              </Tab>
            </TabsList>
            {loading ? (
              <div
                className={css({
                  w: 'full',
                  h: '210px',
                  mt: '4',
                  rounded: 'md'
                })}
                aria-busy="true"
                aria-label="loading"
              >
                loading
              </div>
            ) : (
              <div>
                <TabPanel value="multipleLearners">
                  <div
                    className={vstack({
                      gap: '4',
                      m: '4',
                      alignItems: 'flex-start'
                    })}
                  >
                    <p>
                      Use a .csv template to upload up to <b>500 learners</b> at
                      a time.
                    </p>
                    <Image
                      width={480}
                      height={480}
                      src="/admin/images/user-spreadsheet.svg"
                      alt="user spreadsheet"
                    />
                    <div className={hstack({ gap: '1', w: 'full' })}>
                      <Button
                        palette="action"
                        shape="rounded"
                        usage="filled"
                        onClick={() => {
                          setShowTabs(false);
                        }}
                      >
                        Continue
                      </Button>
                      <Button
                        palette="action"
                        shape="rounded"
                        usage="outlined"
                        onClick={handleOnClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="singleLearner">
                  <div>
                    <AddSingleUser
                      setSingleUser={setSingleLearner}
                      singleUser={singleLearner}
                      setHandleNewUser={setHandleNewUser}
                      handleNewUser={handleNewUser}
                      error={error}
                      userNotFoundText={userNotFoundText}
                    />
                    <div className={hstack({ gap: '1', pt: '2' })}>
                      <Button
                        palette="action"
                        shape="rounded"
                        usage="filled"
                        disabled={disabled}
                        onClick={() => {
                          onAddSingleUser(singleLearner);
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        palette="action"
                        shape="rounded"
                        usage="outlined"
                        onClick={handleOnClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </TabPanel>
              </div>
            )}
          </Tabs>
        ) : (
          <AddMultipleUsers
            onAddMultipleUsers={onAddMultipleUsers}
            setShowTabs={setShowTabs}
            handleOnClose={handleOnClose}
          />
        )
      }
    </div>
  );
};
