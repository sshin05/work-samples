import { uploadFile } from '../../utils/uploadFile';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  return uploadFile(file, 1, 'test/');
}
