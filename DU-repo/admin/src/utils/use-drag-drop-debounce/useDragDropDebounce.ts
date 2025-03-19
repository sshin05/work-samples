import { useState, useEffect, useRef } from 'react';

const useDragDropDebounce = <T>(items: T[], delay: number): T[] => {
  const [debouncedItems, setDebouncedItems] = useState<T[]>(items);
  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }
    handlerRef.current = setTimeout(() => {
      setDebouncedItems(items);
    }, delay);

    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [items, delay]);

  return debouncedItems;
};

export default useDragDropDebounce;
