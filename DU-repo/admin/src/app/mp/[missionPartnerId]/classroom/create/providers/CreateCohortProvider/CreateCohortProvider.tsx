import { createContext, useEffect, useReducer } from 'react';
import {
  createCohortStateReducer,
  createCohortStateReducerInitialState
} from './createCohortStateReducer';
import {
  type CreateCohortInitialContextType,
  CreateCohortStateReducerActionTypes
} from './CreateCohortProvider.types';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import {
  sqlCreateCohort,
  sqlFindCohortMembers,
  sqlGetCohort,
  sqlUpdateCohort
} from '@/app/api/cohorts';
import { useRouteParams } from '@/hooks/useRouteParams';
import { createCohortInitialState } from './CreateCohortProvider.constants';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { CohortData } from '../../../[cohortId]/cohort.types';

export const initialContext: CreateCohortInitialContextType = {
  /** Application state for user progression through cohort creation process */
  createCohortState: { ...createCohortInitialState },
  updateCohortState: () => {},
  saveCohortState: () => {},
  updateAndSaveCohortState: () => new Promise(() => {}),
  cohortDetails: {
    cohort: null,
    cohortMembers: []
  },
  isLoadingCohort: true
};

export const CreateCohortContext =
  createContext<CreateCohortInitialContextType>(initialContext);

export const CreateCohortProvider = ({ children }) => {
  const { cohortId, missionPartnerId } = useRouteParams();
  const [createCohortState, dispatch] = useReducer(
    createCohortStateReducer,
    createCohortStateReducerInitialState
  );

  const pageCohortId = createCohortState.cohortId || cohortId || null;

  const { mutation: createCohort } = useSQLMutation(sqlCreateCohort);
  const { mutation: updateCohort } = useSQLMutation(sqlUpdateCohort);
  const {
    data: cohort,
    loading: isLoadingCohort,
    query: fetchCohort
  } = useSQLQuery(sqlGetCohort, {
    options: {
      id: pageCohortId
    }
  });

  const {
    data: cohortMembers,
    loading: isLoadingCohortMembers,
    query: fetchCohortMembers
  } = useSQLQuery(sqlFindCohortMembers, {
    options: {
      filter: {
        cohortId: pageCohortId
      }
    }
  });

  useEffect(() => {
    const didLoadCohort =
      isLoadingCohort === false && pageCohortId && Boolean(cohort?.id);

    if (didLoadCohort) {
      dispatch({
        type: CreateCohortStateReducerActionTypes.SYNC_COHORT_DATA,
        payload: cohort
      });
    }
  }, [cohort, isLoadingCohort, pageCohortId]);

  useEffect(() => {
    const didLoadCohortMembers =
      isLoadingCohortMembers === false && pageCohortId && Boolean(cohort?.id);

    if (didLoadCohortMembers) {
      dispatch({
        type: CreateCohortStateReducerActionTypes.SYNC_COHORT_MEMBERS,
        payload: cohortMembers?.records || []
      });
    }
  }, [
    cohort,
    cohortMembers?.records,
    isLoadingCohort,
    isLoadingCohortMembers,
    pageCohortId
  ]);

  const handleCreateCohort = async () => {
    const { data } = await createCohort({
      missionPartnerId,
      name: createCohortState.name,
      description: createCohortState.description || null
    });

    const createdCohortId = data?.id;
    const newPath = getRouteUrl(
      routeGenerators.CreateCohortById({
        missionPartnerId,
        cohortId: createdCohortId
      })
    );

    window.history.replaceState(null, '', `/admin/${newPath}`);

    await fetchCohort({ id: createdCohortId });

    dispatch({
      type: CreateCohortStateReducerActionTypes.SET_COHORT_ID,
      payload: createdCohortId
    });
  };

  const handleUpdateCohort = async () => {
    await updateCohort({
      ...cohort,
      ...Object.keys(createCohortState).reduce((acc, key) => {
        acc[key] = createCohortState[key];
        return acc;
      }, {})
    });

    await fetchCohort({ id: cohort.id });
    await fetchCohortMembers({ filter: { cohortId: cohort.id } });
  };

  const handleUpdateAndSaveCohort = async (updatedCohort: CohortData) => {
    dispatch({
      type: CreateCohortStateReducerActionTypes.UPDATE_COHORT,
      payload: updatedCohort
    });

    await updateCohort(updatedCohort);

    await fetchCohort({ id: updatedCohort.id });
    await fetchCohortMembers({ filter: { cohortId: updatedCohort.id } });
  };

  const handleCohortSave = async () => {
    try {
      const shouldCreateCohort =
        !createCohortState.id && createCohortState.name;

      if (shouldCreateCohort) {
        await handleCreateCohort();
      } else {
        await handleUpdateCohort();
      }
    } catch {}
  };

  const isInitialPageLoad =
    (isLoadingCohort || isLoadingCohortMembers) && !cohort?.id;

  return (
    <CreateCohortContext.Provider
      value={{
        createCohortState,
        updateCohortState: dispatch,
        saveCohortState: handleCohortSave,
        updateAndSaveCohortState: handleUpdateAndSaveCohort,
        cohortDetails: {
          cohort,
          cohortMembers: cohortMembers?.records || []
        },
        isLoadingCohort: isInitialPageLoad
      }}
    >
      {children}
    </CreateCohortContext.Provider>
  );
};
