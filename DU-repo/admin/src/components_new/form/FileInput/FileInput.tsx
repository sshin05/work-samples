import { forwardRef, type PropsWithRef } from 'react';
import type { FileInputProps } from './fileInput.types';

const FileInput = forwardRef<HTMLInputElement, PropsWithRef<FileInputProps>>(
  ({ name, accept, ...props }, ref) => (
    <input
      ref={ref}
      name={name as string}
      type="file"
      accept={accept as string}
      {...props}
    />
  )
);
FileInput.displayName = 'FileInput';

export { FileInput };
