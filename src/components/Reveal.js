import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered reveal: rises and fades in the first time it enters the
 * viewport. Renders children in place when the user prefers reduced motion.
 */
const Reveal = ({ children, delay = 0, y = 28, className, ...rest }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
};

export default Reveal;
