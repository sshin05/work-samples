import { Box, colors } from '@digital-u/digital-ui';
import styled from '@emotion/styled';

export const StyledCurriculumContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  min-height: calc(100vh - 80px);
  overflow: hidden;
`;

export const StyledCurriculumResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow: auto;
`;

// Prevent layout shift when loading results
export const StyledSearchLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  align-items: center;
  justify-content: center;
`;

export const StyledFullScreenModalContainer = styled(Box)`
  height: 100vh;
  height: 100dvh;
  width: 100%;
  z-index: 11000;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.white};
`;
