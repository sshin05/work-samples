import { renderV3, screen, fireEvent } from '@@/test-utils';
import { TimezoneDropdown } from './TimezoneDropdown';

describe('TimezoneDropdown component', () => {
  it('should render the correct timezone option by default', () => {
    renderV3(
      <TimezoneDropdown
        onSelect={() => {}}
        overrideTimezone="America/New_York"
      />
    );

    expect(
      (
        screen.getByRole('option', {
          name: '(GMT -05:00) Eastern Time - New York (Local Time)'
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  it('should call onSelect with the correct timezone', () => {
    const onSelect = jest.fn();
    renderV3(
      <TimezoneDropdown
        onSelect={onSelect}
        overrideTimezone="America/New_York"
      />
    );

    expect(
      (
        screen.getByRole('option', {
          name: '(GMT -05:00) Eastern Time - New York (Local Time)'
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);

    const dropdown = screen.getByRole('combobox');

    fireEvent.change(dropdown, { target: { value: 'America/Chicago' } });

    expect(onSelect).toHaveBeenCalledWith('America/Chicago');

    expect(
      (
        screen.getByRole('option', {
          name: '(GMT -06:00) Central Time - Chicago'
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });
});
