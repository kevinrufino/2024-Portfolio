/**
 * Reusable Loading Spinner component
 * 
 * Consistent loading animation across the application
 * Multiple sizes and variants available
 * Accessibility friendly with proper ARIA labels
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Spinner size
 * @param {string} [props.variant='default'] - Spinner variant
 * @param {string} [props.label='Loading'] - Accessibility label
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Rendered spinner
 */

import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const LoadingSpinner = ({
  size = 'medium',
  variant = 'default',
  label = 'Loading',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'border-blue-500 border-t-transparent',
    dots: 'border-gray-300 border-t-transparent',
    pulse: 'border-yellow-400 border-t-transparent',
  };

  const classes = clsx(
    'inline-block border-4 border-solid rounded-full animate-spin',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <div
      className={classes}
      role="status"
      aria-label={label}
      aria-live="polite"
    >
      <span className="sr-only">{label}</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xl']),
  variant: PropTypes.oneOf(['default', 'dots', 'pulse']),
  label: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingSpinner;
