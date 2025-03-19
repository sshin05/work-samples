import { Field, Toggle, type ToggleProps } from '@cerberus/react';
import useToggle from '../hooks/useToggle';

interface ToggleCellProps {
  original: {
    required: boolean;
  };
  id?: ToggleProps['id'];
  disabled?: boolean;
  callback: (original: { required: boolean }, value: string) => Promise<void>;
}

export const ToggleCell = ({
  original,
  callback,
  disabled,
  id
}: ToggleCellProps) => {
  const { checked, handleChange } = useToggle({
    checked: original.required,
    onChange: async e => {
      const value = e.target.checked;
      await callback(original, value);
    }
  });

  return (
    <Field disabled={disabled}>
      <Toggle
        id={id}
        checked={Boolean(checked)}
        onChange={handleChange}
        value={String(original.required)}
      />
    </Field>
  );
};
