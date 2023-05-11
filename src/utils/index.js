export const snakeToCamel = str => {
  str = str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', ' ').replace('_', ' ')
    );
  return str.charAt(0).toUpperCase() + str.slice(1);
};
