/**
 * Custom hook for keyboard navigation
 *
 * Provides keyboard navigation utilities
 * Handles focus management and keyboard events
 * Supports accessibility and keyboard-only navigation
 *
 * @hook
 * @returns {Object} Keyboard navigation utilities
 */

import { useState, useCallback } from 'react';

export const useKeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Handle arrow key navigation
  const handleKeyDown = useCallback(
    (event, items) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'Tab':
          event.preventDefault();
          setFocusedIndex(prev => (prev + 1) % items.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(items.length - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          // Activate focused item
          if (items[focusedIndex] && items[focusedIndex].onClick) {
            items[focusedIndex].onClick();
          }
          break;
        case 'Escape':
          event.preventDefault();
          // Handle escape (close modal, etc.)
          if (items[focusedIndex] && items[focusedIndex].onEscape) {
            items[focusedIndex].onEscape();
          }
          break;
      }
    },
    [focusedIndex],
  );

  // Focus management
  const focusItem = useCallback(index => {
    setFocusedIndex(index);
    const element = document.querySelector(`[data-nav-index="${index}"]`);
    if (element) {
      element.focus();
    }
  }, []);

  // Reset focus
  const resetFocus = useCallback(() => {
    setFocusedIndex(0);
  }, []);

  return {
    focusedIndex,
    handleKeyDown,
    focusItem,
    resetFocus,
  };
};
