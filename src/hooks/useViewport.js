/**
 * Custom hook for viewport and responsive utilities
 *
 * Provides viewport dimensions and device type detection
 * Handles window resize events with cleanup
 *
 * @hook
 * @returns {Object} Viewport information
 */

import { useState, useEffect } from 'react';
import { isMobile, getDeviceType } from '../utils/helpers.js';

export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    deviceType: getDeviceType(),
    isMobile: isMobile(),
  });

  useEffect(() => {
    // Handle window resize events
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        deviceType: getDeviceType(),
        isMobile: isMobile(),
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
};
