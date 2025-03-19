import React, { type FC } from 'react';
import { Box } from '../Box';
import { Text } from '@/components_new/deprecated/Text';

interface StatePlaceholderProps {
  placeholder: string;
  children?: React.ReactNode;
  context?: 'light' | 'dark';
  sx?: Record<string, unknown>;
}

const StatePlaceholder: FC<StatePlaceholderProps> = ({
  context = 'light',
  placeholder,
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        pt: 'l',
        pb: 'l',
        pl: 'm',
        pr: 'm',
        textAlign: 'center',
        borderRadius: '6px',
        ...sx
      }}
      {...props}
    >
      <Text context={context} size="l" sx={{ pb: 'xs' }}>
        {placeholder}
      </Text>
      {children}
    </Box>
  );
};

export default StatePlaceholder;
