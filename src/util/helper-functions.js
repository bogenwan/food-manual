// helper to convert number string in cents to currency number
const stringToCurrency = (str) => {
  return Number(str) / Math.pow(10, 2).toFixed(2);
};

// helper to keep number in 2 decimal place
const numberCurrency = (num, digits) => {
  var pow = Math.pow(10, digits);
  return Math.floor(num * pow) / pow;
};

module.exports = {
  stringToCurrency,
  numberCurrency
};
