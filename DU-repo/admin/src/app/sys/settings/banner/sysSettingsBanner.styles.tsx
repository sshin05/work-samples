import styled from '@emotion/styled';
import { Flex, spacing, colors } from '@digital-u/digital-ui';

export const StyledFlex = styled(Flex)`
  background-color: ${colors.white};
  padding: ${spacing[8]};
  gap: ${spacing[8]};
  border-radius: ${spacing[1]};
  flex-direction: column;
`;
