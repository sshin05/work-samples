import type {
  sqlGetCohort,
  sqlFindCohortMembers,
  sqlFindCohorts
} from '@/app/api/cohorts';
import type { SQLServiceReturnType } from '@/app/api';

export type CohortData = SQLServiceReturnType<
  typeof sqlGetCohort
>['_serviceData'];

export type CohortDetailsData = SQLServiceReturnType<typeof sqlGetCohort>;

export type CohortMemberData = SQLServiceReturnType<
  typeof sqlFindCohortMembers
>['_serviceData']['records'][number];

export type CohortLibraryItemType = 'File' | 'Video' | 'Audio' | 'Link';
export type CohortLibraryItem = {
  id: string;
  url: string;
  name: string;
  type: CohortLibraryItemType;
  date: string;
};
export type LibraryItemType = 'Document' | 'Video' | 'Audio' | 'Unknown';
export type LibraryItem =
  CohortDetailsData['_serviceData']['libraryItems'][number];

export type FindCohortData = SQLServiceReturnType<
  typeof sqlFindCohorts
>['_serviceData']['records'][number];
