export interface DropDownMenuProps {
  links: Array<{
    title: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    sx?: Record<string, unknown>;
  }>;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onSelect?: (title: string) => void;
  sx?: Record<string, unknown>;
}
