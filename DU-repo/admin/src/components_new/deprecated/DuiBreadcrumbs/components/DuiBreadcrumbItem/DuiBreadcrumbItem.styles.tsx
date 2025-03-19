import styled from '@emotion/styled';
import { colors, typography } from '@digital-u/digital-ui';

interface StyledBreadcrumbItemProps {
  active: boolean;
  context: 'light' | 'dark';
}

export const StyledBreadcrumbItem = styled.a<StyledBreadcrumbItemProps>`
  font-family: 'Poppins', sans-serif;
  font-size: ${typography.sizes[4]};
  text-decoration: none;
  font-weight: ${props =>
    props.active ? typography.weights.semiBold : typography.weights.regular};
  color: ${props =>
    props.context === 'light' ? colors.galaxy[900] : colors.galaxy[0]};
`;
