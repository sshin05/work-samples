import { useState, type Dispatch, type SetStateAction } from 'react';

type UseHandleFilterChangeProps = {
  setFirstTimeSearch: Dispatch<SetStateAction<boolean>>;
  setLoadedItems: Dispatch<SetStateAction<unknown[]>>;
  isAllSourcesSelected: boolean;
  firstTimeSearch: boolean;
  defaultItemFilter?: string;
};

export const useHandleFilterChange = ({
  setFirstTimeSearch,
  setLoadedItems,
  isAllSourcesSelected,
  firstTimeSearch,
  defaultItemFilter
}: UseHandleFilterChangeProps) => {
  const [searchAfter, setSearchAfter] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    vendor: null,
    type: isAllSourcesSelected ? null : defaultItemFilter,
    page: 1,
    // TODO: Revert to pageSize 10 when backend search can handle sorting
    pageSize: 25,
    planType: null,
    lastFilterPropChanged: null
  });

  const handleFilterChange = async (key, value) => {
    if (key !== 'page') {
      setLoadedItems([]);
      setSearchAfter(null);
    }

    if (firstTimeSearch) {
      setFirstTimeSearch(previousStatus => !previousStatus);
    }

    // If the user switches from a non-plan to a plan
    // we need to clear the vendor filter
    if (key === 'type' && value === 'Plan' && filter?.vendor) {
      setFilter(previousFilter => ({
        ...previousFilter,
        vendor: null
      }));
    }

    // If the user switches from a plan to a non-plan
    // we need to clear the planType filter
    if (key === 'type' && value !== 'Plan' && filter?.planType) {
      setFilter(previousFilter => ({
        ...previousFilter,
        planType: null
      }));
    }

    if (key === 'type' && value === 'Lab') {
      setFilter(previousFilter => ({
        ...previousFilter,
        type: 'Lab'
      }));
    }

    setFilter(previousFilter => {
      // Need to set us back to the first page if the user
      // changes any filter other than the page
      if (previousFilter.page !== 1 && key !== 'page') {
        return {
          ...previousFilter,
          lastFilterPropChanged: key,
          [key]: value,
          page: 1
        };
      }

      return { ...previousFilter, lastFilterPropChanged: key, [key]: value };
    });
  };

  return {
    handleFilterChange,
    searchAfter,
    setSearchAfter,
    setFilter,
    filter
  };
};
