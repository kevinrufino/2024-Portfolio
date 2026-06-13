import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FirstNameComponent } from './FirstNameComponent.js';
import { LastNameComponent } from './LastNameComponent.js';

const SVG_PROPS = {
  first: { Component: FirstNameComponent, className: 'w-[43%]' },
  last: { Component: LastNameComponent, className: 'w-[55%]' },
};

// Module-level cache: `${nameKey}-${variant}-${fill}-${outline}` → Image
// Only the first NameInstance of each combination creates the blob;
// every subsequent instance reuses the already-decoded Image.
const SVG_PREWARM_CACHE = new Map();

const NameInstance = ({
  nameKey,
  rowIndex,
  variant,
  primaryColor,
  secondaryColor,
  onNameClick,
}) => {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);
  const prewarmedImgRef = useRef(null);
  const { Component, className } = SVG_PROPS[nameKey];

  const fillColor = variant === 'solid' ? secondaryColor : primaryColor;
  const outlineColor = secondaryColor;

  // Pre-warm this variant on mount. Cache key includes colors so a theme
  // change correctly produces a fresh image.
  useEffect(() => {
    const cacheKey = `${nameKey}-${variant}-${fillColor}-${outlineColor}`;

    if (SVG_PREWARM_CACHE.has(cacheKey)) {
      prewarmedImgRef.current = SVG_PREWARM_CACHE.get(cacheKey);
      return;
    }

    const svgEl = ref.current?.querySelector('svg');
    if (!svgEl || svgEl.viewBox.baseVal.width === 0) return;

    // Clear stale ref while new image loads
    prewarmedImgRef.current = null;

    const clone = svgEl.cloneNode(true);
    clone.setAttribute('width', svgEl.viewBox.baseVal.width);
    clone.setAttribute('height', svgEl.viewBox.baseVal.height);

    const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    // Reserve the cache slot immediately so concurrent effects (all 14 run
    // in the same synchronous batch) see a hit and skip duplicate blob loads.
    SVG_PREWARM_CACHE.set(cacheKey, img);
    prewarmedImgRef.current = img;

    img.onload = () => {
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      SVG_PREWARM_CACHE.delete(cacheKey);
      prewarmedImgRef.current = null;
    };
    img.src = url;
  }, [nameKey, variant, fillColor, outlineColor]);

  const handleClick = () => {
    if (!onNameClick || !ref.current) return;
    const svgEl = ref.current.querySelector('svg');

    // Clone the SVG so we don't mutate the live DOM element
    let svgMarkup = null;
    if (svgEl) {
      const clone = svgEl.cloneNode(true);
      clone.setAttribute('width', svgEl.viewBox.baseVal.width);
      clone.setAttribute('height', svgEl.viewBox.baseVal.height);
      svgMarkup = clone.outerHTML;
    }

    onNameClick({
      nameKey,
      rowIndex,
      variant,
      rect: ref.current.getBoundingClientRect(),
      svgMarkup,
      prewarmedImg: prewarmedImgRef.current, // null if not yet ready → fallback in MatterJSCanvas
    });
    setHidden(true);
  };

  return (
    <div ref={ref} onClick={handleClick} className={`${className}${hidden ? ' invisible' : ''}`}>
      <Component
        className='w-full'
        primaryColor={outlineColor}
        secondaryColor={fillColor}
      />
    </div>
  );
};

NameInstance.propTypes = {
  nameKey: PropTypes.oneOf(['first', 'last']).isRequired,
  rowIndex: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['solid', 'outline']).isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  onNameClick: PropTypes.func,
};

export default NameInstance;
