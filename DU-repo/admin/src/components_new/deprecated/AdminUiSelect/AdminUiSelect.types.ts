export type AdminUiSelectOptions = {
  label: string;
  value?: string;
  options?: { label: string; value?: string }[];
}[];

export interface AdminUiSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: AdminUiSelectOptions;
  label?: string;
  helperText?: string;
  invalid?: boolean;
  invalidText?: string;
}
