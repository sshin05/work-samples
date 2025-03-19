import type { ThemeUIStyleObject } from 'theme-ui';

export interface IconProps {
  name: string;
  className?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  onClick?: () => void;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  sx?: ThemeUIStyleObject;
  role?: string;
}
