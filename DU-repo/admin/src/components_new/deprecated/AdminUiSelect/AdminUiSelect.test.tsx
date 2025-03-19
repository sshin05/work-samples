import React from 'react';

import { render, screen, userEvent } from '@@/test-utils';
import { AdminUiSelect } from '.';
import type {
  AdminUiSelectOptions,
  AdminUiSelectProps
} from './AdminUiSelect.types';

describe('AdminUiSelect', () => {
  const mockOptions = [
    {
      label: 'Top Level Option 0',
      value: 'opt-0'
    },
    {
      label: 'Option Group',
      options: [
        {
          label: 'Option Group Item 0',
          value: 'opt-group-0'
        },
        {
          label: 'Option Group Item 1',
          value: 'opt-group-1'
        }
      ]
    },
    {
      label: 'Top Level Option 1',
      value: 'opt-1'
    }
  ] as AdminUiSelectOptions;

  const getDefaultProps = (): AdminUiSelectProps => ({
    id: 'unique-id',
    options: mockOptions
  });

  it('renders top level options', () => {
    const props = {
      ...getDefaultProps()
    };

    render(<AdminUiSelect {...props} />);

    expect(screen.getByText(props.options[0].label)).toBeInTheDocument();
    expect(screen.getByText(props.options[2].label)).toBeInTheDocument();
  });

  it('renders option group children', () => {
    const props = {
      ...getDefaultProps()
    };

    render(<AdminUiSelect {...props} />);

    const optionGroupChildren = props.options[1].options;

    expect(screen.getByText(optionGroupChildren[0].label)).toBeInTheDocument();
    expect(screen.getByText(optionGroupChildren[1].label)).toBeInTheDocument();
  });

  it('renders optional text', () => {
    const props = {
      ...getDefaultProps(),
      label: 'Label Text',
      helperText: 'Helper Text',
      invalid: true,
      invalidText: 'Invalid Text'
    };

    render(<AdminUiSelect {...props} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
    expect(screen.getByText(props.helperText)).toBeInTheDocument();
    expect(screen.getByText(props.invalidText)).toBeInTheDocument();
  });

  it('renders without optional text', () => {
    const props = {
      ...getDefaultProps()
    };

    render(<AdminUiSelect {...props} />);

    expect(screen.queryByText('label')).not.toBeInTheDocument();
    expect(screen.queryByText('helperText')).not.toBeInTheDocument();
    expect(screen.queryByText('invalidText')).not.toBeInTheDocument();
  });

  it('defaults to the first option in the list', () => {
    const props = {
      ...getDefaultProps(),
      onChange: jest.fn()
    };

    render(<AdminUiSelect {...props} />);

    const expectedOption = props.options[0];

    expect(screen.getByRole('combobox')).toHaveValue(expectedOption.value);
    expect(
      (
        screen.getByRole('option', {
          name: expectedOption.label
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  it('updates the selected item', async () => {
    const props = {
      ...getDefaultProps(),
      onChange: jest.fn()
    };

    render(<AdminUiSelect {...props} />);

    const targetOptionGroupChild = props.options[1].options[1];

    expect(screen.getByRole('combobox')).not.toHaveValue(
      targetOptionGroupChild.value
    );
    expect(
      (
        screen.getByRole('option', {
          name: targetOptionGroupChild.label
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      targetOptionGroupChild.label
    );

    expect(screen.getByRole('combobox')).toHaveValue(
      targetOptionGroupChild.value
    );

    expect(
      (
        screen.getByRole('option', {
          name: targetOptionGroupChild.label
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  it('renders in a disabled state', () => {
    const props = {
      ...getDefaultProps(),
      disabled: true
    };

    render(<AdminUiSelect {...props} />);

    expect(
      screen.getByText(props.options[0].label).closest('select')
    ).toBeDisabled();
  });

  it('renders with a selected top level option', () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      options: [
        {
          label: 'Top Level Option 0',
          value: 'opt-0'
        },
        {
          label: 'Top Level Option 1',
          selected: true,
          value: 'opt-1'
        }
      ]
    };

    render(<AdminUiSelect {...props} />);

    expect(
      (screen.getByText(props.options[1].label) as HTMLOptionElement).selected
    ).toBe(true);
  });

  it('renders with selected child options', () => {
    const defaultProps = getDefaultProps();
    const props = {
      ...defaultProps,
      options: [
        {
          label: 'Top Level Option 0',
          value: 'opt-0'
        },
        {
          label: 'Top Level Option 1',
          value: 'opt-1'
        },
        {
          label: 'Option Group',
          options: [
            {
              label: 'Option Group Item 0',
              value: 'opt-group-0'
            },
            {
              label: 'Option Group Item 1',
              selected: true,
              value: 'opt-group-1'
            }
          ]
        }
      ]
    };

    render(<AdminUiSelect {...props} />);

    expect(
      (screen.getByText(props.options[2].options[1].label) as HTMLOptionElement)
        .selected
    ).toBe(true);
  });
});
