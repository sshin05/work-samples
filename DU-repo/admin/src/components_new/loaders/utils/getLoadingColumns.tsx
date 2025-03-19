interface Column {
  header: string;
}

export const getLoadingColumns = (titles: string[]): Column[] => {
  return titles.map(title => ({
    header: title
  }));
};
