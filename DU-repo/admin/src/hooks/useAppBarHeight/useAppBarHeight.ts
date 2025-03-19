import { useEffect, useState } from 'react';

export const useAppBarHeight = (): number => {
  const [headerOffset, setHeaderOffset] = useState<number>(60);

  useEffect(() => {
    function handleResize() {
      setHeaderOffset(window.innerWidth < 767 ? 44 : 60);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return headerOffset;
};
