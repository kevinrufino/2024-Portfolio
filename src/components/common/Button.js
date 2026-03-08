/**
 * Reusable Button component
 * 
 * Consistent button styling with accessibility support
 * Multiple variants and sizes available
 * Supports loading and disabled states
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant
 * @param {string} [props.size='medium'] - Button size
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Rendered button
 */

import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'font-offbit101Bold transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500',
    secondary: 'bg-yellow-400 text-blue-900 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-400',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500',
    ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'hover:scale-105 active:scale-95';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
