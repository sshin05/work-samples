import { useEffect, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';

const VALID_SORT_MAP = {
  userEmail: 'email'
};

type SortingEffectsProps = {
  missionPartnerId?: string;
  vendorId?: string;
  pageSize: number;
  pageNumber?: number;
  sorting?: SortingState;
  searchTerm?: string;
};

/**
 *
 * @fileoverview This hook is used to manage the sorting `useEffects` for the VendorLicenseTable component.
 *  The useFindLicensesByMissionPartnerAndVendor query leverages `setQueryState`/`queryState` to re-execute queries on filter/sorting/page changes.
 */
export const useSortingEffects = ({
  missionPartnerId,
  vendorId,
  pageSize,
  pageNumber,
  sorting,
  searchTerm
}: SortingEffectsProps) => {
  // todo - add types when able to run codegen against backend; align this to useFindLicensesByMissionPartnerAndVendor
  const [queryState, setQueryState] = useState<Record<string, unknown>>({
    missionPartnerId,
    vendorId,
    pageSize,
    pageNumber
  });

  // fires only when mpid or vendor id change
  useEffect(() => {
    setQueryState({
      pageSize,
      pageNumber,
      vendorId,
      missionPartnerId
    });
  }, [missionPartnerId, vendorId, pageSize, pageNumber]);

  // fires only when tanstack sorting changes
  useEffect(() => {
    const sortField =
      sorting?.length > 0
        ? (VALID_SORT_MAP[sorting[0]?.id] ?? sorting[0]?.id)
        : undefined;
    const sortDirection =
      sorting?.length > 0 ? (sorting[0]?.desc ? 'desc' : 'asc') : undefined;

    setQueryState(state => ({
      ...state,
      page: 1,
      pageNumber: 1,
      sortField,
      sortDirection
    }));
  }, [sorting]);

  // fires only when the search term changes
  useEffect(() => {
    setQueryState(state => ({
      ...state,
      page: 1,
      pageNumber: 1,
      search: searchTerm || undefined
    }));
  }, [searchTerm]);

  return {
    queryState
  };
};
