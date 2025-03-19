import { Calendar, Events, SoftwareResourceCluster } from '@carbon/icons-react';
import { CurriculumContentPage } from '../../content/Curriculum/Curriculum';
import { LearnersContentPage } from '../../content/Learners/Learners';
import { LibraryContentPage } from '../../content/Library/Library';
import { NameAndDescription } from '../../content/NameAndDescription/NameAndDescription';
import { ReportingInstructions } from '../../content/ReportingInstructions/ReportingInstructions';
import { ReviewContentPage } from '../../content/Review/Review';
import type {
  CreateCohortSubPageDetail,
  IsSetupStepCompleteCohortData
} from './CreateCohortPage.types';
import { isNameAndDescriptionComplete } from './utils/stepCompletionChecks/isNameAndDescriptionComplete/isNameAndDescriptionComplete';
import { nameAndDescriptionValidation } from './utils/subPageValidation/nameAndDescriptionValidation/nameAndDescriptionValidation';
import { reportingInstructionsValidation } from './utils/subPageValidation/reportingInstructionsValidation/reportingInstructionsValidation';
import { isReportingInstructionsComplete } from './utils/stepCompletionChecks/isReportingInstructionsComplete/isReportingInstructionsComplete';
import { isLearnersComplete } from './utils/stepCompletionChecks/isLearnersComplete/isLearnersComplete';
import { learnersValidation } from './utils/subPageValidation/learnersValidation/learnersValidation';

export const SUB_PAGES: CreateCohortSubPageDetail[] = [
  {
    id: 'name-and-description',
    displayName: 'Name and description',
    description: 'Decide what to call your cohort, and explain its purpose.',
    ContentComponent: NameAndDescription,
    isSetupStepComplete: isNameAndDescriptionComplete,
    validateInputForStep: nameAndDescriptionValidation
  },
  {
    id: 'reporting-instructions',
    displayName: 'Dates and environment',
    description: 'Choose when and where this cohort will take place.',
    Icon: Calendar,
    ContentComponent: ReportingInstructions,
    isSetupStepComplete: isReportingInstructionsComplete,
    validateInputForStep: reportingInstructionsValidation
  },
  // {
  //   id: 'settings',
  //   displayName: 'Settings',
  //   description: 'temp',
  //   ContentComponent: SettingsContentPage, // Todo - subsequent ticket
  //   isSetupStepComplete: () => false, // Todo - subsequent ticket
  //   validateInputForStep: async () => ({ success: false }) // Todo - subsequent ticket
  // },
  {
    id: 'learners',
    displayName: 'Learners',
    description:
      'Enter learners by uploading a list via a .csv template or add individuals one email at a time. Learners cannot be manually added to a cohort if public registration is enabled.',
    Icon: Events,
    ContentComponent: LearnersContentPage,
    isSetupStepComplete: isLearnersComplete,
    validateInputForStep: learnersValidation
  },
  {
    id: 'curriculum',
    displayName: 'Curriculum',
    description: 'temp',
    ContentComponent: CurriculumContentPage, // Todo - subsequent ticket
    isSetupStepComplete: () => true, // Todo - subsequent ticket
    validateInputForStep: async () => ({ success: true }) // Todo - subsequent ticket
  },
  {
    id: 'library',
    displayName: 'Library',
    description:
      'Add up to ten files, links, or documents for additional context and resources.',
    Icon: SoftwareResourceCluster,
    isOptional: true,
    ContentComponent: LibraryContentPage,
    isSetupStepComplete: (cohortData: IsSetupStepCompleteCohortData) => {
      return (
        isLearnersComplete(cohortData) &&
        isNameAndDescriptionComplete(cohortData) &&
        isReportingInstructionsComplete(cohortData)
      );
    },
    validateInputForStep: async () => ({ success: true }) //no validation since optional
  },
  {
    id: 'review',
    displayName: 'Review',
    description: 'temp',
    ContentComponent: ReviewContentPage, // Todo - subsequent ticket
    isSetupStepComplete: () => false, // Todo - subsequent ticket
    validateInputForStep: async () => ({ success: false }) // Todo - subsequent ticket
  }
];
