import { useState, useCallback } from 'react';

function useToggle({ checked: initialChecked, onChange }) {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = useCallback(
    e => {
      setChecked(e.target.checked);
      onChange(e);
    },
    [onChange]
  );

  return { checked, handleChange };
}

export default useToggle;
