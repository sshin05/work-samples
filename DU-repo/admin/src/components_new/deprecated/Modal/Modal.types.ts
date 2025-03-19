export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  sx?: Record<string, unknown>;
}
