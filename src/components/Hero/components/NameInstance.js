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

    const cached = SVG_PREWARM_CACHE.get(cacheKey);
    if (cached) {
      prewarmedImgRef.current = cached;
      return undefined;
    }

    // Reserve the cache slot synchronously so sibling instances that mount in
    // the same batch de-dupe and skip duplicate work. The image's src is filled
    // in by the deferred build below.
    const img = new Image();
    SVG_PREWARM_CACHE.set(cacheKey, img);
    prewarmedImgRef.current = img;

    // Capture the DOM node now: it stays queryable even if this instance later
    // unmounts or StrictMode re-runs the effect, so the deferred build can
    // complete independently of the React lifecycle.
    const node = ref.current;

    // Defer the heavy clone → serialize → decode off the initial render burst.
    // Each name SVG carries thousands of path points, so building all of them
    // up front competes with first paint; idle time is soon enough for a
    // click-to-spawn interaction.
    const build = () => {
      if (img.src) return; // idempotent across StrictMode double-invokes
      const svgEl = node?.querySelector('svg');
      if (!svgEl || svgEl.viewBox.baseVal.width === 0) return;

      const clone = svgEl.cloneNode(true);
      clone.setAttribute('width', svgEl.viewBox.baseVal.width);
      clone.setAttribute('height', svgEl.viewBox.baseVal.height);

      const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      img.onload = () => URL.revokeObjectURL(url);
      img.onerror = () => {
        URL.revokeObjectURL(url);
        if (SVG_PREWARM_CACHE.get(cacheKey) === img) {
          SVG_PREWARM_CACHE.delete(cacheKey);
        }
      };
      img.src = url;
    };

    // Intentionally NOT cancelled on cleanup — the build is cheap and must be
    // allowed to finish so the shared cached image is populated for spawning,
    // even across StrictMode's mount→cleanup→mount cycle.
    if (window.requestIdleCallback) {
      window.requestIdleCallback(build, { timeout: 1500 });
    } else {
      window.setTimeout(build, 200);
    }

    return undefined;
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
