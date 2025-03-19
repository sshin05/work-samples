import React from 'react';
import { StyledActionButton } from './ActionButton.styles';
import { ArrowRight } from '@carbon/icons-react';
import { type ButtonProps } from '@digital-u/digital-ui';

const ActionButton = ({
  children,
  rightIcon = <ArrowRight />,
  size = 'sm',
  color = 'teal-light',
  ...props
}: ButtonProps) => {
  return (
    <StyledActionButton
      size={size}
      color={color}
      {...props}
      rightIcon={rightIcon}
    >
      {children}
    </StyledActionButton>
  );
};

export default ActionButton;
