import { ProgramList } from '../ProgramList/ProgramList';
import { ProgramLink } from '../ProgramLink';
import { css } from '@cerberus/styled-system/css';
import { SkeletonPanel } from '@/components_new/loaders/SkeletonPanel';
import { PROGRAM_LINK_BORDER_RADIUS } from '../ProgramLink/programLinkConsts';

type Props = {
  /**
   * The number of skeletons to render.  Defaults to 8
   */
  numberOfSkeletons?: number;
};

/**
 * Renders a **loading** list of skeletons wrapped around placeholder ProgramLink components.
 *
 * This component always appears to be loading.  The children are only used for sizing and are not meant to be displayed.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <MMPSkeleton numberOfSkeletons={5} />
 */
export const MMPSkeleton = ({ numberOfSkeletons = 8 }: Props) => {
  return (
    <ProgramList>
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <SkeletonPanel
          key={index}
          className={css({ borderRadius: PROGRAM_LINK_BORDER_RADIUS })}
        >
          <ProgramLink
            href="#"
            logoUrl=""
            tagName=""
            affiliateId=""
            programName=""
          />
        </SkeletonPanel>
      ))}
    </ProgramList>
  );
};
