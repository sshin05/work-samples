import React, { type FC } from 'react';
import styled from '@emotion/styled';
import { colors, typography, Button } from '@digital-u/digital-ui';
import type { ThemeUIStyleObject } from 'theme-ui';
import Link from 'next/link';
import { Box } from '../Box';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

interface SimplePaginationLayoutProps {
  emptyComponent?: React.ReactNode;
  ComponentItem: React.ComponentType;
  items?: unknown[];
  onLoadMore?: () => void;
  showLoadMore?: boolean;
  sx?: ThemeUIStyleObject;
}

const PillButton = styled(Button)`
  :hover {
    border: ${() =>
      `${typography.sizes[0.5]} solid ${colors.purple[800]} !important`};
    color: ${colors.purple[800]} !important;
  }
`;

const StyledLink = styled(Link)`
  font-size: ${typography.sizes[4]};
  line-height: ${typography.sizes[7]};
  text-decoration: none;
`;

const SimplePaginationLayout: FC<SimplePaginationLayoutProps> = ({
  emptyComponent,
  ComponentItem,
  items,
  onLoadMore,
  showLoadMore,
  sx,
  ...props
}) => {
  return (
    <Box sx={sx} {...props}>
      {items?.length === 0
        ? emptyComponent
        : items.map(
            ({ id, ...item }: { id: string; [key: string]: unknown }) => (
              <div key={id}>
                <StyledLink
                  href={getRouteUrl(routeGenerators.ManageUser({ userId: id }))}
                >
                  <ComponentItem {...item} />
                </StyledLink>
              </div>
            )
          )}
      {showLoadMore && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            mt: 'm',
            mb: 'm',
            justifyContent: 'center'
          }}
        >
          <PillButton kind="pill" onClick={onLoadMore}>
            LOAD MORE
          </PillButton>
        </Box>
      )}
    </Box>
  );
};

export default SimplePaginationLayout;
