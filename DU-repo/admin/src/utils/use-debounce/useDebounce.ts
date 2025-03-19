import { useState, useEffect, useCallback } from 'react';

export const useDebounce = <T>(
  value: T,
  delay: number,
  callback?: (value: T) => void
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedCallback = useCallback(
    (newValue: T) => {
      const handler = setTimeout(() => {
        setDebouncedValue(newValue);
        if (callback) {
          callback(newValue);
        }
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [delay, callback]
  );

  useEffect(() => {
    return debouncedCallback(value);
  }, [value, debouncedCallback]);

  return debouncedValue;
};
