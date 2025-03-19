import { useRef, useState, useEffect } from 'react';

const DEFAULT_CELL_WIDTH = 240;

export const useResponsiveWidth = (
  initialWidth: number = DEFAULT_CELL_WIDTH,
  padding: number = 90
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(initialWidth);
  const previousWidthRef = useRef<number>(initialWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        const newWidth = Math.max(
          ref.current.offsetWidth - padding,
          initialWidth
        );

        if (newWidth !== previousWidthRef.current) {
          previousWidthRef.current = newWidth;
          setWidth(newWidth);
        }
      }
    };

    // set initial width
    updateWidth();

    // observe width changes
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // cleanup observer on unmount
    return () => resizeObserver.disconnect();
  }, [initialWidth, padding]);

  return { ref, width };
};
