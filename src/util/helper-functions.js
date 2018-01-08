// helper to convert number string in cents to currency number
const stringToCurrency = (str) => {
  return Number(str) / Math.pow(10, 2);
};

module.exports = {
  stringToCurrency,
};
