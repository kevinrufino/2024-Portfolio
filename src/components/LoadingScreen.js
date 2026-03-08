/**
 * Loading screen component with progressive loading animation
 *
 * This component displays a loading screen with:
 * - Animated hero name with mask effect
 * - Progress bar showing loading percentage
 * - Visual feedback during component initialization
 * - Custom cursor interactions
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.progress - Current loading progress (number of components loaded)
 * @param {number} props.total - Total number of components to load
 * @param {string} props.secondaryColor - Secondary theme color for animations
 * @param {Function} props.setCursor - Function to update cursor state
 * @returns {JSX.Element} The loading screen component
 */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { HeroName } from './Hero/HeroName.js';

const LoadingScreen = ({ progress, total, secondaryColor, setCursor }) => {
  /** @type {React.RefObject<HTMLDivElement>} Reference to the hero name container */
  const ref = useRef(null);

  return (
    <div
      className='fixed inset-0 flex flex-col items-center justify-center bg-[#F1F43B] z-[999] p-2'
      onMouseEnter={() => {
        setCursor('');
      }}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full relative' ref={ref}>
          {/* Hero name with transparent primary color for mask effect */}
          <HeroName
            className='w-full'
            primaryColor={'#00000000'}
            secondaryColor={secondaryColor}
          />

          {/* Loading mask overlay with progress bar */}
          <div
            style={{ height: `${ref.current?.offsetHeight ?? 128}px` }}
            className='absolute top-0 left-0 w-full h-full overflow-hidden loading-mask z-[99999] pointer-events-none'
          >
            {/* @TODO: make flat loader into wave */}
            {/* Progress bar that fills from bottom to top */}
            <div
              className='w-full bg-[#3e3bf4] transition-all duration-300 absolute left-0 bottom-0'
              style={{ height: `${(progress / total) * 100}%` }}
            />
            {/* Decorative mask overlay bar */}
            <div className='absolute top-0 left-0 w-full h-full loading-mask-bar' />
          </div>
        </div>
      </div>

      {/* Loading percentage display */}
      <div className='text-[#3e3bf4] text-3xl font-bold font-offbit101Bold mb-4'>
        Loading... {Math.round((progress / total) * 100)}%
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  setCursor: PropTypes.func.isRequired,
};

export default LoadingScreen;
