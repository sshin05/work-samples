export interface GridProps {
  children?: React.ReactNode;
  columns?: number | number[];
  gap?: number | number[];
  isBody?: boolean;
  sx?: Record<string, unknown>;
}
