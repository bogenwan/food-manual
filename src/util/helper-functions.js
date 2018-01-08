const stringToCurrency = (str) => {
  return Number(str) / Math.pow(10, 2);
};
console.log(stringToCurrency('10'))
module.exports = {
  stringToCurrency,
};