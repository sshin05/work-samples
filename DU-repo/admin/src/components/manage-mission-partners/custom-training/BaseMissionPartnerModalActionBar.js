import styled from '@emotion/styled';
import { Flex, Button, colors } from '@digital-u/digital-ui';

const StyledPrimaryButton = styled(Button)`
  &[disabled] {
    background-color: ${colors.galaxy[0]} !important;
    color: ${colors.galaxy[300]} !important;
  }
  &[disabled]:hover {
    background-color: ${colors.galaxy[0]} !important;
    color: ${colors.galaxy[300]} !important;
  }
`;

const MissionPartnerModalActionBar = ({
  disabled,
  actionText,
  onClose,
  loading,
  onSubmit = () => {
    /* Do nothing by default */
  }
}) => (
  <>
    <br />
    <Flex gap="1rem">
      <StyledPrimaryButton
        kind="pill-primary"
        type="submit"
        disabled={disabled}
        loading={loading}
        onClick={onSubmit}
      >
        {actionText}
      </StyledPrimaryButton>
      {/* Something is wrong with DUUI, I cannot overwrite any styles on this button */}
      <Button
        kind="pill-secondary"
        type="cancel"
        onClick={onClose}
        disabled={loading}
        style={{ width: '100px' }}
      >
        Cancel
      </Button>
    </Flex>
  </>
);

export default MissionPartnerModalActionBar;
