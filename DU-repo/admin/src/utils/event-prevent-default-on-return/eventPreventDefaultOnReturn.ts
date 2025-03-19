export const eventPreventDefaultOnReturn = event => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
