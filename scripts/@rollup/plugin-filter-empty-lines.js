module.exports = function filterEmptyLines() {
  const filterREG = /\s{2,}|\n/g;

  return {
    transform(code) {
      return {
        code: code.replace(filterREG, ''),
        map: null,
      };
    },
  };
};
