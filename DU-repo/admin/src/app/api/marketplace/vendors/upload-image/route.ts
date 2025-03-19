import { uploadFile } from '../../../utils/uploadFile';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const vendorTag = formData.get('vendorTag') as string;

  // get file extension
  const fileExtension = file.name.split('.').pop();

  return uploadFile(
    file,
    20,
    `vendors/${vendorTag}/`,
    `brand-image.${fileExtension}`
  );
}
