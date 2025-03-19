export interface InlineLoadingProps {
  description?: string;
  className?: string;
  status?: 'active' | 'error'; // todo: 'finished' | 'inactive' when ported to DUUI (for student portal implementations?)
}
