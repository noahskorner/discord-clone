const some = <T>(set: Set<T>, predicate: (e: T) => boolean) => {
  return Array.from(set).some(predicate);
};

const SetUtils = {
  some,
};

export default SetUtils;
