// eslint-disable-next-line no-unused-vars
const some = <T>(set: Set<T>, predicate: (e: T) => boolean) => {
  return Array.from(set).some(predicate);
};

// eslint-disable-next-line no-unused-vars
const find = <T>(set: Set<T>, predicate: (e: T) => boolean) => {
  return Array.from(set).find(predicate);
};

const SetUtils = {
  some,
  find,
};

export default SetUtils;
