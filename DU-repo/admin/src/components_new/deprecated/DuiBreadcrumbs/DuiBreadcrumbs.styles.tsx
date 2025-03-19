import styled from '@emotion/styled';
import type { DividerProps } from './DuiBreadcumbs.types';
import { colors, spacing, typography } from '@digital-u/digital-ui';

export const Divider = styled.span<DividerProps>`
  font-family: 'Popins', sans-serif;
  font-size: ${typography.sizes[4]};
  font-weight: 500;
  color: ${props =>
    props.context === 'light' ? colors.galaxy[900] : colors.galaxy[100]};
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: ${spacing[3]};
  justify-content: flex-start;
  align-items: center;
`;
