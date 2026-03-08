/**
 * Reusable Card component
 * 
 * Consistent card styling with multiple variants
 * Supports hover effects and accessibility
 * Optimized for performance with React.memo
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant
 * @param {boolean} [props.hoverable=true] - Hover effect
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @returns {JSX.Element} Rendered card
 */

import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Card = React.memo(({
  variant = 'default',
  hoverable = true,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'border border-gray-200',
    elevated: 'border-0 shadow-xl',
    outlined: 'border-2 border-gray-300',
    glass: 'bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200',
  };

  const hoverClasses = hoverable 
    ? 'hover:shadow-xl hover:scale-105 cursor-pointer' 
    : '';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    className
  );

  const handleClick = (event) => {
    if (onClick && !event.defaultPrevented) {
      onClick(event);
    }
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          handleClick(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined', 'glass']),
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
