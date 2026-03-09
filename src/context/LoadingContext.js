/**
 * Loading Context for managing application loading state
 *
 * Provides global loading state management for progressive loading
 * Tracks loading progress and component initialization
 *
 * @context
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

// Action types for loading state management
export const LOADING_ACTIONS = {
  SET_PROGRESS: 'SET_PROGRESS',
  INCREMENT_PROGRESS: 'INCREMENT_PROGRESS',
  SET_LOADING_STATE: 'SET_LOADING_STATE',
  RESET_LOADING: 'RESET_LOADING',
  SET_LOADING_COMPLETE: 'SET_LOADING_COMPLETE',
};

// Initial loading state
const initialState = {
  progress: 0,
  total: 7, // Total number of components to load
  isLoading: true,
  loadedComponents: [],
  loadingComplete: false,
};

// Reducer for loading state management
const loadingReducer = (state, action) => {
  switch (action.type) {
    case LOADING_ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case LOADING_ACTIONS.INCREMENT_PROGRESS:
      return {
        ...state,
        progress: Math.min(state.progress + 1, state.total),
      };
    case LOADING_ACTIONS.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOADING_ACTIONS.RESET_LOADING:
      return {
        ...initialState,
      };
    case LOADING_ACTIONS.SET_LOADING_COMPLETE:
      return {
        ...state,
        loadingComplete: true,
      };
    default:
      return state;
  }
};

// Create context
const LoadingContext = createContext(null);

// Context provider component
export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  // Action creators with useCallback to prevent infinite re-renders
  const setProgress = useCallback(progress => {
    dispatch({ type: LOADING_ACTIONS.SET_PROGRESS, payload: progress });
  }, []);

  const incrementProgress = useCallback(() => {
    dispatch({ type: LOADING_ACTIONS.INCREMENT_PROGRESS });
  }, []);

  const setLoadingState = useCallback(isLoading => {
    dispatch({ type: LOADING_ACTIONS.SET_LOADING_STATE, payload: isLoading });
  }, []);

  const resetLoading = useCallback(() => {
    dispatch({ type: LOADING_ACTIONS.RESET_LOADING });
  }, []);

  const setLoadingComplete = useCallback(() => {
    dispatch({ type: LOADING_ACTIONS.SET_LOADING_COMPLETE });
  }, []);

  const getProgressPercentage = useCallback(() => {
    return Math.round((state.progress / state.total) * 100);
  }, [state.progress, state.total]);

  const isComplete = useCallback(() => {
    return state.progress >= state.total && state.loadingComplete;
  }, [state.progress, state.total, state.loadingComplete]);

  const value = {
    ...state,
    setProgress,
    incrementProgress,
    setLoadingState,
    resetLoading,
    setLoadingComplete,
    getProgressPercentage,
    isComplete,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

// Custom hook for using loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingContext;
