export interface PublishModalProps {
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
}
