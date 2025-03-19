'use client';
import { TabContent } from '@/app/marketplace/components/MarketplaceClientWrapper/components/TabContent/TabContent';
import { Tab, TabsList, TabPanel, Tabs } from '@cerberus/react';
import { css } from 'styled-system/css';
import type { CohortData } from '../../cohort.types';
import { LearnersTable } from './components/LearnersTable/LearnersTable';
import { LibraryItemsTable } from './components/LibraryItemsTable/LibraryItemsTable';

import type { JSX } from 'react';

type Props = {
  cohort: CohortData;
};

/**
 * A table component for managing classroom data, including learners and library items.
 *
 * - Includes tabs to toggle between learners and library items views.
 * - Provides modals for adding learners and uploading library items.
 *
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <ClassroomTable cohort={cohort} />
 * ```
 */
export const ClassroomTable = ({ cohort }: Props): JSX.Element => {
  return (
    <div>
      <Tabs defaultValue="learners">
        <TabsList className={css({ mb: '6' })}>
          <Tab value="learners">Learners</Tab>
          <Tab value="library">Library</Tab>
        </TabsList>

        <TabPanel value="learners">
          <TabContent title="">
            <LearnersTable cohortId={cohort.id} />
          </TabContent>
        </TabPanel>

        <TabPanel value="library">
          <TabContent title="">
            <LibraryItemsTable cohortId={cohort.id} />
          </TabContent>
        </TabPanel>
      </Tabs>
    </div>
  );
};
