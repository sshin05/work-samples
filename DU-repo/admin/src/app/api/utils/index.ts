export const getParams = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  if (request.method === 'GET') {
    const encodedOptions = searchParams.get('options');
    const name = searchParams.get('name');
    const options = JSON.parse(atob(encodedOptions));
    return { name, options };
  } else {
    const name = searchParams.get('name');
    const options = await request.json();
    return { name, options };
  }
};
