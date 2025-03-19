export interface DividerProps {
  context: 'light' | 'dark';
}

export interface DuiBreadcrumbsProps {
  paths: Array<{
    href?: string;
    text: string | React.JSX.Element;
  }>;
  context?: 'light' | 'dark';
  trailingSlash?: boolean;
  highlightLast?: boolean;
}
