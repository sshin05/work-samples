import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, spacing, typography } from '@digital-u/digital-ui';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledCircleBackground = styled.circle`
  stroke: ${colors.gray[100]};
  stroke-dashoffset: -22;
  stroke-dasharray: 276.461px, 276.461px;
  stroke-linecap: butt;
  stroke-width: 16px;
`;

export const StyledLoadingSvg = styled.svg`
  fill: transparent;
`;

export const StyledCircleStroke = styled.circle`
  stroke: #0f62fe;
  stroke-dashoffset: 143.76px;
  stroke-dasharray: 276.461px, 276.461px;
  stroke-linecap: butt;
  stroke-width: 16px;
`;

export const StyledInlineLoadingWrapper = styled.div`
  display: flex;
  inline-size: 100%;
  min-block-size: ${spacing[8]};
`;

export const StyledInlineLoadingAnimation = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-inline-end: ${spacing[2]};
  position: relative;
`;

export const StyledLoadingAnimatedDiv = styled.div`
  animation: ${rotate} 0.69s linear infinite;
  border: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  block-size: ${spacing[4]};
  inline-size: ${spacing[4]};
  line-height: ${spacing[4]};
`;

export const StyledInlineLoadingText = styled.div`
  padding-left: ${spacing[2]};
  color: ${colors.gray[600]};
  font-size: ${spacing[3]};
  font-weight: ${typography.weights.regular};
  letter-spacing: 0.3px;
  line-height: 1.3;
`;
