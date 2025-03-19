export interface ButtonProps {
  context?: 'dark' | 'light';
  type?: 'primary' | 'secondary';
  onClick?: () => void;
  children?: React.ReactNode;
  [key: string]: unknown;
}
