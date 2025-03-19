import styled from '@emotion/styled';
import {
  Button,
  Text,
  colors,
  spacing,
  typography
} from '@digital-u/digital-ui';

export const StyledTrainingConditionCard = styled.div`
  align-items: center;
  background: white;
  border: 1px solid ${colors.galaxy[100]};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  gap: ${spacing[4]};
  justify-content: space-between;
  margin: 0;
  padding: ${spacing[4]};
`;

export const StyledTrainingInlineButton = styled(Button)`
  color: ${colors.blue[600]};
  display: inline-block;
  font-size: ${typography.sizes[3.25]};
` as typeof Button;

export const TrainingConditionText = ({ children }) => (
  <Text size="compact">{children}</Text>
);
