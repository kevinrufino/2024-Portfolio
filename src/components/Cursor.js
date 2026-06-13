/* eslint-disable react/prop-types */
/**
 * Custom cursor component with animated effects and project-specific cursors
 *
 * Follows the mouse with a smooth trailing motion and swaps to a
 * project-specific animated cursor on hover.
 *
 * Performance: pointer tracking writes to refs and the position is applied
 * via a requestAnimationFrame lerp directly on the element's transform — so
 * moving the mouse never triggers a React re-render. The rAF loop only runs
 * while a project cursor is actually active; otherwise the component renders
 * nothing and does no per-frame work.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.cursor - Current cursor state/type
 * @returns {JSX.Element|null} The custom cursor element, or null when inactive
 */
import React, { useRef, useEffect } from 'react';
import spinningShoe from '../assets/404spinning-asset.gif';
import bot from '../assets/battlebot_run.gif';
import doge from '../assets/dogewood-gif.gif';
import mc from '../assets/mc-spinning-block.gif';
import mice from '../assets/mice-gif.gif';

/** Map of cursor state → { img, style } for project-specific cursors */
const CURSORS = {
  "Max's Lab": {
    img: spinningShoe,
    style: { filter: 'brightness(1.2) hue-rotate(40deg)' },
  },
  'Minecraft Clone': { img: mc },
  '.Swoosh 404': { img: spinningShoe },
  'Defenders of Dogewood': { img: doge },
  Anonymice: { img: mice },
  'SNK-Y Bot': { img: bot },
  'EA Sports FC Partner Page': {
    img: spinningShoe,
    style: { filter: 'brightness(1.2) hue-rotate(300deg)' },
  },
  'TINAJ Collection Listing Page': {
    img: spinningShoe,
    style: { filter: 'brightness(1.2) hue-rotate(150deg) grayscale(1)' },
  },
  'Our Force 1 Poster Content Display Page': {
    img: spinningShoe,
    style: { filter: 'brightness(1.2) hue-rotate(250deg)' },
  },
};

const Cursor = ({ cursor }) => {
  const elRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const active = CURSORS[cursor];

  // Track the pointer in a ref — no state, so no re-render on every move.
  useEffect(() => {
    const onMove = e => {
      target.current.x = e.pageX;
      target.current.y = e.pageY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Smooth trailing follow via rAF lerp. Only runs while a cursor is active.
  useEffect(() => {
    if (!active) return undefined;

    // Snap to the live pointer on activation so it doesn't fly in from (0,0).
    pos.current.x = target.current.x;
    pos.current.y = target.current.y;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const el = elRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 150,
        height: 150,
        overflow: 'hidden',
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
        ...active.style,
      }}
    >
      <img
        src={active.img}
        className='h-full w-full object-cover overflow-hidden'
        alt=''
      />
    </div>
  );
};

export default Cursor;
