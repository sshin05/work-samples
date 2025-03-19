// This file breaks naming rules

export const onDropFile = (acceptedFiles = [], audioExtensions = []) => {
  const selectedFile = acceptedFiles[0];

  const name = selectedFile?.name.replaceAll(' ', '_');
  const uploadFile = new File([selectedFile], name, {
    type: selectedFile?.type
  });

  const extension = selectedFile?.path?.slice(
    selectedFile.path.lastIndexOf('.')
  );

  let type;
  if (extension === '.mp4') {
    type = 'Video';
  } else if (audioExtensions.find(element => element === extension)) {
    type = 'Audio';
  } else {
    type = 'File';
  }

  return { hasFile: true, file: uploadFile, value: type };
};
