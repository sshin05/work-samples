import type { ReactNode } from 'react';
import MainContentVStack from '../../layout/MainContentVStack';
import { PageHeader } from '../../typography/PageHeader';
import { css } from '@cerberus/styled-system/css';

type ServerPageLoaderProps = {
  header: string;
  children?: ReactNode;
};

export const ServerPageLoader = ({
  header,
  children
}: ServerPageLoaderProps) => {
  return (
    <MainContentVStack>
      <PageHeader>{header}</PageHeader>
      <div
        aria-busy="true"
        aria-label={`${header} Loading Skeleton 2`}
        className={css({ w: 'full' })}
      >
        <span>top section</span>
      </div>
      <div
        aria-busy="true"
        aria-label={`${header} Loading Skeleton`}
        className={css({ w: 'full', minH: '64' })}
      >
        {children}
      </div>
    </MainContentVStack>
  );
};
