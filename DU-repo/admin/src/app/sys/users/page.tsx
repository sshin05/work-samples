'use client';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Download } from '@carbon/icons-react';
import {
  colors,
  useToast,
  Button as DuiButton,
  Text
} from '@digital-u/digital-ui';
import { Button } from '@cerberus/react';
import { CaretDown } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';

import {
  useCountAllUsers,
  useCountCacEnabledUsers,
  useCountNewUsers,
  useExportUsers
} from '@/api/user';
import { DropDown } from '@/components_new/deprecated/DropDown';
import DashboardCard from '../../../components/metrics-dashboard/dashboard-card';
import { Modal } from '@/components_new/deprecated/Modal';
import SearchBar from '../../../components/search-bar/search-bar';
import SimplePaginationLayout from '../../../components/simple-pagination-layout/SimplePaginationLayout';
import StatePlaceholder from '../../../components/state-placeholder/state-placeholder';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { UserCard } from './components/UserCard';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';

const PillButton = styled(DuiButton)`
  :hover {
    border: 2px solid ${colors.purple[800]} !important;
    color: ${colors.purple[800]} !important;
`;

const DAY_RANGE = 7;

const ManageUsers = () => {
  const { data: session } = useSession();
  const [currentBranch, setCurrentBranch] = useState('Global');
  const [query, setQuery] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [branchSelectorDisabled, setBranchSelectorDisabled] = useState(false);
  const [from, setFrom] = useState(1);
  const [, setToast] = useToast();

  const handlerBranchRoleSelect = useCallback((role, branch) => {
    if (role === 'admin') {
      if (localStorage.getItem('selectedContext')) {
        setCurrentBranch(localStorage.getItem('selectedContext'));
      } else {
        localStorage.setItem('selectedContext', 'Global');
      }
    } else {
      localStorage.setItem('selectedContext', branch);
      setCurrentBranch(branch);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (session?.user?.name.includes('admin')) {
        handlerBranchRoleSelect('admin', null);
      } else if (session?.user?.name.includes('sf-admin')) {
        setBranchSelectorDisabled(true);
        handlerBranchRoleSelect('sf-admin', 'Space Force');
      } else if (session?.user?.name.includes('af-admin')) {
        setBranchSelectorDisabled(true);
        handlerBranchRoleSelect('af-admin', 'Air Force');
      }
    }
  }, [setBranchSelectorDisabled, handlerBranchRoleSelect, session]);

  const { exportUsers: _exportUsers, exportUsersError } = useExportUsers();

  const exportUsers = useCallback(
    async branch => {
      _exportUsers({ variables: { branch } }).then(() => {
        setToast({
          kind: 'success',
          title: 'Success',
          subtitle: `The export has been started. You will receive an email when it is ready.`
        });
      });
    },
    [_exportUsers, setToast]
  );

  // countAllUsers with undefined on branch = no error, and returns correct data
  const { countUsers, countUsersLoading } = useCountAllUsers(
    currentBranch === 'Global' ? undefined : currentBranch
  );

  // countNewUsers with undefined on branch = no error, not yet sure about data -- undefined add api branch value to '*'
  // countNewUsers with 'Global' on branch = no error, not yet sure about data
  const { countNewUsers, countNewUsersLoading } = useCountNewUsers(
    currentBranch === 'Global' ? undefined : currentBranch,
    DAY_RANGE
  );

  // countCacEnabledUsers with 'Global' on branch = no error, not yet sure about data
  // countCacEnabledUsers with undefined on branch FAILS
  // countCacEnabledUsers with '*' on branch = no error, not yet sure about data
  const { countCacEnabledUsers, countCacEnabledUsersLoading } =
    useCountCacEnabledUsers(
      currentBranch === 'Global' ? 'Global' : currentBranch
    );

  let cacEnabledUserPercentage;
  if (countUsers && countUsers > 0) {
    cacEnabledUserPercentage = (countCacEnabledUsers * 100) / countUsers;
  }

  const dashboardCardStyleObject = {
    width: '300px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px'
  };
  const {
    usersBySearch,
    usersBySearchLoading,
    usersBySearchError,
    isMore,
    fetchUsersBySearch
  } = useFindUsersBySearchTextLazy();

  useEffect(() => {
    if (exportUsersError) {
      setErrorModal(true);
    }
  }, [exportUsersError]);

  useEffect(() => {
    if (!usersBySearchLoading && !usersBySearchError && usersBySearch) {
      setUsersList([...usersList, ...usersBySearch]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersBySearch]);

  useEffect(() => setUsersList([]), [query, currentBranch]);

  const onSearch = searchQuery => {
    if (searchQuery === query) return;
    setFrom(1);
    setQuery(searchQuery);
    fetchUsersBySearch(searchQuery, 1);
  };

  const onLoadMoreClick = () => {
    const newFrom = from + 1;
    fetchUsersBySearch(query, newFrom);
    setFrom(newFrom);
  };

  const onHandleDropDownClick = branch => {
    localStorage.setItem('selectedContext', branch);
    setCurrentBranch(branch);
    onSearch(query);
  };

  return (
    <MainContentVStack>
      {errorModal && (
        <Modal title="Error Loading Data" onClose={() => setErrorModal(false)}>
          <div className={css({ mx: 4, my: 4 })}>
            There was a problem loading the data. <br />
            Please try again later.
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end',
              mr: 4
            })}
          >
            <Button palette="action" onClick={() => setErrorModal(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      <div
        className={css({
          width: ['calc(100% - 30px)', '737px', '1275px'],
          marginLeft: 'auto',
          marginRight: 'auto'
        })}
      >
        {' '}
        <div
          className={css({
            pt: 'l',
            pb: ['base', 'base', 'm'],
            display: 'flex',
            justifyContent: 'space-between'
          })}
        >
          <Text
            size="h2"
            variant="dark"
            fontWeight="bold"
            style={{ color: colors.purple[800] }}
          >
            Find A User
          </Text>
          {!branchSelectorDisabled && (
            <div>
              <DropDown
                icon={<CaretDown name="arrow_drop_down" size="20" />}
                links={[
                  {
                    title: 'Global',
                    onClick: () => {
                      onHandleDropDownClick('Global');
                    },
                    sx: {
                      width: '7rem'
                    }
                  },
                  {
                    title: 'Air Force',
                    onClick: () => {
                      onHandleDropDownClick('Air Force');
                    }
                  },
                  {
                    title: 'Space Force',
                    onClick: () => {
                      onHandleDropDownClick('Space Force');
                    }
                  }
                ]}
                userSelectedValue={currentBranch}
                placeholder="Global"
                showTextbox
              />
            </div>
          )}
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          })}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end'
            })}
          >
            <div
              className={css({
                justifyContent: 'space-between',
                borderRadius: '5px',
                color: 'red'
              })}
            >
              <DashboardCard
                headingTitle="Total Users"
                headingValue={countUsers ? countUsers : '0'}
                footerTitle="joined in the last 7 days"
                footerValue={countNewUsers ? countNewUsers : '0'}
                sx={dashboardCardStyleObject}
                loading={countUsersLoading || countNewUsersLoading}
              />
            </div>
            <div
              className={css({
                justifyContent: 'space-between',
                borderRadius: '5px',
                mr: '20px',
                ml: '40px'
              })}
            >
              <DashboardCard
                headingTitle="CAC Enabled Accounts"
                headingValue={countCacEnabledUsers ? countCacEnabledUsers : '0'}
                footerTitle="% Of All Accounts"
                footerValue={
                  cacEnabledUserPercentage
                    ? Math.round(cacEnabledUserPercentage * 10) / 10
                    : '0'
                }
                sx={dashboardCardStyleObject}
                loading={countCacEnabledUsersLoading}
              />
            </div>
            <div>
              <PillButton
                onClick={() =>
                  exportUsers(
                    currentBranch !== 'Global' ? currentBranch : undefined
                  )
                }
                kind="pill"
                leftIcon={<Download size="16" />}
              >
                EXPORT ALL USER DATA
              </PillButton>
            </div>
          </div>
        </div>
        <div
          className={css({
            pt: '32px',
            pb: 'base'
          })}
        >
          <SearchBar
            context="light"
            placeholder="Search By Name or Email Address"
            onSearch={onSearch}
          />
        </div>
        <SimplePaginationLayout
          emptyComponent={
            usersBySearchLoading ? (
              <StatePlaceholder
                context="dark"
                placeholder="Searching..."
                sx={{ bg: 'transparent' }}
              />
            ) : (
              <StatePlaceholder
                context="dark"
                placeholder="No users found"
                sx={{ bg: 'transparent' }}
              />
            )
          }
          ComponentItem={user => <UserCard {...user} />}
          items={usersList}
          onLoadMore={onLoadMoreClick}
          showLoadMore={
            usersBySearch &&
            !usersBySearchLoading &&
            !usersBySearchError &&
            usersBySearch.length > 0 &&
            isMore
          }
          sx={{
            width: '800px'
          }}
        />
        <div
          className={css({
            pb: '4'
          })}
        />
      </div>
    </MainContentVStack>
  );
};

export default ManageUsers;
