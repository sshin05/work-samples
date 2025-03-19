export interface DropDownProps {
  icon?: React.ReactNode;
  links: Array<{
    title: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    sx?: Record<string, unknown>;
  }>;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  placeholder?: string;
  userSelectedValue?: string;
  showTextbox?: boolean;
  sx?: Record<string, unknown>;
  open?: boolean;
}
