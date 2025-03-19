/** An image component that returns Image from next/image.
 * Due to frequent, vercel updates the next/Image class, this component is for ease of updates.
 */
import Image from 'next/image';

export const BaseImage = ({
  alt,
  ...props
}: React.ComponentProps<typeof Image>) => <Image alt={alt} {...props} />;
