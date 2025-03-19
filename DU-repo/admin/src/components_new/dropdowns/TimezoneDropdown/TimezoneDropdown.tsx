import { Select, Option, Field, Label } from '@cerberus/react';
import momenttz from 'moment-timezone';
import type { ControllerFieldState } from 'react-hook-form';

type TimezoneDropdownProps = {
  onSelect: (timezone: string) => void;
  defaultValue?: string;
  fieldState?: ControllerFieldState;
  overrideTimezone?: string;
};

const USTimezoneNameMap: { [key: string]: string } = {
  HST: 'Hawaii-Aleutian Time',
  AKST: 'Alaska Time',
  PST: 'Pacific Time',
  MST: 'Mountain Time',
  CST: 'Central Time',
  EST: 'Eastern Time'
};

const generateTimezoneString = (timezoneKey: string) => {
  const timezone = momenttz.tz(timezoneKey);
  const offset = timezone.format('Z');
  const splitTimezone = timezoneKey.split('/');
  const city = splitTimezone[splitTimezone.length - 1].replace('_', ' ');

  const timeTypeAbbr = timezone.zoneAbbr();
  const timeTypeFull = USTimezoneNameMap[timeTypeAbbr] || timeTypeAbbr;
  return `(GMT ${offset}) ${timeTypeFull} - ${city}`;
};

const getTimezoneInfo = () => {
  const guessedLocalTimezone = momenttz.tz.guess();
  const UStimeZones = momenttz.tz
    .zonesForCountry('US', true)
    .sort((a, b) => a.offset - b.offset);

  return {
    guessedLocalTimezone,
    UStimeZones
  };
};

/**
 * A dropdown component for selecting a timezone.
 *
 * @param {function} onSelect - Callback function to handle the selection of a timezone. Called with the selected timezone string e.g., 'America/New_York'.
 * @param {string} [defaultValue] - The default value should be a valid timezone string, e.g., 'America/New_York'.
 * @param {ControllerFieldState} [fieldState] - The state of the field from react-hook-form.
 * @param {string} [overrideTimezone] - A timezone string to override the guessed local timezone, e.g., 'America/Chicago'.
 */
export const TimezoneDropdown = ({
  defaultValue,
  onSelect,
  fieldState,
  overrideTimezone
}: TimezoneDropdownProps) => {
  const { guessedLocalTimezone, UStimeZones } = getTimezoneInfo();
  const localTimezone = overrideTimezone ?? guessedLocalTimezone;
  const defaultTimezone = defaultValue ?? localTimezone;

  return (
    <Field {...fieldState}>
      <Label htmlFor="timezone-selector">Time Zone</Label>
      <Select
        id="timezone-selector"
        onChange={event => onSelect(event.target.value)}
        defaultValue={defaultTimezone}
      >
        {UStimeZones.map(({ name }) => {
          const isLocal = name === localTimezone;
          return (
            <Option key={name} value={name}>
              {generateTimezoneString(name) + (isLocal ? ' (Local Time)' : '')}
            </Option>
          );
        })}
      </Select>
    </Field>
  );
};
