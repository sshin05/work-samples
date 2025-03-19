// this will go away when serverSide table is completed
export const pageSelectOptions = (pageCount: number) => {
  const options = [];
  for (let i = 0; i <= pageCount - 1; i += 1) {
    options.push(
      <option key={i} value={i}>
        {i + 1}
      </option>
    );
  }

  return options;
};
