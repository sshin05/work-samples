export type EditTitleModalProps = {
  onSubmit: (title: string) => void;
  onClose: () => void;
  initialValue?: string;
  label?: string;
};
