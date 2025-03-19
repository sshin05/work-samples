import { css } from '@cerberus/styled-system/css';
import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { SubPageContainer } from '../SubPageContainer/SubPageContainer';
import { AdditionalInformationTextArea } from './components/AdditionalInformationTextArea';
import { EnvironmentType } from './components/EnvironmentType';
import { MeetingDates } from './components/MeetingDates';

export const ReportingInstructions = (
  createCohortSubPageDetail: CreateCohortContentComponentProps
) => {
  return (
    <SubPageContainer createCohortSubPageDetail={createCohortSubPageDetail}>
      <div className={css({ maxWidth: '520px', m: '0 auto' })}>
        <MeetingDates />
        <EnvironmentType />
        <AdditionalInformationTextArea />
      </div>
    </SubPageContainer>
  );
};
