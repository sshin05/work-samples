export const formatNumberWithSuffix = (
  number: number,
  totalDigits = 5
): string => {
  if (number < 1000) {
    return String(number);
  }

  const divider = number < 1_000_000 ? 1000 : 1_000_000;
  const suffix = number < 1_000_000 ? 'k' : 'M';

  const dividedNumber = number / divider;
  const stringDividedNumber = String(dividedNumber);

  if (!stringDividedNumber.includes('.')) {
    return stringDividedNumber + suffix;
  }

  const splitNumber = stringDividedNumber.split('.');
  const baseNumber = splitNumber[0];
  const decimals = splitNumber[1];

  if (baseNumber.length >= totalDigits) {
    return baseNumber + suffix;
  }

  const decimalsShown = totalDigits - baseNumber.length;
  const decimalsToShow = decimals.slice(0, decimalsShown);

  return baseNumber + '.' + decimalsToShow + suffix;
};
