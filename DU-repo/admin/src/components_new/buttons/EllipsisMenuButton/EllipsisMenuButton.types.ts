export interface EllipsisMenuButtonProps {
  row: unknown;
  label?: string;
  menuItems?: Array<{
    label?: string;
    onClick?: (row: unknown) => void;
    fontColor?: string;
    [key: string]: unknown; // allow for additional props to be passed in
  }>;
  menuWidth?: string;
}
