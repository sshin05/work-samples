import { formatCustomizationsForAddToCart } from '.';
import type { FormattedCustomizations } from '../../../ProductCustomizationModal/utils/formatFormInputDataForSave/formatFormInputDataForSave.types';

describe('formatCustomizationsForAddToCart', () => {
  it('does not include customizations with an empty string value', () => {
    const mockCustomizations = [
      { definitionId: 'this should exist', value: 'a value' },
      { definitionId: 'this will be removed', value: '' }
    ] as FormattedCustomizations;

    const actual = formatCustomizationsForAddToCart(mockCustomizations);
    const expected = [{ definitionId: 'this should exist', value: 'a value' }];

    expect(actual).toEqual(expected);
  });
});
