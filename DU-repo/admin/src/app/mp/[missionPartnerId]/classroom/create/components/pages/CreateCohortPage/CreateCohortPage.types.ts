import type { SQLServiceReturnType } from '@/app/api';
import type { sqlGetCohort } from '@/app/api/cohorts';
import type { CarbonIconType } from '@carbon/icons-react';
import type {
  CreateCohortState,
  CreateCohortStateInputValidationErrors
} from '../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import type { CohortMemberData } from '../../../../[cohortId]/cohort.types';

export type CohortData = SQLServiceReturnType<
  typeof sqlGetCohort
>['_serviceData'];

export type CreateCohortContentComponentProps = {
  title: string;
  description: string;
  Icon?: CarbonIconType;
  isOptional?: boolean;
};

export type ValidateInputForStepArguments = {
  createCohortState: CreateCohortState;
  missionPartnerId?: string;
};

export type IsSetupStepCompleteCohortData = {
  cohort: CohortData;
  cohortMembers: CohortMemberData[];
};

export type CreateCohortSubPageDetail = {
  displayName: string;
  id: string;
  Icon?: CarbonIconType;
  description: string;
  isOptional?: boolean;
  ContentComponent: React.ComponentType<CreateCohortContentComponentProps>;
  onSave?: () => void;
  isSetupStepComplete: (cohortData: IsSetupStepCompleteCohortData) => boolean;
  validateInputForStep: ({
    createCohortState,
    missionPartnerId
  }: ValidateInputForStepArguments) => Promise<{
    success: boolean;
    error?: CreateCohortStateInputValidationErrors;
  }>;
};
