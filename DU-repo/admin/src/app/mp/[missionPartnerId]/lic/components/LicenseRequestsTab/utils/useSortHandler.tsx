import { useEffect } from 'react';

const sortFieldMap = { userFirstName: 'name' };

export const useSortHandler = (sorting, page, searchText, setLicenseInfo) => {
  useEffect(() => {
    setLicenseInfo(state => {
      const sortField = sorting.length
        ? sortFieldMap[sorting[0].id] || sorting[0].id
        : undefined;
      return {
        ...state,
        sortField,
        sortDirection: sorting.length
          ? sorting[0].desc
            ? 'desc'
            : 'asc'
          : undefined,
        pageNumber: page
      };
    });
  }, [sorting, page, setLicenseInfo]);

  useEffect(() => {
    setLicenseInfo(state => ({
      ...state,
      search: searchText,
      pageNumber: 1
    }));
  }, [searchText, setLicenseInfo]);
};
