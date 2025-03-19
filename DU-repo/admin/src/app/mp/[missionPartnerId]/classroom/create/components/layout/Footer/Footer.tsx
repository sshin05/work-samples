import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { ArrowRight } from '@carbon/icons-react';
import { Button, Show, Spinner } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';

type FooterProps = {
  nextPageName: string;
  isLastPage: boolean;
  onNextPageSelected: () => Promise<void>;
  isNextPageEnabled: boolean;
};

export const Footer = ({
  nextPageName,
  isLastPage,
  onNextPageSelected,
  isNextPageEnabled
}: FooterProps) => {
  const { missionPartnerId } = useRouteParams();
  const { isLoadingCohort } = useContext(CreateCohortContext);

  const isButtonDisabled = !isNextPageEnabled || isLoadingCohort;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNextButton = async () => {
    setIsLoading(true);
    await onNextPageSelected();
    setIsLoading(false);
  };

  return (
    <footer
      className={css({
        width: '100%',
        py: 5,
        px: 16,
        backgroundColor: 'page.surface.100',
        borderTop: '1px solid',
        borderColor: 'page.border.100',
        textAlign: 'right',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1
      })}
    >
      <Link
        className={css({ mr: 4 })}
        href={getRouteUrl(routeGenerators.Classrooms({ missionPartnerId }))}
      >
        <Button palette="action" shape="rounded" usage="outlined" size="sm">
          Cancel
        </Button>
      </Link>
      <Show
        when={isLastPage}
        fallback={
          <Button
            aria-busy={isLoadingCohort}
            disabled={isButtonDisabled || isLoading}
            shape="rounded"
            onClick={handleNextButton}
          >
            {isLoading && <Spinner size="1em" />}
            Next: {nextPageName}
            <ArrowRight />
          </Button>
        }
      >
        <Button shape="rounded">Publish</Button>
      </Show>
    </footer>
  );
};
