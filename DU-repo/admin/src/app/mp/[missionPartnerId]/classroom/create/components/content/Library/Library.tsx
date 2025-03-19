import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { SubPageContainer } from '../SubPageContainer/SubPageContainer';
import { CohortUploadLibraryItem } from './components/CohortUploadLibraryItem';
import { CohortLibraryItemsList } from './components/CohortLibraryItemsList';
import { vstack } from '@cerberus/styled-system/patterns';

export const LibraryContentPage = (
  createCohortSubPageDetail: CreateCohortContentComponentProps
) => {
  return (
    <SubPageContainer createCohortSubPageDetail={createCohortSubPageDetail}>
      <div className={vstack({ gap: '16' })}>
        <CohortUploadLibraryItem />
        <CohortLibraryItemsList />
      </div>
    </SubPageContainer>
  );
};
