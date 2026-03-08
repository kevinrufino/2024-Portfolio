/**
 * Custom hook for localStorage operations
 * 
 * Provides reactive localStorage with state management
 * Handles JSON serialization and error cases
 * 
 * @hook
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value
 * @returns {Array} [value, setValue, removeValue]
 */

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue = null) => {
  // Get initial value from localStorage
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove value from localStorage and state
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
    setStoredValue(defaultValue);
  };

  return [storedValue, setStoredValue, removeValue];
};
