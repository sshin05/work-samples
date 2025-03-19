export const allowedTypes = [
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp'
];

export interface UploadAndAdjustImageModalProps {
  imageSize?: number;
  isTesting?: boolean;
  onClose: () => void;
  onSelect: (value: File) => void;
}
