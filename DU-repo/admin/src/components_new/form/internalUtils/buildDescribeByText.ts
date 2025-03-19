import React from 'react';

/**
 *
 * buildDescribeByText is only used by cerberus components to build a valid describeByText string
 * so that shown helpText and errorMessage are correctly associated with the input field.
 *
 * Also these names are a common standard for screen-readers and the `<Field />` provider changes the styles of the
 * `<FieldMessage />` commponents based upon the `error:` and `help:` prefixes (I believe).
 *
 */

export const buildDescribeByText = (
  id: string,
  helpText?: React.ReactNode,
  errorMessage?: string
) => {
  const helpTextString = React.isValidElement(helpText)
    ? `help:${id}`
    : helpText && `help:${id}`;
  return [helpTextString, errorMessage && `error:${id}`]
    .filter(Boolean)
    .join(' ');
};
