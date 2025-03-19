import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { colors, typography } from '@digital-u/digital-ui';

const GREY_FROM_CARBON = '#e8e8e8';

const StyledTile = styled(Link)`
  background-color: ${colors.gray[0]};
  font-size: ${typography.sizes[4]};
  font-weight: ${typography.weights.regular};
  letter-spacing: 0.01rem;
  line-height: ${typography.sizes[5]};
  padding: ${typography.sizes[4]};
  position: relative;
  text-decoration: none;
  border-radius: 0.5rem;
    &:hover {
      background-color: ${GREY_FROM_CARBON};
    }
  }
`;

export interface ClickableTileProps {
  href: string;
  children?: React.ReactNode;
}

export const ClickableTile = ({ href, children }: ClickableTileProps) => {
  return <StyledTile href={href}>{children}</StyledTile>;
};
