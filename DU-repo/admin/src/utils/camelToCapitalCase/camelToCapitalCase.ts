export const camelToCapitalCase = (stringToConvert?: string) => {
  if (!stringToConvert) return '';

  return stringToConvert
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, string_ => string_.toUpperCase());
};
