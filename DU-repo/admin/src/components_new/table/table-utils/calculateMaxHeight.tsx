export const calculateMaxHeight = (
  tableHeight: number,
  responsive: boolean,
  type: 'wrapper' | 'container'
) => {
  const offset = 300;
  const containerOffset = 50;
  const wrapperOffset = 75;
  if (responsive) {
    if (type === 'wrapper') {
      return `calc(100vh - ${offset}px)`;
    } else {
      return `calc(100vh - ${offset}px - ${containerOffset}px)`;
    }
  }
  if (type === 'wrapper') {
    return `${tableHeight + wrapperOffset}px`;
  } else {
    return `${tableHeight}px`;
  }
};
