import { uploadFile } from '../../../utils/uploadFile';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const vendorTag = formData.get('vendorTag') as string;
  console.log('vendorTag:', vendorTag);

  // get file extension
  const fileExtension = file.name.split('.').pop();

  return uploadFile(file, 1, `vendors/${vendorTag}/`, `logo.${fileExtension}`);
}
