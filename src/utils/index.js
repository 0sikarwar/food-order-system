export const snakeToCamel = str => {
  str = str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', ' ').replace('_', ' ')
    );
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getColumns = (tableData, filterableCol = [], sortableCol = []) => {
  return Object.keys(tableData[0]).map(key => ({
    name: snakeToCamel(key),
    selector: key,
    filterable: filterableCol.includes(key),
    sortable: sortableCol.includes(key),
  }));
};
