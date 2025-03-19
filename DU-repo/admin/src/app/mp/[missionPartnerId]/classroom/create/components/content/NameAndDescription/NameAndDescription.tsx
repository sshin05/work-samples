import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { SubPageContainer } from '../SubPageContainer/SubPageContainer';
import { DescriptionTextArea } from './components/DescriptionTextArea/DescriptionTextArea';
import { NameInput } from './components/NameInput/NameInput';
import { css } from '@cerberus/styled-system/css';

export const NameAndDescription = (
  createCohortSubPageDetail: CreateCohortContentComponentProps
) => {
  return (
    <SubPageContainer createCohortSubPageDetail={createCohortSubPageDetail}>
      <div className={css({ maxWidth: '520px', m: '0 auto' })}>
        <div className={css({ mb: 8 })}>
          <NameInput />
        </div>
        <DescriptionTextArea />
      </div>
    </SubPageContainer>
  );
};
