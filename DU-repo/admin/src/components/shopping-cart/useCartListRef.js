import { useState, useEffect } from 'react';

export const useCartListRef = ref => {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { height: currentHeight } = boundingRect;

      const roundedHeight = Math.round(currentHeight);

      // We are going to get the max item card list size
      const viewPortHeight = window.innerHeight - 80 - 88; // 80px for header, 88px for footer
      if (roundedHeight > viewPortHeight) setIsScrollable(true);
      else setIsScrollable(false);
    }
  }, [ref]);
  return isScrollable;
};
