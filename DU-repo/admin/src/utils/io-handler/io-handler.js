export const downloadFile = (
  fileName,
  stringData,
  error = () => {
    // This is an intentional empty function.
  },
  options = null
) => {
  const downloadOptions = options ?? { data: 'text/plain', charset: 'utf-8' };
  try {
    // Quick dom edit to start download on client side
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:${downloadOptions.data};charset=${
        downloadOptions.charset
      },${encodeURIComponent(stringData)}`
    );
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.append(element);
    element.click();
    element.remove();
  } catch (error_) {
    error(error_.message);
  }
};

export const convertFileToString = (
  file,
  callback,
  error = () => {
    // This is an intentional empty function.
  }
) => {
  const reader = new FileReader();

  reader.addEventListener('error', function (error_) {
    error(`An error occurred while parsing ${error_.target.fileName}`);
  });

  reader.addEventListener('load', async function (error_) {
    await callback(error_.target.result);
  });

  reader.readAsText(file);
};
