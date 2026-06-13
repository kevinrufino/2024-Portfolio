import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';

// Chunky stepped easing so the wipe moves in pixel-sized jumps
const STEPS = 8;
const stepEase = t => Math.floor(t * STEPS) / STEPS;

// The curtain only plays between routes — never over the very first page
// load, which already has the loading screen. A module flag (not state)
// because it must survive the route unmount/remount cycle.
let hasNavigated = false;

/**
 * Roller-blind wipe between routes: an ultramarine curtain drops over the
 * exiting page and lifts off the entering one. Must be rendered as a route
 * element inside an AnimatePresence for the exit phase to run.
 */
const PageTransition = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.45;
  const isFirstLoad = !hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {children}
      <motion.div
        className="fixed inset-0 z-[70] bg-ultra pointer-events-none border-b-8 border-acid"
        style={{ originY: 0 }}
        initial={{ scaleY: isFirstLoad ? 0 : 1 }}
        animate={{
          scaleY: 0,
          transition: { duration, ease: stepEase, delay: 0.05 },
        }}
        exit={{ scaleY: 1, transition: { duration, ease: stepEase } }}
      />
    </>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
