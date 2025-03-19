export interface FlexProps {
  children: React.ReactNode;
  end?: number;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  span?: number;
  start?: number;
  sx?: Record<string, unknown>;
  tabIndex?: number;
}
