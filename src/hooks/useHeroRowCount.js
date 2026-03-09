import { useState, useCallback, useEffect } from 'react';

const useHeroRowCount = () => {
  const [rowCount, setRowCount] = useState(0);
  const [measureRef, setMeasureRef] = useState(null);

  const callbackRef = useCallback(node => {
    setMeasureRef(node);
  }, []);

  useEffect(() => {
    if (!measureRef) return;

    const observer = new ResizeObserver(() => {
      const rowHeight = measureRef.offsetHeight;
      const vh = window.innerHeight;
      if (rowHeight > 0) {
        const rows = numRows(vh, rowHeight, 0.95);
        setRowCount(Math.min(rows, 25));
      }
    });

    observer.observe(measureRef);

    return () => observer.disconnect();
  }, [measureRef]);

  return { rowCount, callbackRef };
};

const numRows = (totalHeight, rowHeight, r) => {
  const inside = 1 - (totalHeight / rowHeight) * (1 - r);
  if (inside <= 0 || inside >= 1) return 1; // Fallback to prevent invalid logs
  const n = Math.log(inside) / Math.log(r);
  return Math.max(1, Math.ceil(n));
};

export default useHeroRowCount;
