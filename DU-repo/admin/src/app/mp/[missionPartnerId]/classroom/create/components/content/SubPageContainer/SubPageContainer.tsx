import { useContext, type ReactNode } from 'react';
import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { ContentSectionHeader } from '../ContentSectionHeader/ContentSectionHeader';
import { css } from '@cerberus/styled-system/css';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';

type SubPageContainerProps = {
  children: ReactNode;
  createCohortSubPageDetail: CreateCohortContentComponentProps;
};

export const SubPageContainer = ({
  children,
  createCohortSubPageDetail
}: SubPageContainerProps) => {
  const { isLoadingCohort } = useContext(CreateCohortContext);

  return (
    <>
      <ContentSectionHeader
        title={createCohortSubPageDetail.title || ''}
        description={createCohortSubPageDetail.description}
        Icon={createCohortSubPageDetail.Icon}
        isOptional={createCohortSubPageDetail.isOptional}
      />
      <div aria-busy={isLoadingCohort} className={css({ mt: 16, m: '0 auto' })}>
        {children}
      </div>
    </>
  );
};
