import { ErrorFilled } from '@carbon/icons-react';
import {
  StyledCircleBackground,
  StyledCircleStroke,
  StyledInlineLoadingAnimation,
  StyledInlineLoadingText,
  StyledInlineLoadingWrapper,
  StyledLoadingAnimatedDiv,
  StyledLoadingSvg
} from './InlineLoading.styles';
import { colors } from '@digital-u/digital-ui';
import type { InlineLoadingProps } from './InlineLoading.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const InlineLoading = ({
  description = 'Loading...',
  status = 'active'
}: InlineLoadingProps) => {
  return (
    <StyledInlineLoadingWrapper>
      <StyledInlineLoadingAnimation>
        {status === 'active' ? (
          <StyledLoadingAnimatedDiv>
            <StyledLoadingSvg viewBox="0 0 100 100">
              <title>loading</title>
              <StyledCircleBackground cx="50%" cy="50%" r="44" />
              <StyledCircleStroke cx="50%" cy="50%" r="44" />
            </StyledLoadingSvg>
          </StyledLoadingAnimatedDiv>
        ) : (
          <div>
            <ErrorFilled height={16} width={16} color={colors.red[800]}>
              <title>error</title>
            </ErrorFilled>
          </div>
        )}
        <StyledInlineLoadingText>{description}</StyledInlineLoadingText>
      </StyledInlineLoadingAnimation>
    </StyledInlineLoadingWrapper>
  );
};
