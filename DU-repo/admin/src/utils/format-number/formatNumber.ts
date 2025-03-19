export const formatNumber = (number: number) => {
  let stringEquivalent = number.toString();
  for (let i = stringEquivalent.length - 1; i >= 0; i--) {
    if ((stringEquivalent.length - i - 1) % 4 === 3) {
      stringEquivalent =
        stringEquivalent.slice(0, Math.max(0, i + 1)) +
        ',' +
        stringEquivalent.slice(Math.max(0, i + 1));
    }
  }

  return stringEquivalent;
};

export const formatDollars = amount => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
