'use client';
import { css } from '@cerberus/styled-system/css';
import { SideNav } from '../../layout/SideNav/SideNav';
import { SUB_PAGES } from './CreateCohortPage.constants';
import { useRouteParams } from '@/hooks/useRouteParams';
import type { CreateCohortSubPageDetail } from './CreateCohortPage.types';
import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../layout/Footer/Footer';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortStateReducerActionTypes } from '../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import { useRouter } from 'next/navigation';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const createCohortSubPages = SUB_PAGES;

export const CreateCohortPage = () => {
  const router = useRouter();
  const { cohortId, missionPartnerId } = useRouteParams();
  const hasCohort = Boolean(cohortId);

  const {
    createCohortState,
    updateCohortState,
    cohortDetails,
    isLoadingCohort,
    saveCohortState
  } = useContext(CreateCohortContext);

  const [activeSubPage, setActiveSubPage] = useState<CreateCohortSubPageDetail>(
    createCohortSubPages[0]
  );

  const [nextSubPage, setNextSubPage] = useState<CreateCohortSubPageDetail>(
    createCohortSubPages[1]
  );

  const [didSetInitialPage, setDidSetInitialPage] = useState(false);

  useEffect(
    () => {
      // Navigate the user to the next incomplete step on render to rehydrate app based on draft cohort completion
      const didLoadCohort =
        hasCohort && cohortDetails?.cohort?.id && !isLoadingCohort;
      if (didLoadCohort && !didSetInitialPage) {
        const firstIncompleteStepIndex = createCohortSubPages.findIndex(
          subPage => !subPage.isSetupStepComplete(cohortDetails)
        );
        setDidSetInitialPage(true);
        setActiveSubPage(createCohortSubPages[firstIncompleteStepIndex]);
      }
    },
    // do not include cohortDetails in the dependency array, causes proceed to next step on every successful api call
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hasCohort,
      cohortDetails?.cohort?.id,
      isLoadingCohort,
      cohortDetails.cohort
    ]
  );

  const handleActivePageChange = (
    incomingSubPage: CreateCohortSubPageDetail
  ) => {
    const nextSubPageIndex = createCohortSubPages.findIndex(
      subPage => subPage.id === incomingSubPage.id
    );

    setActiveSubPage(incomingSubPage);
    setNextSubPage(createCohortSubPages[nextSubPageIndex + 1]);
  };

  const saveStep = async (): Promise<{ success: boolean }> => {
    const { success, error } = await activeSubPage.validateInputForStep({
      createCohortState,
      missionPartnerId
    });

    if (success) {
      saveCohortState();

      return { success };
    } else {
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: error
      });

      return { success };
    }
  };

  const handleSaveAndExit = async () => {
    const { success } = await saveStep();

    if (success) {
      router.push(
        getRouteUrl(routeGenerators.Classrooms({ missionPartnerId }))
      );
    }
  };

  const handleNextPage = async () => {
    const { success } = await saveStep();

    if (success) {
      handleActivePageChange(nextSubPage);
    }
  };

  const handleSideNavItemClick = (
    navItemSubPage: CreateCohortSubPageDetail
  ) => {
    handleActivePageChange(navItemSubPage);
  };

  return (
    <div
      className={css({
        display: 'flex',
        h: '100vh'
      })}
    >
      <SideNav
        activeSubPage={activeSubPage}
        navItems={createCohortSubPages}
        onNavItemClick={handleSideNavItemClick}
        nextSubPage={nextSubPage}
        isNextPageEnabled={activeSubPage.isSetupStepComplete(cohortDetails)}
        onSaveAndExit={handleSaveAndExit}
      />
      <div className={css({ flex: 1, my: 16 })}>
        <main className={css({ maxW: '700px', m: '0 auto' })}>
          <activeSubPage.ContentComponent
            title={activeSubPage.displayName}
            Icon={activeSubPage.Icon}
            description={activeSubPage.description}
            isOptional={activeSubPage?.isOptional}
          />
        </main>
      </div>
      <Footer
        isLastPage={nextSubPage === undefined}
        nextPageName={nextSubPage?.displayName}
        onNextPageSelected={handleNextPage}
        isNextPageEnabled={!createCohortState.validationError}
      />
    </div>
  );
};
