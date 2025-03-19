import { screen, render } from '@@/test-utils';
import { FieldWrapper } from './FieldWrapper';
import { FieldMapping } from '../../DynamicFormFields';
import type { sqlGetMarketplaceProductCustomizationDefinition } from '@/app/api/marketplace/products';
import type { FieldWrapperProps } from './FieldWrapper.types';

describe('FieldWrapper', () => {
  it.each(
    Object.keys(FieldMapping).map(fieldMappingKey => ({
      key: fieldMappingKey,
      FieldComponent: FieldMapping[fieldMappingKey],
      fieldName: `Field Name: ${fieldMappingKey}`
    }))
  )(
    'Renders the $key customization field within a FieldWrapper',
    ({ FieldComponent, fieldName }) => {
      const MOCK_CUSTOMIZATION = {
        name: fieldName
      } as Awaited<
        ReturnType<typeof sqlGetMarketplaceProductCustomizationDefinition>
      >['_serviceData'];

      render(
        <FieldWrapper
          fieldState={{} as FieldWrapperProps['fieldState']}
          fieldData={MOCK_CUSTOMIZATION}
        >
          <FieldComponent
            fieldData={MOCK_CUSTOMIZATION}
            field={{ onChange: jest.fn() }}
          />
        </FieldWrapper>
      );

      expect(screen.getByText(fieldName)).toBeInTheDocument();
    }
  );
});
