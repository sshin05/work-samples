import { Download } from '@cerberus/icons';
import { Button } from '@cerberus/react';

interface DownloadButtonProps {
  onClick: () => void;
  exportingDisabled: boolean;
}

export const DownloadButton = ({
  onClick,
  exportingDisabled
}: DownloadButtonProps) => {
  return (
    <Button
      disabled={exportingDisabled}
      onClick={onClick}
      palette="action"
      shape="rounded"
      usage="outlined"
    >
      Download all DU badge recipients
      <Download size={16} />
    </Button>
  );
};
